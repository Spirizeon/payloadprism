// This script runs in the context of web pages
console.log('PayloadPrism content script loaded');

// Listen for messages from the extension
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'GET_PAGE_INFO') {
    // You can add functionality to analyze the current page here
    sendResponse({
      url: window.location.href,
      title: document.title
    });
  }
}); 