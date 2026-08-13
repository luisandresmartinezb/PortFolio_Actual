(() => {
  const root = document.documentElement;
  const saved = localStorage.getItem('portfolio-theme');
  const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
  root.dataset.theme = saved || (prefersLight ? 'light' : 'dark');
  const themeButton = document.querySelector('[data-theme-toggle]');
  const updateIcon = () => { if (themeButton) themeButton.textContent = root.dataset.theme === 'dark' ? '☀' : '◐'; };
  updateIcon();
  themeButton?.addEventListener('click', () => {
    root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('portfolio-theme', root.dataset.theme);
    updateIcon();
  });
  document.querySelector('[data-print]')?.addEventListener('click', () => window.print());
})();
