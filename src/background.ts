import Browser from 'webextension-polyfill';
import { getLinksFromStorage } from './functions/storage';
import { Links } from './types/Link';

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
  const newValue: Links = changes.json.newValue ? JSON.parse(changes.json.newValue as string) : {links: []};

  if (!newValue?.links) return;
  createContextMenu();
};

Browser.storage.local.onChanged.addListener(onStorageChange);
Browser.storage.sync.onChanged.addListener(onStorageChange);

Browser.contextMenus.onClicked.addListener((info, tab) => {
  if (!tab || !tab.id) return;

  let itemIndex: number;
  const menuItemIdType = typeof info.menuItemId;
  if (menuItemIdType === 'string') {
    const parsed = parseInt(info.menuItemId as string);
    if (isNaN(parsed)) return;
    itemIndex = parsed;
  } else if (menuItemIdType === 'number') {
    itemIndex = info.menuItemId as number;
  } else {
    return;
  }

  goPath(tab, itemIndex);
});

async function goPath(tab: Browser.Tabs.Tab, urlIndex: number) {
  if (!tab.id) return;

  if (tab.id < 0) {
    console.warn(
      'Context Menu navigation from extension popup is unsupported.'
    );
    return;
  }

  const links = await getLinksFromStorage();
  const link = links.links[urlIndex];
  if (!tab.url) return;
  const url = new URL(tab.url);
  const newUrl = `${url.protocol}//${url.hostname}${link.pathUrl}`;
  Browser.tabs.update(tab.id, { url: newUrl });
}
