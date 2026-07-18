export function initPopup() {
  if (sessionStorage.getItem('popup-shown')) return;

  let hasTriggered = false;

  document.addEventListener('mouseout', (e) => {
    if (hasTriggered) return;
    if (e.clientY < 5 && e.relatedTarget === null) {
      showExitPopup();
      hasTriggered = true;
    }
  });

  document.addEventListener('keydown', (e) => {
    if (hasTriggered) return;
    if (e.key === 'Escape' && document.activeElement === document.body) {
      showExitPopup();
      hasTriggered = true;
    }
  });

  function showExitPopup() {
    sessionStorage.setItem('popup-shown', 'true');

    const overlay = document.createElement('div');
    overlay.id = 'exit-popup-overlay';
    overlay.className = 'fixed inset-0 bg-black/60 z-[200] flex items-center justify-center p-4 backdrop-blur-sm';
    overlay.style.opacity = '0';
    overlay.style.transition = 'opacity 0.3s ease';

    overlay.innerHTML = `
      <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-md w-full p-8 relative transform scale-90 transition-transform duration-300" id="exit-popup-modal">
        <button id="exit-popup-close" class="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition" aria-label="Cerrar popup">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
        <div class="text-center">
          <div class="w-16 h-16 bg-brand-100 dark:bg-brand-900 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg class="w-8 h-8 text-brand-600 dark:text-brand-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
          </div>
          <h3 class="font-heading text-2xl font-bold text-gray-900 dark:text-white mb-3">¿Listo para dejar el Excel?</h3>
          <p class="text-gray-500 dark:text-gray-400 mb-8">Prueba InvenTrack gratis y transforma la gestión de tu inventario.</p>
          <a href="https://alejandrozapata12.github.io/inventrack_system/" target="_blank" rel="noopener noreferrer" class="block bg-brand-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-brand-700 transition shadow-lg shadow-brand-600/30 mb-3">
            Probar Gratis Ahora
          </a>
          <button id="exit-popup-dismiss" class="text-sm text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition">
            No, gracias
          </button>
        </div>
      </div>
    `;

    document.body.appendChild(overlay);

    requestAnimationFrame(() => {
      overlay.style.opacity = '1';
      overlay.querySelector('#exit-popup-modal').style.transform = 'scale(1)';
    });

    function closePopup() {
      overlay.style.opacity = '0';
      overlay.querySelector('#exit-popup-modal').style.transform = 'scale(0.9)';
      setTimeout(() => overlay.remove(), 300);
    }

    overlay.querySelector('#exit-popup-close').addEventListener('click', closePopup);
    overlay.querySelector('#exit-popup-dismiss').addEventListener('click', closePopup);
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closePopup();
    });
  }
}
