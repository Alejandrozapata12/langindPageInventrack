// --- 1. Sistema de Toasts (Notificaciones) ---
        const toastContainer = document.getElementById('toast-container');
        
        function showToast(message, type = 'info') {
            const colors = {
                success: 'bg-green-600',
                error: 'bg-red-600',
                info: 'bg-brand-600'
            };
            const icons = {
                success: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>',
                error: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>',
                info: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>'
            };

            const toast = document.createElement('div');
            toast.className = `${colors[type]} text-white rounded-xl shadow-2xl p-4 pr-6 flex items-center space-x-3 animate-slide-in-right min-w-[280px] max-w-sm`;
            toast.innerHTML = `
                <svg class="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">${icons[type]}</svg>
                <p class="font-medium text-sm">${message}</p>
            `;
            
            toastContainer.appendChild(toast);

            // Remover después de 4 segundos
            setTimeout(() => {
                toast.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                toast.style.opacity = '0';
                toast.style.transform = 'translateX(100%)';
                setTimeout(() => toast.remove(), 300);
            }, 4000);
        }

        // --- 2. Enlaces del Footer (Próximamente) ---
        const footerLinks = document.querySelectorAll('.footer-link');
        footerLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const message = link.getAttribute('data-toast');
                showToast(message, 'info');
            });
        });

        // --- 3. Menú Hamburguesa ---
        const menuBtn = document.getElementById('menu-btn');
        const mobileMenu = document.getElementById('mobile-menu');
        const menuOpen = document.getElementById('menu-open');
        const menuClose = document.getElementById('menu-close');
        const mobileLinks = document.querySelectorAll('.mobile-link');
        const body = document.body;

        menuBtn.addEventListener('click', () => {
            const isOpen = body.classList.contains('menu-open');
            if (isOpen) {
                body.classList.remove('menu-open');
                mobileMenu.classList.add('opacity-0', 'pointer-events-none');
                menuOpen.classList.remove('hidden');
                menuClose.classList.add('hidden');
                body.style.overflow = 'auto';
            } else {
                body.classList.add('menu-open');
                mobileMenu.classList.remove('opacity-0', 'pointer-events-none');
                menuOpen.classList.add('hidden');
                menuClose.classList.remove('hidden');
                body.style.overflow = 'hidden';
            }
        });

        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                body.classList.remove('menu-open');
                mobileMenu.classList.add('opacity-0', 'pointer-events-none');
                menuOpen.classList.remove('hidden');
                menuClose.classList.add('hidden');
                body.style.overflow = 'auto';
            });
        });

        // --- 4. Animaciones al hacer Scroll ---
        const reveals = document.querySelectorAll('.reveal');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        reveals.forEach(reveal => observer.observe(reveal));

        // --- 5. Demo Interactiva ---
        const demoBtn = document.getElementById('demo-btn');
        const totalUnits = document.getElementById('total-units');
        const progressBar = document.getElementById('progress-bar');
        const progressText = document.getElementById('progress-text');
        const lastUpdate = document.getElementById('last-update');
        const statusBox = document.getElementById('status-box');
        const statusLabel = document.getElementById('status-label');
        const statusValue = document.getElementById('status-value');
        let currentStock = 120;
        const maxStock = 200;

        demoBtn.addEventListener('click', () => {
            if (currentStock > 0) {
                currentStock -= 5;
                totalUnits.textContent = currentStock;
                const percentage = (currentStock / maxStock) * 100;
                progressBar.style.width = percentage + '%';
                progressText.textContent = `${currentStock} / ${maxStock}`;
                lastUpdate.textContent = 'Justo ahora';

                demoBtn.classList.add('scale-95');
                setTimeout(() => demoBtn.classList.remove('scale-95'), 150);

                if (currentStock <= 20) {
                    statusBox.classList.remove('bg-green-50', 'border-green-100');
                    statusBox.classList.add('bg-red-50', 'border-red-100');
                    statusLabel.classList.remove('text-green-700');
                    statusLabel.classList.add('text-red-700');
                    statusValue.classList.remove('text-green-600');
                    statusValue.classList.add('text-red-600');
                    statusValue.textContent = 'Crítico';
                }
            }
        });

        // --- 6. Formulario de Contacto con Toasts ---
        const contactForm = document.getElementById('contact-form');
        const formSuccess = document.getElementById('form-success');
        
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();

            // Validación básica
            if(name === '' || email === '') {
                showToast('Por favor completa los campos obligatorios (*)', 'error');
                return;
            }

            // Simular envío exitoso
            showToast('¡Solicitud enviada con éxito! Te contactaremos pronto.', 'success');
            contactForm.style.display = 'none';
            formSuccess.classList.remove('hidden');
        });

        // --- 7. Efecto Navbar al hacer Scroll ---
        const navbar = document.getElementById('navbar');
        window.addEventListener('scroll', () => {
            if (!body.classList.contains('menu-open')) {
                if (window.scrollY > 30) {
                    navbar.classList.add('shadow-md', 'border-gray-100');
                } else {
                    navbar.classList.remove('shadow-md', 'border-gray-100');
                }
            }
        });