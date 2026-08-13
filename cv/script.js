/**
 * CV - acciones de interfaz
 * -------------------------
 * Este archivo mantiene separada la lógica JavaScript del HTML.
 * Actualmente controla la impresión o guardado del CV como PDF.
 */

document.querySelectorAll("[data-print]").forEach((button) => {
    button.addEventListener("click", () => {
        window.print();
    });
});


// Tema claro/oscuro compartido con portfolio y carta.
(() => {
  const root = document.documentElement;
  const saved = localStorage.getItem('portfolio-theme');
  const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
  root.dataset.theme = saved || (prefersLight ? 'light' : 'dark');
  const btn = document.querySelector('[data-theme-toggle]');
  const paint = () => { if (btn) btn.textContent = root.dataset.theme === 'dark' ? '☀' : '☾'; };
  paint();
  btn?.addEventListener('click', () => {
    root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('portfolio-theme', root.dataset.theme);
    paint();
  });
})();
