import type { WebextTab } from "../types/WebextTab.ts";

export function fromChromeTab(t: chrome.tabs.Tab): WebextTab {
  const out: WebextTab = {
    active: t.active,
    pinned: t.pinned,
    raw: t,
  };

  if (typeof t.id === "number") out.id = t.id;
  if (typeof t.windowId === "number") out.windowId = t.windowId;
  if (typeof t.index === "number") out.index = t.index;
  if (typeof t.url === "string") out.url = t.url;
  if (typeof t.discarded === "boolean") out.discarded = t.discarded;
  if (typeof t.groupId === "number") out.groupId = t.groupId;

  return out;
}

export function fromFirefoxTab(t: browser.tabs.Tab): WebextTab {
  const out: WebextTab = {
    active: t.active,
    pinned: t.pinned,
    raw: t,
  };

  if (typeof t.id === "number") out.id = t.id;
  if (typeof t.windowId === "number") out.windowId = t.windowId;
  if (typeof t.index === "number") out.index = t.index;
  if (typeof t.url === "string") out.url = t.url;
  if (typeof t.discarded === "boolean") out.discarded = t.discarded;
  if (typeof t.cookieStoreId === "string") out.cookieStoreId = t.cookieStoreId;

  return out;
}