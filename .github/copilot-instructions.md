# AI Agent & Copilot Development Guidelines

> [!IMPORTANT]
> **Authoritative Rules:** Universal JLDN rules apply. Workspace-specific guidelines:
> - **Local Rules:** `.agents/AGENTS.md`
> - **Generational Hub:** `.dev/` (Active Gen: `2606`)

## Key Invariants
1. **DOM Robustness:** Always use defensive null checks for dynamic elements in `background.js`.
2. **i18n Localization:** Keep all UI copy mapped to `_locales/`.
3. **Generational Backlog:** Keep `.dev/2606/backlog.json` synchronized on every task resolution.
