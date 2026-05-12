// ACE Performance Gym — Main JS

// Mobile nav toggle
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

// Dropdown toggles (mobile tap)
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

// Close mobile nav on outside click
document.addEventListener('click', e => {
  if (!e.target.closest('.site-nav') && navMenu?.classList.contains('open')) {
    navMenu.classList.remove('open');
    navToggle?.classList.remove('open');
    navToggle?.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }
});

// Close on nav link click (mobile)
navMenu?.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    navMenu.classList.remove('open');
    navToggle?.classList.remove('open');
    navToggle?.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  });
});

// Nav scroll opacity
const siteNav = document.querySelector('.site-nav');
if (siteNav) {
  const onScroll = () => {
    siteNav.style.background = window.scrollY > 40
      ? 'rgba(0,0,0,0.97)'
      : 'rgba(5,5,5,0.9)';
  };
  window.addEventListener('scroll', onScroll, { passive: true });
}

// Active link highlight
const currentFile = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-link[href]').forEach(link => {
  if (link.getAttribute('href') === currentFile) {
    link.classList.add('active');
  }
});

// Smooth anchor scroll
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = (parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 72) + 16;
      window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - offset, behavior: 'smooth' });
    }
  });
});

// Scroll reveal
if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('[data-reveal]').forEach(el => revealObserver.observe(el));
}
