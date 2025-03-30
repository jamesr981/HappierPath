import Browser from 'webextension-polyfill';

export const getCurrentTab = async () => {
  const tabs = await Browser.tabs.query({ active: true, currentWindow: true });
  return tabs[0];
};
