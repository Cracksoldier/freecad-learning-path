# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

Two-page static site — a marketing landing page and a full learning-path app. No build step, no npm, no server required. Both pages work via `file://` and on GitHub Pages.

## File structure

```
freecad-learning-path/
├── index.html               — Landing page (GitHub Pages entry point)
├── app.html                 — The learning path app
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

**`index.html`** — landing page, self-contained with inline CSS. Does not import `assets/css/style.css`. Uses the same `assets/fonts/` woff2 files and the same `freecad-lp-v1` localStorage key as the app so theme preference is shared. The GitHub repo URL is declared once as `const REPO_URL` in the inline `<script>` and injected into all `[data-repo-link]` anchors — update only that constant when the repo is renamed.

**`app.html`** — the full app. The gear icon in the header is a `<a href="index.html">` link back to the landing page.

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

**View the landing page:** open `index.html` in a browser.  
**View the app:** open `app.html` in a browser — all features work without a server.

**Verify app changes manually:**
- Mark a lesson complete → progress bar animates, card turns green
- Undo complete → card returns to in-progress (not locked)
- Click level filter while modal is open → modal closes before re-render
- Reload → progress persists from localStorage
- Toggle theme → no flash on reload (inline FOUC script in `<head>`)
- Open DevTools → Network tab → confirm no requests to fonts.googleapis.com

There are no automated tests, linter, or build pipeline.

## App architecture

### Script loading order

`data.js` is loaded before `app.js` via plain `<script src>` tags (not ES modules). `DATA` is a global `const` at the top level of `data.js`. `app.js` reads `DATA` at runtime. This ordering must be preserved; both files must avoid `import`/`export` — ES modules are CORS-blocked under `file://`.

### Data layer (`assets/js/data.js`)

`const DATA` — single hardcoded constant. Holds 4 levels, **27 lessons**, and 8 challenges. Each lesson: `id`, `levelId`, `num`, `title`, `description`, `duration`, `objectives[]`, `resources[]`, `exercises[]`. Each challenge: `id`, `type`, `title`, `description`, `requirements[]`, `hints[]`, `resources[]`. No logic here.

When adding lessons, also update the hardcoded counts in `index.html` — three `<!-- UPDATE ... -->` comments mark every location.

### State (`assets/js/app.js`)

`const STATE` — single mutable object. Fields:

| Field | Type | Persisted |
|---|---|---|
| `theme` | `"dark" \| "light"` | ✓ |
| `activeLevel` | string | ✗ (resets to `"all"` on reload) |
| `searchQuery` | string | ✗ (ephemeral) |
| `completedLessons` | `Set<string>` | ✓ |
| `openedLessons` | `Set<string>` | ✓ |
| `completedChallenges` | `Set<string>` | ✓ |
| `checkedRequirements` | `{ challengeId: Set<number> }` | ✓ |
| `lessonNotes` | `{ lessonId: string }` | ✓ |
| `bookmarkedLessonId` | `string \| null` | ✓ |
| `modalLessonId` | `string \| null` | ✗ |

Persisted fields live in localStorage under key `"freecad-lp-v1"`. `serializeState()` and `hydrateState()` are the single serialization/deserialization paths — add new persisted fields to both functions, and to `resetProgress()`.

### Render model

**Single source of truth → full re-render.** `renderLearningPath()` wipes `#learningPath.innerHTML` and rebuilds all cards from `STATE` + `DATA`. `renderProgressBars()` updates progress bars and the congrats banner. `renderResumeBanner()` shows/hides the bookmark banner. `renderAll()` calls all three.

Do **not** re-introduce partial DOM surgery. Always mutate `STATE`, call `saveState()`, then call the appropriate render function.

### Key functions (`assets/js/app.js`)

| Function | Role |
|---|---|
| `serializeState()` | Converts STATE to a plain JSON-safe object (used by `saveState` and `exportProgress`) |
| `hydrateState(data)` | Populates STATE from a parsed object (used by `loadState` and `importProgress`) |
| `buildLessonCard(lesson)` | Returns HTML string for a lesson card (includes duration, notes badge, search highlight) |
| `buildChallengeCard(challenge, levelId)` | Returns HTML string for a challenge card |
| `openModal(lessonId)` | Populates + shows the lesson modal, marks lesson in-progress, populates notes |
| `closeModal()` | Hides modal, flushes note debounce |
| `toggleLessonComplete(lessonId)` | Adds/removes from `completedLessons`; restores `openedLessons` on undo |
| `completeChallenge(challengeId)` | Adds to `completedChallenges`, re-renders |
| `toggleRequirement(challengeId, i)` | Toggles checklist item, re-renders |
| `syncCompleteButton(lessonId)` | Updates modal complete-button label/class |
| `syncBookmarkButton(lessonId)` | Updates modal bookmark-button icon |
| `setBookmark(lessonId)` | Toggles `bookmarkedLessonId`, saves, re-renders resume banner |
| `renderResumeBanner()` | Shows/hides the pinned-lesson banner at top of page |
| `filterByLevel(levelId)` | Sets `STATE.activeLevel`, closes modal if open, re-renders |
| `filterBySearch(query)` | Sets `STATE.searchQuery`, re-renders learning path |
| `onNoteInput(lessonId, value)` | Debounced (500ms) note save |
| `exportProgress()` | Downloads a JSON backup via Blob URL (deferred revoke) |
| `importProgress(file)` | Reads, validates, hydrates STATE from a JSON file |
| `resetProgress()` | Clears all progress fields including notes and bookmark |
| `openShortcuts() / closeShortcuts()` | Controls the keyboard cheat sheet overlay |
| `safeHref(url)` | Blocks `javascript:` and `data:` URIs |
| `escHtml(str)` | Escapes HTML text content |

### Event handling

Lesson card clicks and challenge interactions use **event delegation** on `#learningPath`. Header controls, modal buttons, import label, and the keyboard handler (`Escape`, `ArrowLeft`, `ArrowRight`, `Tab`, `?`) are attached once in `attachStaticListeners()`.

The `Tab` handler implements a **focus trap** inside the modal (and shortcuts overlay): wraps focus between first and last focusable elements.

### Theme

A tiny blocking `<script>` in `<head>` reads localStorage and sets `data-theme` before first paint (FOUC prevention). Both `app.html` and `index.html` carry this script. `applyTheme()` in the app sets the attribute and button icon. The landing page has its own minimal equivalent in its inline script.

### CSS (`assets/css/style.css`)

App-only styles. Design tokens on `:root` (light), overridden by `[data-theme="dark"]`. Level accent colors: `--level-{id}` → `.level-pill--{id}` and `.challenge-card--{id}`. Font faces at top with relative paths to `../fonts/*.woff2`.

The landing page (`index.html`) has its own inline `<style>` block with a separate token set — changes to `style.css` do not affect it.

## GitHub Pages deployment

Push `main` — GitHub Pages serves `index.html` from the repo root. `app.html` is reachable at `<pages-url>/app.html`. All relative asset paths resolve correctly under both GitHub Pages and `file://`.
