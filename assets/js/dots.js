const dots = document.getElementById("dots");

let count = 0;

function animateDots() {
    count = (count + 1) % 4;
    dots.textContent = ".".repeat(count);
    setTimeout(animateDots, 700);
}

animateDots();
