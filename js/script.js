// --- Preloader ---
    window.addEventListener('load', () => {
      setTimeout(() => {
        document.querySelector('.preloader').classList.add('hidden');
      }, 1000);
    });

    // --- Scroll animations ---
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);
    document.querySelectorAll('.fade-in').forEach(el => {
      observer.observe(el);
    });

    // --- Navbar scroll effect ---
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });

    // --- Navbar active link ---
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section[id]');

    function updateActiveLink() {
      let index = sections.length;

      while(--index && window.scrollY + 50 < sections[index].offsetTop) {}
      navLinks.forEach((link) => link.classList.remove('active'));
      if (index >= 0) {
        const activeLink = document.querySelector(`.nav-links a[data-section="${sections[index].id}"]`);
        if (activeLink) activeLink.classList.add('active');
      }
    }

    window.addEventListener('scroll', updateActiveLink);

    // --- Theme toggle ---
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle.querySelector('i');
    themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('light-mode');
      if (document.body.classList.contains('light-mode')) {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
      } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
      }
    });

    // --- Carousel ---
    let currentSlide = 0;
    const carouselInner = document.getElementById('carouselInner');
    const slides = document.querySelectorAll('.carousel-item');
    const totalSlides = slides.length;
    const indicatorsContainer = document.getElementById('carouselIndicators');

    for (let i = 0; i < totalSlides; i++) {
      const indicator = document.createElement('button');
      indicator.classList.add('carousel-indicator');
      if (i === 0) indicator.classList.add('active');
      indicator.addEventListener('click', () => {
        currentSlide = i;
        updateCarousel();
      });
      indicatorsContainer.appendChild(indicator);
    }
    const indicators = document.querySelectorAll('.carousel-indicator');

    function updateCarousel() {
      carouselInner.style.transform = `translateX(-${currentSlide * 100}%)`;
      indicators.forEach((indicator, index) => {
        if (index === currentSlide) {
          indicator.classList.add('active');
        } else {
          indicator.classList.remove('active');
        }
      });
    }

    document.getElementById('nextBtn').addEventListener('click', () => {
      currentSlide = (currentSlide + 1) % totalSlides;
      updateCarousel();
    });
    document.getElementById('prevBtn').addEventListener('click', () => {
      currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
      updateCarousel();
    });

    let autoplayInterval = setInterval(() => {
      currentSlide = (currentSlide + 1) % totalSlides;
      updateCarousel();
    }, 5000);

    const carousel = document.querySelector('.carousel');
    carousel.addEventListener('mouseenter', () => {
      clearInterval(autoplayInterval);
    });
    carousel.addEventListener('mouseleave', () => {
      autoplayInterval = setInterval(() => {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateCarousel();
      }, 5000);
    });
    
    // --- Touch/Swipe Support for Carousel ---
    let touchStartX = 0;
    let touchEndX = 0;
    
    carousel.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
      clearInterval(autoplayInterval);
    }, { passive: true });
    
    carousel.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
      // Restart autoplay after swipe
      autoplayInterval = setInterval(() => {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateCarousel();
      }, 5000);
    }, { passive: true });
    
    function handleSwipe() {
      const swipeThreshold = 50;
      const diff = touchStartX - touchEndX;
      
      if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
          // Swipe left - next slide
          currentSlide = (currentSlide + 1) % totalSlides;
        } else {
          // Swipe right - previous slide
          currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        }
        updateCarousel();
      }
    }
    
    // --- Keyboard Navigation for Carousel ---
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateCarousel();
      } else if (e.key === 'ArrowRight') {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateCarousel();
      }
    });

    // --- Scroll to top button ---
    const scrollTopBtn = document.getElementById('scrollTop');
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        scrollTopBtn.classList.add('visible');
      } else {
        scrollTopBtn.classList.remove('visible');
      }
    });
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });

    // --- Contact form ---
    const contactForm = document.getElementById('contactForm');
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('¡Gracias por tu mensaje! Nos pondremos en contacto contigo pronto.');
      contactForm.reset();
    });

    // --- Mobile Hamburger Menu ---
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navOverlay = document.getElementById('navOverlay');
    
    function toggleMobileMenu() {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
      navOverlay.classList.toggle('active');
      document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    }
    
    hamburger.addEventListener('click', toggleMobileMenu);
    
    // Close menu when clicking on overlay
    if (navOverlay) {
      navOverlay.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        navOverlay.classList.remove('active');
        document.body.style.overflow = '';
      });
    }
    
    // Close menu when clicking on a link
    document.querySelectorAll('.nav-menu .nav-links a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        if (navOverlay) navOverlay.classList.remove('active');
        document.body.style.overflow = '';
      });
    });

    // --- Modal Functions ---
    window.openModal = function(modalId) {
      const modal = document.getElementById(modalId);
      if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    };
    
    window.closeModal = function(modalId) {
      const modal = document.getElementById(modalId);
      if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
      }
    };
    
    // Close modal when clicking outside
    document.querySelectorAll('.modal-overlay').forEach(modal => {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.classList.remove('active');
          document.body.style.overflow = '';
        }
      });
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        document.querySelectorAll('.modal-overlay.active').forEach(modal => {
          modal.classList.remove('active');
          document.body.style.overflow = '';
        });
      }
    });

    // --- Footer links - "Aún no disponible" ---
    document.querySelectorAll('.footer-links a').forEach(link => {
      if (!link.getAttribute('href').includes('#')) {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          const notification = document.createElement('div');
          notification.innerHTML = `
            <div style="
              position: fixed;
              top: 20px;
              right: 20px;
              background: linear-gradient(135deg, var(--accent), #5d4bb7);
              color: white;
              padding: 1rem 1.5rem;
              border-radius: 10px;
              box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
              z-index: 10000;
              animation: slideInRight 0.3s ease;
              font-family: 'Poppins', sans-serif;
            ">
              <i class="fas fa-info-circle"></i> Esta sección estará disponible próximamente
            </div>
          `;
          document.body.appendChild(notification);
          setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transition = 'opacity 0.3s ease';
            setTimeout(() => notification.remove(), 300);
          }, 3000);
        });
      }
    });

    const style = document.createElement('style');
    style.textContent = `
      @keyframes slideInRight {
        from {
          transform: translateX(400px);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }
    `;
    document.head.appendChild(style);
