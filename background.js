/**
 * @since 1.3.0
 * @version 1.3.0
 */
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
      .gemini-nuke-control-panel {
        background: rgba(255, 0, 0, 0.05);
        border: 1px solid rgba(255, 0, 0, 0.2);
        border-radius: 8px;
        padding: 12px;
        margin-bottom: 16px;
        display: flex;
        flex-direction: column;
        gap: 10px;
      }
      .gemini-nuke-panel-header {
        font-weight: bold;
        font-size: 13px;
        display: flex;
        align-items: center;
        gap: 6px;
        color: var(--gem-sys-color--on-surface, inherit);
      }
      .gemini-nuke-actions-row {
        display: flex;
        gap: 8px;
        width: 100%;
      }
      .gemini-nuke-btn-secondary {
        flex: 1;
        background: transparent;
        border: 1px solid rgba(150, 150, 150, 0.4);
        color: var(--gem-sys-color--on-surface, inherit);
        padding: 6px 0;
        border-radius: 4px;
        cursor: pointer;
        font-size: 12px;
        transition: background 0.2s;
      }
      .gemini-nuke-btn-secondary:hover {
        background: rgba(150, 150, 150, 0.1);
      }
      .gemini-bulk-delete-btn {
        background: red !important;
        color: white !important;
        font-weight: bold;
        padding: 10px;
        border-radius: 6px;
        width: 100%;
        cursor: pointer;
        border: none;
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
    const container = document.querySelector('.top-action-list-scrollable, .top-action-list');
    if (!container) return;

    let panelWrapper = document.getElementById('gemini-nuke-control-panel-wrapper');
    
    if (!panelWrapper) {
      panelWrapper = document.createElement('div');
      panelWrapper.id = 'gemini-nuke-control-panel-wrapper';
      
      const panel = document.createElement('div');
      panel.className = 'gemini-nuke-control-panel';
      
      const header = document.createElement('div');
      header.className = 'gemini-nuke-panel-header';
      header.innerText = '☢️ Gemini Chat Nuke';
      panel.appendChild(header);

      const actionRow = document.createElement('div');
      actionRow.className = 'gemini-nuke-actions-row';
      
      const selectVisibleBtn = document.createElement('button');
      selectVisibleBtn.className = 'gemini-nuke-btn-secondary';
      selectVisibleBtn.innerText = i18nStrings.selectAllButtonText || 'Select Visible';
      selectVisibleBtn.onclick = () => {
        const checkboxes = document.querySelectorAll('.chat-cleaner-check');
        checkboxes.forEach(cb => {
          if (!cb.checked) {
            cb.checked = true;
            // dispatching click so that the Set is updated via its own listener
            cb.dispatchEvent(new Event('click'));
          }
        });
      };
      
      const deselectAllBtn = document.createElement('button');
      deselectAllBtn.id = 'gemini-nuke-deselect-btn';
      deselectAllBtn.className = 'gemini-nuke-btn-secondary';
      deselectAllBtn.innerText = i18nStrings.deselectAllButtonText || 'Deselect All';
      deselectAllBtn.style.display = 'none';
      deselectAllBtn.onclick = () => {
        const checkboxes = document.querySelectorAll('.chat-cleaner-check');
        checkboxes.forEach(cb => {
          if (cb.checked) {
            cb.checked = false;
            cb.dispatchEvent(new Event('click'));
          }
        });
        // Clear any off-screen selections
        selectedChats.clear();
        updateNukeButton();
      };
      
      actionRow.appendChild(selectVisibleBtn);
      actionRow.appendChild(deselectAllBtn);
      panel.appendChild(actionRow);

      const nukeBtn = document.createElement('button');
      nukeBtn.id = 'gemini-bulk-delete-btn';
      nukeBtn.className = 'gemini-bulk-delete-btn';
      nukeBtn.style.display = 'none';
      
      nukeBtn.onclick = async () => {
        nukeBtn.innerText = i18nStrings.nukingButtonText || 'Nuking...';
        nukeBtn.disabled = true;
        selectVisibleBtn.disabled = true;
        deselectAllBtn.disabled = true;
        
        clearInterval(uiPoller);

        let scrollAttempts = 0;
        const maxScrollAttempts = 20;

        while (selectedChats.size > 0 && scrollAttempts < maxScrollAttempts) {
          const links = document.querySelectorAll('gem-nav-list-item[data-test-id="conversation"] a');
          let foundVisible = false;

          for (const link of Array.from(links)) {
            const href = link.getAttribute('href');
            if (selectedChats.has(href)) {
              foundVisible = true;
              link.scrollIntoView({ behavior: 'instant', block: 'center' });
              await wait(200);

              const row = link.closest('gem-nav-list-item[data-test-id="conversation"]');
              if (!row) continue;

              const actionMenuBtn = row.querySelector('[data-test-id="actions-menu-button"]');
              if (actionMenuBtn) {
                actionMenuBtn.click();
                
                const menuItemsList = await waitForElement('menu-item, [role="menuitem"]', document, 2000);
                if (menuItemsList) {
                  const menuItems = document.querySelectorAll('menu-item, [role="menuitem"]');
                  const keywords = (i18nStrings.deleteActionKeyword || 'delete').toLowerCase().split('|');
                  
                  const deleteMenuItem = Array.from(menuItems).find(el => {
                    const text = el.textContent.toLowerCase();
                    return keywords.some(kw => text === kw || text.includes(kw));
                  });
                  
                  if (deleteMenuItem) {
                    deleteMenuItem.click();
                    
                    await wait(200); 
                    const buttons = document.querySelectorAll('button');
                    const confirmBtn = Array.from(buttons).find(el => {
                      const text = el.textContent.toLowerCase();
                      return keywords.some(kw => (text === kw || text.includes(kw))) && el.offsetParent !== null;
                    });
                    
                    if (confirmBtn) {
                      confirmBtn.click();
                      selectedChats.delete(href);
                      await randomDelay(300, 700);
                    }
                  }
                }
              }
            }
          }

          if (!foundVisible && selectedChats.size > 0) {
            const scrollable = document.querySelector('.top-action-list-scrollable') || window;
            if (scrollable.scrollBy) {
              scrollable.scrollBy(0, 500);
            } else if (scrollable.scrollTop !== undefined) {
              scrollable.scrollTop += 500;
            }
            await wait(1000);
            scrollAttempts++;
          }
        }

        selectedChats.clear();
        if (window.location.pathname !== '/app') {
          window.location.href = '/app';
        } else {
          window.location.reload();
        }
      };

      panel.appendChild(nukeBtn);
      panelWrapper.appendChild(panel);
      
      const divider = document.createElement('div');
      divider.className = 'section-divider';
      panelWrapper.appendChild(divider);
    }
    
    // Always enforce the correct DOM position, even if it was injected early before Angular finished loading
    const chatsSection = document.querySelector('expandable-section[data-test-id="chats-expandable-section"]');
    if (chatsSection && chatsSection.parentNode) {
      if (panelWrapper.nextSibling !== chatsSection) {
        chatsSection.parentNode.insertBefore(panelWrapper, chatsSection);
      }
    } else {
      if (panelWrapper.parentNode !== container) {
        container.insertBefore(panelWrapper, container.firstChild);
      }
    }
    
    const deselectBtn = document.getElementById('gemini-nuke-deselect-btn');
    const nukeBtn = document.getElementById('gemini-bulk-delete-btn');
    
    if (deselectBtn) {
      deselectBtn.style.display = selectedChats.size > 1 ? 'block' : 'none';
    }

    if (nukeBtn) {
      if (selectedChats.size > 0) {
        nukeBtn.style.display = 'block';
        nukeBtn.innerText = (i18nStrings.nukeButtonText || 'Nuke Selected Chats') + ` (${selectedChats.size})`;
      } else {
        nukeBtn.style.display = 'none';
      }
    }
  }
}

// Export for Jest testing (only runs in Node/CommonJS environments)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { injectedPayload };
}
