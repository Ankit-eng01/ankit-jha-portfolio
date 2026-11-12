/**
 * Ankit Jha — Engineering Portal Interactive Logic
 * Features: 3D Neural Torus Canvas, Segmented Theme Switcher,
 * SPA Navigation, Signal Rail Expander, IST Live Clock
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initRouting();
  initKeyboardShortcuts();
  initLiveClock();
  initNeuralCanvas();
});

/* ========================================================
   1. THEME TOGGLE (Obsidian #0a0b0e / Light #f8fafc)
   ======================================================== */
function initTheme() {
  const savedTheme = localStorage.getItem('ankit-theme') || 'dark';
  setTheme(savedTheme, false);
}

function setTheme(theme, save = true) {
  document.documentElement.setAttribute('data-theme', theme);
  const themeMeta = document.querySelector('meta[name="theme-color"]');
  if (themeMeta) {
    themeMeta.content = theme === 'dark' ? '#0a0b0e' : '#f8fafc';
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
      localStorage.setItem('ankit-theme', theme);
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
   4. SIGNAL RAIL BIO EXPANDER
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
    if (cutHint) cutHint.textContent = '[-] Fold engineering background';
    if (cutLineBtn) cutLineBtn.setAttribute('aria-expanded', 'true');
  } else {
    bioMore.classList.remove('open');
    if (cutHint) cutHint.textContent = '[+] Read full background & engineering philosophies';
    if (cutLineBtn) cutLineBtn.setAttribute('aria-expanded', 'false');
  }
}

/* ========================================================
   5. 3D INTERACTIVE NEURAL CONSTELLATION / TORUS AVATAR
   ======================================================== */
function initNeuralCanvas() {
  const canvas = document.getElementById('avatarCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const width = canvas.width;
  const height = canvas.height;
  const cx = width / 2;
  const cy = height / 2;

  // Generate 3D Torus points
  const points = [];
  const R = 15; // Major radius
  const r = 7;  // Minor tube radius
  const numU = 14;
  const numV = 8;

  for (let i = 0; i < numU; i++) {
    const u = (i / numU) * Math.PI * 2;
    for (let j = 0; j < numV; j++) {
      const v = (j / numV) * Math.PI * 2;
      points.push({
        x: (R + r * Math.cos(v)) * Math.cos(u),
        y: (R + r * Math.cos(v)) * Math.sin(u),
        z: r * Math.sin(v)
      });
    }
  }

  let rotX = 0.006;
  let rotY = 0.012;
  let rotZ = 0.004;

  // Mouse tilt tracking
  let mouseTiltX = 0;
  let mouseTiltY = 0;
  canvas.parentElement.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouseTiltX = ((e.clientX - rect.left) / rect.width - 0.5) * 0.03;
    mouseTiltY = ((e.clientY - rect.top) / rect.height - 0.5) * 0.03;
  });
  canvas.parentElement.addEventListener('mouseleave', () => {
    mouseTiltX = 0;
    mouseTiltY = 0;
  });

  function render() {
    ctx.clearRect(0, 0, width, height);

    const cosY = Math.cos(rotY + mouseTiltX);
    const sinY = Math.sin(rotY + mouseTiltX);
    const cosX = Math.cos(rotX + mouseTiltY);
    const sinX = Math.sin(rotX + mouseTiltY);

    points.forEach(p => {
      let x = p.x * cosY - p.z * sinY;
      let z = p.z * cosY + p.x * sinY;
      let y = p.y * cosX - z * sinX;
      z = z * cosX + p.y * sinX;
      p.x = x; p.y = y; p.z = z;
    });

    // Draw connecting neural lines
    ctx.lineWidth = 0.5;
    for (let i = 0; i < points.length; i++) {
      for (let j = i + 1; j < points.length; j++) {
        const dx = points[i].x - points[j].x;
        const dy = points[i].y - points[j].y;
        const dz = points[i].z - points[j].z;
        const dist = Math.sqrt(dx*dx + dy*dy + dz*dz);
        if (dist < 10) {
          const alpha = (1 - dist / 10) * 0.38;
          ctx.strokeStyle = `rgba(0, 240, 255, ${alpha})`;
          ctx.beginPath();
          ctx.moveTo(cx + points[i].x, cy + points[i].y);
          ctx.lineTo(cx + points[j].x, cy + points[j].y);
          ctx.stroke();
        }
      }
    }

    // Draw nodes
    points.forEach(p => {
      const depth = (p.z + R + r) / ((R + r) * 2);
      const alpha = Math.min(1, Math.max(0.2, depth));
      const radius = Math.max(0.6, depth * 1.4);
      ctx.fillStyle = depth > 0.6 ? `rgba(0, 240, 255, ${alpha})` : `rgba(129, 140, 248, ${alpha})`;
      ctx.beginPath();
      ctx.arc(cx + p.x, cy + p.y, radius, 0, Math.PI * 2);
      ctx.fill();
    });

    requestAnimationFrame(render);
  }

  render();
}

/* ========================================================
   6. LIVE INDIAN STANDARD TIME CLOCK (NEW DELHI / IST)
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
