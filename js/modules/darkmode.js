export function initDarkMode() {
  const toggle = document.getElementById('themeToggle');
  if (!toggle) return;

  const html = document.documentElement;
  const STORAGE_KEY = 'inventrack-theme';

  function getPreferredTheme() {
    let stored = null;
    try { stored = localStorage.getItem(STORAGE_KEY); } catch { /* Storage unavailable. */ }
    if (stored) return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function applyTheme(theme) {
    document.body.classList.toggle('light-mode', theme === 'light');
    toggle.setAttribute('aria-label', theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro');
    const icon = toggle.querySelector('i');
    icon?.classList.toggle('fa-moon', theme === 'dark');
    icon?.classList.toggle('fa-sun', theme === 'light');
    try { localStorage.setItem(STORAGE_KEY, theme); } catch { /* Storage unavailable. */ }
  }

  applyTheme(getPreferredTheme());

  toggle.addEventListener('click', () => {
    const current = html.classList.contains('dark') ? 'dark' : 'light';
    applyTheme(current === 'dark' ? 'light' : 'dark');
  });

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem(STORAGE_KEY)) {
      applyTheme(e.matches ? 'dark' : 'light');
    }
  });
}
