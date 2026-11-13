/**
 * Ankit Jha — Portfolio Logic
 * Clean, lightweight vanilla JS
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initRouting();
  initKeyboardShortcuts();
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

let homeScrollY = 0;

function navigateToView(viewName, updateHash = true) {
  const currentActive = document.querySelector('.view-panel.active');
  const currentId = currentActive ? currentActive.id : 'homeView';
  const targetId = VIEWS[viewName] || 'homeView';

  if (currentId === targetId) return;

  const isClosing = (targetId === 'homeView');

  if (!isClosing && currentId === 'homeView') {
    homeScrollY = window.scrollY;
  }

  const updateDOM = () => {
    Object.values(VIEWS).forEach(id => {
      const el = document.getElementById(id);
      if (el) el.classList.remove('active');
    });

    const targetEl = document.getElementById(targetId);
    if (targetEl) {
      targetEl.classList.add('active');
      if (isClosing) {
        window.scrollTo({ top: homeScrollY, behavior: 'instant' });
      } else {
        window.scrollTo({ top: 0, behavior: 'instant' });
      }
    }

    if (updateHash) {
      if (viewName === 'home') {
        history.pushState(null, '', window.location.pathname);
      } else {
        window.location.hash = viewName;
      }
    }
  };

  if (!document.startViewTransition || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    updateDOM();
    return;
  }

  document.documentElement.dataset.vt = isClosing ? 'close' : 'open';
  const transition = document.startViewTransition(() => {
    updateDOM();
  });

  transition.finished.finally(() => {
    delete document.documentElement.dataset.vt;
  });
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
   6. 3D BOOKSHELF MODAL & DATA
   ======================================================== */
const BOOKS_DATA = {
  'learn-to-earn': {
    title: 'Learn to Earn',
    author: 'Peter Lynch & John Rothchild',
    category: 'Economics & Business',
    status: 'Currently Reading',
    quote: 'The key to making money in stocks is not to get scared out of them.',
    note: 'A clear, foundational breakdown of capitalism, how businesses operate, and why understanding underlying balance sheets and cash flows matters for long-term investing.'
  },
  'psychology-of-money': {
    title: 'The Psychology of Money',
    author: 'Morgan Housel',
    category: 'Behavioral Finance',
    status: 'Currently Reading',
    quote: 'Doing well with money has a little to do with how smart you are and a lot to do with how you behave.',
    note: 'Short essays exploring how people actually interact with money. The core insight is that financial outcomes are driven much more by behavior, patience, and emotional discipline than technical knowledge.'
  },
  'crime-and-punishment': {
    title: 'Crime and Punishment',
    author: 'Fyodor Dostoevsky',
    category: 'Literature & Philosophy',
    status: 'Currently Reading',
    quote: 'Pain and suffering are always inevitable for a large intelligence and a deep heart.',
    note: 'An intense examination of guilt, conscience, and moral justification. It dissects what happens when someone attempts to place their rationalizations above fundamental human ethics.'
  },
  'rich-dad-poor-dad': {
    title: 'Rich Dad Poor Dad',
    author: 'Robert T. Kiyosaki',
    category: 'Personal Finance & Assets',
    status: 'Finished',
    quote: 'The single most powerful asset we all have is our mind. If trained well, it can create enormous wealth.',
    note: 'The foundational primer on the distinction between assets and liabilities. Kiyosaki highlights financial literacy, cash-flow discipline, and creating systems that generate value over time.'
  },
  'the-king-in-yellow': {
    title: 'The King in Yellow',
    author: 'Robert W. Chambers',
    category: 'Gothic Fiction & Weird Tales',
    status: 'Wanted to read',
    quote: 'Along the shore the cloud waves break, The twin suns sink behind the lake, The shadows lengthen In Carcosa.',
    note: 'A classic collection of supernatural and psychological fiction published in 1895. Explores the eerie mythos of Carcosa and a play that induces madness in whoever reads it.'
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

function switchReadingTab(tabName) {
  document.querySelectorAll('.shelf-tab').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-tab') === tabName);
  });
  const cur = document.getElementById('secCurrentlyReading');
  const fin = document.getElementById('secFinished');
  const wan = document.getElementById('secWanted');

  const applyTabSwitch = () => {
    if (tabName === 'all') {
      if (cur) cur.style.display = 'block';
      if (fin) fin.style.display = 'block';
      if (wan) wan.style.display = 'block';
    } else if (tabName === 'current') {
      if (cur) cur.style.display = 'block';
      if (fin) fin.style.display = 'none';
      if (wan) wan.style.display = 'none';
    } else if (tabName === 'finished') {
      if (cur) cur.style.display = 'none';
      if (fin) fin.style.display = 'block';
      if (wan) wan.style.display = 'none';
    } else if (tabName === 'wanted') {
      if (cur) cur.style.display = 'none';
      if (fin) fin.style.display = 'none';
      if (wan) wan.style.display = 'block';
    }
  };

  if (!document.startViewTransition || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    applyTabSwitch();
  } else {
    document.startViewTransition(() => {
      applyTabSwitch();
    });
  }
}

// Global window assignments
window.openBookModal = openBookModal;
window.closeBookModal = closeBookModal;
window.switchReadingTab = switchReadingTab;
window.navigateToView = navigateToView;
window.setTheme = setTheme;
window.toggleBio = toggleBio;

