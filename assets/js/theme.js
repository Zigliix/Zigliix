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
    const newTheme = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';

    if (!document.startViewTransition) {
        setTheme(newTheme);
        return;
    }

    const rect = themeSwitcher.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    const transition = document.startViewTransition(() => {
        setTheme(newTheme);
    });

    transition.ready.then(() => {
        const endRadius = Math.hypot(
            Math.max(x, window.innerWidth - x),
            Math.max(y, window.innerHeight - y)
        );
        document.documentElement.animate(
            {
                clipPath: [
                    `circle(0px at ${x}px ${y}px)`,
                    `circle(${endRadius}px at ${x}px ${y}px)`
                ]
            },
            {
                duration: 600,
                easing: 'ease-out',
                pseudoElement: '::view-transition-new(root)'
            }
        );
    });
});