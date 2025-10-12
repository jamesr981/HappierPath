export type WebextTab = {
  // always present in both Chrome and Firefox
  active: boolean;
  pinned: boolean;

  // present only if the browser provides them
  id?: number;
  windowId?: number;
  index?: number;
  url?: string;
  discarded?: boolean;

  // Chrome-only:
  groupId?: number;

  // Firefox-only:
  cookieStoreId?: string;

  raw: chrome.tabs.Tab | browser.tabs.Tab;
};