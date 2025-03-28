export const getCurrentTab = async () => {
  const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
  return tabs[0];
};

export const getStorageType = async () => {
  var useSyncStorage: boolean = false;

  await chrome.storage.sync.get('useSyncStorage').then((result) => {
    useSyncStorage = result?.useSyncStorage ?? false;
  });

  return useSyncStorage ? chrome.storage.sync : chrome.storage.local;
}

export const loadLinks = async () => {
  let myLinks = { links: [] };

  const storage = await getStorageType();

  await storage.get('json').then((result) => {
    if (!result.json) return;

    myLinks = JSON.parse(result.json);
  });

  return myLinks;
};

export interface Options {
  useSyncStorage: boolean;
}

export const getCurrentOptions = async (): Promise<Options> => {
  var useSyncStorage: boolean = false;

  await chrome.storage.sync.get('useSyncStorage').then((result) => {
    useSyncStorage = result?.useSyncStorage ?? false;
  });

  return {
    useSyncStorage,
  };
};
