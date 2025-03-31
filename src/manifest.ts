export interface ManifestOptions {
  mode: string;
  browser: 'chrome' | 'firefox';
}

export function getManifest({ mode, browser }: ManifestOptions) {
  const isFirefox = browser === 'firefox';
  const isDebug = mode === 'development';

  return {
    manifest_version: 3,
    name: 'HappierPath',
    version: '4.2.3',
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
          type: 'module',
        },
    browser_specific_settings: {
      gecko: {
        id: 'addon@happierpath.dev',
        strict_min_version: '112.0',
      },
    },
    ...(isDebug && {
      key: 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqNNHLpYsijqxBZzS0jAvEhdUhRhYh4PWRDOUBiHIrDZp9/EOL+mrc4djvS5pQMVKB7An7xVnF80KuWHFFFf1Oykgyl3flrK+ymABi1c5sbdMekf4GmJsTLf2AUbC0ZXGYRu4tzkof81Ndp83dPWGWELQNqFbVksxRJAjM7jVxru/eNyOedoYdo88J4NWYbymKgb7AnNqfCR59UGO4vl3tggPzQaGMPpcjB3owTDlNTAW/4p5IQrfwx6oo5n9iRO/SQdXdzgBNoR1BBcPM/ssf8VjmGWfdBx+Xf7lfrAirgeAIikdF8h+6aXQnVYH88ObmA7QiT486NXalhkDPmh5bQIDAQAB',
    }),
  };
}
