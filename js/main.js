import { initToasts } from './modules/toast.js';
import { initMenu } from './modules/menu.js';
import { initDemo } from './modules/demo.js';
import { initForm } from './modules/form.js';
import { initRevealAnimations, initCounters, init3DTilt } from './modules/animations.js';
import { initNavbar, initActiveSection, initStickyCTA } from './modules/navbar.js';
import { initDarkMode } from './modules/darkmode.js';
import { initCarousel } from './modules/carousel.js';
import { initPopup } from './modules/popup.js';
import { initUTM } from './modules/utm.js';
import { initI18n } from './modules/i18n.js';

document.addEventListener('DOMContentLoaded', () => {
  const toast = initToasts();

  initMenu();
  initDemo(toast);
  initForm(toast);
  initRevealAnimations();
  initCounters();
  init3DTilt();
  initNavbar();
  initActiveSection();
  initStickyCTA();
  initDarkMode();
  initCarousel();
  initPopup();
  initUTM();
  initI18n();

  initFooterLinks(toast);
  initServiceWorker();
});

function initFooterLinks(toast) {
  const footerLinks = document.querySelectorAll('.footer-link');
  footerLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const message = link.getAttribute('data-toast');
      if (message && toast) toast.show(message, 'info');
    });
  });
}

function initServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js').catch(() => {});
    });
  }
}
