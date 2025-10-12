import Browser from 'webextension-polyfill';
import { getLinksFromStorage } from './functions/storage';
import { Links } from './types/Link';
import {
  createNextTo,
  goPath,
  groupIntoNamed,
  groupIntoSameAs,
} from './functions/gopath';
import { fromChromeTab, fromFirefoxTab } from './functions/webextNormalize';
import { webext } from './functions/webext';
import { GroupStrategy } from './functions/gopath';

const DocumentUrlPatterns = ['http://*/*', 'https://*/*', 'ftp://*/*'];

async function createContextMenu() {
  const links = await getLinksFromStorage();

  Browser.contextMenus.removeAll();
  if (!links || !links.links.length) {
    Browser.contextMenus.create({
      id: 'default_root',
      title: 'No paths configured',
      contexts: ['page'],
      enabled: false,
      documentUrlPatterns: DocumentUrlPatterns,
    });

    return;
  }

  links.links.forEach((link, index) => {
    const isHeading = link.pathUrl === '0';
    Browser.contextMenus.create({
      title: link.pathName,
      enabled: !isHeading,
      contexts: ['page'],
      id: index.toString(),
      documentUrlPatterns: DocumentUrlPatterns,
    });
  });
}

Browser.runtime.onInstalled.addListener(() => {
  createContextMenu();
});

const onStorageChange = (
  changes: Browser.Storage.StorageAreaOnChangedChangesType
) => {
  const newValue: Links = changes.json.newValue
    ? JSON.parse(changes.json.newValue as string)
    : { links: [] };

  if (!newValue?.links) return;
  createContextMenu();
};

Browser.storage.local.onChanged.addListener(onStorageChange);
Browser.storage.sync.onChanged.addListener(onStorageChange);

// ---- Message types ----
type OpenLinkMessage = {
  action: 'openLink';
  url: string;
  newTab?: boolean;
  strategy?: GroupStrategy;
};

type GoPathMessage = {
  action: 'goPath';
  urlIndex: number;
  openInNewTab?: boolean;
  group?: GroupStrategy;
};

Browser.contextMenus.onClicked.addListener((info, tab) => {
  if (!tab) return;

  // 1) Parse the menu item index
  const idType = typeof info.menuItemId;
  const itemIndex =
    idType === 'number'
      ? (info.menuItemId as number)
      : idType === 'string'
        ? Number.parseInt(info.menuItemId as string, 10)
        : NaN;

  if (!Number.isFinite(itemIndex)) return;

  // 2) Convert native Tab -> WebextTab (no `any`)
  const compat = webext.env.isFirefox
    ? fromFirefoxTab(tab as browser.tabs.Tab)
    : fromChromeTab(tab as chrome.tabs.Tab);

  // 3) Call goPath. Choose reuse current tab or open a new one (+ group)
  void goPath(compat, itemIndex, {
    openInNewTab: true,
    group: { kind: 'same-group' },
  });
});

// ---- openLink: direct URL version (used by PathListLink "+tab" flow) ----
async function handleOpenLink(msg: OpenLinkMessage): Promise<void> {
  const [active] = await webext.tabs.query({
    active: true,
    currentWindow: true,
  });
  if (!active) return;

  if (!msg.newTab) {
    if (active.id !== undefined) {
      await webext.tabs.update(active.id, { url: msg.url });
    }
    return;
  }

  const created = await createNextTo(active, msg.url);
  const strat = msg.strategy;
  if (!strat) return;

  if (strat.kind === 'same-group') {
    await groupIntoSameAs(active, created);
  } else {
    await groupIntoNamed(active, created, strat.title);
  }
}

// ---- Message listener (popup/UI → background) ----
webext.runtime.onMessage.addListener((message) => {
  const act = (message as { action?: string }).action;

  if (act === 'openLink') {
    void handleOpenLink(message as OpenLinkMessage);
    return;
  }

  if (act === 'goPath') {
    void (async () => {
      const [active] = await webext.tabs.query({
        active: true,
        currentWindow: true,
      });
      if (!active) return;

      const m = message as GoPathMessage;

      const base = { openInNewTab: m.openInNewTab ?? false };
      const opts = m.group
        ? { ...base, group: m.group }
        : m.openInNewTab
          ? { ...base, group: { kind: 'same-group' } as const }
          : base;

      await goPath(active, m.urlIndex, opts);
    })();
    return;
  }
});
