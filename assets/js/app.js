/* App logic. Requires DATA from data.js to be loaded first. */

/* =====================================================================
   STATE
===================================================================== */
const STATE = {
  theme: "dark",
  activeLevel: "all",
  searchQuery: "",          // ephemeral — not persisted
  completedLessons: new Set(),
  openedLessons: new Set(),
  completedChallenges: new Set(),
  checkedRequirements: {},   // { challengeId: Set<reqIndex> }
  lessonNotes: {},           // { lessonId: string }
  bookmarkedLessonId: null,
  modalLessonId: null
};

/* =====================================================================
   LOCALSTORAGE
===================================================================== */
const LS_KEY = "freecad-lp-v1";

/* Single serialization helper — used by both saveState() and exportProgress().
   Adding a new STATE field: update here and nowhere else. */
function serializeState() {
  const checkedReqs = {};
  for (const [k, v] of Object.entries(STATE.checkedRequirements)) {
    checkedReqs[k] = [...v];
  }
  const lessonNotes = {};
  for (const [k, v] of Object.entries(STATE.lessonNotes)) {
    if (typeof k === "string" && typeof v === "string") lessonNotes[k] = v;
  }
  return {
    theme: STATE.theme,
    completedLessons: [...STATE.completedLessons],
    openedLessons: [...STATE.openedLessons],
    completedChallenges: [...STATE.completedChallenges],
    checkedRequirements: checkedReqs,
    lessonNotes,
    bookmarkedLessonId: typeof STATE.bookmarkedLessonId === "string" ? STATE.bookmarkedLessonId : null
  };
}

/* Single hydration helper — used by both loadState() and importProgress().
   Applies field-by-field guards; string-type filter applied to all arrays. */
function hydrateState(data) {
  if (data.theme === "dark" || data.theme === "light") STATE.theme = data.theme;
  if (Array.isArray(data.completedLessons))   STATE.completedLessons   = new Set(data.completedLessons.filter(x => typeof x === "string"));
  if (Array.isArray(data.openedLessons))       STATE.openedLessons      = new Set(data.openedLessons.filter(x => typeof x === "string"));
  if (Array.isArray(data.completedChallenges)) STATE.completedChallenges = new Set(data.completedChallenges.filter(x => typeof x === "string"));
  if (data.checkedRequirements && typeof data.checkedRequirements === "object" && !Array.isArray(data.checkedRequirements)) {
    STATE.checkedRequirements = {};
    for (const [k, v] of Object.entries(data.checkedRequirements)) {
      STATE.checkedRequirements[k] = new Set(Array.isArray(v) ? v : []);
    }
  }
  if (data.lessonNotes && typeof data.lessonNotes === "object" && !Array.isArray(data.lessonNotes)) {
    STATE.lessonNotes = {};
    for (const [k, v] of Object.entries(data.lessonNotes)) {
      if (typeof k === "string" && typeof v === "string") STATE.lessonNotes[k] = v;
    }
  }
  if (typeof data.bookmarkedLessonId === "string" || data.bookmarkedLessonId === null) {
    STATE.bookmarkedLessonId = data.bookmarkedLessonId;
  }
}

function loadState() {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return;
    hydrateState(JSON.parse(raw));
  } catch (e) { /* localStorage unavailable or corrupted — continue with defaults */ }
}

function saveState() {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(serializeState()));
  } catch (e) { /* ignore */ }
}

/* =====================================================================
   THEME
===================================================================== */
function applyTheme(theme) {
  STATE.theme = theme;
  document.documentElement.setAttribute("data-theme", theme);
  const btn = document.getElementById("themeToggle");
  if (btn) btn.textContent = theme === "dark" ? "☀" : "🌙";
}

/* =====================================================================
   COMPUTED TOTALS
===================================================================== */
function getTotals() {
  let totalLessons = 0, totalChallenges = 0;
  for (const level of DATA.levels) {
    totalLessons += level.lessons.length;
    totalChallenges += level.challenges.length;
  }
  return { totalLessons, totalChallenges };
}

function getAllLessons() {
  return DATA.levels.flatMap(l => l.lessons);
}

function findLesson(id) {
  return getAllLessons().find(l => l.id === id) || null;
}

