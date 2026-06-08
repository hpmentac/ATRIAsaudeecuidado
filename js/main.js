document.addEventListener('DOMContentLoaded', function () {

  const header = document.getElementById('header');
  const menuToggle = document.getElementById('menuToggle');
  const mainNav = document.getElementById('mainNav');

  // ---- Header shadow on scroll ----
  window.addEventListener('scroll', () => {
    header.style.boxShadow = window.scrollY > 50
      ? '0 4px 20px rgba(0,0,0,.12)'
      : '0 2px 8px rgba(0,0,0,.07)';
  }, { passive: true });

  // ---- Menu hambúrguer ----
  menuToggle.addEventListener('click', () => {
    const open = mainNav.classList.toggle('open');
    menuToggle.classList.toggle('open', open);
    menuToggle.setAttribute('aria-expanded', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });

  // Fechar ao clicar em link
  mainNav.querySelectorAll('.nav__link:not(.nav__has-dropdown > .nav__link), .nav__dropdown a, .nav__cta').forEach(link => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('open');
      menuToggle.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  // Dropdown mobile
  const dropdownParent = document.querySelector('.nav__has-dropdown');
  if (dropdownParent) {
    dropdownParent.querySelector('.nav__link').addEventListener('click', e => {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        dropdownParent.classList.toggle('open');
      }
    });
  }

  // Fechar ao clicar fora
  document.addEventListener('click', e => {
    if (mainNav.classList.contains('open') && !mainNav.contains(e.target) && !menuToggle.contains(e.target)) {
      mainNav.classList.remove('open');
      menuToggle.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });

  // ---- FAQ Accordion ----
  document.querySelectorAll('.faq-item__btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i => {
        i.classList.remove('open');
        i.querySelector('.faq-item__btn').setAttribute('aria-expanded', 'false');
      });
      if (!isOpen) {
        item.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // ---- Formulário ----
  const form = document.getElementById('contactForm');
  const successMsg = document.getElementById('formSuccess');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      let valid = true;
      form.querySelectorAll('[required]').forEach(f => {
        if (!f.value.trim()) {
          f.style.borderColor = '#e53e3e';
          valid = false;
        }
      });
      if (!valid) return;

      const btn = form.querySelector('button[type="submit"]');
      btn.disabled = true;
      btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';

      setTimeout(() => {
        btn.style.display = 'none';
        successMsg.style.display = 'flex';
        form.reset();
      }, 1400);
    });
    form.querySelectorAll('[required]').forEach(f => {
      f.addEventListener('input', () => { f.style.borderColor = ''; });
    });
  }

  // ---- Smooth scroll ----
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = header.offsetHeight + 4;
        window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - offset, behavior: 'smooth' });
      }
    });
  });

  // ---- Active nav link ----
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav__link');
  window.addEventListener('scroll', () => {
    let cur = '';
    sections.forEach(s => { if (window.scrollY >= s.offsetTop - 120) cur = s.id; });
    navLinks.forEach(l => {
      l.classList.remove('active');
      if (l.getAttribute('href') === '#' + cur) l.classList.add('active');
    });
  }, { passive: true });

});
