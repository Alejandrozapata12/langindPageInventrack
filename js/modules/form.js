export function initForm(toast) {
  const form = document.getElementById('contact-form');
  const formSuccess = document.getElementById('form-success');
  const submitBtn = document.getElementById('submit-btn');

  if (!form) return;

  const fields = {
    name: {
      el: document.getElementById('name'),
      error: document.getElementById('name-error'),
      validate: (v) => v.length >= 2 ? '' : 'El nombre debe tener al menos 2 caracteres.'
    },
    email: {
      el: document.getElementById('email'),
      error: document.getElementById('email-error'),
      validate: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? '' : 'Ingresa un correo electrónico válido.'
    },
    phone: {
      el: document.getElementById('phone'),
      error: document.getElementById('phone-error'),
      validate: (v) => v === '' || /^[\+]?[\d\s\-\(\)]{7,15}$/.test(v) ? '' : 'Formato de teléfono no válido.'
    }
  };

  function validateField(key) {
    const field = fields[key];
    if (!field || !field.el) return true;

    const value = field.el.value.trim();
    const error = field.validate(value);

    if (error) {
      field.el.classList.add('border-red-500', 'dark:border-red-400');
      field.el.classList.remove('border-gray-300', 'dark:border-gray-600', 'border-green-500', 'dark:border-green-400');
      field.el.setAttribute('aria-invalid', 'true');
      if (field.error) {
        field.error.textContent = error;
        field.error.classList.remove('hidden');
      }
      return false;
    } else {
      field.el.classList.remove('border-red-500', 'dark:border-red-400');
      field.el.classList.add('border-green-500', 'dark:border-green-400');
      field.el.setAttribute('aria-invalid', 'false');
      if (field.error) {
        field.error.textContent = '';
        field.error.classList.add('hidden');
      }
      return true;
    }
  }

  Object.keys(fields).forEach(key => {
    const field = fields[key];
    if (field.el) {
      field.el.addEventListener('input', () => validateField(key));
      field.el.addEventListener('blur', () => validateField(key));
    }
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let allValid = true;
    Object.keys(fields).forEach(key => {
      if (!validateField(key)) allValid = false;
    });

    if (!allValid) {
      if (toast) toast.show('Por favor corrige los errores del formulario.', 'error');
      return;
    }

    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <svg class="animate-spin -ml-1 mr-2 h-5 w-5 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      Enviando...
    `;

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = `<span class="success-check hidden"><svg class="w-5 h-5 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg></span>¡Enviado!`;

      if (toast) toast.show('¡Solicitud enviada con éxito! Te contactaremos pronto.', 'success');

      const successCheck = submitBtn.querySelector('.success-check');
      if (successCheck) successCheck.classList.remove('hidden');

      form.classList.add('hidden');
      formSuccess.classList.remove('hidden');

      setTimeout(() => {
        submitBtn.innerHTML = 'Enviar Solicitud';
        const sc = submitBtn.querySelector('.success-check');
        if (sc) sc.classList.add('hidden');
      }, 3000);
    }, 1500);
  });
}
