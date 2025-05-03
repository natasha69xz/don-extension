// Initialize storage
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({ clipboardHistory: [] });
});

// Listen for copy events
document.addEventListener('copy', async () => {
  try {
    const text = await navigator.clipboard.readText();
    if (text.trim()) {
      chrome.storage.local.get(['clipboardHistory'], (result) => {
        const history = result.clipboardHistory || [];
        history.unshift({
          text: text,
          time: new Date().toLocaleString()
        });
        chrome.storage.local.set({ clipboardHistory: history.slice(0, 100) });
      });
    }
  } catch (error) {
    console.error('Failed to read clipboard:', error);
  }
});

// Handle messages from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getHistory") {
    chrome.storage.local.get(['clipboardHistory'], (result) => {
      sendResponse(result.clipboardHistory || []);
    });
    return true; // Required for async response
  }
});