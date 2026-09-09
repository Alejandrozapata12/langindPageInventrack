export function initNavbar() {
  const navbar = document.getElementById('navbar');
  const body = document.body;
  if (!navbar) return;

  function updateNavbar() {
    if (body.classList.contains('menu-open')) return;

    if (window.scrollY > 30) {
      navbar.classList.add('shadow-md', 'border-gray-100', 'dark:border-gray-800');
    } else {
      navbar.classList.remove('shadow-md', 'border-gray-100', 'dark:border-gray-800');
    }
  }

  window.addEventListener('scroll', updateNavbar, { passive: true });
  updateNavbar();
}

export function initActiveSection() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.remove('text-brand-600', 'font-bold', 'dark:text-brand-400');
          link.classList.add('text-gray-600', 'dark:text-gray-300');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('text-brand-600', 'font-bold', 'dark:text-brand-400');
            link.classList.remove('text-gray-600', 'dark:text-gray-300');
          }
        });
      }
    });
  }, { threshold: 0.2, rootMargin: '-80px 0px -50% 0px' });

  sections.forEach(section => observer.observe(section));
}

export function initStickyCTA() {
  const stickyCta = document.getElementById('sticky-cta');
  if (!stickyCta) return;

  const hero = document.getElementById('home');
  let heroBottom = 0;

  function updatePosition() {
    if (hero) {
      heroBottom = hero.offsetTop + hero.offsetHeight;
    }
  }

  updatePosition();
  window.addEventListener('resize', updatePosition, { passive: true });

  window.addEventListener('scroll', () => {
    if (window.scrollY > heroBottom + 100) {
      stickyCta.classList.remove('translate-y-full');
      stickyCta.classList.add('translate-y-0');
    } else {
      stickyCta.classList.add('translate-y-full');
      stickyCta.classList.remove('translate-y-0');
    }
  }, { passive: true });

  window.addEventListener('scroll', () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      const contactTop = contactSection.offsetTop;
      const contactBottom = contactTop + contactSection.offsetHeight;
      if (window.scrollY + window.innerHeight > contactTop && window.scrollY < contactBottom) {
        stickyCta.classList.add('translate-y-full');
      }
    }
  }, { passive: true });
}
