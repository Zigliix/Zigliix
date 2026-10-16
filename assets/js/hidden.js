const els = document.querySelectorAll('.hidden-element');

function check() {
    if (window.scrollY <= 50) {
        els.forEach((el) => el.classList.remove('visible'));
        return;
    }
    els.forEach((el) => {
        if (el.getBoundingClientRect().top < window.innerHeight * 0.9) {
            el.classList.add('visible');
        }
    });
}

window.addEventListener('scroll', check);
check();
