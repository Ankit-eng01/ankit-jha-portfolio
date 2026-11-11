/**
 * Staff AI Engineer & Full-Stack Systems Architect Script
 * Features: Neural Constellation Background Canvas, Streaming Inference Engine,
 * 3D Shimmer Tilt, Modal Blueprints, and Telemetry Clock.
 */

document.addEventListener('DOMContentLoaded', () => {
  if (window.lucide) {
    window.lucide.createIcons();
  }

  initNeuralCanvas();
  initScrollProgress();
  initScrollAnimations();
  initStatCounters();
  initCardTilt();
  initCursorSpotlight();
  initAISandboxControls();
  initClock();
  initCaseStudyTriggers();
  initProjectFilters();
});

/* ========================================================
   1. FLOATING NEURAL CONSTELLATION CANVAS
   ======================================================== */
function initNeuralCanvas() {
  const canvas = document.getElementById('neuralCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];
  const particleCount = 45; // Subtle, high-performance
  const connectionDistance = 140;

  let mouse = { x: null, y: null };

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  window.addEventListener('resize', resize, { passive: true });
  resize();

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  }, { passive: true });

  window.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  }, { passive: true });

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.45;
      this.vy = (Math.random() - 0.5) * 0.45;
      this.radius = Math.random() * 1.6 + 0.8;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0) this.x = width;
      if (this.x > width) this.x = 0;
      if (this.y < 0) this.y = height;
      if (this.y > height) this.y = 0;

      // Mouse attraction
      if (mouse.x !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 180) {
          this.x += (dx / dist) * 0.4;
          this.y += (dy / dist) * 0.4;
        }
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(56, 189, 248, 0.45)';
      ctx.fill();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();

      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < connectionDistance) {
          const alpha = (1 - dist / connectionDistance) * 0.22;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(56, 189, 248, ${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(animate);
  }

  animate();
}

/* ========================================================
   2. SCROLL PROGRESS INDICATOR
   ======================================================== */
function initScrollProgress() {
  const progressBar = document.getElementById('scrollProgressBar');
  if (!progressBar) return;

  window.addEventListener('scroll', () => {
    const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    progressBar.style.width = scrolled + '%';
  }, { passive: true });
}

/* ========================================================
   3. SCROLL REVEAL ANIMATIONS (Intersection Observer)
   ======================================================== */
function initScrollAnimations() {
  const elements = document.querySelectorAll('.fade-in-scroll');
  
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -40px 0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('is-visible');
        }, index * 60);
        obs.unobserve(entry.target);
      }
    });
  }, observerOptions);

  elements.forEach(el => observer.observe(el));
}

/* ========================================================
   4. ANIMATED NUMBER COUNTERS ON SCROLL
   ======================================================== */
function initStatCounters() {
  const statElements = document.querySelectorAll('.stat-counter');
  let started = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !started) {
        started = true;
        statElements.forEach(counter => {
          const target = +counter.getAttribute('data-target');
          const duration = 1200; // ms
          const stepTime = 20;
          const totalSteps = duration / stepTime;
          let currentStep = 0;

          const timer = setInterval(() => {
            currentStep++;
            const progress = currentStep / totalSteps;
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            const currentVal = Math.floor(easeProgress * target);
            counter.textContent = currentVal;

            if (currentStep >= totalSteps) {
              counter.textContent = target;
              clearInterval(timer);
            }
          }, stepTime);
        });
      }
    });
  }, { threshold: 0.3 });

  const statsSection = document.querySelector('.stat-counter');
  if (statsSection) {
    observer.observe(statsSection.closest('.grid'));
  }
}

/* ========================================================
   5. 3D CARD TILT & GLARE EFFECT ON MOUSEMOVE
   ======================================================== */
function initCardTilt() {
  const cards = document.querySelectorAll('.bento-card, .shimmer-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -4.5;
      const rotateY = ((x - centerX) / centerX) * 4.5;

      card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-6px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    });
  });
}

/* ========================================================
   6. CURSOR SPOTLIGHT TRACKER
   ======================================================== */
function initCursorSpotlight() {
  const spotlight = document.getElementById('cursorSpotlight');
  if (!spotlight) return;

  window.addEventListener('mousemove', (e) => {
    spotlight.style.setProperty('--mouse-x', `${e.clientX}px`);
    spotlight.style.setProperty('--mouse-y', `${e.clientY}px`);
  }, { passive: true });
}

/* ========================================================
   7. AI INFERENCE & STREAMING TESTBENCH SANDBOX
   ======================================================== */
function initAISandboxControls() {
  const tempSlider = document.getElementById('tempSlider');
  const tempLabel = document.getElementById('tempLabel');
  const modelSelect = document.getElementById('aiModelSelect');

  if (tempSlider && tempLabel) {
    tempSlider.addEventListener('input', (e) => {
      const val = (e.target.value / 100).toFixed(2);
      tempLabel.textContent = val;
    });
  }

  if (modelSelect) {
    modelSelect.addEventListener('change', (e) => {
      triggerToast(`Weights loaded: ${e.target.selectedOptions[0].text}`);
    });
  }
}