function findAdjacentLesson(currentId) {
  const all = getAllLessons();
  const idx = all.findIndex(l => l.id === currentId);
  if (idx === -1) return { prev: null, next: null };
  return {
    prev: idx > 0 ? all[idx - 1].id : null,
    next: idx < all.length - 1 ? all[idx + 1].id : null
  };
}

function getLevelForId(levelId) {
  return DATA.levels.find(l => l.id === levelId) || null;
}

/* =====================================================================
   PROGRESS BARS
===================================================================== */
function renderProgressBars() {
  const { totalLessons, totalChallenges } = getTotals();
  const cl = STATE.completedLessons.size;
  const cc = STATE.completedChallenges.size;

  const lessonPct = totalLessons > 0 ? Math.round((cl / totalLessons) * 100) : 0;
  const challengePct = totalChallenges > 0 ? Math.round((cc / totalChallenges) * 100) : 0;

  document.getElementById("lessonProgressText").textContent = `${cl} / ${totalLessons}`;
  document.getElementById("challengeProgressText").textContent = `${cc} / ${totalChallenges}`;
  document.getElementById("lessonProgressBar").style.width = lessonPct + "%";
  document.getElementById("challengeProgressBar").style.width = challengePct + "%";
  document.getElementById("lessonProgressTrack").setAttribute("aria-valuenow", lessonPct);
  document.getElementById("challengeProgressTrack").setAttribute("aria-valuenow", challengePct);

  // Congrats banner
  const existing = document.querySelector(".congrats-banner");
  if (cl === totalLessons && totalLessons > 0) {
    if (!existing) {
      const banner = document.createElement("div");
      banner.className = "congrats-banner";
      banner.textContent = "🎉 Congratulations! You've completed all lessons! You're a FreeCAD expert!";
      document.querySelector(".progress-dashboard").appendChild(banner);
    }
  } else {
    if (existing) existing.remove();
  }
}

/* =====================================================================
   CARD BUILDERS
===================================================================== */
function getStatus(id, type) {
  if (type === "challenge") {
    return STATE.completedChallenges.has(id) ? "complete" : "locked";
  }
  if (STATE.completedLessons.has(id)) return "complete";
  if (STATE.openedLessons.has(id)) return "in-progress";
  return "locked";
}

function statusIcon(status) {
  if (status === "complete") return '<span class="card-status-icon" style="color:var(--status-complete)">✓</span>';
  if (status === "in-progress") return '<span class="card-status-icon" style="color:var(--status-progress)">◐</span>';
  return '<span class="card-status-icon" style="color:var(--text-muted)">○</span>';
}

function buildLessonCard(lesson) {
  const status = getStatus(lesson.id, "lesson");
  const resCount = lesson.resources.length;
  const exCount = lesson.exercises.length;
  const hasNote = !!STATE.lessonNotes[lesson.id];
  const q = STATE.searchQuery;
  const highlight = q ? escHtml(lesson.title).replace(
    new RegExp(escHtml(q).replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "gi"),
    m => `<mark>${m}</mark>`
  ) : escHtml(lesson.title);
  return `
    <div class="lesson-card" data-lesson-id="${lesson.id}" data-status="${status}" role="button" tabindex="0" aria-label="Open lesson: ${escHtml(lesson.title)}">
      <div class="card-top">
        <span class="card-num">Lesson ${lesson.num}</span>
        ${statusIcon(status)}
      </div>
      <div class="card-title">${highlight}</div>
      <div class="card-desc">${escHtml(lesson.description)}</div>
      <div class="card-meta">
        ${lesson.duration ? `<span class="card-badge">⏱ ${escHtml(lesson.duration)}</span>` : ""}
        <span class="card-badge">📚 ${resCount} resource${resCount !== 1 ? "s" : ""}</span>
        <span class="card-badge">✏ ${exCount} exercise${exCount !== 1 ? "s" : ""}</span>
        ${hasNote ? `<span class="card-badge">📝 Note</span>` : ""}
      </div>
    </div>
  `.trim();
}

