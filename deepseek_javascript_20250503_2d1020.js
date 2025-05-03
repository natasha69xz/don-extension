let lastCopiedText = '';

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({ history: [] });
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getHistory") {
    chrome.storage.local.get("history", (data) => {
      sendResponse(data.history || []);
    });
    return true;
  }
});

document.addEventListener('copy', () => {
  navigator.clipboard.readText().then(text => {
    if (text && text !== lastCopiedText) {
      lastCopiedText = text;
      chrome.storage.local.get("history", (data) => {
        const history = data.history || [];
        history.unshift({
          text: text,
          time: new Date().toLocaleString()
        });
        chrome.storage.local.set({ history: history.slice(0, 100) });
      });
    }
  });
});