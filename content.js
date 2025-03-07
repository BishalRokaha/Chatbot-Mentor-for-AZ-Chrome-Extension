function initializeStudyAssistant() {
  const assistantWrapper = document.createElement('div');
  assistantWrapper.className = 'dsa-study-assistant';
  assistantWrapper.style.cssText = `
    position: fixed;
    bottom: 25px;
    left: 25px;
    z-index: 9999;
    font-family: 'Poppins', 'Segoe UI', Tahoma, sans-serif;
  `;

  const launchButton = document.createElement('button');
  launchButton.className = 'assistant-launch-button';
  launchButton.innerHTML = '<span>👨‍💻</span> Mentor AI';
  launchButton.style.cssText = `
    background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
    color: #ffffff;
    border: none;
    border-radius: 24px;
    padding: 12px 22px;
    cursor: pointer;
    font-size: 15px;
    font-weight: 600;
    box-shadow: 0 4px 12px rgba(29, 78, 216, 0.25);
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    display: flex;
    align-items: center;
    gap: 8px;
  `;
  
  launchButton.addEventListener('mouseover', () => {
    launchButton.style.transform = 'translateY(-2px)';
    launchButton.style.boxShadow = '0 6px 16px rgba(29, 78, 216, 0.3)';
  });
  
  launchButton.addEventListener('mouseout', () => {
    launchButton.style.transform = 'translateY(0)';
    launchButton.style.boxShadow = '0 4px 12px rgba(29, 78, 216, 0.25)';
  });
  
  const chatInterface = document.createElement('div');
  chatInterface.className = 'assistant-interface';
  chatInterface.style.cssText = `
    display: none;
    position: absolute;
    bottom: 70px;
    left: 0;
    width: 360px;
    height: 480px;
    background-color: #111827;
    border-radius: 14px;
    box-shadow: 0 8px 30px rgba(0,0,0,0.5);
    flex-direction: column;
    overflow: hidden;
    color: #f3f4f6;
    border: 1px solid #374151;
  `;

  const interfaceHeader = document.createElement('div');
  interfaceHeader.className = 'assistant-header';
  interfaceHeader.style.cssText = `
    background: linear-gradient(90deg, #1e3a8a 0%, #2563eb 100%);
    color: white;
    padding: 14px 18px;
    font-weight: 600;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #3b82f6;
  `;
  
  const headerTitle = document.createElement('div');
  headerTitle.innerHTML = '<span style="margin-right: 8px;">👨‍💻</span> Mentor AI';
  headerTitle.style.cssText = `
    display: flex;
    align-items: center;
    font-size: 15px;
  `;
  
  const dismissButton = document.createElement('button');
  dismissButton.innerHTML = '&times;';
  dismissButton.style.cssText = `
    background: none;
    border: none;
    color: white;
    font-size: 20px;
    cursor: pointer;
    height: 28px;
    width: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    transition: background 0.2s ease;
  `;
  
  dismissButton.addEventListener('mouseover', () => {
    dismissButton.style.background = 'rgba(255, 255, 255, 0.1)';
  });
  
  dismissButton.addEventListener('mouseout', () => {
    dismissButton.style.background = 'none';
  });
  
  const conversationArea = document.createElement('div');
  conversationArea.className = 'assistant-conversation';
  conversationArea.style.cssText = `
    flex: 1;
    padding: 16px;
    overflow-y: auto;
    background-color: #1f2937;
    scrollbar-width: thin;
    scrollbar-color: #4b5563 #1f2937;
  `;
  
  conversationArea.addEventListener('scroll', function() {
    this.style.scrollBehavior = 'smooth';
  });

  const inputSection = document.createElement('div');
  inputSection.className = 'assistant-input-section';
  inputSection.style.cssText = `
    display: flex;
    padding: 14px;
    border-top: 1px solid #374151;
    background-color: #111827;
  `;

  const userInput = document.createElement('input');
  userInput.className = 'assistant-user-input';
  userInput.placeholder = 'Ask about your coding problem...';
  userInput.style.cssText = `
    flex: 1;
    padding: 12px 16px;
    border: 1px solid #4b5563;
    border-radius: 24px;
    margin-right: 10px;
    font-size: 14px;
    background-color: #1f2937;
    color: #f3f4f6;
    transition: border-color 0.3s ease;
  `;
  
  userInput.addEventListener('focus', () => {
    userInput.style.borderColor = '#3b82f6';
    userInput.style.outline = 'none';
  });
  
  userInput.addEventListener('blur', () => {
    userInput.style.borderColor = '#4b5563';
  });

  const submitButton = document.createElement('button');
  submitButton.className = 'assistant-submit-button';
  submitButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>';
  submitButton.style.cssText = `
    background-color: #3b82f6;
    color: white;
    border: none;
    border-radius: 50%;
    width: 42px;
    height: 42px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
  `;
  
  submitButton.addEventListener('mouseover', () => {
    submitButton.style.backgroundColor = '#2563eb';
    submitButton.style.transform = 'scale(1.05)';
  });
  
  submitButton.addEventListener('mouseout', () => {
    submitButton.style.backgroundColor = '#3b82f6';
    submitButton.style.transform = 'scale(1)';
  });

  interfaceHeader.appendChild(headerTitle);
  interfaceHeader.appendChild(dismissButton);
  inputSection.appendChild(userInput);
  inputSection.appendChild(submitButton);
  
  chatInterface.appendChild(interfaceHeader);
  chatInterface.appendChild(conversationArea);
  chatInterface.appendChild(inputSection);
  
  assistantWrapper.appendChild(launchButton);
  assistantWrapper.appendChild(chatInterface);
  
  document.body.appendChild(assistantWrapper);

  displayMessage('assistant', 'Hello! I\'m Your Mentor AI, your mentor for approaching DSA Problems. How can I assist you with this problem?', conversationArea);

  launchButton.addEventListener('click', () => {
    if (chatInterface.style.display === 'none') {
      chatInterface.style.display = 'flex';
      chatInterface.style.animation = 'fadeIn 0.3s ease forwards';
    } else {
      chatInterface.style.animation = 'fadeOut 0.3s ease forwards';
      setTimeout(() => {
        chatInterface.style.display = 'none';
      }, 300);
    }
  });

  dismissButton.addEventListener('click', () => {
    chatInterface.style.animation = 'fadeOut 0.3s ease forwards';
    setTimeout(() => {
      chatInterface.style.display = 'none';
    }, 300);
  });

  function transmitQuery() {
    const query = userInput.value.trim();
    if (query === '') return;
    
    displayMessage('user', query, conversationArea);
    userInput.value = '';
    
    const problemContext = extractProblemContext();
    processQueryWithAI(query, problemContext, conversationArea);
  }

  submitButton.addEventListener('click', transmitQuery);
  userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') transmitQuery();
  });

  const style = document.createElement('style');
  style.textContent = `
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes fadeOut {
      from { opacity: 1; transform: translateY(0); }
      to { opacity: 0; transform: translateY(10px); }
    }
    .message-animation {
      animation: messageAppear 0.3s ease forwards;
    }
    @keyframes messageAppear {
      from { opacity: 0; transform: translateY(5px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `;
  document.head.appendChild(style);

  return assistantWrapper;
}

