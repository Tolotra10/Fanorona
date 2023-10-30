//DOM
const cases = document.querySelectorAll(".case");
const button = document.querySelector("button");
const result = document.querySelector(".result");
const statut = document.querySelector(".game_over");
const clear = document.querySelector("#clear");
var numberX = document.querySelector(".numberX");
var numberO = document.querySelector(".numberO");
var winner = document.querySelector(".winner");
var nameX = document.querySelector('.nameX');
var nameO = document.querySelector('.nameO');
var ok1 = document.querySelector('.ok1');
var ok2 = document.querySelector('.ok2');
var scoreX = document.querySelector('.scoreX');
var scoreO = document.querySelector('.scoreO');
var reset = document.querySelector('.reset');
var changePlayer = document.querySelector('.change_player');


//Variables
jeuActif = true;
countX = 0;
countO = 0;
numberX.innerHTML = countX;
numberO.innerHTML = countO;
joueurActif = "X";
fini = "--";
etatJeu = ["", "", "", "", "", "", "", "", ""];
const conditionsVictoire = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

//Messages
const win = () => `Nandresy ny mpilalao ${joueurActif}`
const same = () => `Sahala ny lalao`;
const player_turn = () => `Anjaran'ny pilalao ${joueurActif} izao`


result.innerHTML = player_turn();
document.querySelector('.plateform').classList.toggle('invisible');

//Ecouteurs
cases.forEach(cell => cell.addEventListener("click", click_check));
reset.addEventListener("click", replay);
changePlayer.addEventListener('click', to_change_player);

//Fonctions
player_name();

function player_name() {
    ok1.addEventListener('click', () => {
        if (nameX.value === nameO.value && nameX.value != '') {
            alert('Anarana mitovy');
        } else if (nameX.value == '') {
            alert('Fenoy ny anarana')
        } else {
            scoreX.innerHTML = nameX.value;
            nameO.style.visibility = "visible";
            nameO.style.opacity = "1";
            ok2.style.visibility = "visible";
            ok2.style.opacity = "1";
            nameX.style.visibility = "hidden";
            nameX.style.opacity = "0";
            ok1.style.visibility = "hidden";
            ok1.style.opacity = "0";
        }

    });
    ok2.addEventListener('click', () => {
        if (nameX.value === nameO.value) {
            alert('Anarana mitovy');
        } else if (nameO.value == '') {
            alert('Fenoy ny anarana')
        } else {
            scoreO.innerHTML = nameO.value;
            nameO.style.visibility = "hidden";
            nameO.style.opacity = "0";
            ok2.style.visibility = "hidden";
            ok2.style.opacity = "0";
            document.querySelector('.plateform').classList.toggle('invisible');
            document.querySelector('.change_player').classList.toggle('visible');
        }
    });
    return
}

function click_check() {
    //Récuperer l'index de chaque case
    //Parser chaque index
    const indexCase = parseInt(this.dataset.index)

    if (etatJeu[indexCase] != "" || !joueurActif) {
        return
    }

    etatJeu[indexCase] = joueurActif
    this.innerHTML = joueurActif

    winPartie();
}

function replay() {
    joueurActif = "X"
    jeuActif = true
    etatJeu = ["", "", "", "", "", "", "", "", ""]
    result.innerHTML = player_turn()
    cases.forEach(cell => cell.innerHTML = "")
    statut.classList.toggle("visible");

}

const winPartie = () => {
    let tourGagnant = false

    for (let conditionVictoire of conditionsVictoire) {
        let val1 = etatJeu[conditionVictoire[0]]
        let val2 = etatJeu[conditionVictoire[1]]
        let val3 = etatJeu[conditionVictoire[2]]
        if (val1 === "" || val2 === "" || val3 === "") {
            continue
        }
        if (val1 === val2 && val2 === val3) {
            tourGagnant = true
            break
        }
    }
    if (tourGagnant) {
        statut.classList.toggle("visible")
        winner.innerHTML = win()

        etatJeu = ["--", "--", "--", "--", "--", "--", "--", "--", "--"];
        jeuActif = false
        if (joueurActif === "X") {
            countX++;
            numberX.innerHTML = countX;
        } else {
            countO++;
            numberO.innerHTML = countO;
        }
        if (countX > countO) {
            numberX.classList.add('greenColor');
            numberO.classList.remove('greenColor');
            numberO.classList.remove('blueColor');
            numberX.classList.remove('blueColor');
        } else if (countO > countX) {
            numberO.classList.add('greenColor');
            numberX.classList.remove('greenColor');
            numberX.classList.remove('blueColor');
            numberO.classList.remove('blueColor');
        } else if (countX == countO && countX > 0 && countO > 0) {
            numberO.classList.remove('greenColor');
            numberX.classList.remove('greenColor');
            numberX.classList.add('blueColor');
            numberO.classList.add('blueColor');
        }
        return
    }

    if (!etatJeu.includes("")) {
        statut.classList.toggle("visible")
        winner.innerHTML = same()
        jeuActif = false
        return
    }

    //Changement de joueur par tour
    joueurActif = joueurActif === "X" ? "0" : "X";
    result.innerHTML = player_turn();   
}

function to_change_player() {
    countX = 0;
    countO = 0;
    numberX.innerHTML = countX;
    numberO.innerHTML = countO;
    numberO.classList.remove('greenColor');
    numberX.classList.remove('greenColor');
    numberX.classList.remove('blueColor');
    numberO.classList.remove('blueColor');
    nameX.style.visibility = "visible";
    nameX.style.opacity = "1";
    ok1.style.visibility = "visible";
    ok1.style.opacity = "1";
    player_name();
    joueurActif = "X"
    jeuActif = true
    etatJeu = ["", "", "", "", "", "", "", "", ""]
    result.innerHTML = player_turn()
    cases.forEach(cell => cell.innerHTML = "")
}

const clear_board = () =>{
    joueurActif = "X"
    jeuActif = true
    etatJeu = ["", "", "", "", "", "", "", "", ""]
    result.innerHTML = player_turn()
    cases.forEach(cell => cell.innerHTML = "")
}

clear.addEventListener('click', clear_board);
