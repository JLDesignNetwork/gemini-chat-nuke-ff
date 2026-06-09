chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url) {
    try {
      const urlObj = new URL(tab.url);
      if (urlObj.hostname === 'gemini.google.com') {
        const i18nStrings = {
          nukeButtonText: chrome.i18n.getMessage("nukeButtonText"),
          nukingButtonText: chrome.i18n.getMessage("nukingButtonText"),
          deleteActionKeyword: chrome.i18n.getMessage("deleteActionKeyword")
        };
        
        chrome.scripting.executeScript({
          target: { tabId: tabId },
          func: injectedPayload,
          args: [i18nStrings]
        });
      }
    } catch (e) {
      // Ignore invalid URLs
    }
  }
});

function injectedPayload(i18nStrings) {
  // Global state for selected chats (persists across virtual scrolls)
  window.geminiSelectedChats = window.geminiSelectedChats || new Set();
  const selectedChats = window.geminiSelectedChats;

  // Styling
  if (!document.getElementById('gemini-cleaner-style-v2')) {
    const style = document.createElement('style');
    style.id = 'gemini-cleaner-style-v2';
    style.textContent = `
      .gemini-bulk-delete-btn {
        background: red !important;
        color: white !important;
        font-weight: bold;
        padding: 10px;
        border-radius: 6px;
        width: 100%;
        cursor: pointer;
        border: none;
        margin-bottom: 10px;
      }
      .gemini-bulk-delete-btn:hover {
        background: darkred !important;
      }
      .chat-cleaner-check {
        accent-color: red !important;
        transform: scale(1.4);
        margin-right: 12px;
        cursor: pointer;
        z-index: 999;
      }
      gem-nav-list-item[data-test-id="conversation"] a {
        display: flex;
        align-items: center;
      }
    `;
    document.head.appendChild(style);
  }

  // Utility to wait for elements
  const waitForElement = (selector, parent = document, timeout = 5000) => {
    return new Promise((resolve) => {
      if (parent.querySelector(selector)) {
        return resolve(parent.querySelector(selector));
      }

      const observer = new MutationObserver(() => {
        if (parent.querySelector(selector)) {
          observer.disconnect();
          resolve(parent.querySelector(selector));
        }
      });

      observer.observe(parent, {
        childList: true,
        subtree: true
      });

      setTimeout(() => {
        observer.disconnect();
        resolve(null);
      }, timeout);
    });
  };

  const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));
  const randomDelay = (min, max) => wait(Math.floor(Math.random() * (max - min + 1)) + min);

  const processDOM = () => {
    // 1. Checkbox Placement & State Restoration
    const links = document.querySelectorAll('gem-nav-list-item[data-test-id="conversation"] a');
    links.forEach(link => {
      const href = link.getAttribute('href');
      let cb = link.querySelector('.chat-cleaner-check');
      
      if (!cb) {
        cb = document.createElement('input');
        cb.type = 'checkbox';
        cb.className = 'chat-cleaner-check';
        
        // Restore state if it was previously selected and scrolled out of view
        if (href && selectedChats.has(href)) {
          cb.checked = true;
        }

        // Prevent clicking the checkbox from opening the chat
        cb.addEventListener('click', (e) => {
          e.stopPropagation();
          if (cb.checked) {
            selectedChats.add(href);
          } else {
            selectedChats.delete(href);
          }
          // Force button update logic immediately
          updateNukeButton();
        });
        
        link.insertBefore(cb, link.firstChild);
      }
    });

    updateNukeButton();
  };

  // Run DOM processing loop robustly
  const uiPoller = setInterval(processDOM, 1000);

  function updateNukeButton() {
    let btn = document.getElementById('gemini-bulk-delete-btn');
    
    if (selectedChats.size > 0) {
      if (!btn) {
        const container = document.querySelector('.top-action-list-scrollable, .top-action-list');
        if (container) {
          btn = document.createElement('button');
          btn.id = 'gemini-bulk-delete-btn';
          btn.className = 'gemini-bulk-delete-btn';
          btn.innerText = (i18nStrings.nukeButtonText || 'Nuke Selected Chats') + ` (${selectedChats.size})`;
          
          btn.onclick = async () => {
            btn.innerText = i18nStrings.nukingButtonText || 'Nuking...';
            btn.disabled = true;
            
            const keyword = (i18nStrings.deleteActionKeyword || 'delete').toLowerCase();

            // Stop the UI poller during rapid deletion to prevent UI flickering/interference
            clearInterval(uiPoller);

            let scrollAttempts = 0;
            const maxScrollAttempts = 20;

            while (selectedChats.size > 0 && scrollAttempts < maxScrollAttempts) {
              // Find visible links that are in our Set
              const links = document.querySelectorAll('gem-nav-list-item[data-test-id="conversation"] a');
              let foundVisible = false;

              for (const link of Array.from(links)) {
                const href = link.getAttribute('href');
                if (selectedChats.has(href)) {
                  foundVisible = true;
                  
                  // Ensure it's in view
                  link.scrollIntoView({ behavior: 'instant', block: 'center' });
                  await wait(200); // Wait for potential lazy loading of the row

                  const row = link.closest('gem-nav-list-item[data-test-id="conversation"]');
                  if (!row) continue;

                  const actionMenuBtn = row.querySelector('[data-test-id="actions-menu-button"]');
                  if (actionMenuBtn) {
                    actionMenuBtn.click();
                    
                    const menuItemsList = await waitForElement('menu-item, [role="menuitem"]', document, 2000);
                    if (menuItemsList) {
                      const menuItems = document.querySelectorAll('menu-item, [role="menuitem"]');
                      const deleteMenuItem = Array.from(menuItems).find(el => 
                        el.textContent.trim().toLowerCase() === keyword || 
                        el.textContent.toLowerCase().includes(keyword)
                      );
                      
                      if (deleteMenuItem) {
                        deleteMenuItem.click();
                        
                        await wait(200); 
                        const buttons = document.querySelectorAll('button');
                        const confirmBtn = Array.from(buttons).find(el => 
                          (el.textContent.trim().toLowerCase() === keyword || 
                           el.textContent.toLowerCase().includes(keyword)) && 
                          el.offsetParent !== null 
                        );
                        
                        if (confirmBtn) {
                          confirmBtn.click();
                          
                          // Successfully deleted, remove from Set
                          selectedChats.delete(href);
                          
                          // Rate Limiting Cooldown: Random delay between 300ms - 700ms
                          await randomDelay(300, 700);
                        }
                      }
                    }
                  }
                }
              }

              // If we didn't find any visible items but the Set is not empty, scroll down
              if (!foundVisible && selectedChats.size > 0) {
                // Scroll down by 500px to force virtual list to render next batch
                const scrollable = document.querySelector('.top-action-list-scrollable') || window;
                if (scrollable.scrollBy) {
                  scrollable.scrollBy(0, 500);
                } else if (scrollable.scrollTop !== undefined) {
                  scrollable.scrollTop += 500;
                }
                
                await wait(1000); // Wait for the network/react to render the new nodes
                scrollAttempts++;
              }
            }

            // Cleanup & Reload
            selectedChats.clear();
            if (window.location.pathname !== '/app') {
              window.location.href = '/app';
            } else {
              window.location.reload();
            }
          };

          container.insertBefore(btn, container.firstChild);
        }
      } else {
        // Update text with count
        btn.innerText = (i18nStrings.nukeButtonText || 'Nuke Selected Chats') + ` (${selectedChats.size})`;
      }
    } else {
      if (btn) btn.remove();
    }
  }
}
