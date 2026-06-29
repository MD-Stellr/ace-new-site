// ACE Performance Gym — Main JS

// ── Mobile nav toggle ─────────────────────────────────
const navToggle = document.getElementById('navToggle');
const navMenu   = document.getElementById('navMenu');

if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    const open = navMenu.classList.toggle('open');
    navToggle.classList.toggle('open', open);
    navToggle.setAttribute('aria-expanded', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });
}

// ── Dropdown toggles (mobile tap) ─────────────────────
document.querySelectorAll('.dropdown-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const item    = btn.closest('.nav-item');
    const wasOpen = item.classList.contains('open');
    document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('open'));
    if (!wasOpen) {
      item.classList.add('open');
      btn.setAttribute('aria-expanded', 'true');
    } else {
      btn.setAttribute('aria-expanded', 'false');
    }
  });
});

// ── In-overlay close button ───────────────────────────
const navClose = document.getElementById('navClose');
if (navClose && navMenu && navToggle) {
  navClose.addEventListener('click', () => {
    navMenu.classList.remove('open');
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  });
}

// ── Close mobile nav on outside click ─────────────────
document.addEventListener('click', e => {
  if (!e.target.closest('.site-nav') && navMenu?.classList.contains('open')) {
    navMenu.classList.remove('open');
    navToggle?.classList.remove('open');
    navToggle?.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }
});

// ── Close on nav link click (mobile) ──────────────────
navMenu?.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    navMenu.classList.remove('open');
    navToggle?.classList.remove('open');
    navToggle?.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  });
});

// ── Nav scroll opacity ────────────────────────────────
const siteNav = document.querySelector('.site-nav');
if (siteNav) {
  const onScroll = () => {
    siteNav.style.background = window.scrollY > 40
      ? 'rgba(0,0,0,0.97)'
      : 'rgba(5,5,5,0.9)';
  };
  window.addEventListener('scroll', onScroll, { passive: true });
}

// ── Active link highlight ─────────────────────────────
const currentFile = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-link[href]').forEach(link => {
  if (link.getAttribute('href') === currentFile) {
    link.classList.add('active');
  }
});

// ── Custom smooth scroll (ease-out quart) ────────────
function smoothScrollTo(y, duration) {
  const start = window.scrollY;
  const diff  = y - start;
  if (Math.abs(diff) < 2) return;
  let t0 = null;
  function step(ts) {
    if (!t0) t0 = ts;
    const elapsed = ts - t0;
    const t = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - t, 4);
    window.scrollTo(0, start + diff * eased);
    if (t < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = (parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 72) + 16;
      smoothScrollTo(target.getBoundingClientRect().top + window.scrollY - offset, 960);
    }
  });
});

// ── Auto scroll-reveal injection ──────────────────────
(function injectReveal() {
  // Apply data-reveal to elements, with optional per-parent staggering
  function apply(sel, dir, stagger) {
    const els = document.querySelectorAll(sel);
    if (!stagger) {
      els.forEach(el => {
        if (!el.hasAttribute('data-reveal')) el.setAttribute('data-reveal', dir);
      });
      return;
    }
    const groups = new Map();
    els.forEach(el => {
      const key = el.parentElement;
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key).push(el);
    });
    groups.forEach(items => {
      items.forEach((el, i) => {
        if (!el.hasAttribute('data-reveal')) {
          el.setAttribute('data-reveal', dir);
          if (i > 0) el.setAttribute('data-reveal-delay', String(Math.min(i, 6)));
        }
      });
    });
  }

  // Section headings
  apply('.section-label',            '',       false);
  apply('.section-title',            '',       false);
  apply('.section-sub',              '',       false);
  apply('.breadcrumb',               '',       false);
  apply('.rates-note',               '',       false);
  apply('.rates-note-box',           '',       false);
  apply('.pricing-section-divider',  '',       false);
  apply('.highlight-stat',           '',       false);

  // Cards — staggered within their grids
  apply('.pricing-card',     '',       true);
  apply('.review-card',      '',       true);
  apply('.pack-card',        '',       true);
  apply('.detail-card',      '',       true);
  apply('.hours-card',       '',       true);
  apply('.award-card',       '',       true);
  apply('.instructor-card',  '',       true);
  apply('.add-on-card',      '',       true);
  apply('.glass-card',       '',       true);
  apply('.media-card',       '',       true);
  apply('.media-frame',      'scale',  true);
  apply('.pt-card',          '',       true);
  apply('.class-card',       '',       true);
  apply('.amenity-block',    '',       true);
  apply('.promo-block',      '',       false);

  // Gallery items
  apply('.gallery-item',      'scale', true);
  apply('.gallery-roof-item', 'scale', true);

  // Stats
  apply('.stat-item',   'scale', true);
  apply('.about-stat',  'scale', true);
  apply('.inbody-stat', 'scale', true);

  // Steps / process
  apply('.step',          'left',  true);
  apply('.guarantee-box', '',      false);

  // About section — left/right split
  apply('.about-text', 'left',  false);
  apply('.about-card', 'right', false);

  // Facility alternating
  apply('.facility-text', 'left',  false);
  apply('.facility-img',  'scale', false);

  // Trainer card
  apply('.trainer-card', '', false);

  // Roof page
  apply('.roof-text',         'left',  false);
  apply('.roof-img',          'scale', false);
  apply('.day-pass-card',     '',      false);
  apply('.contact-box',       '',      false);
  apply('.badge-strip-inner', '',      false);

  // Trust bar items
  apply('.trust-item', '', true);

  // Page hero & home hero content
  apply('.page-hero-content', '', false);
  apply('.hero-content',      '', false);

  // CTA
  apply('.cta-banner .cta-btns', '', false);
})();

