/**
 * VanshTripathi.dev Authentic Interaction & Routing Logic
 * Perspective: Ankit Jha — AI & Full Stack Engineer (Delhi)
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initRouting();
  initKeyboardShortcuts();
  initLiveClock();
  initAvatarCanvas();
  initCycleEffects();
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

    // Don't trigger views if modal drawer is open
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
  const cutHint = document.getElementById('cutHint');
  const cutLineBtn = document.getElementById('cutLineBtn');

  if (!bioMore) return;

  if (isBioOpen) {
    bioMore.classList.add('open');
    if (cutHint) cutHint.textContent = 'Cut open • Click to fold back';
    if (cutLineBtn) cutLineBtn.setAttribute('aria-expanded', 'true');
  } else {
    bioMore.classList.remove('open');
    if (cutHint) cutHint.textContent = 'Drag along the line to cut the bio open';
    if (cutLineBtn) cutLineBtn.setAttribute('aria-expanded', 'false');
  }
}

/* ========================================================
   5. 3D ROTATING WIREFRAME AVATAR
   ======================================================== */
function initAvatarCanvas() {
  const canvas = document.getElementById('avatarCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const width = canvas.width;
  const height = canvas.height;
  const cx = width / 2;
  const cy = height / 2;
  const radius = 21;

  // Generate 30 spherical points
  const points = [];
  const numPoints = 28;
  for (let i = 0; i < numPoints; i++) {
    const phi = Math.acos(-1 + (2 * i) / numPoints);
    const theta = Math.sqrt(numPoints * Math.PI) * phi;
    points.push({
      x: radius * Math.cos(theta) * Math.sin(phi),
      y: radius * Math.sin(theta) * Math.sin(phi),
      z: radius * Math.cos(phi)
    });
  }

  const rotSpeedX = 0.007;
  const rotSpeedY = 0.009;

  function render() {
    ctx.clearRect(0, 0, width, height);

    const cosY = Math.cos(rotSpeedY);
    const sinY = Math.sin(rotSpeedY);
    const cosX = Math.cos(rotSpeedX);
    const sinX = Math.sin(rotSpeedX);

    points.forEach(p => {
      let x = p.x * cosY - p.z * sinY;
      let z = p.z * cosY + p.x * sinY;
      let y = p.y * cosX - z * sinX;
      z = z * cosX + p.y * sinX;
      p.x = x; p.y = y; p.z = z;
    });

    // Draw connecting wireframe lines
    ctx.lineWidth = 0.55;
    for (let i = 0; i < points.length; i++) {
      for (let j = i + 1; j < points.length; j++) {
        const dx = points[i].x - points[j].x;
        const dy = points[i].y - points[j].y;
        const dz = points[i].z - points[j].z;
        const dist = Math.sqrt(dx*dx + dy*dy + dz*dz);
        if (dist < 18) {
          const alpha = Math.max(0, (1 - dist / 18) * 0.45);
          ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
          ctx.beginPath();
          ctx.moveTo(cx + points[i].x, cy + points[i].y);
          ctx.lineTo(cx + points[j].x, cy + points[j].y);
          ctx.stroke();
        }
      }
    }

    // Draw glowing node vertices
    points.forEach(p => {
      const scale = (p.z + radius * 1.5) / (radius * 2.5);
      const alpha = Math.min(1, Math.max(0.2, (p.z + radius) / (radius * 2)));
      ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
      ctx.beginPath();
      ctx.arc(cx + p.x, cy + p.y, Math.max(0.6, scale * 1.25), 0, Math.PI * 2);
      ctx.fill();
    });

    requestAnimationFrame(render);
  }

  render();
}

/* ========================================================
   6. CYCLING EFFECTS FOR SERVICES & GARDEN STACK
   ======================================================== */
function initCycleEffects() {
  // Cycle Services list items
  const svcItems = document.querySelectorAll('.svc-item');
  if (svcItems.length > 0) {
    let currentSvc = 0;
    setInterval(() => {
      svcItems[currentSvc].classList.remove('active');
      currentSvc = (currentSvc + 1) % svcItems.length;
      svcItems[currentSvc].classList.add('active');
    }, 2800);
  }

  // Cycle Garden tickets on hover / click
  const gardenTile = document.querySelector('[data-section="garden"]');
  if (gardenTile) {
    gardenTile.addEventListener('mouseenter', () => {
      const tickets = document.querySelectorAll('.b-ticket');
      tickets.forEach(ticket => {
        let pos = parseInt(ticket.getAttribute('data-pos') || '0', 10);
        pos = (pos + 1) % 3;
        ticket.setAttribute('data-pos', pos);
      });
    });
  }
}

/* ========================================================
   7. CASE STUDY MODAL DRAWER
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
   8. BOOKSHELF TABS SWITCHER
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
   9. LIVE INDIAN STANDARD TIME CLOCK (NEW DELHI / IST)
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
