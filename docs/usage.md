# JLDN Gemini Chat Nuke — Usage & Installation Guide

> **Document:** `docs/usage.md`  
> **Author:** Jeff Langdon (JL Design Network)  

---

## 1. Installation in Firefox

### Loading as Temporary Add-on (Development)
1. Open Firefox and navigate to `about:debugging#/runtime/this-firefox`.
2. Click **"Load Temporary Add-on..."**.
3. Select the `manifest.json` file inside this repository.
4. The extension will activate immediately for all `https://gemini.google.com/*` tabs.

---

## 2. Using Bulk Deletion

1. Navigate to [Gemini](https://gemini.google.com).
2. Look at your conversation list in the left sidebar: checkboxes will appear next to each chat.
3. Select one or more chats, or click **"Select Visible"** in the top action bar.
4. Click the red **"Nuke (X)"** button.
5. The extension will sequentially confirm and remove the selected conversations.
