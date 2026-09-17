export function initForm(toast) {
    const form = document.getElementById('contactForm');
    const submitButton = form?.querySelector('button[type="submit"]');
    if (!form || !submitButton) return;

    const fields = {
        name: {
            element: form.elements.name,
            validate: (value) => value.length >= 2 ? '' : 'El nombre debe tener al menos 2 caracteres.'
        },
        email: {
            element: form.elements.email,
            validate: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? '' : 'Ingresa un correo electrónico válido.'
        },
        message: {
            element: form.elements.message,
            validate: (value) => value.length >= 10 ? '' : 'El mensaje debe tener al menos 10 caracteres.'
        }
    };

    const validateField = ({ element, validate }) => {
        if (!element) return true;
        const message = validate(element.value.trim());
        element.setCustomValidity(message);
        element.setAttribute('aria-invalid', String(Boolean(message)));
        return !message;
    };

    Object.values(fields).forEach((field) => {
        field.element?.addEventListener('blur', () => validateField(field));
        field.element?.addEventListener('input', () => validateField(field));
    });

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const valid = Object.values(fields).map(validateField).every(Boolean);
        if (!valid) {
            form.reportValidity();
            toast?.show('Por favor corrige los errores del formulario.', 'error');
            return;
        }

        const originalLabel = submitButton.innerHTML;
        submitButton.disabled = true;
        submitButton.setAttribute('aria-busy', 'true');
        submitButton.textContent = 'Enviando...';

        window.setTimeout(() => {
            submitButton.disabled = false;
            submitButton.removeAttribute('aria-busy');
            submitButton.innerHTML = originalLabel;
            form.reset();
            Object.values(fields).forEach(({ element }) => element?.setAttribute('aria-invalid', 'false'));
            toast?.show('Mensaje recibido. Te contactaremos pronto.', 'success');
        }, 800);
    });
}
