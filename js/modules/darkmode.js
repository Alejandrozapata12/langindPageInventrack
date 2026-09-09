export function initDarkMode() {
  const toggle = document.getElementById('dark-mode-toggle');
  if (!toggle) return;

  const html = document.documentElement;
  const STORAGE_KEY = 'inventrack-theme';

  function getPreferredTheme() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function applyTheme(theme) {
    if (theme === 'dark') {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
    localStorage.setItem(STORAGE_KEY, theme);
    toggle.setAttribute('aria-label', theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro');
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
