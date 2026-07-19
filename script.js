// ============================================
// Mobile nav toggle
// ============================================
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navToggle.classList.toggle('open', isOpen);
  navToggle.setAttribute('aria-expanded', isOpen);
});

// close mobile nav when a link is tapped
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// ============================================
// Scroll reveal via IntersectionObserver
// ============================================
const revealEls = document.querySelectorAll('.reveal');

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (prefersReducedMotion) {
  revealEls.forEach(el => el.classList.add('in-view'));
} else {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(el => observer.observe(el));
}

// ============================================
// Copy email to clipboard
// ============================================
const copyEmailBtn = document.getElementById('copyEmail');

if (copyEmailBtn) {
  copyEmailBtn.addEventListener('click', async () => {
    const email = copyEmailBtn.dataset.email;
    try {
      await navigator.clipboard.writeText(email);
      copyEmailBtn.classList.add('copied');
      setTimeout(() => copyEmailBtn.classList.remove('copied'), 2000);
    } catch (err) {
      // fallback: select isn't needed for a button, just log quietly
      console.error('Could not copy email:', err);
    }
  });
}

// ============================================
// Active nav link highlight on scroll
// ============================================
const sections = document.querySelectorAll('main section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navAnchors.forEach(a => {
        a.style.color = a.getAttribute('href') === `#${id}` ? 'var(--off-white)' : '';
      });
    }
  });
}, { threshold: 0.5 });

sections.forEach(section => sectionObserver.observe(section));
