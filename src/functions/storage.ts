import { Links } from "../types/Link";
import { Options } from "./setup";

export const getStorageType = async () => {
  var useSyncStorage: boolean = false;

  await chrome.storage.sync.get('useSyncStorage').then((result) => {
    useSyncStorage = result?.useSyncStorage ?? false;
  });

  return useSyncStorage ? chrome.storage.sync : chrome.storage.local;
}

export const getLinksFromStorage = async (): Promise<Links> => {
  const storage = await getStorageType();
  const result = await storage.get('json');

  if (!result.json) return { links: [] };
  let json: Links = JSON.parse(result.json);
  return json;
}

export const saveLinksToStorage = async (jsonPaths: Links) => {
  const json = JSON.stringify(jsonPaths);
  const storage = await getStorageType();

  await storage.set({ json: json });
}

export const getUseSyncStorage = async () => {
  var result = await chrome.storage.sync.get('useSyncStorage');
  return result?.useSyncStorage ?? false;
}

export const saveUseSyncStorageToStorage = async (options: Options) => {
  await chrome.storage.sync.set(options);
}
