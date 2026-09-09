export function initCarousel() {
  const container = document.getElementById('testimonial-track');
  const dots = document.querySelectorAll('.carousel-dot');
  const prevBtn = document.getElementById('carousel-prev');
  const nextBtn = document.getElementById('carousel-next');

  if (!container || !dots.length) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let currentIndex = 0;
  let autoplayTimer;
  const totalSlides = dots.length;

  function goTo(index) {
    if (index < 0) index = totalSlides - 1;
    if (index >= totalSlides) index = 0;

    currentIndex = index;
    const offset = index * 100;
    container.style.transform = `translateX(-${offset}%)`;

    dots.forEach((dot, i) => {
      dot.classList.toggle('bg-brand-600', i === index);
      dot.classList.toggle('bg-gray-300', i !== index);
      dot.classList.toggle('dark:bg-brand-400', i === index);
      dot.classList.toggle('dark:bg-gray-600', i !== index);
      dot.setAttribute('aria-current', i === index ? 'true' : 'false');
    });
  }

  function startAutoplay() {
    if (prefersReducedMotion) return;
    stopAutoplay();
    autoplayTimer = setInterval(() => goTo(currentIndex + 1), 5000);
  }

  function stopAutoplay() {
    clearInterval(autoplayTimer);
  }

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      goTo(i);
      startAutoplay();
    });
  });

  if (prevBtn) prevBtn.addEventListener('click', () => { goTo(currentIndex - 1); startAutoplay(); });
  if (nextBtn) nextBtn.addEventListener('click', () => { goTo(currentIndex + 1); startAutoplay(); });

  let touchStartX = 0;
  container.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
    stopAutoplay();
  }, { passive: true });

  container.addEventListener('touchend', (e) => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      goTo(diff > 0 ? currentIndex + 1 : currentIndex - 1);
    }
    startAutoplay();
  }, { passive: true });

  container.addEventListener('mouseenter', stopAutoplay);
  container.addEventListener('mouseleave', startAutoplay);

  goTo(0);
  startAutoplay();
}
