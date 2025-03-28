import { Links } from "../types/Link";
import { Options } from "./setup";

export const getStorageType = async () => {
  const result = await chrome.storage.sync.get('useSyncStorage');
  const useSyncStorage: boolean = result?.useSyncStorage ?? false;

  return useSyncStorage ? chrome.storage.sync : chrome.storage.local;
}

const UseFallBackStorage = async (key: string) => {
  const data = localStorage.getItem(key);
  return data;
}

export const getLinksFromStorage = async (): Promise<Links> => {
  const storage = await getStorageType();
  const result = await storage.get('json');

  if (!result.json) {
    const data = await UseFallBackStorage('links');
    if (!data) return { links: [] };
    return JSON.parse(data);
  }

  return JSON.parse(result.json);
}

export const saveLinksToStorage = async (jsonPaths: Links) => {
  const json = JSON.stringify(jsonPaths);
  const storage = await getStorageType();

  await storage.set({ json: json });
}

export const getUseSyncStorage = async () => {
  const result = await chrome.storage.sync.get('useSyncStorage');
  return result?.useSyncStorage ?? false;
}

export const saveUseSyncStorageToStorage = async (options: Options) => {
  await chrome.storage.sync.set(options);
}
