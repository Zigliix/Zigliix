const themeSwitcher = document.getElementById('theme-switcher');
const html = document.documentElement;

function setTheme(theme) {
    html.setAttribute('data-theme', theme);
    const isDark = theme === 'dark';
    themeSwitcher.textContent = isDark ? '☀️' : '🌙';
    themeSwitcher.setAttribute('aria-label', isDark ? 'Switch to light theme' : 'Switch to dark theme');
    localStorage.setItem('theme', theme);
}

const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
setTheme(localStorage.getItem('theme') ?? (prefersDark ? 'dark' : 'light'));

themeSwitcher.addEventListener('click', () => {
    setTheme(html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
});