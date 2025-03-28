import { getUseSyncStorage, getLinksFromStorage } from "./storage";

export const getCurrentTab = async () => {
  const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
  return tabs[0];
};

export const loadLinks = async () => {
  const myLinks = await getLinksFromStorage();
  return myLinks;
};

export const getCurrentOptions = async (): Promise<Options> => {
	return {
	  useSyncStorage: await getUseSyncStorage(),
	};
};

export interface Options {
  useSyncStorage: boolean;
}
