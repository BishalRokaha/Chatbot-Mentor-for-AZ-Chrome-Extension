document.addEventListener('DOMContentLoaded', function() {
  const apiKeyInput = document.getElementById('apiKey');
  const toggleVisibilityBtn = document.getElementById('toggleVisibility');
  const eyeIcon = document.getElementById('eyeIcon');
  const eyeOffIcon = document.getElementById('eyeOffIcon');
  const saveBtn = document.getElementById('saveBtn');
  const resetBtn = document.getElementById('resetBtn');
  const statusMessage = document.getElementById('statusMessage');
  const statusText = document.getElementById('statusText');
  const autoActivateCheckbox = document.getElementById('autoActivate');
  const darkThemeCheckbox = document.getElementById('darkTheme');

  loadSettings();

  toggleVisibilityBtn.addEventListener('click', function() {
    if (apiKeyInput.type === 'password') {
      apiKeyInput.type = 'text';
      eyeIcon.classList.add('hidden');
      eyeOffIcon.classList.remove('hidden');
    } else {
      apiKeyInput.type = 'password';
      eyeIcon.classList.remove('hidden');
      eyeOffIcon.classList.add('hidden');
    }
    apiKeyInput.focus();
  });

  saveBtn.addEventListener('click', function() {
    const apiKey = apiKeyInput.value.trim();
    const autoActivate = autoActivateCheckbox.checked;
    const darkTheme = darkThemeCheckbox.checked;
    
    if (apiKey === '') {
      showStatus('Please enter your Gemini API key', 'error');
      return;
    }
    
    chrome.storage.local.set({
      geminiApiKey: apiKey,
      autoActivate: autoActivate,
      darkTheme: darkTheme
    }, function() {
      showStatus('Settings saved successfully!', 'success');
      
      applyTheme(darkTheme);
    });
  });

  resetBtn.addEventListener('click', function() {
    if (confirm('Are you sure you want to reset all settings?')) {
      chrome.storage.local.remove(['geminiApiKey', 'autoActivate', 'darkTheme'], function() {
        apiKeyInput.value = '';
        autoActivateCheckbox.checked = true;
        darkThemeCheckbox.checked = false;
        
        showStatus('Settings have been reset', 'success');
        
        applyTheme(false);
      });
    }
  });
  
  darkThemeCheckbox.addEventListener('change', function() {
    applyTheme(this.checked);
  });

  function loadSettings() {
    chrome.storage.local.get(['geminiApiKey', 'autoActivate', 'darkTheme'], function(data) {
      if (data.geminiApiKey) {
        apiKeyInput.value = data.geminiApiKey;
      }
      
      if (data.hasOwnProperty('autoActivate')) {
        autoActivateCheckbox.checked = data.autoActivate;
      }
      
      if (data.hasOwnProperty('darkTheme')) {
        darkThemeCheckbox.checked = data.darkTheme;
        applyTheme(data.darkTheme);
      }
    });
  }

  function showStatus(message, type) {
    statusMessage.className = 'status-message';
    statusMessage.classList.add(type);
    statusMessage.classList.remove('hidden');
    statusText.textContent = message;
    
    setTimeout(function() {
      statusMessage.classList.add('hidden');
    }, 3000);
  }
  
  function applyTheme(isDark) {
    if (isDark) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }
  
  apiKeyInput.addEventListener('blur', function() {
    const key = this.value.trim();
    if (key && key.length < 10) {
      showStatus('API key seems too short', 'error');
    }
  });
  
  document.addEventListener('keydown', function(e) {
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
      e.preventDefault();
      saveBtn.click();
    }
  });
});

const addVersionInfo = () => {
  const manifest = chrome.runtime.getManifest();
  const footer = document.querySelector('footer');
  
  if (footer && manifest.version) {
    const versionInfo = document.createElement('div');
    versionInfo.className = 'version-info';
    versionInfo.textContent = `Version ${manifest.version}`;
    versionInfo.style.cssText = 'text-align: center; margin-top: 10px; font-size: 12px; color: var(--text-secondary);';
    footer.appendChild(versionInfo);
  }
};

window.addEventListener('load', addVersionInfo);