function displayMessage(sender, content, conversationElement) {
  const messageElement = document.createElement('div');
  messageElement.className = `message message-${sender} message-animation`;
  
  const senderStyle = sender === 'user' ?
    'background-color: #3b82f6; color: white; margin-left: auto;' :
    'background-color: #374151; color: #f3f4f6;';
  
  messageElement.style.cssText = `
    margin-bottom: 12px;
    padding: 12px 16px;
    border-radius: 14px;
    max-width: 85%;
    ${senderStyle}
    line-height: 1.5;
    font-size: 14px;
    white-space: pre-wrap;
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    position: relative;
    word-wrap: break-word;
    opacity: 0;
  `;
  
  messageElement.textContent = content;
  conversationElement.appendChild(messageElement);
  
  conversationElement.scrollTop = conversationElement.scrollHeight;
  
  setTimeout(() => {
    messageElement.style.opacity = '1';
  }, 10);
}

function extractProblemContext() {
  let problemTitle = '';
  let problemDesc = '';
  let codeSnippet = '';
  
  const titleElements = document.querySelectorAll('.coding_desc_container_RD00M h1, .coding_desc_container_RD00M h2, .problem-statement h2, .problem-title');
  if (titleElements.length > 0) {
    problemTitle = titleElements[0].textContent.trim();
  } else {
    problemTitle = document.title.replace(' - LeetCode', '').replace(' - HackerRank', '').replace(' - MAANG.in', '').trim();
  }
  
  const descContainers = document.querySelectorAll('.coding_desc_container_RD00M, .problem-statement, .problem-description');
  if (descContainers.length > 0) {
    const descContainer = descContainers[0].cloneNode(true);

    const codeSegments = descContainer.querySelectorAll('pre, code, .CodeMirror');
    codeSegments.forEach(segment => segment.remove());
    
    problemDesc = descContainer.textContent.trim();
  }
  
  if (window.monaco && window.monaco.editor) {
    const editorInstances = window.monaco.editor.getEditors();
    if (editorInstances && editorInstances.length > 0) {
      codeSnippet = editorInstances[0].getValue();
    }
  }
  
  if (!codeSnippet) {
    const codeMirror = document.querySelector('.CodeMirror');
    if (codeMirror && codeMirror.CodeMirror) {
      codeSnippet = codeMirror.CodeMirror.getValue();
    } 
    else if (window.ace && window.ace.edit) {
      const aceEditorsCollection = document.querySelectorAll('.ace_editor');
      if (aceEditorsCollection.length > 0) {
        const editorInstanceId = aceEditorsCollection[0].id;
        if (editorInstanceId) {
          const aceEditor = window.ace.edit(editorInstanceId);
          if (aceEditor) {
            codeSnippet = aceEditor.getValue();
          }
        }
      }
    } 
    else {
      const codeElements = document.querySelectorAll('textarea.code-editor, pre.code-editor, .editor-content textarea');
      if (codeElements.length > 0) {
        codeSnippet = codeElements[0].value || codeElements[0].textContent;
      }
    }
  }

  let programmingLang = 'unknown';
  const languageIndicators = document.querySelectorAll('.coding_nav_bg_HMkIn nav button, .language-selector button, .select-language .active');
  for (const indicator of languageIndicators) {
    if (indicator.classList.contains('active') || indicator.getAttribute('aria-selected') === 'true') {
      programmingLang = indicator.textContent.trim().toLowerCase();
      break;
    }
  }
  
  let difficultyLevel = '';
  const difficultyIndicators = document.querySelectorAll('.difficulty-label, .difficulty, .problem-difficulty');
  if (difficultyIndicators.length > 0) {
    difficultyLevel = difficultyIndicators[0].textContent.trim();
  }

  return {
    title: problemTitle,
    description: problemDesc,
    code: codeSnippet,
    language: programmingLang,
    difficulty: difficultyLevel,
    url: window.location.href
  };
}

