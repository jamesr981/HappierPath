export type WebextTabStatus = "loading" | "complete";

export type WebextQueryInfo = {
  active?: boolean;
  audible?: boolean;
  currentWindow?: boolean;
  lastFocusedWindow?: boolean;
  highlighted?: boolean;
  pinned?: boolean;
  discarded?: boolean;
  index?: number;
  windowId?: number;
  windowType?: chrome.windows.WindowType; // both libs share this
  url?: string | string[];
  title?: string;
  status?: WebextTabStatus;

  // Firefox-only extras you may care about:
  cookieStoreId?: string | string[];
};