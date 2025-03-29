import { Links } from '../types/Link';

export const getCurrentTab = async () => {
  const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
  return tabs[0];
};

export const loadLinks = async () => {
  const data: LocalStorage = await chrome.storage.local.get(['links']);
  if (!data?.links?.length) return { links: [] };

  const storedLinks: Links = JSON.parse(data.links);
  return storedLinks;
};

export const saveLinks = async (links: Links) => {
  const json = JSON.stringify(links);
  chrome.storage.local.set({ links: json });
};

type LocalStorage = {
  links: string;
};
