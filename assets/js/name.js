const role_words = ["Developer", "Gamer"];

let indexword =0;
let indexletter =0;
let deleting = false;

const rolechanging = document.getElementById("role");

function animation() {
    const WordNow = role_words[indexword];
    if (deleting) {
        indexletter--;
    }  else {
            indexletter++;
    }
    rolechanging.textContent = WordNow.substring(0, indexletter)

    let pause = 100;

    if (!deleting && indexletter === WordNow.length) {
        pause = 2000;
        deleting = true;
    }
    else if (deleting && indexletter === 0){
        deleting = false;
        indexword = (indexword + 1) % role_words.length;
        pause = 500;
    }
    setTimeout(animation, pause)
}

animation();