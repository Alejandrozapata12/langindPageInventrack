export function initCarousel() {
    const track = document.getElementById('carouselInner');
    const slides = [...document.querySelectorAll('.carousel-item')];
    const indicators = document.getElementById('carouselIndicators');
    const previous = document.getElementById('prevBtn');
    const next = document.getElementById('nextBtn');
    if (!track || slides.length < 2 || !indicators) return;

    let currentIndex = 0;
    let timer;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const dots = slides.map((_, index) => {
        const dot = document.createElement('button');
        dot.type = 'button';
        dot.className = 'carousel-indicator';
        dot.setAttribute('aria-label', `Mostrar imagen ${index + 1}`);
        dot.addEventListener('click', () => goTo(index));
        indicators.append(dot);
        return dot;
    });

    function render() {
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
        dots.forEach((dot, index) => {
            const active = index === currentIndex;
            dot.classList.toggle('active', active);
            dot.setAttribute('aria-current', String(active));
        });
    }

    function goTo(index) {
        currentIndex = (index + slides.length) % slides.length;
        render();
        restartAutoplay();
    }

    function stopAutoplay() {
        window.clearInterval(timer);
    }

    function restartAutoplay() {
        stopAutoplay();
        if (!reduceMotion && !document.hidden) timer = window.setInterval(() => goTo(currentIndex + 1), 5000);
    }

    previous?.addEventListener('click', () => goTo(currentIndex - 1));
    next?.addEventListener('click', () => goTo(currentIndex + 1));
    track.addEventListener('mouseenter', stopAutoplay);
    track.addEventListener('mouseleave', restartAutoplay);
    document.addEventListener('visibilitychange', restartAutoplay);

    let startX = 0;
    track.addEventListener('touchstart', (event) => {
        startX = event.touches[0].clientX;
        stopAutoplay();
    }, { passive: true });
    track.addEventListener('touchend', (event) => {
        const distance = startX - event.changedTouches[0].clientX;
        if (Math.abs(distance) > 50) goTo(currentIndex + (distance > 0 ? 1 : -1));
        else restartAutoplay();
    }, { passive: true });

    render();
    restartAutoplay();
}