let isStreaming = false;
function runInferenceStream() {
  if (isStreaming) return;

  const outputEl = document.getElementById('aiStreamOutput');
  const streamStatus = document.getElementById('streamStatus');
  const tokenCounter = document.getElementById('tokenCounter');
  const ttftMetric = document.getElementById('ttftMetric');
  const tpsMetric = document.getElementById('tpsMetric');
  const streamBtn = document.getElementById('streamRunBtn');
  const modelSelect = document.getElementById('aiModelSelect');

  if (!outputEl || !streamStatus || !tokenCounter) return;

  isStreaming = true;
  streamBtn.disabled = true;
  streamBtn.classList.add('opacity-50', 'cursor-not-allowed');

  const modelName = modelSelect ? modelSelect.selectedOptions[0].text.split(' ')[0] : 'Gemini';

  streamStatus.innerHTML = `<span class="w-2 h-2 rounded-full bg-cyan-400 animate-ping inline-block mr-1"></span> Streaming tokens via vLLM WebSocket...`;
  outputEl.innerHTML = '';

  const simulationChunks = [
    `[INFO] Initializing ${modelName} pipeline (KV Cache allocated: 2.8 GB)...`,
    `\n[PLANNER] Intent detected: "Orchestrate zero-latency distributed agent graph".`,
    `\n[VECTOR SEARCH] Querying Qdrant index: 12.8M vectors, cosine distance < 0.12.`,
    `\n[RETRIEVAL] Retrieved 3 top chunks in 11.2ms (Hybrid RRF Score: 0.988).`,
    `\n[AGENT EXECUTION] Spawning sub-agent worker #2 with state checkpoint:`,
    `\n{\n  "status": "synchronized",\n  "throughput_tps": 148.4,\n  "ttft_ms": 12.6,\n  "action": "dispatch_streaming_frame"\n}`,
    `\n[SUCCESS] Response stream completed with zero token regression.`
  ];

  let currentChunkIndex = 0;
  let charIndex = 0;
  let tokenCount = 0;

  setTimeout(() => {
    ttftMetric.textContent = `${(11 + Math.random() * 4).toFixed(1)} ms`;
    tpsMetric.textContent = `${Math.floor(142 + Math.random() * 12)} t/s`;

    const streamInterval = setInterval(() => {
      if (currentChunkIndex < simulationChunks.length) {
        const currentChunk = simulationChunks[currentChunkIndex];
        outputEl.innerHTML += currentChunk.charAt(charIndex);
        charIndex++;
        tokenCount++;
        tokenCounter.textContent = `${tokenCount} tokens generated`;

        if (charIndex >= currentChunk.length) {
          currentChunkIndex++;
          charIndex = 0;
        }
      } else {
        clearInterval(streamInterval);
        isStreaming = false;
        streamBtn.disabled = false;
        streamBtn.classList.remove('opacity-50', 'cursor-not-allowed');
        streamStatus.innerHTML = `<span class="text-emerald-400 font-bold">&check; Stream Finished</span> (100% Deterministic)`;
        triggerToast("Inference pipeline successfully executed at 148 t/s!");
      }
    }, 16);
  }, 200);
}

/* ========================================================
   8. CASE STUDY MODAL MANAGEMENT
   ======================================================== */
let currentProjectId = "placeholder-01";

function initCaseStudyTriggers() {
  const cards = document.querySelectorAll('[data-project-id]');
  cards.forEach(card => {
    card.addEventListener('click', () => {
      const projectId = card.getAttribute('data-project-id');
      if (projectId && window.caseStudiesData && window.caseStudiesData[projectId]) {
        openCaseStudyModal(projectId);
      }
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeCaseStudyModal();
    }
  });

  const modal = document.getElementById('caseStudyModal');
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeCaseStudyModal();
      }
    });
  }
}

function openCaseStudyModal(projectId) {
  const project = window.caseStudiesData[projectId];
  if (!project) return;

  currentProjectId = projectId;
  const modal = document.getElementById('caseStudyModal');
  const title = document.getElementById('modalTitle');
  const subtitle = document.getElementById('modalSubtitle');
  const liveDemoBtn = document.getElementById('modalLiveDemoBtn');

  title.textContent = project.title;
  subtitle.textContent = `${project.role} • ${project.timeline}`;
  liveDemoBtn.href = project.liveUrl;

  switchCaseStudyTab('overview');

  modal.classList.add('open');
  document.body.style.overflow = 'hidden';

  if (window.lucide) window.lucide.createIcons();
}

function closeCaseStudyModal() {
  const modal = document.getElementById('caseStudyModal');
  if (!modal) return;
  modal.classList.remove('open');
  document.body.style.overflow = '';
}

