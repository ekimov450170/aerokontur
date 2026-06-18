/* ============================================================
   АЭРОКОНТУР — main.js
   ============================================================ */

// ── Mobile nav toggle ──────────────────────────────────────
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('is-open');
    navToggle.classList.toggle('is-open', isOpen);
    navToggle.setAttribute('aria-expanded', isOpen);
  });

  // Close nav when a link is clicked
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('is-open');
      navToggle.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// ── Sticky header shadow ───────────────────────────────────
const header = document.querySelector('.site-header');
if (header) {
  const onScroll = () => {
    header.style.boxShadow = window.scrollY > 10
      ? '0 2px 16px rgba(22,32,44,.10)'
      : 'none';
  };
  window.addEventListener('scroll', onScroll, { passive: true });
}

// ── Contact form — Formspree AJAX ─────────────────────────
const form       = document.getElementById('contactForm');
const phoneInput = document.getElementById('phone');
const phoneError = document.getElementById('phoneError');
const submitBtn  = document.getElementById('submitBtn');

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Reset validation
    phoneInput.classList.remove('is-invalid');
    phoneError.classList.remove('is-visible');

    const phone = phoneInput.value.trim();
    const valid = /[\d\s\-\+\(\)]{7,}/.test(phone);

    if (!valid) {
      phoneInput.classList.add('is-invalid');
      phoneError.classList.add('is-visible');
      phoneInput.focus();
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = 'Отправляем…';

    // Check if Formspree ID is configured
    const action = form.getAttribute('action') || '';
    const hasFormspree = action.includes('formspree.io') && !action.includes('YOUR_FORM_ID');

    if (hasFormspree) {
      try {
        const data = new FormData(form);
        const res  = await fetch(action, {
          method: 'POST',
          body: data,
          headers: { 'Accept': 'application/json' }
        });
        if (res.ok) {
          submitBtn.textContent = '✓ Заявка отправлена';
          form.reset();
        } else {
          submitBtn.textContent = 'Ошибка — попробуйте ещё раз';
          submitBtn.disabled = false;
        }
      } catch {
        submitBtn.textContent = 'Нет соединения — попробуйте позже';
        submitBtn.disabled = false;
      }
    } else {
      // Dev mode: simulate
      setTimeout(() => {
        submitBtn.textContent = '✓ Заявка отправлена (тест)';
        form.querySelectorAll('input, select, textarea').forEach(el => { el.disabled = true; });
      }, 800);
    }
  });

  phoneInput.addEventListener('input', () => {
    phoneInput.classList.remove('is-invalid');
    phoneError.classList.remove('is-visible');
  });
}

// ── Scroll reveal (Intersection Observer) ─────────────────
const revealTargets = document.querySelectorAll(
  '.pain-card, .spec-row, .industry-card, .process-card, .trust-badge'
);

if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  revealTargets.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(18px)';
    el.style.transition = `opacity .45s ease ${(i % 4) * 0.07}s, transform .45s ease ${(i % 4) * 0.07}s`;

    // Respect prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.style.opacity = '1';
      el.style.transform = 'none';
      el.style.transition = 'none';
    } else {
      io.observe(el);
    }
  });
}

// ── Active nav link on scroll ──────────────────────────────
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a');

if (sections.length && navItems.length) {
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navItems.forEach(a => {
          a.style.borderBottomColor = a.getAttribute('href') === `#${id}`
            ? 'var(--orange)'
            : 'transparent';
        });
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  sections.forEach(s => sectionObserver.observe(s));
}
