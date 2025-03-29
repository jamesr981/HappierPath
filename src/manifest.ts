export function getManifest(browser: 'chrome' | 'firefox') {
  const isFirefox = browser === 'firefox';

  return {
    manifest_version: 3,
    name: 'HappierPath',
    version: '4.2.0',
    description: '... because everything is still relative.',
    action: {
      default_icon: 'icon_16.png',
      default_popup: 'popup.html',
    },
    icons: {
      16: 'icon_16.png',
      48: 'icon_48.png',
      128: 'icon_128.png',
    },
    permissions: ['tabs', 'storage', 'contextMenus'],
    background: isFirefox
      ? {
          scripts: ['background.js'],
          type: 'module',
        }
      : {
          service_worker: 'background.js',
        },
  };
}
