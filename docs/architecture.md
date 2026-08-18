# JLDN Gemini Chat Nuke — WebExtension Architecture

> **Document:** `docs/architecture.md`  
> **Author:** Jeff Langdon (JL Design Network)  
> **Generation:** `2606`  

---

## 1. Extension Topology & Execution Lifecycle

Gemini Chat Nuke operates via content script injection into `https://gemini.google.com/*`:

```
                       GEMINI CHAT NUKE LIFECYCLE
  ┌──────────────────────────────────────────────────────────────────┐
  │ background.js / content_script.js                                │
  │   ├── 1. DOM Injection & Checkbox Placement                      │
  │   │       ├── Listens to DOM changes via MutationObserver        │
  │   │       └── Injects custom checkbox element on each chat item  │
  │   ├── 2. Control Bar Rendering                                   │
  │   │       ├── Dynamically renders "Nuke", "Select", "Deselect"   │
  │   │       └── Tracks state of selected conversations             │
  │   └── 3. Automated Deletion Pipeline                             │
  │           ├── Simulates click on chat action trigger             │
  │           ├── Finds and confirms the "Delete" modal dialogue     │
  │           └── Iterates asynchronously with safety delays         │
  └──────────────────────────────────────────────────────────────────┘
```

1. **MutationObserver:** Observes DOM updates in the Gemini sidebar to reliably inject checkboxes even as dynamic SPAs load additional chat history.
2. **Batch Queue Controller:** Coordinates sequential click dispatches with configurable throttling to prevent race conditions or rate limits.
