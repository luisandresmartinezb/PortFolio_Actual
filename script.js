/**
 * Portfolio profesional - JavaScript principal
 * ---------------------------------------------
 * Responsabilidades:
 * - Navegación e interacciones de la interfaz.
 * - Cambio de tema.
 * - Comportamiento responsive.
 * - Mejoras de experiencia de usuario.
 *
 * El código se mantiene sin minificar para que pueda revisarse
 * y estudiarse directamente desde GitHub.
 */

(() => {
  const root = document.documentElement;
  const saved = localStorage.getItem('portfolio-theme');
  const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
  root.dataset.theme = saved || (prefersLight ? 'light' : 'dark');

  // Theme: restore the saved preference and allow manual switching.
  const themeToggle = document.getElementById('themeToggle');
  const updateThemeIcon = () => { if(themeToggle) themeToggle.textContent = root.dataset.theme === 'dark' ? '☀' : '◐'; };
  updateThemeIcon();
  themeToggle?.addEventListener('click', () => {
    root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('portfolio-theme', root.dataset.theme);
    updateThemeIcon();
  });

  // Mobile navigation: toggle the menu and keep ARIA state synchronized.
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');
  menuToggle?.setAttribute('aria-expanded', 'false');
  menuToggle?.addEventListener('click', () => {
    const isOpen = navLinks?.classList.toggle('open') ?? false;
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
  });
  navLinks?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => { navLinks.classList.remove('open'); menuToggle?.setAttribute('aria-expanded', 'false'); }));

  // Reveal animation: activate each section only once when it enters the viewport.
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if(entry.isIntersecting){ entry.target.classList.add('visible'); observer.unobserve(entry.target); }
    });
  }, {threshold: .12});
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  // Desktop-only visual effects: cursor glow and subtle project-card tilt.
  if(window.matchMedia('(pointer:fine)').matches){
    const glow = document.createElement('div'); glow.className='cursor-glow'; document.body.appendChild(glow);
    window.addEventListener('pointermove', e => { glow.style.left=e.clientX+'px'; glow.style.top=e.clientY+'px'; });
    document.querySelectorAll('.project').forEach(card => {
      card.addEventListener('pointermove', e => {
        const r=card.getBoundingClientRect();
        const x=(e.clientX-r.left)/r.width-.5, y=(e.clientY-r.top)/r.height-.5;
        card.style.transform=`perspective(700px) rotateX(${(-y*3).toFixed(2)}deg) rotateY(${(x*3).toFixed(2)}deg) translateY(-3px)`;
      });
      card.addEventListener('pointerleave',()=>card.style.transform='');
    });
  }
})();
// Project image fallback: hide broken images and show a readable placeholder.
document.querySelectorAll('.project-card .project-image img').forEach((img) => {
  img.addEventListener('error', () => {
    img.hidden = true;
    const figure = img.closest('.project-image');
    if (figure && !figure.querySelector('.capture-placeholder')) {
      const placeholder = document.createElement('div');
      placeholder.className = 'capture-placeholder';
      placeholder.innerHTML = '<strong>Captura pendiente</strong><span>Añade aquí la imagen del proyecto</span>';
      figure.appendChild(placeholder);
    }
  });
});


// Language switch: preserve the current section anchor between ES and EN pages.
document.querySelectorAll('.language-switch a').forEach(link => {
  link.addEventListener('click', () => {
    if (window.location.hash) link.href = link.getAttribute('href').split('#')[0] + window.location.hash;
  });
});

// Contact actions: reveal the phone number only after an explicit user action.
const telefono = document.getElementById("telefono");
const botonTelefono = document.getElementById("mostrarTelefono");
if (telefono && botonTelefono) {
  botonTelefono.addEventListener("click", () => {
    telefono.innerHTML = '<a href="tel:+34643903560">+34 643 903 560</a>';
    window.location.href = "tel:+34643903560";
  });
}

// Certificate viewer: open credential images in an accessible modal dialog.
const certModal=document.getElementById('certModal');
const certModalImage=document.getElementById('certModalImage');
document.querySelectorAll('[data-cert]').forEach(btn=>btn.addEventListener('click',()=>{certModalImage.src=btn.dataset.cert;certModal.classList.add('open');certModal.setAttribute('aria-hidden','false')}));
document.getElementById('closeCert')?.addEventListener('click',()=>{certModal.classList.remove('open');certModal.setAttribute('aria-hidden','true')});
certModal?.addEventListener('click',e=>{if(e.target===certModal){certModal.classList.remove('open');certModal.setAttribute('aria-hidden','true')}});

// Responsive safety net for real phones, including browsers using "Desktop site".
// screen.width remains the physical CSS viewport on phones even when the browser
// requests a desktop layout, so this class prevents desktop grids from being
// squeezed into a narrow physical display.
(function applyCompactDeviceMode() {
  const root = document.documentElement;
  const update = () => {
    const shortestSide = Math.min(screen.width || innerWidth, screen.height || innerHeight);
    root.classList.toggle('compact-device', shortestSide <= 700);
  };
  update();
  window.addEventListener('resize', update, { passive: true });
  window.addEventListener('orientationchange', update, { passive: true });
})();
