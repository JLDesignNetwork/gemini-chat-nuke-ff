global.chrome = {
  tabs: {
    onUpdated: {
      addListener: jest.fn()
    }
  },
  i18n: {
    getMessage: jest.fn()
  },
  scripting: {
    executeScript: jest.fn()
  }
};

const { injectedPayload } = require('../background.js');

describe('Gemini Chat Nuke DOM Injection', () => {
  beforeEach(() => {
    // Reset the document DOM before each test
    document.body.innerHTML = `
      <div class="top-action-list-scrollable"></div>
      <gem-nav-list-item data-test-id="conversation">
        <a href="/app/chat/123">Chat 123</a>
      </gem-nav-list-item>
      <gem-nav-list-item data-test-id="conversation">
        <a href="/app/chat/456">Chat 456</a>
      </gem-nav-list-item>
    `;

    // Clear global state if any
    if (window.geminiSelectedChats) {
      window.geminiSelectedChats.clear();
    }
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  test('should inject checkboxes into chat links', () => {
    jest.useFakeTimers();

    const mockI18n = {
      nukeButtonText: 'Delete',
      nukingButtonText: 'Deleting...',
      deleteActionKeyword: 'delete'
    };

    // Run the payload
    injectedPayload(mockI18n);

    // Fast-forward 1.5 seconds for the setInterval poller to trigger
    jest.advanceTimersByTime(1500);

    // Check if checkboxes were injected
    const checkboxes = document.querySelectorAll('.chat-cleaner-check');
    expect(checkboxes.length).toBe(2);

    // Check if the style tag was injected
    const styleTag = document.getElementById('gemini-cleaner-style-v2');
    expect(styleTag).not.toBeNull();
  });

  test('should render Nuke button when a checkbox is clicked', () => {
    jest.useFakeTimers();

    const mockI18n = {
      nukeButtonText: 'Delete',
      nukingButtonText: 'Deleting...',
      deleteActionKeyword: 'delete'
    };

    injectedPayload(mockI18n);
    jest.advanceTimersByTime(1500);

    // Click the first checkbox
    const checkbox = document.querySelector('.chat-cleaner-check');
    
    // Simulate checking the box and firing the click event
    checkbox.checked = true;
    checkbox.dispatchEvent(new Event('click'));

    // Fast forward for UI update
    jest.advanceTimersByTime(1500);

    // Verify Nuke Button appears
    const nukeBtn = document.getElementById('gemini-bulk-delete-btn');
    expect(nukeBtn).not.toBeNull();
    expect(nukeBtn.innerText).toBe('Delete (1)');
    
    // Verify the set tracks the href
    expect(window.geminiSelectedChats.has('/app/chat/123')).toBe(true);
  });
  test('should select all visible chats when Select Visible is clicked', () => {
    jest.useFakeTimers();
    const mockI18n = {
      nukeButtonText: 'Delete',
      nukingButtonText: 'Deleting...',
      deleteActionKeyword: 'delete',
      selectAllButtonText: 'Select Visible',
      deselectAllButtonText: 'Deselect All'
    };
    injectedPayload(mockI18n);
    jest.advanceTimersByTime(1500);

    // Click 'Select Visible'
    const selectBtn = document.querySelector('.gemini-nuke-btn-secondary');
    expect(selectBtn.innerText).toBe('Select Visible');
    selectBtn.click();
    
    // Fast forward for UI update
    jest.advanceTimersByTime(1500);

    // Verify all checkboxes are checked
    const checkboxes = document.querySelectorAll('.chat-cleaner-check');
    checkboxes.forEach(cb => expect(cb.checked).toBe(true));

    // Verify Nuke Button appears with correct count
    const nukeBtn = document.getElementById('gemini-bulk-delete-btn');
    expect(nukeBtn).not.toBeNull();
    expect(nukeBtn.innerText).toBe('Delete (2)');
    expect(window.geminiSelectedChats.size).toBe(2);
  });

  test('should deselect all chats when Deselect All is clicked', () => {
    jest.useFakeTimers();
    const mockI18n = {
      nukeButtonText: 'Delete',
      nukingButtonText: 'Deleting...',
      deleteActionKeyword: 'delete',
      selectAllButtonText: 'Select Visible',
      deselectAllButtonText: 'Deselect All'
    };
    injectedPayload(mockI18n);
    jest.advanceTimersByTime(1500);

    // Manually check both boxes
    const checkboxes = document.querySelectorAll('.chat-cleaner-check');
    checkboxes.forEach(cb => {
      cb.checked = true;
      cb.dispatchEvent(new Event('click'));
    });
    jest.advanceTimersByTime(1500);

    // Verify Deselect All button is visible
    const deselectBtn = document.getElementById('gemini-nuke-deselect-btn');
    expect(deselectBtn).not.toBeNull();
    expect(deselectBtn.style.display).toBe('block');

    // Click Deselect All
    deselectBtn.click();
    jest.advanceTimersByTime(1500);

    // Verify all checkboxes are unchecked and set is empty
    const updatedCheckboxes = document.querySelectorAll('.chat-cleaner-check');
    updatedCheckboxes.forEach(cb => expect(cb.checked).toBe(false));
    expect(window.geminiSelectedChats.size).toBe(0);
    
    // Verify Nuke Button is hidden
    const nukeBtn = document.getElementById('gemini-bulk-delete-btn');
    expect(nukeBtn.style.display).toBe('none');
  });
});
