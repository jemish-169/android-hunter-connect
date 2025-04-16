
// Popup script for LinkedIn Android Hunter

// DOM elements
const enabledToggle = document.getElementById('enabled-toggle');
const tabs = document.querySelectorAll('.tab');
const tabContents = document.querySelectorAll('.tab-content');
const keywordsContainer = document.getElementById('keywords-container');
const hiringTermsContainer = document.getElementById('hiring-terms-container');
const keywordInput = document.getElementById('keyword-input');
const hiringTermInput = document.getElementById('hiring-term-input');
const addKeywordBtn = document.getElementById('add-keyword-btn');
const addHiringTermBtn = document.getElementById('add-hiring-term-btn');
const emailTemplate = document.getElementById('email-template');
const colorOptions = document.querySelectorAll('.color-option');
const saveBtn = document.getElementById('save-btn');

// Current settings
let currentSettings = null;

// Load settings when popup opens
function loadSettings() {
  chrome.runtime.sendMessage({ action: "getSettings" }, (response) => {
    currentSettings = response.settings;
    
    // Update UI with current settings
    enabledToggle.checked = currentSettings.enabled;
    emailTemplate.value = currentSettings.emailTemplate;
    
    // Update keywords tags
    updateTagsContainer(keywordsContainer, currentSettings.keywords, 'keyword');
    
    // Update hiring terms tags
    updateTagsContainer(hiringTermsContainer, currentSettings.hiringTerms, 'hiring-term');
    
    // Update selected color
    colorOptions.forEach(option => {
      const color = option.getAttribute('data-color');
      if (color === currentSettings.highlightColor) {
        option.classList.add('selected');
      } else {
        option.classList.remove('selected');
      }
    });
  });
}

// Update tags container
function updateTagsContainer(container, items, type) {
  // Clear container
  container.innerHTML = '';
  
  // Add tags
  items.forEach(item => {
    const tag = document.createElement('div');
    tag.className = 'tag';
    tag.innerHTML = `
      <span>${item}</span>
      <span class="remove" data-value="${item}" data-type="${type}">×</span>
    `;
    container.appendChild(tag);
  });
}

// Add new item to list
function addItem(type, value) {
  if (!value.trim()) return;
  
  if (type === 'keyword') {
    // Check if keyword already exists
    if (!currentSettings.keywords.includes(value)) {
      currentSettings.keywords.push(value);
      updateTagsContainer(keywordsContainer, currentSettings.keywords, 'keyword');
    }
    keywordInput.value = '';
  } else if (type === 'hiring-term') {
    // Check if hiring term already exists
    if (!currentSettings.hiringTerms.includes(value)) {
      currentSettings.hiringTerms.push(value);
      updateTagsContainer(hiringTermsContainer, currentSettings.hiringTerms, 'hiring-term');
    }
    hiringTermInput.value = '';
  }
}

// Remove item from list
function removeItem(type, value) {
  if (type === 'keyword') {
    currentSettings.keywords = currentSettings.keywords.filter(item => item !== value);
    updateTagsContainer(keywordsContainer, currentSettings.keywords, 'keyword');
  } else if (type === 'hiring-term') {
    currentSettings.hiringTerms = currentSettings.hiringTerms.filter(item => item !== value);
    updateTagsContainer(hiringTermsContainer, currentSettings.hiringTerms, 'hiring-term');
  }
}

// Save settings
function saveSettings() {
  // Update template from textarea
  currentSettings.emailTemplate = emailTemplate.value;
  
  // Update enabled state
  currentSettings.enabled = enabledToggle.checked;
  
  // Save settings
  chrome.runtime.sendMessage({ 
    action: "saveSettings", 
    settings: currentSettings 
  }, (response) => {
    if (response.success) {
      saveBtn.textContent = 'Saved!';
      setTimeout(() => {
        saveBtn.textContent = 'Save Settings';
      }, 2000);
      
      // Notify content script
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs[0]) {
          chrome.tabs.sendMessage(tabs[0].id, { action: "settingsUpdated" });
        }
      });
    }
  });
}

// Tab switching
tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    // Remove active class from all tabs and contents
    tabs.forEach(t => t.classList.remove('active'));
    tabContents.forEach(c => c.classList.remove('active'));
    
    // Add active class to current tab and content
    tab.classList.add('active');
    const tabName = tab.getAttribute('data-tab');
    document.getElementById(`${tabName}-tab`).classList.add('active');
  });
});

// Event listeners
document.addEventListener('DOMContentLoaded', loadSettings);

addKeywordBtn.addEventListener('click', () => {
  addItem('keyword', keywordInput.value);
});

keywordInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    addItem('keyword', keywordInput.value);
  }
});

addHiringTermBtn.addEventListener('click', () => {
  addItem('hiring-term', hiringTermInput.value);
});

hiringTermInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    addItem('hiring-term', hiringTermInput.value);
  }
});

document.addEventListener('click', (e) => {
  if (e.target.classList.contains('remove')) {
    const type = e.target.getAttribute('data-type');
    const value = e.target.getAttribute('data-value');
    removeItem(type, value);
  }
});

colorOptions.forEach(option => {
  option.addEventListener('click', () => {
    // Remove selected class from all options
    colorOptions.forEach(o => o.classList.remove('selected'));
    
    // Add selected class to clicked option
    option.classList.add('selected');
    
    // Update settings
    currentSettings.highlightColor = option.getAttribute('data-color');
  });
});

saveBtn.addEventListener('click', saveSettings);
