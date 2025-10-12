import type { WebextTab } from "../types/WebextTab.ts";
import type { WebextQueryInfo } from "../types/WebextQuery.ts";
import { fromChromeTab, fromFirefoxTab } from "./webextNormalize.ts";
import { toChromeQuery, toFirefoxQuery } from "./WebextQueryMap.ts";

type ChromeNS = typeof chrome;
type FirefoxNS = typeof browser;

function getChrome(): ChromeNS | undefined {
  if (typeof globalThis !== "undefined" && "chrome" in globalThis) {
    return (globalThis as { chrome?: ChromeNS }).chrome;
  }
  return undefined;
}

function getFirefox(): FirefoxNS | undefined {
  if (typeof globalThis !== "undefined" && "browser" in globalThis) {
    return (globalThis as { browser?: FirefoxNS }).browser;
  }
  return undefined;
}

const CHROME = getChrome();
const FIREFOX = getFirefox();

const isChrome = !!CHROME && typeof CHROME.tabs?.create === "function";
const isFirefox = !!FIREFOX && typeof FIREFOX.tabs?.create === "function";

type ChromeOnMessageListener =
  Parameters<typeof chrome.runtime.onMessage.addListener>[0];

type FirefoxOnMessageListener =
  Parameters<typeof browser.runtime.onMessage.addListener>[0];

/** Promisify a single Chrome callback function (typed, no `any`). */
function promisifyChrome<TArgs extends unknown[], TResult>(
  fn: (...args: [...TArgs, (result: TResult) => void]) => void,
  ...args: TArgs
): Promise<TResult> {
  return new Promise<TResult>((resolve, reject) => {
    fn(...args, (result: TResult) => {
      const err = CHROME?.runtime?.lastError;
      if (err) reject(new Error(err.message));
      else resolve(result);
    });
  });
}

export const webext = {
  env: { isChrome, isFirefox },

  tabs: {
    async create(props: chrome.tabs.CreateProperties): Promise<WebextTab> {
      if (isFirefox) {
        const t = await FIREFOX!.tabs.create(props);
        return fromFirefoxTab(t);
      }
      const t = await promisifyChrome<[chrome.tabs.CreateProperties], chrome.tabs.Tab>(CHROME!.tabs.create, props);
      return fromChromeTab(t);
    },

    async update(tabId: number, props: chrome.tabs.UpdateProperties): Promise<WebextTab> {
      if (isFirefox) {
        const t = await FIREFOX!.tabs.update(tabId, props);
        return fromFirefoxTab(t);
      }
      const t = await promisifyChrome<[number, chrome.tabs.UpdateProperties], chrome.tabs.Tab>(
        CHROME!.tabs.update,
        tabId,
        props
      );
      return fromChromeTab(t);
    },

    async query(queryInfo: WebextQueryInfo): Promise<WebextTab[]> {
      if (isFirefox) {
        const fxQuery = toFirefoxQuery(queryInfo);
        const list = await FIREFOX!.tabs.query(fxQuery);
        return list.map(fromFirefoxTab);
      }
      const chQuery = toChromeQuery(queryInfo);
      const list = await promisifyChrome<[chrome.tabs.QueryInfo], chrome.tabs.Tab[]>(
        CHROME!.tabs.query,
        chQuery
      );
      return list.map(fromChromeTab);
    },

     /** Chrome-only: returns the created/updated groupId. */
    async group(options: chrome.tabs.GroupOptions): Promise<number> {
      if (!isChrome) {
        throw new Error("Tab groups are not supported in Firefox");
      }
      return promisifyChrome<[chrome.tabs.GroupOptions], number>(CHROME!.tabs.group, options);
    },
  },

  tabGroups: {
    async query(queryInfo: chrome.tabGroups.QueryInfo): Promise<chrome.tabGroups.TabGroup[]> {
      if (!isChrome) return Promise.resolve([]);
      return promisifyChrome<[chrome.tabGroups.QueryInfo], chrome.tabGroups.TabGroup[]>(
        CHROME!.tabGroups.query,
        queryInfo
      );
    },

    async update(groupId: number, props: chrome.tabGroups.UpdateProperties): Promise<chrome.tabGroups.TabGroup> {
      if (!isChrome) throw new Error("Tab groups are not supported in Firefox");
      return promisifyChrome<[number, chrome.tabGroups.UpdateProperties], chrome.tabGroups.TabGroup>(
        CHROME!.tabGroups.update,
        groupId,
        props
      );
    },
  },

  runtime: {
    async sendMessage<T = unknown>(message: unknown): Promise<T> {
      if (isFirefox) {
        return FIREFOX!.runtime.sendMessage(message) as Promise<T>;
      }
      return promisifyChrome<[unknown], T>(CHROME!.runtime.sendMessage, message);
    },
    onMessage: {
      addListener(
        listener: (
          message: unknown
        ) => void | boolean | Promise<void | boolean>
      ): void {
        if (isFirefox) {
          FIREFOX!.runtime.onMessage.addListener(
            listener as FirefoxOnMessageListener
          );
        } else if (isChrome) {
          CHROME!.runtime.onMessage.addListener(
            listener as ChromeOnMessageListener
          );
        }
      },

      removeListener(
        listener: (
          message: unknown,
          sender: chrome.runtime.MessageSender,
          sendResponse: (response?: unknown) => void
        ) => void
      ): void {
        if (isFirefox) {
          FIREFOX!.runtime.onMessage.removeListener(
            listener as FirefoxOnMessageListener
          );
        } else if (isChrome) {
          CHROME!.runtime.onMessage.removeListener(
            listener as ChromeOnMessageListener
          );
        }
      },
    },
  },
};
