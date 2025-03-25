async function createContextMenu() {
  const links = await loadLinks();

  chrome.contextMenus.removeAll();
  if (!links || !links.links.length) {
    chrome.contextMenus.create({
      id: 'default_root',
      title: 'root',
      contexts: ['all'],
      enabled: false,
    });

    return;
  }

  links.links.forEach((link, index) => {
    const isHeading = link.pathUrl === '0';
    chrome.contextMenus.create({
      title: link.pathName,
      enabled: !isHeading,
      contexts: ['all'],
      id: index.toString(),
    });
  });
}

chrome.runtime.onInstalled.addListener(() => {
  createContextMenu();
});

chrome.storage.onChanged.addListener((changes) => {
  if (changes.links) {
    createContextMenu();
  }
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (!tab || !tab.id) return;

  let itemIndex: number;
  const menuItemIdType = typeof info.menuItemId;
  if (menuItemIdType === 'string') {
    const parsed = parseInt(info.menuItemId as string);
    if (isNaN(parsed)) return;
    itemIndex = parsed;
  } else if (menuItemIdType === 'number') {
    itemIndex = info.menuItemId as unknown as number;
  } else {
    return;
  }

  goPath(tab, itemIndex);
});

async function goPath(tab: chrome.tabs.Tab, urlIndex: number) {
  if (!tab.id) return;

  if (tab.id < 0) {
    console.warn(
      'Context Menu navigation from extension popup is unsupported.'
    );
    return;
  }

  const links = await loadLinks();
  const link = links.links[urlIndex];
  if (!tab.url) return;
  const url = new URL(tab.url);
  const newUrl = `${url.protocol}//${url.hostname}${link.pathUrl}`;
  chrome.tabs.update(tab.id, { url: newUrl });
}

async function loadLinks(): Promise<Links> {
  const data: LocalStorage = await chrome.storage.local.get(['links']);
  if (!data?.links?.length) return { links: [] };

  const storedLinks: Links = JSON.parse(data.links);
  return storedLinks;
}

type LocalStorage = {
  links: string;
};

type Link = {
  pathUrl: string;
  pathName: string;
};

type Links = {
  links: Link[];
};
