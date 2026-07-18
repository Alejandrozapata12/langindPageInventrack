const translations = {
  es: {
    nav_home: 'Inicio',
    nav_features: 'Características',
    nav_demo: 'Demo',
    nav_gallery: 'Galería',
    nav_versus: 'Comparativa',
    nav_login: 'Iniciar Sesión',
    nav_contact: 'Contacto',
    hero_badge: 'La era del inventario inteligente',
    hero_title_1: 'Deja de adivinar.',
    hero_title_2: 'Empieza a controlar.',
    hero_desc: 'InvenTrack automatiza tu bodega, elimina el error humano y te da métricas en tiempo real para que tomes las mejores decisiones.',
    hero_cta_1: 'Probar Demo Real',
    hero_cta_2: 'Ver Comparativa',
    features_title: 'Todo lo que necesitas en un solo lugar',
    features_desc: 'Olvidate de hojas de Excel desordenadas. InvenTrack automatiza el trabajo pesado para ti.',
    demo_title: 'Demostración Rápida',
    demo_desc: 'Interactúa con nuestra interfaz simulada. Haz clic en "Registrar Salida" para ver la magia.',
    gallery_title: 'Diseñado para ti',
    gallery_desc: 'Una interfaz limpia, intuitiva y lista para usarse en cualquier dispositivo.',
    versus_title: '¿Por qué cambiar?',
    versus_desc: 'El tiempo es dinero. Deja atrás los métodos obsoletos.',
    testimonials_title: 'Lo que dicen nuestros clientes',
    contact_title: 'Hablemos de tu negocio',
    contact_desc: 'Solicita una demostración personalizada y sin compromiso.',
    footer_product: 'Producto',
    footer_company: 'Empresa',
    footer_legal: 'Legal'
  },
  en: {
    nav_home: 'Home',
    nav_features: 'Features',
    nav_demo: 'Demo',
    nav_gallery: 'Gallery',
    nav_versus: 'Comparison',
    nav_login: 'Log In',
    nav_contact: 'Contact',
    hero_badge: 'The era of smart inventory',
    hero_title_1: 'Stop guessing.',
    hero_title_2: 'Start controlling.',
    hero_desc: 'InvenTrack automates your warehouse, eliminates human error, and gives you real-time metrics to make the best decisions.',
    hero_cta_1: 'Try Live Demo',
    hero_cta_2: 'See Comparison',
    features_title: 'Everything you need in one place',
    features_desc: 'Forget messy Excel sheets. InvenTrack automates the heavy lifting for you.',
    demo_title: 'Quick Demo',
    demo_desc: 'Interact with our simulated interface. Click "Simulate Outflow" to see the magic.',
    gallery_title: 'Designed for you',
    gallery_desc: 'A clean, intuitive interface ready to use on any device.',
    versus_title: 'Why switch?',
    versus_desc: 'Time is money. Leave obsolete methods behind.',
    testimonials_title: 'What our clients say',
    contact_title: "Let's talk about your business",
    contact_desc: 'Request a personalized demo with no commitment.',
    footer_product: 'Product',
    footer_company: 'Company',
    footer_legal: 'Legal'
  }
};

export function initI18n() {
  const storedLang = localStorage.getItem('inventrack-lang');
  const browserLang = navigator.language.startsWith('es') ? 'es' : 'en';
  let currentLang = storedLang || browserLang;

  function applyTranslations(lang) {
    currentLang = lang;
    localStorage.setItem('inventrack-lang', lang);
    document.documentElement.lang = lang;

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.dataset.i18n;
      if (translations[lang] && translations[lang][key]) {
        el.textContent = translations[lang][key];
      }
    });
  }

  applyTranslations(currentLang);

  return {
    setLanguage: applyTranslations,
    getLanguage: () => currentLang
  };
}
