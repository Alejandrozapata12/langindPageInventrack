import { initToasts } from './modules/toast.js';
import { initMenu } from './modules/menu.js';
import { initForm } from './modules/form.js';
import { initRevealAnimations } from './modules/animations.js';
import { initNavbar, initActiveSection } from './modules/navbar.js';
import { initDarkMode } from './modules/darkmode.js';
import { initCarousel } from './modules/carousel.js';
import { initUTM } from './modules/utm.js';

function init() {
  const toast = initToasts();

  initMenu();
  initForm(toast);
  initRevealAnimations();
  initNavbar();
  initActiveSection();
  initDarkMode();
  initCarousel();
  initUTM();

  initFooterLinks(toast);
  initPreloader();
  initScrollTop();
  initModals();
  initServiceWorker();
}

function initFooterLinks(toast) {
  const footerLinks = document.querySelectorAll('.footer-links a[href="#"]');
  footerLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      if (toast) toast.show('Esta sección estará disponible próximamente.', 'info');
    });
  });
}

function initPreloader() {
  const preloader = document.querySelector('.preloader');
  if (!preloader) return;
  const hide = () => {
    preloader.classList.add('hidden');
    window.setTimeout(() => preloader.remove(), 350);
  };
  if (document.readyState === 'complete') hide();
  else window.addEventListener('load', hide, { once: true });
}

function initScrollTop() {
  const button = document.getElementById('scrollTop');
  if (!button) return;
  const update = () => button.classList.toggle('visible', window.scrollY > 300);
  window.addEventListener('scroll', update, { passive: true });
  button.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  update();
}

function initModals() {
  const overlays = document.querySelectorAll('.modal-overlay');
  let lastTrigger = null;
  document.querySelectorAll('[data-open-modal]').forEach((trigger) => {
    trigger.addEventListener('click', (event) => {
      event.preventDefault();
      const modal = document.getElementById(trigger.dataset.openModal);
      if (!modal) return;
      lastTrigger = trigger;
      modal.classList.add('active');
      modal.setAttribute('aria-hidden', 'false');
      modal.querySelector('.modal-close')?.focus();
      document.body.classList.add('modal-open');
    });
  });
  const close = (modal) => {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
    lastTrigger?.focus();
  };
  overlays.forEach((modal) => {
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-hidden', 'true');
    modal.addEventListener('click', (event) => {
      if (event.target === modal) close(modal);
    });
  });
  document.querySelectorAll('[data-close-modal]').forEach((button) => {
    button.addEventListener('click', () => {
      const modal = document.getElementById(button.dataset.closeModal);
      if (modal) close(modal);
    });
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') document.querySelectorAll('.modal-overlay.active').forEach(close);
  });
}

function initServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      const serviceWorkerUrl = new URL('../sw.js', import.meta.url);
      navigator.serviceWorker.register(serviceWorkerUrl.pathname).catch(() => { });
    });
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init, { once: true });
} else {
  init();
}
