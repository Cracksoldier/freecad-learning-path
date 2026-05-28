# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

Two-page static site — a landing page and a full learning-path app. No build step, no npm, no server required. Both pages work via `file://` and on GitHub Pages.

## File structure

```
freecad-learning-path/
├── index.html               — Landing page (entry point for GitHub Pages)
├── app.html                 — The learning path app (was index.html)
├── favicon.svg              — Orange gear icon
├── assets/
│   ├── css/
│   │   └── style.css        — App-only CSS, including @font-face declarations
│   ├── js/
│   │   ├── data.js          — const DATA (all lesson + challenge content)
│   │   └── app.js           — STATE, all functions, DOMContentLoaded init
│   └── fonts/               — self-hosted woff2 files (run download-fonts.ps1 once)
├── download-fonts.ps1       — one-time script to fetch font files from Google Fonts
└── CLAUDE.md
```

**`index.html`** is the landing page — self-contained with inline CSS, no dependency on `assets/css/style.css`. It uses the same design tokens (colours, fonts) and `assets/fonts/` woff2 files as the app for visual consistency. The theme toggle writes to the same localStorage key (`freecad-lp-v1`) so theme preference is shared between the two pages.

**`app.html`** is the full learning-path app — previously `index.html`.

## Getting fonts

Font files are committed to the repo (`assets/fonts/*.woff2`) so the app works offline immediately after cloning. To refresh them (e.g. after a version bump), run:

```
! .\download-fonts.ps1
```

The script defaults to the local proxy `http://localhost:3129`. Pass a different proxy or omit it if a direct connection works:

```
! .\download-fonts.ps1 -Proxy ""
! .\download-fonts.ps1 -Proxy http://other-proxy:8080
```

## Development workflow

**View the app:** open `index.html` in any browser via `file://` — all features work without a server.

**Verify changes:** open in browser and exercise the golden paths manually:
- Mark a lesson complete → progress bar animates, card turns green
- Undo complete → card returns to in-progress (not locked)
- Click a level filter while a modal is open → modal closes before re-render
- Reload → progress persists from localStorage
- Toggle theme → no flash on reload (inline FOUC script in `<head>`)
- Open DevTools → Network tab → confirm no requests to fonts.googleapis.com

There are no automated tests, linter, or build pipeline.

## Architecture

### Script loading order

`data.js` is loaded before `app.js` via plain `<script src>` tags (not ES modules). `DATA` is a global `const` at the top level of `data.js`. `app.js` reads `DATA` at runtime. This ordering must be preserved and both files must avoid `import`/`export` — ES modules are CORS-blocked under `file://`.

### Data layer (`assets/js/data.js`)

`const DATA` — single hardcoded constant. Holds all 4 levels, 20 lessons, and 8 challenges. Each lesson has `id`, `levelId`, `num`, `title`, `description`, `objectives[]`, `resources[]`, `exercises[]`. Each challenge has `id`, `type`, `title`, `description`, `requirements[]`, `hints[]`, `resources[]`. Do not add logic here.

### State (`assets/js/app.js`, top of file)

`const STATE` — single mutable object with Sets: `completedLessons`, `openedLessons`, `completedChallenges`, and a plain object `checkedRequirements` (`{ challengeId: Set<reqIndex> }`). Persisted to localStorage under key `"freecad-lp-v1"` as JSON (Sets serialized to arrays). `loadState` / `saveState` wrap all localStorage access in try/catch.

### Render model

**Single source of truth → full re-render.** `renderLearningPath()` wipes `#learningPath.innerHTML` and rebuilds all cards from `STATE` + `DATA`. `renderProgressBars()` updates the two progress bars and the congrats banner. `renderAll()` calls both.

Do **not** re-introduce partial DOM surgery (replacing individual cards via `replaceWith`, or patching attributes in place). Always mutate `STATE`, call `saveState()`, then call the appropriate render function.

### Key functions (`assets/js/app.js`)

| Function | Role |
|---|---|
| `buildLessonCard(lesson)` | Returns HTML string for a lesson card |
| `buildChallengeCard(challenge, levelId)` | Returns HTML string for a challenge card |
| `openModal(lessonId)` | Populates + shows the lesson modal, marks lesson in-progress |
| `toggleLessonComplete(lessonId)` | Adds/removes from `completedLessons`; restores `openedLessons` on undo |
| `completeChallenge(challengeId)` | Adds to `completedChallenges`, calls `renderProgressBars` + `renderLearningPath` |
| `toggleRequirement(challengeId, i)` | Toggles a checklist item, calls `renderLearningPath` |
| `syncCompleteButton(lessonId)` | Single source of truth for the modal complete-button label/class |
| `filterByLevel(levelId)` | Sets `STATE.activeLevel`, closes modal if open, re-renders |
| `safeHref(url)` | Sanitises URLs for `href` — blocks `javascript:` and `data:` URIs |
| `escHtml(str)` | Escapes HTML text content |

### Event handling

Lesson card clicks and challenge interactions use **event delegation** on `#learningPath` — do not attach per-card listeners. Header controls, modal buttons, and the keyboard handler (`Escape`, `ArrowLeft`, `ArrowRight`, `Tab`) are attached once in `attachStaticListeners()`.

The `Tab` key handler implements a **focus trap** inside the modal: wraps from last to first focusable element and vice versa.

### Theme

A tiny blocking `<script>` in `<head>` reads localStorage and sets `data-theme` before first paint to avoid FOUC. The CSS uses `[data-theme="dark"]` as an override block on top of `:root` light defaults. `applyTheme()` sets both the attribute and the toggle button icon.

### CSS (`assets/css/style.css`)

Design tokens are CSS custom properties on `:root` (light) overridden by `[data-theme="dark"]`. Level accent colors follow the pattern `--level-{id}` (`beginner`=green, `intermediate`=blue, `advanced`=purple, `expert`=red) and are applied via `.level-pill--{id}` and `.challenge-card--{id}` classes.

Font faces are declared at the top of `style.css` with relative paths to `../fonts/*.woff2`.

## GitHub Pages deployment

Push `main` — GitHub Pages serves `index.html` from the repo root automatically. Relative paths (`assets/css/style.css`, `assets/js/data.js`, `assets/js/app.js`, `assets/fonts/*.woff2`) resolve correctly both on GitHub Pages and via `file://`.
