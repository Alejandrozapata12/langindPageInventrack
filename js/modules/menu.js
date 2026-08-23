export function initMenu() {
  const menuBtn = document.getElementById('menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuOpen = document.getElementById('menu-icon-open');
  const menuClose = document.getElementById('menu-icon-close');
  const mobileLinks = document.querySelectorAll('.mobile-menu-link');
  const body = document.body;

  if (!menuBtn || !mobileMenu) return;

  function openMenu() {
    body.classList.add('menu-open');
    mobileMenu.classList.remove('opacity-0', 'pointer-events-none');
    menuOpen.classList.add('hidden');
    menuClose.classList.remove('hidden');
    body.style.overflow = 'hidden';
    menuBtn.setAttribute('aria-expanded', 'true');

    mobileLinks.forEach((link, i) => {
      link.style.opacity = '0';
      link.style.transform = 'translateY(20px)';
      setTimeout(() => {
        link.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        link.style.opacity = '1';
        link.style.transform = 'translateY(0)';
      }, 100 + i * 80);
    });
  }

  function closeMenu() {
    body.classList.remove('menu-open');
    mobileMenu.classList.add('opacity-0', 'pointer-events-none');
    menuOpen.classList.remove('hidden');
    menuClose.classList.add('hidden');
    body.style.overflow = 'auto';
    menuBtn.setAttribute('aria-expanded', 'false');
  }

  menuBtn.addEventListener('click', () => {
    if (body.classList.contains('menu-open')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  return { openMenu, closeMenu };
}
