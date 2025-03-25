chrome.runtime.onMessage.addListener((request: { action: string }) => {
  if (request.action === 'open-happier-path') {
    // Trigger your React app functionality here.
    console.log('Happier Path context menu clicked!');

    // Example: Dispatch a custom event your React app listens for:
    window.dispatchEvent(new CustomEvent('open-happier-path'));
  }
});
