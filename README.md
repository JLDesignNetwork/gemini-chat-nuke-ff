<div align="center">
  <img src="icons/icon128.png" alt="Gemini Chat Nuke Logo" width="128" height="128" />

  # ☢️ Gemini Chat Nuke

  *A powerful Firefox WebExtension (MV3) that injects a seamless UI to bulk delete your Gemini conversations.*

  ![Manifest V3](https://img.shields.io/badge/Manifest-V3-blue.svg?style=flat-square&logo=mozilla)
  ![Firefox](https://img.shields.io/badge/Firefox-%E2%89%A5152.0-FF7139.svg?style=flat-square&logo=firefox-browser)
  ![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)
  ![Coverage](https://img.shields.io/badge/Coverage-100%25-brightgreen.svg?style=flat-square)

  ---
</div>

## Table of Contents
- [Features](#-features)
- [Installation (Development)](#-installation-development)
- [Building & Packaging](#-building--packaging)
- [Architecture & Background Context](#-architecture--background-context)
- [Translations](#-translations)
- [Contributing](#-contributing)
- [License](#-license)

---

<p align="center">
  🌍 <strong>Languages:</strong>
  <a href="README.md">English</a> |
  <a href="docs/README.es.md">Español</a> |
  <a href="docs/README.fr.md">Français</a> |
  <a href="docs/README.de.md">Deutsch</a> |
  <a href="docs/README.pt-BR.md">Português</a> |
  <a href="docs/README.it.md">Italiano</a> |
  <a href="docs/README.ja.md">日本語</a> |
  <a href="docs/README.zh-CN.md">简体中文</a>
</p>

## ✨ Features

- **✅ Inline Injection:** Seamlessly injects checkboxes next to your chat history directly on `gemini.google.com`.
- **💥 Bulk Nuke:** Select multiple unwanted chats to instantly "nuke" them all at once.
- **🤖 Automated Deletion:** Skips the tedious manual confirmation pop-ups and sequentially handles the UI clicks for you.
- **🌍 Global Support:** Natively localized for English, Spanish, French, German, Portuguese, Italian, Japanese, and Chinese.
- **🛡️ Bulletproof Polling:** Built with a resilient DOM poller that easily survives Gemini's aggressive Single Page Application routing and Virtual DOM teardowns.
- **⚡ Optimized:** Ships with perfectly sized, native WebExtension icons for crisp rendering and a minimal bundle footprint.

## 🚀 Installation (Development)

1. Download the latest `.zip` release from the **[GitHub Releases](https://github.com/JLDesignNetwork/gemini-chat-nuke-ff/releases)** page.
2. Open Firefox and navigate to `about:addons` in your URL bar.
3. Click the ⚙️ **Gear icon** in the top right and select **Install Add-on From File...**
4. Select your downloaded `.zip` archive. You're ready to nuke!

*(If you are downloading the source code directly instead of a release, you can generate your own `.zip` file using the `package.sh` script instructions below.)*

## 📦 Packaging & Development

If you are modifying the extension locally, you can easily package a new version with the included build script:

```bash
./package.sh <version> <stability>
```

**Example:**
```bash
./package.sh 1.3.0 beta
```
> **Note:** This script automatically verifies the `manifest.json` version parity and outputs a clean, upload-ready `.zip` to the `archives/` directory (excluding all GitHub repository files).

## 📄 License

This project is open-source and distributed under the **[MIT License](LICENSE)**.
