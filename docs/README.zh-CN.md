<div align="center">
  <img src="../icons/icon128.png" alt="Gemini Chat Nuke Logo" width="128" height="128" />

  # ☢️ Gemini Chat Nuke

  *一个强大的 Firefox 扩展 (MV3)，通过注入用户界面来批量删除您的 Gemini 对话。*

  [![Manifest V3](https://img.shields.io/badge/Manifest-V3-blue.svg?logo=mozilla&logoColor=white)](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions)
  [![Firefox Strict Min Version](https://img.shields.io/badge/Firefox-%E2%89%A5152.0-FF7139.svg?logo=firefox-browser&logoColor=white)](https://www.mozilla.org/en-US/firefox/developer/)
  [![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](../LICENSE)

  ---
</div>

<p align="center">
  🌍 <strong>Languages:</strong>
  <a href="../README.md">English</a> |
  <a href="README.es.md">Español</a> |
  <a href="README.fr.md">Français</a> |
  <a href="README.de.md">Deutsch</a> |
  <a href="README.pt-BR.md">Português</a> |
  <a href="README.it.md">Italiano</a> |
  <a href="README.ja.md">日本語</a> |
  <a href="README.zh-CN.md">简体中文</a>
</p>

## ✨ 功能

- **✅ 内联注入:** 直接在 `gemini.google.com` 上的聊天记录旁注入复选框。
- **💥 批量删除:** 选择多个不需要的聊天记录，一次性将其全部删除。
- **🤖 自动化:** 跳过繁琐的手动确认弹窗，自动为您处理 UI 点击。
- **🌍 全球支持:** 原生支持英语、西班牙语、法语、德语、葡萄牙语、意大利语、日语和中文。
- **🛡️ 可靠的轮询:** 内置弹性 DOM 轮询器，可轻松应对 Gemini 复杂的 SPA 架构。
- **⚡ 优化:** 配备尺寸完美的 WebExtension 原生图标，渲染清晰，体积小巧。

## 🚀 安装（开发）

1. 从 **[GitHub Releases](https://github.com/JLDesignNetwork/gemini-chat-nuke-ff/releases)** 页面下载最新的 `.zip` 文件。
2. 打开 Firefox 并在地址栏中导航至 `about:addons`。
3. 点击右上角的 ⚙️ **齿轮图标**，然后选择 **从文件安装附加组件...**
4. 选择您下载的 `.zip` 压缩包。完成！

## 📦 打包

```bash
./package.sh 1.2.1 beta
```

## 📄 许可证

本项目基于 **[MIT 许可证](../LICENSE)** 开源。