function buildChallengeCard(challenge, levelId) {
  const status = getStatus(challenge.id, "challenge");
  const isComplete = status === "complete";
  const checked = STATE.checkedRequirements[challenge.id] || new Set();

  const reqsHtml = challenge.requirements.map((req, i) => {
    const isChecked = checked.has(i);
    return `
      <div class="challenge-req-item" data-challenge-req="${challenge.id}" data-req-index="${i}">
        <div class="req-checkbox${isChecked ? " checked" : ""}">${isChecked ? "✓" : ""}</div>
        <span>${escHtml(req)}</span>
      </div>
    `.trim();
  }).join("");

  const hintsHtml = challenge.hints.map(h => `<li>${escHtml(h)}</li>`).join("");
  const resourcesHtml = challenge.resources.map(r =>
    `<a href="${safeHref(r.url)}" target="_blank" rel="noopener noreferrer" class="resource-link">🔗 ${escHtml(r.label)}</a>`
  ).join(" ");

  return `
    <div class="challenge-card challenge-card--${levelId}" data-challenge-id="${challenge.id}">
      <div class="challenge-card-header">
        <span class="challenge-icon">🏆</span>
        <div>
          <div class="challenge-type-label">${escHtml(challenge.type)}</div>
          <div class="challenge-title">${escHtml(challenge.title)}</div>
        </div>
      </div>
      <p class="challenge-desc">${escHtml(challenge.description)}</p>
      <div class="challenge-requirements">
        <strong style="font-size:0.8rem;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.06em;">Requirements</strong>
        ${reqsHtml}
      </div>
      ${challenge.hints.length > 0 ? `
      <details style="font-size:0.875rem;color:var(--text-secondary);">
        <summary style="cursor:pointer;font-weight:600;color:var(--text-muted);font-size:0.8rem;text-transform:uppercase;letter-spacing:0.06em;list-style:none;padding:4px 0;" tabindex="0">▶ Hints (${challenge.hints.length})</summary>
        <ul style="margin-top:8px;padding-left:1.25rem;display:flex;flex-direction:column;gap:6px;">${hintsHtml}</ul>
      </details>` : ""}
      ${resourcesHtml ? `<div style="display:flex;flex-direction:column;gap:8px;">${resourcesHtml}</div>` : ""}
      <div class="challenge-card-footer">
        <span class="challenge-status${isComplete ? " done" : ""}">
          ${isComplete ? "✓ Completed" : `${checked.size} / ${challenge.requirements.length} requirements checked`}
        </span>
        <button class="btn-challenge-complete${isComplete ? " completed" : ""}"
          data-complete-challenge="${challenge.id}"
          ${isComplete ? "disabled" : ""}>
          ${isComplete ? "✓ Completed" : "Mark Complete"}
        </button>
      </div>
    </div>
  `.trim();
}

/* =====================================================================
   RENDER LEARNING PATH
===================================================================== */
function renderLearningPath() {
  const container = document.getElementById("learningPath");
  const active = STATE.activeLevel;

  const q = STATE.searchQuery;
  const levelsToShow = (active === "all" ? DATA.levels : DATA.levels.filter(l => l.id === active))
    .map(level => ({
      ...level,
      lessons: q ? level.lessons.filter(l =>
        (l.title + " " + l.description).toLowerCase().includes(q)
      ) : level.lessons
    }))
    .filter(level => level.lessons.length > 0);

  if (levelsToShow.length === 0) {
    container.innerHTML = `<div class="empty-state">${q ? "No lessons match your search." : "No lessons found for this level."}</div>`;
    return;
  }

  const sectionsHtml = levelsToShow.map(level => {
    const lessonsHtml = level.lessons.map(buildLessonCard).join("");
    const challengesHtml = level.challenges.map(c => buildChallengeCard(c, level.id)).join("");

    return `
      <section class="level-section" data-level="${level.id}">
        <div class="level-header">
          <span class="level-pill level-pill--${level.id}">${escHtml(level.title)}</span>
          <h2 class="level-title">${escHtml(level.subtitle)}</h2>
          <span class="level-subtitle">${level.lessons.length} lessons · ${level.challenges.length} challenges</span>
        </div>
        <div class="lessons-grid">${lessonsHtml}</div>
        <div class="challenge-cards">${challengesHtml}</div>
      </section>
    `.trim();
  }).join("");

  container.innerHTML = sectionsHtml;
}

