import { getLinksFromStorage, getOptionsFromStorage, Options } from './storage';
import Browser from 'webextension-polyfill';

export const getCurrentTab = async () => {
  const tabs = await Browser.tabs.query({ active: true, currentWindow: true });
  return tabs[0];
};

export const loadLinks = async () => {
  const myLinks = await getLinksFromStorage();
  return myLinks;
};

export const getCurrentOptions = async (): Promise<Options> => {
  return await getOptionsFromStorage();
};
