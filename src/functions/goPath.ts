// import { setup } from './setup';

export const goPath = (linkId: string | number, newTab: boolean) => {
  console.info(`goPath linkId: ${linkId} | newTab: ${newTab}`);
  // const tab = currentTab.value;
  // if (!tab?.url || !tab.id) return;
  // const url = new URL(tab.url);

  // //todo get these values
  // const urlProtocol = 'http://';
  // const urlHost = 'google.com';
  // let newUrl = urlProtocol + urlHost;
  // newUrl += linkId === 0 ? url.pathname : linkId;
  // if (newTab) {
  //   chrome.tabs.create({ url: newUrl });
  // } else {
  //   chrome.tabs.update(tab.id, { url: newUrl });
  // }

  // setup();
};
