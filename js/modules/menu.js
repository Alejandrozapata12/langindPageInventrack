export function initMenu() {
  const menuBtn = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('navMenu');
  const overlay = document.getElementById('navOverlay');
  const mobileLinks = mobileMenu?.querySelectorAll('a') || [];
  const body = document.body;

  if (!menuBtn || !mobileMenu) return;

  function openMenu() {
    body.classList.add('menu-open');
    mobileMenu.classList.add('active');
    overlay?.classList.add('active');
    body.classList.add('menu-open');
    menuBtn.setAttribute('aria-expanded', 'true');

    mobileLinks.forEach((link, i) => {
      link.removeAttribute('style');
    });
  }

  function closeMenu() {
    body.classList.remove('menu-open');
    mobileMenu.classList.remove('active');
    overlay?.classList.remove('active');
    body.classList.remove('menu-open');
    menuBtn.setAttribute('aria-expanded', 'false');
  }

  menuBtn.addEventListener('click', () => {
    if (body.classList.contains('menu-open')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  overlay?.addEventListener('click', closeMenu);

  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  return { openMenu, closeMenu };
}
