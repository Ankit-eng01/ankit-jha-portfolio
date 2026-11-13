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

/* ========================================================
   7. 3D BOOKSHELF MODAL & DATA
   ======================================================== */
const BOOKS_DATA = {
  'learn-to-earn': {
    title: 'Learn to Earn',
    author: 'Peter Lynch & John Rothchild',
    category: 'Economics & Business Fundamentals',
    status: 'Currently Reading',
    quote: 'The key to making money in stocks is not to get scared out of them.',
    note: 'A fundamental, no-nonsense breakdown of capitalism, how free markets operate, why companies exist, and how real enterprise value is created. Lynch explains how understanding the underlying balance sheet and cash flow separates long-term compounders from market gamblers.'
  },
  'psychology-of-money': {
    title: 'The Psychology of Money',
    author: 'Morgan Housel',
    category: 'Behavioral Finance & Decision Making',
    status: 'Curated Favorite',
    quote: 'Doing well with money has a little to do with how smart you are and a lot to do with how you behave.',
    note: 'Morgan Housel presents 19 short stories exploring the strange ways people think about money. The overarching lesson: financial success is not a hard science like physics—it is a soft skill where your behavior, patience, and ego control outweigh analytical horsepower.'
  },
  'nausea': {
    title: 'Nausea',
    author: 'Jean-Paul Sartre',
    category: 'Existential Philosophy',
    status: 'Curated Classic',
    quote: 'Every existing thing is born without reason, prolongs itself out of weakness, and dies by chance.',
    note: 'A masterwork of existential alienation. Antoine Roquentin confronts the sheer, unmediated existence of objects and freedom, chronicling how human consciousness must construct meaning in an indifferent universe.'
  },
  'crime-and-punishment': {
    title: 'Crime and Punishment',
    author: 'Fyodor Dostoevsky',
    category: 'Psychological Literature',
    status: 'Curated Classic',
    quote: 'Pain and suffering are always inevitable for a large intelligence and a deep heart.',
    note: 'A gripping exploration of moral transgression, ideological hubris, and psychological devastation. Raskolnikov tests whether extraordinary men stand above common morality, only to discover the inescapable weight of human conscience.'
  },
  'twelve-angry-men': {
    title: 'Twelve Angry Men',
    author: 'Reginald Rose',
    category: 'Rhetoric & Group Dynamics',
    status: 'Curated Classic',
    quote: "It's always difficult to keep personal prejudice out of a thing like this.",
    note: 'A masterclass in persuasion, cognitive bias, and reasonable doubt. Demonstrates how a single patient, rational voice can systematically dismantle prejudice and consensus blindness.'
  },
  'three-men-in-a-boat': {
    title: 'Three Men in a Boat',
    author: 'Jerome K. Jerome',
    category: 'Satire & Vintage Wit',
    status: 'Curated Classic',
    quote: 'I like work: it fascinates me. I can sit and look at it for hours.',
    note: 'A humorous Victorian travelogue down the Thames that captures human idiosyncrasies, petty squabbles, and the timeless art of doing nothing with complete conviction.'
  },
  'the-trial': {
    title: 'The Trial',
    author: 'Franz Kafka',
    category: 'Philosophical Fiction',
    status: 'Curated Classic',
    quote: 'Someone must have slandered Josef K., for one morning, without having done anything wrong, he was arrested.',
    note: 'An eerie indictment of bureaucratic inertia, irrational systems, and unaccountable authority. Josef K. is caught in an opaque legal labyrinth where guilt is assumed and innocence is impossible to prove.'
  },
  '1984': {
    title: '1984',
    author: 'George Orwell',
    category: 'Dystopian Systems & Control',
    status: 'Curated Classic',
    quote: 'Freedom is the freedom to say that two plus two make four. If that is granted, all else follows.',
    note: 'The seminal examination of surveillance architecture, doublethink, and the manipulation of language (Newspeak) to constrain thought itself. Required reading for anyone thinking about systems, power, and information control.'
  }
};

function openBookModal(bookKey) {
  const book = BOOKS_DATA[bookKey];
  if (!book) return;
  const content = document.getElementById('bookModalContent');
  if (!content) return;
  content.innerHTML = `
    <span class="book-modal-badge">${book.category}</span>
    <h3 class="book-modal-title">${book.title}</h3>
    <p class="book-modal-author">By ${book.author} &bull; <span style="color:var(--accent); font-weight:500;">${book.status}</span></p>
    <div class="book-modal-quote">&ldquo;${book.quote}&rdquo;</div>
    <p class="book-modal-desc">${book.note}</p>
  `;
  const modal = document.getElementById('bookModalBackdrop');
  if (modal) modal.classList.add('open');
}

function closeBookModal(e) {
  if (e && e.target && e.target.closest && e.target.closest('.book-modal-card') && !e.target.closest('.book-modal-close')) {
    return;
  }
  const modal = document.getElementById('bookModalBackdrop');
  if (modal) modal.classList.remove('open');
}
