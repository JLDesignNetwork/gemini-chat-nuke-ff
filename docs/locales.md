# JLDN Gemini Chat Nuke — i18n Localization Architecture

> **Document:** `docs/locales.md`  
> **Author:** Jeff Langdon (JL Design Network)  

---

## Supported Locales & Languages

All browser extension UI strings are fully localized under `_locales/`:

| Locale Code | Language | Native Title |
| :--- | :--- | :--- |
| `en` | English (Default) | Gemini Chat Nuke |
| `de` | German | Gemini Chat Nuke |
| `es` | Spanish | Gemini Chat Nuke |
| `fr` | French | Gemini Chat Nuke |
| `it` | Italian | Gemini Chat Nuke |
| `ja` | Japanese | Gemini Chat Nuke |
| `pt_BR` | Portuguese (Brazil) | Gemini Chat Nuke |
| `zh_CN` | Simplified Chinese | Gemini Chat Nuke |

---

## Localization Guidelines

- All messages use `messages.json` key-value pairs formatted to standard WebExtension i18n specs (`chrome.i18n.getMessage` / `browser.i18n.getMessage`).
