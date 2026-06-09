# Changelog

All notable changes to this project will be documented in this file.

## [1.3.0] - 2026-06-09
### Added
- **Control Panel UI**: Replaced the floating "Nuke" button with a dedicated, professional "Gemini Chat Nuke" control panel injected natively above the "Recents" sidebar section.
- **"Select Visible" Button**: A new action that instantly selects all loaded chat items in the virtual list.
- **"Deselect All" Button**: A dynamic action (appears when multiple chats are selected) to clear all checkboxes and the selection state.
- **Localization Updates**: Added translations for the new Control Panel buttons across all 8 supported languages.

### Fixed
- Addressed an Angular race-condition where the Control Panel would inject at the top of the sidebar if the "Recents" section had not finished lazy-loading.

## [1.2.2] - 2026-06-09
### Added
- Integrated Jest and JSDOM automated testing architecture to verify DOM injection and extension stability.
- Restructured `background.js` to support CommonJS module exporting for isolated local testing without a browser environment.


## [1.2.1] - 2026-06-09
### Added
- Massive localization expansion natively supporting 8 global languages (English, Spanish, French, German, Portuguese, Italian, Japanese, Chinese).
- Generated localized README documentation across all 8 supported languages, hosted cleanly in a dedicated `docs/` directory to prevent bundle bloat.
- Upgraded the localization core to use array-based synonym matching to bulletproof the automation against regional dialect changes in Google's UI.
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
