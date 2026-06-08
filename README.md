<div align="center">
  <img src="icon.png" alt="Gemini Chat Nuke Logo" width="128" height="128" />

  # ☢️ Gemini Chat Nuke

  *A powerful Firefox WebExtension (MV3) that injects a seamless UI to bulk delete your Gemini conversations.*

  [![Manifest V3](https://img.shields.io/badge/Manifest-V3-blue.svg?logo=mozilla&logoColor=white)](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions)
  [![Firefox Strict Min Version](https://img.shields.io/badge/Firefox-%E2%89%A5152.0-FF7139.svg?logo=firefox-browser&logoColor=white)](https://www.mozilla.org/en-US/firefox/developer/)
  [![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

  ---
</div>

## ✨ Features

- **✅ Inline Injection:** Seamlessly injects checkboxes next to your chat history directly on `gemini.google.com`.
- **💥 Bulk Nuke:** Select multiple unwanted chats to instantly "nuke" them all at once.
- **🤖 Automated Deletion:** Skips the tedious manual confirmation pop-ups and sequentially handles the UI clicks for you.

## 🚀 Installation (Development)

1. Download the latest `.zip` release from the `archives/` folder (or via the GitHub Releases page).
2. Open Firefox and navigate to `about:addons` in your URL bar.
3. Click the ⚙️ **Gear icon** in the top right and select **Install Add-on From File...**
4. Select your downloaded `.zip` archive. You're ready to nuke!

## 📦 Packaging & Development

If you are modifying the extension locally, you can easily package a new version with the included build script:

```bash
./package.sh <version> <stability>
```

**Example:**
```bash
./package.sh 1.2 beta
```
> **Note:** This script automatically verifies the `manifest.json` version parity and outputs a clean, upload-ready `.zip` to the `archives/` directory (excluding all GitHub repository files).

## 📄 License

This project is open-source and distributed under the **[MIT License](LICENSE)**.
