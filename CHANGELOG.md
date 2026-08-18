# Changelog - JLDN Gemini Chat Nuke (Firefox)

All notable changes to the **Gemini Chat Nuke** Firefox WebExtension will be documented in this file.

The format is based on [Keep a Changelog 1.1.0](https://keepachangelog.com/en/1.1.0/),
and this project adheres to the [JLDN Generational Versioning Schema (GVS)](https://github.com/JLDesignNetwork/Generational-Versioning-Schema).

## [2606.2.0-s] - 2026-08-18

### Added
- **In-Repo Documentation Wiki (`docs/`)**: Established version-controlled documentation wiki (`docs/index.md`, `docs/architecture.md`, `docs/usage.md`, `docs/locales.md`) while preserving localized README translations (DE, ES, FR, IT, JA, PT-BR, ZH-CN).
- **Generational Development Hub (`.dev/`)**: Established root `.dev/` generational hub containing `ROADMAP.md`, `backlog.json`, `2606/backlog.json`, and `2606/ideas.json`.
- **GitHub Governance Suite**: Scaffolded `.github/FUNDING.yml`, `.github/SECURITY.md` (contact `jldesignnetwork@icloud.com`), `.github/CONTRIBUTING.md`, `.github/CODE_OF_CONDUCT.md`, `.github/PULL_REQUEST_TEMPLATE.md`, `.github/copilot-instructions.md`, structured `.github/ISSUE_TEMPLATE/` forms, and automated CI workflows (`ci.yml`, `codeql.yml`).

### Changed
- **Supply-Chain Hardening**: Configured `pnpm-workspace.yaml` overrides and upgraded Jest toolchain to resolve 100% of supply-chain vulnerabilities.
- **Package Metadata**: Standardized package naming `@jldn/gemini-chat-nuke-ff`, Manifest v3 versioning `2606.2.0`, and GVS versioning `2606.2.0-s`.

## [2606.1.0-s] - 2026-06-09

### Added
- Initial genesis release: Dynamic MutationObserver DOM injection, bulk chat selection, multi-language i18n support, and automated confirmation dialogue handling.
