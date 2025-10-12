import type { WebextQueryInfo } from "../types/WebextQuery";

type FxQueryInfo = Parameters<typeof browser.tabs.query>[0];

export function toFirefoxQuery(q: WebextQueryInfo): FxQueryInfo {
  const out: FxQueryInfo = {};

  if (q.active !== undefined) out.active = q.active;
  if (q.audible !== undefined) out.audible = q.audible;
  if (q.currentWindow !== undefined) out.currentWindow = q.currentWindow;
  if (q.lastFocusedWindow !== undefined) out.lastFocusedWindow = q.lastFocusedWindow;
  if (q.highlighted !== undefined) out.highlighted = q.highlighted;
  if (q.pinned !== undefined) out.pinned = q.pinned;
  if (q.discarded !== undefined) out.discarded = q.discarded;
  if (q.index !== undefined) out.index = q.index;
  if (q.windowId !== undefined) out.windowId = q.windowId;
  if (q.windowType !== undefined) out.windowType = q.windowType as unknown as browser.windows.WindowType;
  if (q.url !== undefined) out.url = q.url as string | string[];
  if (q.title !== undefined) out.title = q.title;
  if (q.status !== undefined) out.status = q.status as browser.tabs.TabStatus; // "loading" | "complete"
  if (q.cookieStoreId !== undefined) (out as { cookieStoreId?: string | string[] }).cookieStoreId = q.cookieStoreId;

  return out;
}

type ChQueryInfo = chrome.tabs.QueryInfo;

export function toChromeQuery(q: WebextQueryInfo): ChQueryInfo {
  const out: ChQueryInfo = {};

  if (q.active !== undefined) out.active = q.active;
  if (q.audible !== undefined) out.audible = q.audible;
  if (q.currentWindow !== undefined) out.currentWindow = q.currentWindow;
  if (q.lastFocusedWindow !== undefined) out.lastFocusedWindow = q.lastFocusedWindow;
  if (q.highlighted !== undefined) out.highlighted = q.highlighted;
  if (q.pinned !== undefined) out.pinned = q.pinned;
  if (q.discarded !== undefined) out.discarded = q.discarded;
  if (q.index !== undefined) out.index = q.index;
  if (q.windowId !== undefined) out.windowId = q.windowId;
  if (q.windowType !== undefined) out.windowType = q.windowType;
  if (q.url !== undefined) out.url = q.url;
  if (q.title !== undefined) out.title = q.title;
  if (q.status !== undefined) out.status = q.status; // Chrome accepts "loading" | "complete" (and "unloaded", which we omit)

  // cookieStoreId doesn't exist on Chrome, so we ignore it.

  return out;
}