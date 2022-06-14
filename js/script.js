let frWords = ["pomme", "poire", "ananas", "peche", "raisin", "cerise", "banane", "fraise", "melon", "pasteque", "bouteille", "nourriture", "multiplication", "aleatoire", "essayer", "danser", "ordinateur", "clavier", 
            "camera", "souris", "ecran", "manette", "ciseaux", "crayon", "stylo", "gourde", "gomme", "cartable", "bureau", "console", "deodorant", "porte", "chambre", "peignoir", "lampe", "mouchoir", 
            "rouge", "noir", "blanc", "jaune", "bleu", "vert", "orange", "violet", "brun", "lustre", "squelette", "jambe", "torse", "bras", "tete", "epaule", "genou", "pied"];

let enWords = ["apple", "pineapple", "orange", "peer", "grape", "cherry", "flower", "computer", "keyboard", "mouse", "water", "lava", "blue", "green", "black", "white", 
            "purple", "brown", "yellow", "lamp", "bike", "chest", "head", "shoulder", "feet", "knee", "skeleton", "camera", "screen", "gamepad", "pencil", "eraser", 
            "bottle", "desktop", "door", "room", "multiplication", "addition", "subtraction", "division", "number", "digit", "operation", "result", "journey", "race", "parking"];

let previousRandomIndex = frWords.length + enWords.length + 6543515685;
let randomIndex = 0;
let randomWord = "";
let currentTds = [];
let letterFoundCount = 0;
let letterAmountToFind = Infinity;
let maxLivesAmount = 5;
let currentLives = 5;

let lettersBtn = document.querySelectorAll("[id^=letter-]");
let AllBtn = document.querySelectorAll("button");
let hangmanLiveText = document.getElementById("lives");
let playBtn = document.getElementById("play");
let frBtn = document.getElementById("french");
let enBtn = document.getElementById("english");
let language = document.getElementById("language");

let useFrench = true;

updateHangmanLife();

frBtn.addEventListener("click", () =>{
    useFrench = true;
    playBtn.disabled = false;
    frBtn.remove();
    enBtn.remove();
    language.innerHTML = `I'm using FRENCH words`
});

enBtn.addEventListener("click", () =>{
    useFrench = false;
    playBtn.disabled = false;
    frBtn.remove();
    enBtn.remove();
    language.innerHTML = `I'm using ENGLISH words`
});

//Generate a game
playBtn.addEventListener("click", () => {
    //reset previous game data
    console.clear();
    currentLives = maxLivesAmount;
    updateHangmanLife();
    letterFoundCount = 0;
    let areTheSame = true;
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
    while(areTheSame){
        randomIndex = useFrench ? Math.floor(Math.random() * frWords.length) : Math.floor(Math.random() * enWords.length);

        if(randomIndex != previousRandomIndex){
            areTheSame = false;
        } 
    }
    
    randomWord = useFrench ? frWords[randomIndex] : enWords[randomIndex];
    previousRandomIndex = randomIndex;

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
    if(!e.target.disabled){
        e.target.style.background = "rgb(175, 175, 175)";
    }
}
  
function mouseOut(e){
    if(!e.target.disabled){
        e.target.style.background = "aliceblue";
    }
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