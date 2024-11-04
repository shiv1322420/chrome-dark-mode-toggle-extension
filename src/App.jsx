// src/App.jsx
import React, { useState } from 'react';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';


const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: () => {
        if (!document.documentElement.classList.contains('dark-mode')) {
          document.documentElement.classList.add('dark-mode','dark');
          const style = document.createElement('style');
          style.textContent = `
            .dark-mode {
              filter: invert(1) hue-rotate(180deg);
            }
            img, video {
              filter: invert(1) hue-rotate(180deg);
            }
          `;
          style.id = 'dark-mode-style';
          document.head.appendChild(style);
        } else {
          document.documentElement.classList.remove('dark-mode','dark');
          const style = document.getElementById('dark-mode-style');
          if (style) style.remove();
        }
      }
    });

    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    // <div className="container">
    //   <button onClick={toggleDarkMode} className="toggle-button">
    //     {isDarkMode ? 'Disable Dark Mode' : 'Enable Dark Mode'}
    //   </button>
    // </div>
    <div className="flex items-center justify-center h-24 w-64">
    <span className="mr-2">
      {isDarkMode ? (
        <SunIcon className="h-6 w-6 text-yellow-500" aria-hidden="true" />
      ) : (
        <MoonIcon className="h-6 w-6 text-gray-800" aria-hidden="true" />
      )}
    </span>
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        className="sr-only"
        checked={isDarkMode}
        onChange={toggleDarkMode}
      />
      <div className="w-11 h-6 bg-gray-200 rounded-full shadow-inner"></div>
      <div className={`absolute left-0 top-0 w-6 h-6 bg-white rounded-full shadow transition-transform duration-300 ease-in-out ${isDarkMode ? 'transform translate-x-full bg-gray-800' : ''}`}></div>
    </label>
  </div>
  );
};

export default App;