// ── Scroll reveal observer ────────────────────────────
if ('IntersectionObserver' in window) {
  const revealObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -48px 0px' });

  document.querySelectorAll('[data-reveal]').forEach(el => revealObs.observe(el));
}

// ── Counter animations ────────────────────────────────
(function initCounters() {
  if (!('IntersectionObserver' in window)) return;

  // Only target simple text nodes (no child elements)
  const candidates = [
    ...document.querySelectorAll('.stat-num, .about-stat strong, .inbody-stat strong'),
    ...[...document.querySelectorAll('.pack-price, .add-on-price')].filter(el => el.children.length === 0),
  ];

  if (!candidates.length) return;

  function animateCount(el) {
    const raw = el.textContent.trim();
    const m = raw.match(/^([+$]?)(\d+(?:\.\d+)?)(K|%|\+|s)?$/);
    if (!m) return;
    const prefix  = m[1];
    const target  = parseFloat(m[2]);
    const suffix  = m[3] || '';
    const decimal = m[2].includes('.');
    const dur     = 1500;
    let t0 = null;
    function tick(ts) {
      if (!t0) t0 = ts;
      const p = Math.min((ts - t0) / dur, 1);
      const e = 1 - Math.pow(1 - p, 3);
      const v = target * e;
      el.textContent = prefix + (decimal ? v.toFixed(2) : Math.floor(v)) + suffix;
      if (p < 1) requestAnimationFrame(tick);
      else el.textContent = prefix + (decimal ? target.toFixed(2) : String(target)) + suffix;
    }
    requestAnimationFrame(tick);
  }

  const counterObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      counterObs.unobserve(entry.target);
      animateCount(entry.target);
    });
  }, { threshold: 0.5 });

  candidates.forEach(el => counterObs.observe(el));
})();

// ── Event popup — HIIT Club × Red Bull (3-Year Anniversary) ──
(function eventPopup() {
  const POPUP_ENABLED = true;                 // set false to disable site-wide
  const TICKETS_URL   = 'https://tixfox.co/e/RtxNxgO50o';  // Red Bull event tickets
  const STORAGE_KEY   = 'ace-redbull-2026-07-16';  // bump to re-show after a dismiss

  if (!POPUP_ENABLED) return;
  try { if (sessionStorage.getItem(STORAGE_KEY)) return; } catch (e) {}

  const ticketAttrs = (TICKETS_URL && TICKETS_URL !== '#')
    ? `href="${TICKETS_URL}" target="_blank" rel="noopener noreferrer"`
    : `href="#" aria-disabled="true"`;

  const overlay = document.createElement('div');
  overlay.className = 'ace-pop';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-label', 'HIIT Club x Red Bull rooftop event');
  overlay.innerHTML = `
    <div class="ace-pop-card">
      <button class="ace-pop-close" type="button" aria-label="Close">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
      <div class="ace-pop-media">
        <img src="event-redbull.jpg" alt="Red Bull can on the ACE rooftop turf at golden hour" loading="lazy" />
      </div>
      <div class="ace-pop-banner">
        <p class="ace-pop-eyebrow">ACE × Red Bull · 3-Year Anniversary</p>
        <h2 class="ace-pop-title">HIIT Club <span>×</span> Red Bull</h2>
        <p class="ace-pop-sub">A rooftop celebration where fitness, community &amp; energy collide.</p>
      </div>
      <div class="ace-pop-body">
        <div class="ace-pop-facts">
          <div class="ace-pop-fact">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            <span><strong>July 16</strong> · 7 PM – Late</span>
          </div>
          <div class="ace-pop-fact">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 12-9 12s-9-5-9-12a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
            <span><strong>ACE Performance Gym</strong> · Rooftop</span>
          </div>
        </div>
        <p class="ace-pop-lead">Kick off with a 45-minute HIIT workout (7:15–8 PM) led by Massimo Barbera, then “The HIIT Battle” — two teams go head to head for entry into an exclusive Red Bull giveaway.</p>
        <ul class="ace-pop-list">
          <li>Complimentary Red Bull &amp; themed activations</li>
          <li>Live DJ entertainment from 8 PM onwards</li>
          <li>Incredible city views &amp; community</li>
        </ul>
        <a class="btn-primary ace-pop-cta" ${ticketAttrs}>Get Tickets</a>
        <p class="ace-pop-note">Weather policy: in the event of unforeseen weather conditions, an alternate event date will be announced and communicated to all registered attendees.</p>
      </div>
    </div>`;

  document.body.appendChild(overlay);

  const close = () => {
    overlay.classList.remove('is-open');
    document.body.style.overflow = '';
    try { sessionStorage.setItem(STORAGE_KEY, '1'); } catch (e) {}
    setTimeout(() => overlay.remove(), 400);
  };

  overlay.querySelector('.ace-pop-close').addEventListener('click', close);
  overlay.addEventListener('click', e => { if (e.target === overlay) close(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });

  // Reveal after a short beat so the page settles first
  setTimeout(() => {
    overlay.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }, 1200);
})();
