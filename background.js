// background.js
// Author:
// Author URI: https://
// Author Github URI: https://www.github.com/
// Project Repository URI: https://github.com/
// Description: Handles all the browser level activities (e.g. tab management, etc.)
// License: MIT

// Background script for Mentor AI

chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    chrome.storage.local.set({
      autoActivate: true,
      darkTheme: true,
    });

    chrome.tabs.create({
      url: 'popup.html'
    });
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'checkApiKey') {
    chrome.storage.local.get(['geminiApiKey'], (result) => {
      sendResponse({ hasApiKey: !!result.geminiApiKey });
    });
    return true;
  }
  
  if (message.action === 'openOptions') {
    chrome.runtime.openOptionsPage();
  }
});

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'openStudyBuddy',
    title: 'Ask DSA Study Buddy',
    contexts: ['page'],
    documentUrlPatterns: [
      'https://maang.in/problems/*',
      'https://leetcode.com/*',
      'https://codeforces.com/*',
      'https://www.hackerrank.com/*',
      'https://www.geeksforgeeks.org/*',
      'https://www.interviewbit.com/*',
      'https://www.codingninjas.com/*'
    ]
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === 'openStudyBuddy') {
    chrome.tabs.sendMessage(tab.id, { action: 'openStudyBuddy' });
  }
});

let activeSessions = {};

chrome.runtime.onMessage.addListener((message, sender) => {
  if (!sender.tab) return;
  
  const tabId = sender.tab.id;
  
  if (message.action === 'sessionStarted') {
    activeSessions[tabId] = {
      startTime: Date.now(),
      url: sender.tab.url
    };
  }
  
  if (message.action === 'sessionEnded' && activeSessions[tabId]) {
    const session = activeSessions[tabId];
    const duration = (Date.now() - session.startTime) / 1000;
    
    console.log(`Session ended after ${duration}s on ${session.url}`);
    
    delete activeSessions[tabId];
  }
});

chrome.tabs.onRemoved.addListener((tabId) => {
  if (activeSessions[tabId]) {
    delete activeSessions[tabId];
  }
});