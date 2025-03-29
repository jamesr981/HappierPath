import Browser from 'webextension-polyfill';
import { Links } from '../types/Link';

export const getCurrentTab = async () => {
  const tabs = await Browser.tabs.query({ active: true, currentWindow: true });
  return tabs[0];
};

export const loadLinks = async (): Promise<Links> => {
  const data = (await Browser.storage.local.get(['links'])) as LocalStorage;
  if (!data?.links?.length) return { links: [] };

  const storedLinks: Links = JSON.parse(data.links);
  return storedLinks;
};

export const saveLinks = async (links: Links) => {
  const json = JSON.stringify(links);
  Browser.storage.local.set({ links: json });
};

type LocalStorage = {
  links: string;
};
