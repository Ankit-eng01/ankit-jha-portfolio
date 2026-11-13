/**
 * Ankit Jha — Portfolio Logic
 * Clean, lightweight vanilla JS
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initRouting();
  initKeyboardShortcuts();
  initLiveClock();
  initAvatar();
});

/* ========================================================
   1. THEME TOGGLE
   ======================================================== */
function initTheme() {
  const savedTheme = localStorage.getItem('theme') || 'dark';
  setTheme(savedTheme, false);
}

function setTheme(theme, save = true) {
  document.documentElement.setAttribute('data-theme', theme);
  const themeMeta = document.querySelector('meta[name="theme-color"]');
  if (themeMeta) {
    themeMeta.content = theme === 'dark' ? '#0d0f12' : '#ffffff';
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
   2. VIEW NAVIGATION & ROUTING
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
  Object.values(VIEWS).forEach(id => {
    const el = document.getElementById(id);
    if (el) el.classList.remove('active');
  });

  const targetId = VIEWS[viewName] || 'homeView';
  const targetEl = document.getElementById(targetId);
  if (targetEl) {
    targetEl.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

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

    if (e.key === 'Escape') {
      navigateToView('home');
      return;
    }

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
   4. BIO EXPANDER
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
    if (cutHint) cutHint.textContent = 'Fold back ↑';
    if (cutLineBtn) cutLineBtn.setAttribute('aria-expanded', 'true');
  } else {
    bioMore.classList.remove('open');
    if (cutHint) cutHint.textContent = 'More about me ↓';
    if (cutLineBtn) cutLineBtn.setAttribute('aria-expanded', 'false');
  }
}

/* ========================================================
   5. MINIMAL 3D GEOMETRIC AVATAR
   ======================================================== */
function initAvatar() {
  const canvas = document.getElementById('avatarCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const w = canvas.width;
  const h = canvas.height;
  const cx = w / 2;
  const cy = h / 2;
  const radius = 17;

  // Vertices of an icosahedron
  const phi = (1 + Math.sqrt(5)) / 2;
  const rawVertices = [
    [-1,  phi, 0], [ 1,  phi, 0], [-1, -phi, 0], [ 1, -phi, 0],
    [ 0, -1,  phi], [ 0,  1,  phi], [ 0, -1, -phi], [ 0,  1, -phi],
    [ phi, 0, -1], [ phi, 0,  1], [-phi, 0, -1], [-phi, 0,  1]
  ];

  const scale = radius / Math.sqrt(1 + phi * phi);
  const vertices = rawVertices.map(v => ({
    x: v[0] * scale,
    y: v[1] * scale,
    z: v[2] * scale
  }));

  const rotSpeedX = 0.006;
  const rotSpeedY = 0.010;

  function render() {
    ctx.clearRect(0, 0, w, h);

    const cosY = Math.cos(rotSpeedY);
    const sinY = Math.sin(rotSpeedY);
    const cosX = Math.cos(rotSpeedX);
    const sinX = Math.sin(rotSpeedX);

    vertices.forEach(v => {
      let x = v.x * cosY - v.z * sinY;
      let z = v.z * cosY + v.x * sinY;
      let y = v.y * cosX - z * sinX;
      z = z * cosX + v.y * sinX;
      v.x = x; v.y = y; v.z = z;
    });

    // Draw connecting edges
    ctx.lineWidth = 0.7;
    for (let i = 0; i < vertices.length; i++) {
      for (let j = i + 1; j < vertices.length; j++) {
        const dx = vertices[i].x - vertices[j].x;
        const dy = vertices[i].y - vertices[j].y;
        const dz = vertices[i].z - vertices[j].z;
        const dist = Math.sqrt(dx*dx + dy*dy + dz*dz);
        if (dist < radius * 1.2) {
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
          ctx.beginPath();
          ctx.moveTo(cx + vertices[i].x, cy + vertices[i].y);
          ctx.lineTo(cx + vertices[j].x, cy + vertices[j].y);
          ctx.stroke();
        }
      }
    }

    // Draw vertex points
    vertices.forEach(v => {
      const depth = (v.z + radius) / (radius * 2);
      ctx.fillStyle = depth > 0.5 ? 'rgba(0, 212, 227, 0.85)' : 'rgba(255, 255, 255, 0.4)';
      ctx.beginPath();
      ctx.arc(cx + v.x, cy + v.y, depth > 0.5 ? 1.6 : 1.2, 0, Math.PI * 2);
      ctx.fill();
    });

    requestAnimationFrame(render);
  }

  render();
}

/* ========================================================
   6. LIVE CLOCK (NEW DELHI / IST)
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
