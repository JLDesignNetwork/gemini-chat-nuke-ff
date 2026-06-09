# Changelog

All notable changes to this project will be documented in this file.

## [1.2.0] - 2026-06-09
### Added
- Multi-language localization support (`_locales/en` and `_locales/es`).
- Strict URL hostname parsing for defense against injection spoofing.
- Cross-platform support for `package.sh` (macOS and Linux compatability).

### Changed
- Refactored DOM observation from `MutationObserver` back to a strict `setInterval` poller to ensure checkboxes reliably inject despite Gemini's complex Web Component SPA hydration quirks.
- Resolved race conditions in the bulk deletion modal sequence using asynchronous `waitForElement` logic.
- Cleaned up redundant `activeTab` permissions and cleared Firefox validation warnings by stripping out Chrome-specific `version_name` tags.
- Optimized the extension bundle size by replacing the massive source logo with precisely-scaled native WebExtension icons (`16px`, `32px`, `48px`, `96px`, `128px`).

## [1.1-beta] - 2026-06-08
- Created `archives/` directory structure for local packaging.
- Added `package.sh` to automate archiving and enforce `manifest.json` versioning checks.
- Updated `manifest.json` to full modern Firefox MV3 standards, adding `short_name`, `version_name`, `author`, `action` config, and bumping `strict_min_version` to `152.0`.
- Added standard GitHub repository files (`README.md`, `LICENSE`, `CHANGELOG.md`, `.gitignore`).

## [1.0] - Initial Unlisted Approval Release
### Added
- Core background injection scripting.
- Bulk delete UI elements and automation logic.