async function processQueryWithAI(userQuery, problemContext, conversationElement) {
  try {
    const apiKeyStorage = await chrome.storage.local.get("geminiApiKey");
    const API_KEY = apiKeyStorage.geminiApiKey;
    
    if (!API_KEY) {
      displayMessage('assistant', 'I need an API key to help you. Please set your Gemini API key in the extension settings.', conversationElement);
      return;
    }

    function locateUserIdentifier() {
      for (let i = 0; i < localStorage.length; i++) {
        const storageKey = localStorage.key(i);
        if (storageKey && storageKey.startsWith("course")) {
          return storageKey;
        }
      }
      return null;
    }
    
    const courseKey = locateUserIdentifier();

    function parseUserId(keyString) {
      const match = keyString ? keyString.match(/_(\d+)_/) : null;
      return match ? match[1] : null;
    }
    
    const userId = parseUserId(courseKey);

    function parseProblemId(urlString) {
      const match = urlString.match(/-(\d+)$/);
      return match ? match[1] : null;
    }
    
    const currentUrl = window.location.href;
    const problemId = parseProblemId(currentUrl);

    let currentLanguage = "unknown";
    const languageSelector = document.querySelector(".ant-select-selection-item");
    if (languageSelector) {
      currentLanguage = languageSelector.innerText.trim();
    }

    const codeStorageKey = "course_" + userId + "_" + problemId + '_' + currentLanguage;
    const userCode = localStorage.getItem(codeStorageKey);
    
    const contextStorageKey = "Context_" + problemContext.title;
    const contextData = await chrome.storage.local.get(contextStorageKey);
    const priorContext = contextData[contextStorageKey] || { question: "", answer: "" };
    
    displayMessage('assistant', 'Let me analyze this question...', conversationElement);
    
    const aiPrompt = `
      Previous conversation with user: ${JSON.stringify(priorContext) || ""}
      
      PROBLEM DETAILS:
      Title: ${problemContext.title || "Unknown problem"}
      URL: ${problemContext.url}
      Difficulty: ${problemContext.difficulty || "Unknown"}
      Language: ${problemContext.language || "Unknown"}
      
      Description: 
      ${problemContext.description || "No description available"}
      
      Current Boilerplate Code:
      \`\`\`${problemContext.language || ""}
      ${problemContext.code || "No code available"}
      \`\`\`
      
      USER QUESTION: ${userQuery}
      
      User's Current Implementation:
      \`\`\`${problemContext.language || ""}
      ${userCode || "No implementation available"}
      \`\`\`

      Your name is Mentor AI, You are a knowledgeable and supportive Data Structures and Algorithms (DSA) mentor and problem-solving assistant. Your goal is to guide the user toward understanding and solving coding problems rather than simply providing direct answers.

      When presented with a problem, follow this structured approach:

      Do not provide code unless the user explicitly requests it. If they do, only provide solutions in C++.
      Keep responses simple and structured, avoiding unnecessary formatting like bold text or headers.
      Limit discussions strictly to DSA and coding-related topics.
      Start by analyzing the user's question and offering hints instead of direct answers.
      Encourage logical thinking by asking guiding questions to help break down the problem.
      If the user has made an attempt or requests further guidance, walk them through the problem-solving steps.
      Only provide the code when explicitly asked.
      
      You are a patient and friendly mentor, resembling a human teacher rather than an automated bot. Keep your explanations clear, conversational, and engaging, ensuring that users learn by thinking through problems rather than relying on direct answers. Foster an interactive and supportive learning environment that motivates users to develop strong problem-solving skills.

      Keep the conversation natural and interactive, and always encourage the user to think and learn.
    `;
    
    const requestPayload = {
      contents: [{
        parts: [{
          text: aiPrompt
        }]
      }],
      generationConfig: {
        temperature: 0.2,
        maxOutputTokens: 4096,
        topP: 0.8,
        topK: 40
      }
    };
    
    const apiResponse = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyDDtzrUjYr-O6r5cWJB-bbpWLihiy8IWBY', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestPayload)
    });
    
    if (!apiResponse.ok) {
      throw new Error(`API request failed with status ${apiResponse.status}`);
    }
    
    const responseData = await apiResponse.json();
    
    const processingMessages = conversationElement.querySelectorAll('.message-assistant');
    for (const msg of processingMessages) {
      if (msg.textContent === 'Let me analyze this question...') {
        conversationElement.removeChild(msg);
        break;
      }
    }
    
    if (responseData.candidates && 
        responseData.candidates.length > 0 && 
        responseData.candidates[0].content && 
        responseData.candidates[0].content.parts && 
        responseData.candidates[0].content.parts.length > 0) {
      
      const aiResponse = responseData.candidates[0].content.parts[0].text;
      displayMessage('assistant', aiResponse, conversationElement);

      await chrome.storage.local.set({ 
        [contextStorageKey]: {
          question: (priorContext.question || "") + "\n\nUser: " + userQuery,
          answer: (priorContext.answer || "") + "\n\nAI: " + aiResponse
        } 
      });
    
    } else {
      throw new Error('Unexpected API response format');
    }
    
  } catch (error) {
    console.error('Error processing with Gemini:', error);
    
    const processingMessages = conversationElement.querySelectorAll('.message-assistant');
    for (const msg of processingMessages) {
      if (msg.textContent === 'Let me analyze this question...' || msg.textContent === 'Thinking...') {
        conversationElement.removeChild(msg);
        break;
      }
    }
    
    displayMessage('assistant', 'Sorry, I ran into a technical issue. Please try again in a moment. Error: ' + error.message, conversationElement);
  }
}

function setupChangeMonitor() {
  const observer = new MutationObserver((mutations, observer) => {
    if (!document.querySelector('.dsa-study-assistant')) {
      initializeStudyAssistant();
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });
}

function isCompatibleSite() {
  const supportedDomains = [
    "https://maang.in/problems/",
    "https://leetcode.com/",
    "https://codeforces.com/",
    "https://www.hackerrank.com/",
    "https://www.geeksforgeeks.org/",
    "https://www.interviewbit.com/",
    "https://www.codingninjas.com/"
  ];

  return supportedDomains.some(domain => window.location.href.startsWith(domain));
}

window.addEventListener("load", () => {
  if (isCompatibleSite()) {
      initializeStudyAssistant();
      setupChangeMonitor();
      console.log("DSA Study Buddy Extension activated");
  }
});

if (document.readyState === "complete" || document.readyState === "interactive") {
  if (isCompatibleSite()) {
      initializeStudyAssistant();
      setupChangeMonitor();
  }
}