import { Links } from '../types/Link';

export const getCurrentTab = async () => {
  const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
  return tabs[0];
};

export const loadLinks = async () => {
  const data = localStorage.getItem('links');
  if (!data) return { links: [] };

  const storedLinks: Links = JSON.parse(data);
  return storedLinks;
};
