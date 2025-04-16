
// Background script for LinkedIn Android Hunter

// Default settings
const defaultSettings = {
  keywords: [
    "android developer", 
    "android engineer", 
    "android programming", 
    "kotlin developer", 
    "mobile developer android"
  ],
  hiringTerms: [
    "hiring", 
    "job opening", 
    "we're looking", 
    "opportunity", 
    "position available", 
    "job", 
    "vacancy", 
    "role"
  ],
  emailTemplate: "Hi,\n\nI saw your LinkedIn post about the Android developer position and I'm very interested in this opportunity. I have experience with [Your Experience] and would love to discuss how I can contribute to your team.\n\nLooking forward to connecting!\n\n[Your Name]",
  highlightColor: "#D3E4FD",
  enabled: true
};

// Initialize settings
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.get('hunterSettings', (data) => {
    if (!data.hunterSettings) {
      chrome.storage.sync.set({ hunterSettings: defaultSettings });
    }
  });
});

// Listen for messages from content script or popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getSettings") {
    chrome.storage.sync.get('hunterSettings', (data) => {
      sendResponse({ settings: data.hunterSettings || defaultSettings });
    });
    return true; // Keep the message channel open for async response
  }
  
  if (request.action === "saveSettings") {
    chrome.storage.sync.set({ hunterSettings: request.settings }, () => {
      sendResponse({ success: true });
    });
    return true;
  }
});
