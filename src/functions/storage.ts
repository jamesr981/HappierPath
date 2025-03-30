import { Links } from '../types/Link';
import Browser from 'webextension-polyfill';

export const getStorageType = async () => {
  const useSyncStorage: boolean = (await getOptionsFromStorage())
    .useSyncStorage;
  return useSyncStorage ? Browser.storage.sync : Browser.storage.local;
};

export const getLinksFromStorage = async (): Promise<Links> => {
  const storage = await getStorageType();
  const result = (await storage.get('json')) as { json: string };

  if (!result?.json?.length) return { links: [] };

  return JSON.parse(result.json);
};

export const saveLinksToStorage = async (jsonPaths: Links) => {
  const json = JSON.stringify(jsonPaths);
  const storage = await getStorageType();

  await storage.set({ json: json });
};

export const getOptionsFromStorage = async (): Promise<Options> => {
  const result = (await Browser.storage.sync.get('options')) as {
    options: Options;
  };
  return result?.options ?? { useSyncStorage: false };
};

export const saveOptionsToStorage = async (options: Options) => {
  await Browser.storage.sync.set({ options: options });
};

export interface Options {
  useSyncStorage: boolean;
}