function switchCaseStudyTab(tabKey) {
  const project = window.caseStudiesData[currentProjectId];
  if (!project) return;

  const tabs = document.querySelectorAll('.case-tab');
  tabs.forEach(tab => {
    if (tab.getAttribute('data-tab') === tabKey) {
      tab.classList.add('active', 'bg-white/15', 'text-white');
      tab.classList.remove('text-slate-300');
    } else {
      tab.classList.remove('active', 'bg-white/15', 'text-white');
      tab.classList.add('text-slate-300');
    }
  });

  const modalBody = document.getElementById('modalBody');
  if (!modalBody) return;

  switch (tabKey) {
    case 'overview':
      modalBody.innerHTML = project.overview;
      break;
    case 'ux-design':
      modalBody.innerHTML = project.uxDesign;
      break;
    case 'frontend':
      modalBody.innerHTML = project.frontend;
      break;
    case 'metrics':
      modalBody.innerHTML = project.metrics;
      break;
    default:
      modalBody.innerHTML = project.overview;
  }

  if (window.lucide) window.lucide.createIcons();
}

/* ========================================================
   9. SOFT GLOW ACCENT THEME SWITCHER
   ======================================================== */
function setThemeAccent(accentName) {
  document.body.setAttribute('data-accent', accentName);
  
  const dots = document.querySelectorAll('.theme-dot');
  dots.forEach(dot => {
    if (dot.getAttribute('data-accent') === accentName) {
      dot.classList.add('active-theme');
    } else {
      dot.classList.remove('active-theme');
    }
  });

  triggerToast(`Atmospheric glow set to ${accentName.toUpperCase()}`);
}

/* ========================================================
   10. TOAST NOTIFICATION UTILITY
   ======================================================== */
let toastTimeout;
function triggerToast(message) {
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toastMessage');
  if (!toast || !toastMessage) return;

  toastMessage.textContent = message;
  toast.classList.remove('translate-y-20', 'opacity-0');
  toast.classList.add('translate-y-0', 'opacity-100');

  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove('translate-y-0', 'opacity-100');
    toast.classList.add('translate-y-20', 'opacity-0');
  }, 3200);
}

/* ========================================================
   11. CLI COPY & DIRECT CONTACT UTILITY
   ======================================================== */
function copyCliCommand() {
  const command = 'npx connect-ankit';
  navigator.clipboard.writeText(command).then(() => {
    triggerToast('Copied to clipboard: npx connect-ankit');
  }).catch(() => {
    triggerToast('Command: npx connect-ankit');
  });
}

function handleInquirySubmit(e) {
  e.preventDefault();
  const input = document.getElementById('inquiryEmail');
  if (!input || !input.value) return;

  const email = input.value;
  input.value = '';
  triggerToast(`Telemetry link dispatched for ${email}. Encrypted ping sent to Ankit!`);
}

/* ========================================================
   12. TELEMETRY CLOCK (NEW DELHI / IST)
   ======================================================== */
function initClock() {
  const timeEl = document.getElementById('liveTime');
  if (!timeEl) return;

  function update() {
    const now = new Date();
    timeEl.textContent = now.toLocaleTimeString('en-US', {
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
   13. KILLERPORTFOLIO-STYLE CATEGORY FILTER PILLS
   ======================================================== */
function initProjectFilters() {
  const filterPills = document.querySelectorAll('.filter-pill');
  const projectCards = document.querySelectorAll('#bentoShowcase > article');
  const projectCountEl = document.getElementById('projectCountBadge');

  if (!filterPills.length || !projectCards.length) return;

  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      const category = pill.getAttribute('data-filter');

      // Update active pill styling
      filterPills.forEach(p => {
        p.classList.remove('bg-white', 'text-slate-950', 'border-white');
        p.classList.add('bg-white/[0.06]', 'text-slate-300', 'border-white/10');
      });
      pill.classList.remove('bg-white/[0.06]', 'text-slate-300', 'border-white/10');
      pill.classList.add('bg-white', 'text-slate-950', 'border-white');

      // Filter cards
      let visibleCount = 0;
      projectCards.forEach(card => {
        const cardCategories = (card.getAttribute('data-category') || '').split(' ');
        if (category === 'all' || cardCategories.includes(category)) {
          card.classList.remove('hidden');
          card.style.opacity = '0';
          card.style.transform = 'translateY(12px)';
          setTimeout(() => {
            card.style.transition = 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 30);
          visibleCount++;
        } else {
          card.classList.add('hidden');
        }
      });

      if (projectCountEl) {
        projectCountEl.textContent = `${visibleCount} Systems`;
      }
    });
  });
}

function handleNewsletterSubmit(e) {
  e.preventDefault();
  const input = document.getElementById('newsletterEmail');
  if (!input || !input.value) return;

  const email = input.value;
  input.value = '';
  triggerToast(`Subscribed ${email}! You'll receive Ankit's breakthrough AI dispatches.`);
}
