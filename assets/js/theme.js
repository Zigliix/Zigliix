const themeSwitcher = document.getElementById('theme-switcher');

themeSwitcher.addEventListener('click', () => {
    const html = document.documentElement;
    if (html.getAttribute('data-theme') === 'dark') {
        html.setAttribute('data-theme', 'light');
        themeSwitcher.textContent = '🌙';
    } else {
        html.setAttribute('data-theme', 'dark');
        themeSwitcher.textContent = '☀️';
    }
});
