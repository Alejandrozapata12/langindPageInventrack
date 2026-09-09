const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function initRevealAnimations() {
  if (prefersReducedMotion) {
    document.querySelectorAll('.reveal').forEach(el => {
      el.classList.add('active');
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
    return;
  }

  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, idx) => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const delay = el.dataset.delay || 0;
        setTimeout(() => {
          el.classList.add('active');
        }, parseInt(delay));
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  reveals.forEach((reveal, index) => {
    if (!reveal.dataset.delay) {
      const parent = reveal.closest('.grid, .flex');
      if (parent) {
        const siblings = Array.from(parent.querySelectorAll('.reveal'));
        const sibIndex = siblings.indexOf(reveal);
        reveal.dataset.delay = sibIndex * 100;
      }
    }
    observer.observe(reveal);
  });
}

export function initCounters() {
  if (prefersReducedMotion) return;

  const counters = document.querySelectorAll('[data-counter]');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => observer.observe(counter));
}

function animateCounter(el) {
  const target = el.dataset.counter;
  const prefix = el.dataset.prefix || '';
  const suffix = el.dataset.suffix || '';
  const duration = 2000;
  const start = performance.now();

  if (isNaN(parseFloat(target))) return;

  const numTarget = parseFloat(target);
  const isFloat = target.includes('.');

  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = numTarget * eased;

    el.textContent = prefix + (isFloat ? current.toFixed(0) : Math.floor(current)) + suffix;

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      el.textContent = prefix + target + suffix;
    }
  }

  requestAnimationFrame(update);
}

export function init3DTilt() {
  if (prefersReducedMotion) return;

  const cards = document.querySelectorAll('.tilt-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(1000px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) scale(1.02)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transition = 'transform 0.5s ease';
      card.style.transform = 'perspective(1000px) rotateY(0) rotateX(0) scale(1)';
      setTimeout(() => { card.style.transition = ''; }, 500);
    });
  });
}

export function isReducedMotion() {
  return prefersReducedMotion;
}