function renderAll() {
  renderLearningPath();
  renderProgressBars();
  renderResumeBanner();
}

/* =====================================================================
   MODAL
===================================================================== */
function openModal(lessonId) {
  const lesson = findLesson(lessonId);
  if (!lesson) return;

  // Mark as opened (in-progress) if not already complete
  if (!STATE.completedLessons.has(lessonId)) {
    STATE.openedLessons.add(lessonId);
    saveState();
  }

  STATE.modalLessonId = lessonId;

  const level = getLevelForId(lesson.levelId);
  const { prev, next } = findAdjacentLesson(lessonId);

  // Populate modal
  const pill = document.getElementById("modalLevelPill");
  pill.textContent = level ? level.title : lesson.levelId;
  pill.className = `modal-level-pill level-pill--${lesson.levelId}`;

  const totalLessons = getAllLessons().length;
  const durText = lesson.duration ? ` · ${lesson.duration}` : "";
  document.getElementById("modalLessonNum").textContent = `Lesson ${lesson.num} of ${totalLessons}${durText}`;
  document.getElementById("modalTitle").textContent = lesson.title;
  document.getElementById("modalDescription").textContent = lesson.description;

  document.getElementById("modalObjectives").innerHTML = lesson.objectives
    .map(o => `<li>${escHtml(o)}</li>`).join("");

  document.getElementById("modalResources").innerHTML = lesson.resources
    .map(r => `<li><a href="${safeHref(r.url)}" target="_blank" rel="noopener noreferrer" class="resource-link">🔗 ${escHtml(r.label)}</a></li>`)
    .join("");

  document.getElementById("modalExercises").innerHTML = lesson.exercises
    .map(e => `<li>${escHtml(e)}</li>`).join("");

  // Complete button
  syncCompleteButton(lessonId);

  // Bookmark button
  syncBookmarkButton(lessonId);

  // Notes
  document.getElementById("modalNotes").value = STATE.lessonNotes[lessonId] || "";

  // Nav buttons
  document.getElementById("modalPrevBtn").disabled = !prev;
  document.getElementById("modalNextBtn").disabled = !next;

  // Show modal
  const overlay = document.getElementById("modalOverlay");
  overlay.removeAttribute("hidden");
  document.body.classList.add("modal-open");

  // Focus management
  document.getElementById("modalClose").focus();

  // Update card in background
  updateCardStatus(lessonId);
}

function closeModal() {
  flushNoteDebounce();
  const overlay = document.getElementById("modalOverlay");
  overlay.setAttribute("hidden", "");
  document.body.classList.remove("modal-open");
  STATE.modalLessonId = null;
}

function updateCardStatus(lessonId) {
  const card = document.querySelector(`[data-lesson-id="${lessonId}"]`);
  if (!card) return;
  const status = getStatus(lessonId, "lesson");
  card.setAttribute("data-status", status);
  const iconEl = card.querySelector(".card-status-icon");
  if (iconEl) iconEl.outerHTML = statusIcon(status);
}

function syncCompleteButton(lessonId) {
  const isComplete = STATE.completedLessons.has(lessonId);
  const btn = document.getElementById("modalCompleteBtn");
  btn.textContent = isComplete ? "✓ Completed (click to undo)" : "Mark as Complete";
  btn.className = "btn-complete" + (isComplete ? " completed" : "");
}

/* =====================================================================
   COMPLETE / UNCOMPLETE
===================================================================== */
function toggleLessonComplete(lessonId) {
  if (STATE.completedLessons.has(lessonId)) {
    STATE.completedLessons.delete(lessonId);
    STATE.openedLessons.add(lessonId);
    showToast("Lesson marked incomplete.");
  } else {
    STATE.completedLessons.add(lessonId);
    STATE.openedLessons.delete(lessonId);
    showToast("Lesson complete! Keep going 🚀");
  }
  saveState();
  renderProgressBars();
  updateCardStatus(lessonId);

  // Update modal button
  syncCompleteButton(lessonId);
}

function completeChallenge(challengeId) {
  if (STATE.completedChallenges.has(challengeId)) return;
  STATE.completedChallenges.add(challengeId);
  saveState();
  renderProgressBars();
  renderLearningPath();
  showToast("Challenge complete! 🏆 Well done!");
}

