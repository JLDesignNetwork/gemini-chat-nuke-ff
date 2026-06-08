chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url && tab.url.includes('gemini.google.com')) {
    chrome.scripting.executeScript({
      target: { tabId: tabId },
      func: injectedPayload
    });
  }
});

function injectedPayload() {
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

  // Continuous Polling
  setInterval(() => {
    // Button Placement
    const checkedBoxes = document.querySelectorAll('.chat-cleaner-check:checked');
    let btn = document.getElementById('gemini-bulk-delete-btn');

    if (checkedBoxes.length > 0) {
      if (!btn) {
        const container = document.querySelector('.top-action-list-scrollable, .top-action-list');
        if (container) {
          btn = document.createElement('button');
          btn.id = 'gemini-bulk-delete-btn';
          btn.className = 'gemini-bulk-delete-btn';
          btn.innerText = 'Nuke Selected Chats';
          
          btn.onclick = async () => {
            btn.innerText = 'Nuking...';
            btn.disabled = true;
            const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));
            const checkboxesToProcess = document.querySelectorAll('.chat-cleaner-check:checked');

            for (const cb of checkboxesToProcess) {
              const row = cb.closest('gem-nav-list-item[data-test-id="conversation"]');
              if (!row) continue;

              // 1. Click actions menu
              const actionMenuBtn = row.querySelector('[data-test-id="actions-menu-button"]');
              if (actionMenuBtn) {
                actionMenuBtn.click();
                await wait(400);

                // 2. Click Delete from dropdown
                const menuItems = document.querySelectorAll('menu-item, [role="menuitem"]');
                const deleteMenuItem = Array.from(menuItems).find(el => 
                  el.textContent.trim().toLowerCase() === 'delete' || 
                  el.textContent.toLowerCase().includes('delete')
                );
                
                if (deleteMenuItem) {
                  deleteMenuItem.click();
                  await wait(400);

                  // 3. Click final confirmation button in the modal
                  const buttons = document.querySelectorAll('button');
                  const confirmBtn = Array.from(buttons).find(el => 
                    el.textContent.trim().toLowerCase() === 'delete' && 
                    el.offsetParent !== null // Check if visible
                  );
                  
                  if (confirmBtn) {
                    confirmBtn.click();
                  }
                }
              }
              // Wait for DOM to settle before moving to the next item
              await wait(1200);
            }

            // After loop, check routing and redirect/reload to clear state
            if (window.location.pathname !== '/app') {
              window.location.href = '/app';
            } else {
              window.location.reload();
            }
          };

          // Insert at the very top
          container.insertBefore(btn, container.firstChild);
        }
      }
    } else {
      if (btn) {
        btn.remove();
      }
    }

    // Checkbox Placement
    const links = document.querySelectorAll('gem-nav-list-item[data-test-id="conversation"] a');
    links.forEach(link => {
      if (!link.querySelector('.chat-cleaner-check')) {
        const cb = document.createElement('input');
        cb.type = 'checkbox';
        cb.className = 'chat-cleaner-check';
        
        // Prevent clicking the checkbox from opening the chat
        cb.addEventListener('click', (e) => e.stopPropagation());
        
        link.insertBefore(cb, link.firstChild);
      }
    });
  }, 1000);
}
