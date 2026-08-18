# Contributing to Gemini Chat Nuke (Firefox)

Thank you for contributing to **Gemini Chat Nuke**! Please review the guidelines below.

---

## 1. Extension Invariants

1. **Defensive DOM Selectors:** Gemini's DOM updates frequently; never assume classes or IDs remain fixed without fallback checks.
2. **Deterministic Tests:** Ensure all DOM automation and MutationObserver callbacks are covered by tests in `__tests__/`.
3. **Generational Task Tracking:** All work items must be recorded in `.dev/2606/backlog.json`.
4. **GVS Versioning:** All release tags adhere strictly to GVS format (`[YYMM].[SUBVERSION].[REVISION]-[TAG]`).