function toggleRequirement(challengeId, reqIndex) {
  if (!STATE.checkedRequirements[challengeId]) {
    STATE.checkedRequirements[challengeId] = new Set();
  }
  const set = STATE.checkedRequirements[challengeId];
  if (set.has(reqIndex)) {
    set.delete(reqIndex);
  } else {
    set.add(reqIndex);
  }
  saveState();
  renderLearningPath();
}

/* =====================================================================
   TOAST
===================================================================== */
let toastTimer = null;
function showToast(msg) {
  const toast = document.getElementById("toast");
  toast.textContent = msg;
  toast.classList.add("toast--visible");
  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("toast--visible"), 3000);
}

/* =====================================================================
   LEVEL FILTER
===================================================================== */
function filterByLevel(levelId) {
  STATE.activeLevel = levelId;
  document.querySelectorAll(".level-btn").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.level === levelId);
  });
  if (!document.getElementById("modalOverlay").hasAttribute("hidden")) closeModal();
  renderLearningPath();
}

/* =====================================================================
   NOTES
===================================================================== */
let noteDebounceTimer = null;
function flushNoteDebounce() {
  if (noteDebounceTimer) { clearTimeout(noteDebounceTimer); noteDebounceTimer = null; }
}
function onNoteInput(lessonId, value) {
  flushNoteDebounce();
  noteDebounceTimer = setTimeout(() => {
    if (value.trim()) {
      STATE.lessonNotes[lessonId] = value;
    } else {
      delete STATE.lessonNotes[lessonId];
    }
    saveState();
    updateCardStatus(lessonId);
  }, 500);
}

/* =====================================================================
   BOOKMARK
===================================================================== */
function setBookmark(lessonId) {
  STATE.bookmarkedLessonId = STATE.bookmarkedLessonId === lessonId ? null : lessonId;
  saveState();
  renderResumeBanner();
  syncBookmarkButton(lessonId);
}

function syncBookmarkButton(lessonId) {
  const btn = document.getElementById("modalBookmarkBtn");
  if (!btn) return;
  const isBookmarked = STATE.bookmarkedLessonId === lessonId;
  btn.textContent = isBookmarked ? "📌" : "📍";
  btn.setAttribute("aria-label", isBookmarked ? "Remove bookmark" : "Bookmark this lesson");
  btn.classList.toggle("bookmarked", isBookmarked);
}

function renderResumeBanner() {
  const banner = document.getElementById("resumeBanner");
  if (!banner) return;
  const lessonId = STATE.bookmarkedLessonId;
  const lesson = lessonId ? findLesson(lessonId) : null;
  if (!lesson) {
    banner.hidden = true;
    banner.innerHTML = "";
    return;
  }
  banner.hidden = false;
  banner.innerHTML = `
    <div class="resume-banner-inner" role="button" tabindex="0" aria-label="Resume lesson: ${escHtml(lesson.title)}">
      <span>📌 Resume:</span>
      <span class="resume-lesson-title">Lesson ${lesson.num} — ${escHtml(lesson.title)}</span>
      <span class="resume-arrow">→</span>
    </div>
  `.trim();
  banner.querySelector(".resume-banner-inner").addEventListener("click", () => openModal(lessonId));
  banner.querySelector(".resume-banner-inner").addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openModal(lessonId); }
  });
}

/* =====================================================================
   SEARCH
===================================================================== */
let searchDebounceTimer = null;
function filterBySearch(query) {
  flushSearchDebounce();
  STATE.searchQuery = query.trim().toLowerCase();
  renderLearningPath();
  const clearBtn = document.getElementById("searchClear");
  if (clearBtn) clearBtn.hidden = !query;
}
function flushSearchDebounce() {
  if (searchDebounceTimer) { clearTimeout(searchDebounceTimer); searchDebounceTimer = null; }
}

/* =====================================================================
   SHORTCUTS OVERLAY
===================================================================== */
function openShortcuts() {
  document.getElementById("shortcutsOverlay").removeAttribute("hidden");
  document.body.classList.add("modal-open");
  document.getElementById("shortcutsClose").focus();
}
function closeShortcuts() {
  document.getElementById("shortcutsOverlay").setAttribute("hidden", "");
  document.body.classList.remove("modal-open");
}

