let words = ["pomme", "poire", "ananas", "peche", "raisin", "cerise", "banane", "fraise", "melon", "pasteque", "bouteille", "nourriture", "multiplication", "aleatoire", "essayer", "danser", "ordinateur", "clavier", 
            "camera", "souris", "ecran", "manette", "ciseaux", "crayon", "stylo", "gourde", "gomme", "cartable", "bureau", "console", "deodorant", "porte", "chambre", "peignoir", "lampe", "mouchoir", 
            "rouge", "noir", "blanc", "jaune", "bleu", "vert", "orange", "violet", "brun", "lustre", "squelette", "jambe", "torse", "bras", "tete", "epaule", "genou", "pied"];

let randomWord = "";
let currentTds = [];
let letterFoundCount = 0;
let letterAmountToFind = Infinity;
let maxLivesAmount = 5;
let currentLives = 5;

let lettersBtn = document.querySelectorAll("[id^=letter-]");
let AllBtn = document.querySelectorAll("button");
let hangmanLiveText = document.getElementById("lives");

updateHangmanLife();

//Generate a game
document.getElementById("play").addEventListener("click", () => {
    //reset previous game data
    console.clear();
    currentLives = maxLivesAmount;
    updateHangmanLife();
    letterFoundCount = 0;
    currentTds = [];
    let tds = document.querySelectorAll("td");
    tds.forEach(element => {
        element.remove();
    });
    lettersBtn.forEach(element => {
        element.disabled = false;
        element.style.backgroundColor = "aliceblue";
    });

    //generate new word
    let randomIndex = Math.round(Math.random() * words.length);
    randomWord = words[randomIndex];
    letterAmountToFind = randomWord.length;
    console.log(`The random word is : ${randomWord} !`);

    //add new word slots
    for(let i = 0; i < randomWord.length; i++){
        let newTd = document.createElement("td");
        newTd.innerHTML = "";
        document.getElementById("tableRow").appendChild(newTd);
        currentTds.push(newTd);
    }

    document.getElementById("tableSection").style.display = "block";

    hangmanLiveText.style.fontSize = "xx-large";
});

//Guess letters
for(let i = 0; i < lettersBtn.length; i++){
    lettersBtn[i].addEventListener("click", (e) => {
        //Disable the letter btn
        e.target.disabled = true;

        //Check if the letter is in the word
        checkLetter(lettersBtn[i]);
    });
}


for(let i = 0; i < AllBtn.length; i++){
    AllBtn[i].addEventListener("mouseover", mouseOver);
    AllBtn[i].addEventListener("mouseout", mouseOut);
}

function mouseOver(e){
    e.target.style.background = "rgb(175, 175, 175)";
}
  
function mouseOut(e){
    e.target.style.background = "aliceblue";
}

//Check letters
function checkLetter(btn){
    let hasLetter = false;
    for(let i = 0; i < randomWord.length; i++){
        if(btn.textContent.toLowerCase() == randomWord[i]){
            let UpLetter = btn.textContent.toUpperCase();
            currentTds[i].innerHTML = `${UpLetter}`;
            letterFoundCount++;
            hasLetter = true;
        }
    }

    if(letterFoundCount == letterAmountToFind){
        win();
    }

    if(!hasLetter){
        btn.style.backgroundColor = "rgba(191, 64, 64, 0.5)";
        currentLives--;
        updateHangmanLife();
    }else{
        btn.style.backgroundColor = "rgba(64, 191, 64, 0.5)";
    }
    
    if(currentLives <= 0){
        gameOver();
    }
}

//win and lose fonctions
function win(){
    lettersBtn.forEach(element => {
        element.disabled = true;
    });
    let upWord = randomWord.toUpperCase();
    hangmanLiveText.innerHTML = `You've <span id="resultWin">won</span>, the word was : ${upWord} \nPress Play again to start a new game!`;
    if (window.innerWidth < 420) {
        hangmanLiveText.style.fontSize = "15px";
    }
}

function gameOver(){
    lettersBtn.forEach(element => {
        element.disabled = true;
    });
    let upWord = randomWord.toUpperCase();
    hangmanLiveText.innerHTML = `You've <span id="resultLose">lost</span>, the word was : ${upWord} \nPress Play again to start a new game!`;
    if (window.innerWidth < 420) {
        hangmanLiveText.style.fontSize = "15px";
    }
}

function updateHangmanLife(){
    let hangmanImage = document.getElementById("HangmanImage");
    hangmanImage.setAttribute("src", `images/Hangman_${currentLives}.png`);
    hangmanLiveText.innerHTML = `Lives : ${currentLives}`;
}