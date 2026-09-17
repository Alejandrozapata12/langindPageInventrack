export function initDarkMode() {
  const toggle = document.getElementById('themeToggle');
  if (!toggle) return;

  const STORAGE_KEY = 'inventrack-theme';
  let currentTheme;

  function getPreferredTheme() {
    let stored = null;
    try { stored = localStorage.getItem(STORAGE_KEY); } catch { /* Storage unavailable. */ }
    if (stored) return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function applyTheme(theme) {
    currentTheme = theme === 'light' ? 'light' : 'dark';
    document.body.classList.toggle('light-mode', currentTheme === 'light');
    toggle.setAttribute('aria-label', currentTheme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro');
    const icon = toggle.querySelector('i');
    icon?.classList.toggle('fa-moon', currentTheme === 'dark');
    icon?.classList.toggle('fa-sun', currentTheme === 'light');
    try { localStorage.setItem(STORAGE_KEY, currentTheme); } catch { /* Storage unavailable. */ }
  }

  applyTheme(getPreferredTheme());

  toggle.addEventListener('click', () => {
    applyTheme(currentTheme === 'dark' ? 'light' : 'dark');
  });

  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  mediaQuery.addEventListener?.('change', (e) => {
    let hasStoredTheme = false;
    try { hasStoredTheme = Boolean(localStorage.getItem(STORAGE_KEY)); } catch { return; }
    if (!hasStoredTheme) applyTheme(e.matches ? 'dark' : 'light');
  });
}