/* =====================================================================
   EXPORT / IMPORT
===================================================================== */
function exportProgress() {
  const now = new Date().toISOString();
  const payload = JSON.stringify({ version: 1, exportedAt: now, ...serializeState() }, null, 2);
  const objectUrl = URL.createObjectURL(new Blob([payload], { type: "application/json" }));
  const a = document.createElement("a");
  a.href = objectUrl;
  a.download = `freecad-progress-${now.slice(0, 10)}.json`;
  a.click();
  // Defer revocation so the browser can initiate the download asynchronously
  setTimeout(() => URL.revokeObjectURL(objectUrl), 100);
  showToast("Progress exported.");
}

function importProgress(file) {
  const reader = new FileReader();

  reader.onerror = () => showToast("Import failed: could not read file.");

  reader.onload = (ev) => {
    // Parse and validate — errors here mean the file is unusable
    let data;
    try {
      data = JSON.parse(ev.target.result);
      if (!data || typeof data !== "object" || Array.isArray(data)) throw new Error();
    } catch (_) {
      showToast("Import failed: invalid file.");
      return;
    }

    // Confirm before overwriting existing progress
    const { totalLessons, totalChallenges } = getTotals();
    const cl = STATE.completedLessons.size;
    const cc = STATE.completedChallenges.size;
    const hasProgress = cl > 0 || cc > 0;
    if (hasProgress) {
      const msg = `This will replace your current progress (${cl}/${totalLessons} lessons, ${cc}/${totalChallenges} challenges). Continue?`;
      if (!confirm(msg)) return;
    }

    // Close any open modal before re-rendering
    if (!document.getElementById("modalOverlay").hasAttribute("hidden")) closeModal();

    // Mutate STATE and update UI — these are separate from parse/validate
    hydrateState(data);
    applyTheme(STATE.theme);
    saveState();
    renderAll();
    showToast("Progress imported.");
  };

  try {
    reader.readAsText(file);
  } catch (_) {
    showToast("Import failed: could not read file.");
  }
}

/* =====================================================================
   RESET
===================================================================== */
function resetProgress() {
  if (!confirm("Reset ALL progress? This cannot be undone.")) return;
  STATE.completedLessons.clear();
  STATE.openedLessons.clear();
  STATE.completedChallenges.clear();
  STATE.checkedRequirements = {};
  STATE.lessonNotes = {};
  STATE.bookmarkedLessonId = null;
  saveState();
  renderAll();
  showToast("Progress reset.");
}

/* =====================================================================
   UTILITY
===================================================================== */
function escHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function safeHref(url) {
  const s = String(url).trim();
  if (/^(javascript|data):/i.test(s)) return "#";
  return escHtml(s);
}

