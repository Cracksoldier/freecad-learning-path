# FreeCAD Learning Path

A structured, self-paced learning path for [FreeCAD 1.1+](https://www.freecad.org/) — from complete beginner to expert. No login, no install, no server required.

**[→ Open the Learning Path](https://cracksoldier.github.io/freecad-learning-path/app.html)**

---

## What's included

| | |
|---|---|
| **27 lessons** across 4 skill levels | **8 challenges** (mini + capstone per level) |
| Per-lesson notes | Progress export / import (JSON) |
| Resume bookmark | Live keyword search |
| Dark / light theme | Keyboard navigation |

### Curriculum

| Level | Lessons | Topics |
|---|---|---|
| **Beginner** | 5 | Installation, interface, Sketcher, Pad & Pocket, first bracket model |
| **Intermediate** | 9 | Assembly, TechDraw, parametric design, Topology Naming Problem, App::Link, Draft, Mesh & 3D print prep |
| **Advanced** | 8 | FEM analysis, CAM/G-code, Part Booleans, Macros, Sheet Metal addon, Rendering, Arch/BIM |
| **Expert** | 5 | Python API, FeaturePython objects, custom workbench development, Git workflows, contributing to FreeCAD |

Each lesson has objectives, curated wiki resources, and numbered exercises. Each level ends with a mini challenge and a capstone project.

---

## Usage

### Open directly in a browser

```
git clone https://github.com/Cracksoldier/freecad-learning-path.git
# Then open index.html (landing page) or app.html (app) in any browser
```

No server needed — all features including progress tracking and font rendering work under `file://`.

### Deploy to GitHub Pages

Push the `main` branch. GitHub Pages serves `index.html` from the repo root. The app is at `<your-pages-url>/app.html`.

---

## Features

**Progress tracking** — two animated progress bars (lessons and challenges) stored in `localStorage`. Progress survives page reloads.

**Per-lesson notes** — a freeform textarea in every lesson modal. Notes are shown as a badge on the lesson card.

**Export / import** — download your progress as a JSON file and restore it on any device.

**Resume bookmark** — pin any lesson to the top of the page for instant access.

**Search** — filter all 27 lessons by keyword, combined with the level filter.

**Keyboard shortcuts** — press `?` to see all shortcuts. `←` / `→` navigate between open lessons.

---

## File structure

```
freecad-learning-path/
├── index.html               ← Landing page (GitHub Pages entry point)
├── app.html                 ← Learning path app
├── favicon.svg
├── assets/
│   ├── css/style.css        ← App styles
│   ├── js/
│   │   ├── data.js          ← All lesson & challenge content
│   │   └── app.js           ← App logic
│   └── fonts/               ← Self-hosted Inter + JetBrains Mono (woff2)
└── download-fonts.ps1       ← Re-fetch fonts if needed
```

No build step. No npm. No external dependencies at runtime.

---

## Adding lessons

1. Add a lesson object to the appropriate level array in `assets/js/data.js` following the existing schema (`id`, `levelId`, `num`, `title`, `description`, `duration`, `objectives[]`, `resources[]`, `exercises[]`).
2. Update the three hardcoded lesson counts in `index.html` — search for `<!-- UPDATE` to find them.

---

## License

MIT
