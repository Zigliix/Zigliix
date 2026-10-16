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

let busy = false;

themeSwitcher.addEventListener('click', async () => {
    if (busy) return;
    busy = true;

    const theme = html.dataset.theme !== 'dark' ? 'dark' : 'light';
    const r = themeSwitcher.getBoundingClientRect();
    const x = r.left + r.width / 2;
    const y = r.top + r.height / 2;
    const d = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    const c = (v) => `circle(${v}px at ${x}px ${y}px)`;

    const o = document.createElement('div');
    o.style.cssText = 'position:fixed;inset:0;background:#000;opacity:1;pointer-events:none;z-index:9999';
    document.documentElement.append(o);

    await o.animate({ clipPath: [c(0), c(d)] }, { duration: 450, easing: 'cubic-bezier(0.33,1,0.68,1)', fill: 'both' }).finished.catch(() => {});
    setTheme(theme);
    await o.animate({ clipPath: [c(d), c(0)] }, { duration: 450, easing: 'cubic-bezier(0.33,1,0.68,1)', fill: 'both' }).finished.catch(() => {});

    o.remove();
    busy = false;
});