/* =====================================================================
   EVENT LISTENERS
===================================================================== */
function attachStaticListeners() {
  // Theme toggle
  document.getElementById("themeToggle").addEventListener("click", () => {
    applyTheme(STATE.theme === "dark" ? "light" : "dark");
    saveState();
  });

  // Keyboard shortcuts button
  document.getElementById("shortcutsBtn").addEventListener("click", openShortcuts);
  document.getElementById("shortcutsClose").addEventListener("click", closeShortcuts);
  document.getElementById("shortcutsOverlay").addEventListener("click", (e) => {
    if (e.target === document.getElementById("shortcutsOverlay")) closeShortcuts();
  });

  // Bookmark button
  document.getElementById("modalBookmarkBtn").addEventListener("click", () => {
    if (STATE.modalLessonId) setBookmark(STATE.modalLessonId);
  });

  // Notes textarea
  document.getElementById("modalNotes").addEventListener("input", (e) => {
    if (STATE.modalLessonId) onNoteInput(STATE.modalLessonId, e.target.value);
  });

  // Search input
  const searchInput = document.getElementById("searchInput");
  searchInput.addEventListener("input", (e) => {
    flushSearchDebounce();
    searchDebounceTimer = setTimeout(() => filterBySearch(e.target.value), 200);
  });
  document.getElementById("searchClear").addEventListener("click", () => {
    searchInput.value = "";
    filterBySearch("");
    searchInput.focus();
  });

  // Export / import progress
  document.getElementById("exportProgress").addEventListener("click", exportProgress);
  document.getElementById("importFile").addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
      importProgress(file);
      e.target.value = ""; // reset so the same file can be re-imported
    }
  });
  // Keyboard activation for the import label (Enter or Space)
  document.getElementById("importLabel").addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      document.getElementById("importFile").click();
    }
  });

  // Reset progress
  document.getElementById("resetProgress").addEventListener("click", resetProgress);

  // Level nav
  document.querySelectorAll(".level-btn").forEach(btn => {
    btn.addEventListener("click", () => filterByLevel(btn.dataset.level));
  });

  // Modal close button
  document.getElementById("modalClose").addEventListener("click", closeModal);

  // Modal overlay click (close if clicking backdrop)
  document.getElementById("modalOverlay").addEventListener("click", (e) => {
    if (e.target === document.getElementById("modalOverlay")) closeModal();
  });

  // Modal complete button
  document.getElementById("modalCompleteBtn").addEventListener("click", () => {
    if (STATE.modalLessonId) toggleLessonComplete(STATE.modalLessonId);
  });

  // Modal nav buttons
  document.getElementById("modalPrevBtn").addEventListener("click", () => {
    if (!STATE.modalLessonId) return;
    const { prev } = findAdjacentLesson(STATE.modalLessonId);
    if (prev) openModal(prev);
  });

  document.getElementById("modalNextBtn").addEventListener("click", () => {
    if (!STATE.modalLessonId) return;
    const { next } = findAdjacentLesson(STATE.modalLessonId);
    if (next) openModal(next);
  });

  // Keyboard shortcuts + focus trap
  document.addEventListener("keydown", (e) => {
    const overlay = document.getElementById("modalOverlay");
    const modalOpen = !overlay.hasAttribute("hidden");

    // Escape closes shortcuts overlay too
    const shortcutsOpen = !document.getElementById("shortcutsOverlay").hasAttribute("hidden");
    if (e.key === "Escape" && shortcutsOpen) {
      closeShortcuts();
      return;
    }

    if (e.key === "Escape" && modalOpen) {
      closeModal();
      return;
    }

    // ? key opens cheat sheet when no modal is open
    if (e.key === "?" && !modalOpen && !shortcutsOpen) {
      openShortcuts();
      return;
    }
    if (modalOpen && e.key === "ArrowLeft" && STATE.modalLessonId) {
      const { prev } = findAdjacentLesson(STATE.modalLessonId);
      if (prev) openModal(prev);
      return;
    }
    if (modalOpen && e.key === "ArrowRight" && STATE.modalLessonId) {
      const { next } = findAdjacentLesson(STATE.modalLessonId);
      if (next) openModal(next);
      return;
    }
    if (modalOpen && e.key === "Tab") {
      const modal = document.getElementById("modal");
      const focusable = Array.from(modal.querySelectorAll(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      ));
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last.focus(); }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    }
  });

  // Event delegation for learning path
  document.getElementById("learningPath").addEventListener("click", (e) => {
    // Lesson card click
    const card = e.target.closest("[data-lesson-id]");
    if (card) {
      openModal(card.dataset.lessonId);
      return;
    }

    // Challenge complete button
    const completeBtn = e.target.closest("[data-complete-challenge]");
    if (completeBtn && !completeBtn.disabled) {
      completeChallenge(completeBtn.dataset.completeChallenge);
      return;
    }

    // Requirement checkbox toggle
    const reqItem = e.target.closest("[data-challenge-req]");
    if (reqItem) {
      const challengeId = reqItem.dataset.challengeReq;
      const reqIndex = parseInt(reqItem.dataset.reqIndex, 10);
      toggleRequirement(challengeId, reqIndex);
      return;
    }
  });

  // Keyboard support for lesson cards
  document.getElementById("learningPath").addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      const card = e.target.closest("[data-lesson-id]");
      if (card) {
        e.preventDefault();
        openModal(card.dataset.lessonId);
      }
    }
  });
}

/* =====================================================================
   INIT
===================================================================== */
document.addEventListener("DOMContentLoaded", () => {
  loadState();
  applyTheme(STATE.theme);
  renderAll();
  attachStaticListeners();
});
