
// Content script that runs on LinkedIn pages

// Global variables
let hunterSettings = null;
let observer = null;
const processedPosts = new Set();

// Initialize extension
function initHunter() {
  chrome.runtime.sendMessage({ action: "getSettings" }, (response) => {
    hunterSettings = response.settings;
    
    if (hunterSettings.enabled) {
      // Start observing the page for new posts
      startObserver();
      
      // Process existing posts
      processExistingPosts();
    }
  });
}

// Process posts that are already on the page
function processExistingPosts() {
  const feedItems = document.querySelectorAll('.feed-shared-update-v2');
  
  feedItems.forEach(post => {
    if (!processedPosts.has(post.id) && post.id) {
      processPost(post);
    }
  });
}

// Start mutation observer to detect new posts
function startObserver() {
  // If an observer is already running, disconnect it
  if (observer) {
    observer.disconnect();
  }
  
  // Create a new observer
  observer = new MutationObserver((mutations) => {
    mutations.forEach(mutation => {
      if (mutation.addedNodes && mutation.addedNodes.length > 0) {
        for (let node of mutation.addedNodes) {
          if (node.nodeType === Node.ELEMENT_NODE) {
            // Check if the added node is a post or contains posts
            const posts = node.classList && node.classList.contains('feed-shared-update-v2') 
              ? [node] 
              : node.querySelectorAll('.feed-shared-update-v2');
              
            posts.forEach(post => {
              if (post.id && !processedPosts.has(post.id)) {
                processPost(post);
              }
            });
          }
        }
      }
    });
  });
  
  // Start observing
  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
}

// Process a single post
function processPost(post) {
  if (!post.id) {
    post.id = 'android-hunter-' + Math.random().toString(36).substr(2, 9);
  }
  
  // Mark as processed
  processedPosts.add(post.id);
  
  // Get post text content
  const postContent = post.querySelector('.feed-shared-update-v2__description')?.textContent || '';
  const comments = Array.from(post.querySelectorAll('.comments-comment-item__main-content')).map(el => el.textContent).join(' ');
  const allText = postContent + ' ' + comments;
  
  // Check if post matches our criteria
  if (isRelevantPost(allText)) {
    // Highlight the post
    highlightPost(post);
    
    // Extract email addresses
    const emails = extractEmails(allText);
    
    if (emails.length > 0) {
      // Add email action buttons
      addEmailActions(post, emails[0]);
    }
  }
}

// Check if post contains relevant keywords
function isRelevantPost(text) {
  const lowerText = text.toLowerCase();
  
  // Check if the text contains any keywords related to Android development
  const hasAndroidKeyword = hunterSettings.keywords.some(keyword => 
    lowerText.includes(keyword.toLowerCase())
  );
  
  // Check if the text contains any hiring-related terms
  const hasHiringTerm = hunterSettings.hiringTerms.some(term => 
    lowerText.includes(term.toLowerCase())
  );
  
  return hasAndroidKeyword && hasHiringTerm;
}

// Extract email addresses from text
function extractEmails(text) {
  const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
  return text.match(emailRegex) || [];
}

// Highlight post with custom styling
function highlightPost(post) {
  post.classList.add('android-hunter-highlighted');
  post.style.borderColor = hunterSettings.highlightColor;
  post.style.backgroundColor = hunterSettings.highlightColor + '33'; // Add 20% opacity
}

// Add email action UI to the post
function addEmailActions(post, email) {
  // Check if actions are already added
  if (post.querySelector('.android-hunter-actions')) {
    return;
  }
  
  // Create actions container
  const actionsContainer = document.createElement('div');
  actionsContainer.className = 'android-hunter-actions';
  
  // Create email button
  const emailButton = document.createElement('button');
  emailButton.className = 'android-hunter-email-btn';
  emailButton.textContent = 'Send Email';
  emailButton.addEventListener('click', () => {
    const mailtoUrl = `mailto:${email}?subject=Regarding Android Developer Position&body=${encodeURIComponent(hunterSettings.emailTemplate)}`;
    window.open(mailtoUrl);
  });
  
  // Create copy button
  const copyButton = document.createElement('button');
  copyButton.className = 'android-hunter-copy-btn';
  copyButton.textContent = 'Copy Email + Template';
  copyButton.addEventListener('click', () => {
    const textToCopy = `${email}\n\n${hunterSettings.emailTemplate}`;
    navigator.clipboard.writeText(textToCopy).then(() => {
      // Show success message
      copyButton.textContent = 'Copied!';
      setTimeout(() => {
        copyButton.textContent = 'Copy Email + Template';
      }, 2000);
    });
  });
  
  // Create email preview
  const emailPreview = document.createElement('div');
  emailPreview.className = 'android-hunter-email-preview';
  emailPreview.textContent = email;
  
  // Add elements to container
  actionsContainer.appendChild(emailPreview);
  actionsContainer.appendChild(emailButton);
  actionsContainer.appendChild(copyButton);
  
  // Add container to post
  post.appendChild(actionsContainer);
}

// Listen for messages from background script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "settingsUpdated") {
    // Reload settings and reprocess
    chrome.runtime.sendMessage({ action: "getSettings" }, (response) => {
      hunterSettings = response.settings;
      
      // Clear processed posts set to reprocess all
      processedPosts.clear();
      
      // Remove existing highlights and actions
      document.querySelectorAll('.android-hunter-highlighted').forEach(post => {
        post.classList.remove('android-hunter-highlighted');
        post.style.borderColor = '';
        post.style.backgroundColor = '';
        
        const actions = post.querySelector('.android-hunter-actions');
        if (actions) {
          actions.remove();
        }
      });
      
      if (hunterSettings.enabled) {
        // Start observing again
        startObserver();
        
        // Reprocess existing posts
        processExistingPosts();
      } else if (observer) {
        // Disconnect observer if extension is disabled
        observer.disconnect();
      }
    });
  }
});

// Initialize when page loads
window.addEventListener('load', initHunter);

// Also run when navigating between LinkedIn pages without a full reload
let lastUrl = location.href; 
new MutationObserver(() => {
  const url = location.href;
  if (url !== lastUrl) {
    lastUrl = url;
    setTimeout(() => {
      processedPosts.clear();
      initHunter();
    }, 1000);
  }
}).observe(document, {subtree: true, childList: true});

// Initialize immediately for faster response
initHunter();
