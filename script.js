/**
 * VanshTripathi.dev Interaction & Routing Logic
 * Perspective: Ankit Jha — AI & Full Stack Engineer (New Delhi)
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initRouting();
  initKeyboardShortcuts();
  initLiveClock();
});

/* ========================================================
   1. THEME TOGGLE (Dark #121212 default / Light #ffffff)
   ======================================================== */
function initTheme() {
  const savedTheme = localStorage.getItem('theme') || 'dark';
  setTheme(savedTheme, false);
}

function setTheme(theme, save = true) {
  document.documentElement.setAttribute('data-theme', theme);
  const themeMeta = document.querySelector('meta[name="theme-color"]');
  if (themeMeta) {
    themeMeta.content = theme === 'dark' ? '#121212' : '#ffffff';
  }

  const lightBtn = document.getElementById('themeLightBtn');
  const darkBtn = document.getElementById('themeDarkBtn');

  if (lightBtn && darkBtn) {
    if (theme === 'light') {
      lightBtn.classList.add('active');
      darkBtn.classList.remove('active');
    } else {
      darkBtn.classList.add('active');
      lightBtn.classList.remove('active');
    }
  }

  if (save) {
    try {
      localStorage.setItem('theme', theme);
    } catch (e) {}
  }
}

/* ========================================================
   2. VIEW NAVIGATION & ROUTING (#work, #garden, #blog, etc.)
   ======================================================== */
const VIEWS = {
  home: 'homeView',
  work: 'workView',
  garden: 'gardenView',
  blog: 'blogView',
  services: 'servicesView',
  reading: 'readingView'
};

function initRouting() {
  handleHashChange();
  window.addEventListener('hashchange', handleHashChange);
}

function handleHashChange() {
  const hash = window.location.hash.replace('#', '').trim().toLowerCase();
  if (VIEWS[hash]) {
    navigateToView(hash, false);
  } else {
    navigateToView('home', false);
  }
}

function navigateToView(viewName, updateHash = true) {
  // Hide all view panels
  Object.values(VIEWS).forEach(id => {
    const el = document.getElementById(id);
    if (el) el.classList.remove('active');
  });

  // Show target view
  const targetId = VIEWS[viewName] || 'homeView';
  const targetEl = document.getElementById(targetId);
  if (targetEl) {
    targetEl.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  // Update hash
  if (updateHash) {
    if (viewName === 'home') {
      history.pushState(null, '', window.location.pathname);
    } else {
      window.location.hash = viewName;
    }
  }
}

/* ========================================================
   3. KEYBOARD SHORTCUTS (W, G, B, S, R, Esc)
   ======================================================== */
function initKeyboardShortcuts() {
  document.addEventListener('keydown', (e) => {
    // Ignore when typing in inputs/textareas
    if (e.target.closest('input, textarea, select, [contenteditable="true"]')) {
      return;
    }

    const key = e.key.toUpperCase();

    // Close modal or return home on Escape
    if (e.key === 'Escape') {
      const modal = document.getElementById('caseStudyOverlay');
      if (modal && modal.classList.contains('open')) {
        closeCaseStudy();
        return;
      }
      navigateToView('home');
      return;
    }

    // Modal open check
    const modal = document.getElementById('caseStudyOverlay');
    if (modal && modal.classList.contains('open')) return;

    switch (key) {
      case 'W':
        navigateToView('work');
        break;
      case 'G':
        navigateToView('garden');
        break;
      case 'B':
        navigateToView('blog');
        break;
      case 'S':
        navigateToView('services');
        break;
      case 'R':
        navigateToView('reading');
        break;
    }
  });
}

/* ========================================================
   4. INTERACTIVE CUT LINE BIO
   ======================================================== */
let isBioOpen = false;

function toggleBio() {
  isBioOpen = !isBioOpen;
  const bioMore = document.getElementById('bioMore');
  const cutBtnLabel = document.getElementById('cutBtnLabel');
  const cutLineBtn = document.getElementById('cutLineBtn');

  if (!bioMore) return;

  if (isBioOpen) {
    bioMore.classList.add('open');
    if (cutBtnLabel) cutBtnLabel.textContent = 'Cut open &bull; Drag to fold back';
    if (cutLineBtn) cutLineBtn.setAttribute('aria-expanded', 'true');
  } else {
    bioMore.classList.remove('open');
    if (cutBtnLabel) cutBtnLabel.textContent = 'Drag along the line to cut the bio open';
    if (cutLineBtn) cutLineBtn.setAttribute('aria-expanded', 'false');
  }
}

/* ========================================================
   5. DETAILED CASE STUDY MODAL DRAWER
   ======================================================== */
function openCaseStudy(projectId) {
  if (!window.caseStudiesData || !window.caseStudiesData[projectId]) return;
  const data = window.caseStudiesData[projectId];

  document.getElementById('caseNumTag').textContent = `${data.num} ${data.tag}`;
  document.getElementById('caseTitle').textContent = data.title;
  document.getElementById('caseSubtitle').textContent = data.subtitle;
  document.getElementById('caseType').textContent = data.type;
  document.getElementById('caseFocus').textContent = data.focus;
  document.getElementById('caseStack').textContent = data.stack;

  document.getElementById('caseProblem').innerHTML = data.problem;
  document.getElementById('caseSolution').innerHTML = data.solution;
  document.getElementById('caseFlow').innerHTML = data.flow;
  document.getElementById('caseResult').innerHTML = data.result;

  const overlay = document.getElementById('caseStudyOverlay');
  if (overlay) {
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
}

function closeCaseStudy(e) {
  if (e && e.target !== document.getElementById('caseStudyOverlay') && !e.target.closest('.back-btn')) {
    return;
  }
  const overlay = document.getElementById('caseStudyOverlay');
  if (overlay) {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }
}

/* ========================================================
   6. BOOKSHELF TABS SWITCHER
   ======================================================== */
function switchBookTab(tabName, btn) {
  document.querySelectorAll('.book-tab-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');

  const grids = {
    current: 'bookGridCurrent',
    finished: 'bookGridFinished',
    want: 'bookGridWant'
  };

  Object.values(grids).forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.display = 'none';
  });

  const activeGrid = document.getElementById(grids[tabName]);
  if (activeGrid) {
    activeGrid.style.display = 'grid';
  }
}

/* ========================================================
   7. LIVE INDIAN STANDARD TIME CLOCK (NEW DELHI / IST)
   ======================================================== */
function initLiveClock() {
  const clockEl = document.getElementById('liveTime');
  if (!clockEl) return;

  function update() {
    const now = new Date();
    clockEl.textContent = now.toLocaleTimeString('en-US', {
      timeZone: 'Asia/Kolkata',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    }) + ' IST';
  }

  update();
  setInterval(update, 1000);
}
