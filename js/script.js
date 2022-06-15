////////////////////////////////////////////////////////////// VARIABLES //////////////////////////////////////////////////////////////
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

let lettersBtn = [];
let AllBtn = document.querySelectorAll("button");
let hangmanLiveText = document.getElementById("lives");
let playBtn = document.getElementById("play");
let frBtn = document.getElementById("french");
let enBtn = document.getElementById("english");
let language = document.getElementById("language");
let letterBtnContainer = document.getElementById("letterBtnContainer");
let hangmanImage = document.getElementById("HangmanImage");
let letterBtnDelai = 100;
let currentLetterBtnDelai = 0;

let useFrench = true;
let areTheSame = true;

let startLetterASCIIIndex = 65;
let currentLetterASCIIIndex = 0;

////////////////////////////////////////////////////////////// FUNCTIONS //////////////////////////////////////////////////////////////

/**
 * Change bg color when mouse over something
 * @param {Element} e Element to mouse over it
 */
 function mouseOver(e){
    if(!e.target.disabled){
        e.target.style.background = "rgb(175, 175, 175)";
    }
}
  
/**
 * Change bg color when mouse out of it
 * @param {Element} e Element to mouse out of it
 */
function mouseOut(e){
    if(!e.target.disabled){
        e.target.style.background = "aliceblue";
    }
}

/**
 * Check if a letter is in the random word
 * @param {Element} btn Letter button to check if the letter is in the word
 */
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

    if(!hasLetter){
        setDisableState(btn, true);
        btn.style.backgroundColor = "aliceblue";
        currentLives--;
        updateHangmanLife();
        //Check for lose
        if(currentLives <= 0){
            gameOver();
        }
    }else{
        setDisableState(btn, true);
        btn.style.backgroundColor = "aliceblue";
        //Check for win
        if(letterFoundCount == letterAmountToFind){
            win();
        }
    }
}

/**
 * Win function (called when user have found all letters)
 */
function win(){
    setDisableState(playBtn, false);
    lettersBtn.forEach(element => {
        setDisableState(element, true);
    });
    hangmanLiveText.innerHTML = `You've won, the word was : ${randomWord.toUpperCase()} \nPress Play again to start a new game!`;
    if (window.innerWidth < 420) {
        hangmanLiveText.style.fontSize = "15px";
    }
}

/**
 * GameOver function (called when user have no lives left)
 */
function gameOver(){
    setDisableState(playBtn, false);
    lettersBtn.forEach(element => {
        setDisableState(element, true);
    });
    hangmanLiveText.innerHTML = `You've lost, the word was : ${randomWord.toUpperCase()} \nPress Play again to start a new game!`;
    if (window.innerWidth < 420) {
        hangmanLiveText.style.fontSize = "15px";
    }
}

/**
 * (called to update hangman image and lives text according to current user lives)
 */
function updateHangmanLife(){
    hangmanImage.setAttribute("src", `images/Hangman_${currentLives}.png`);
    hangmanLiveText.innerHTML = `Lives : ${currentLives}`;
}

/**
 * Change the disable state of the given button by the given state
 * @param {Element} btn Button to change the disable state
 * @param {Boolean} state New disable state of the button
 */
function setDisableState(btn, state){
    btn.disabled = state;
}

/**
 * Use the french words to play with
 */
function frenchBtnClick(){
    useFrench = true;
    setDisableState(playBtn, false);
    frBtn.remove();
    enBtn.remove();
    language.innerHTML = `I'm using FRENCH words`
}

/**
 * Use the english words to play with
 */
function englishBtnClick(){
    useFrench = false;
    setDisableState(playBtn, false);
    frBtn.remove();
    enBtn.remove();
    language.innerHTML = `I'm using ENGLISH words`
}

/**
 * Reset the game values when we restart a game
 */
function ResetGameValues(){
    console.clear();
    currentLives = maxLivesAmount;
    updateHangmanLife();
    letterFoundCount = 0;
    currentLetterBtnDelai = 0;
    areTheSame = true;
    currentTds = [];
    let tds = document.querySelectorAll("td");
    tds.forEach(element => {
        element.remove();
    });
    while (letterBtnContainer.firstChild) {
        letterBtnContainer.firstChild.remove();
    }
    hangmanLiveText.style.fontSize = "xx-large";
    currentLetterASCIIIndex = startLetterASCIIIndex;
}

/**
 * Generate the random word that the user will play with
 */
function GenerateRandomWord(){
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
}

/**
 * Generate Word Slots to display the number of letters to found
 */
function GenerateWordSlots(){
    for(let i = 0; i < randomWord.length; i++){
        let newTd = document.createElement("td");
        newTd.innerHTML = "";
        document.getElementById("tableRow").appendChild(newTd);
        currentTds.push(newTd);
    }

    document.getElementById("tableSection").style.display = "block";
}

/**
 * Generate letter buttons used for the user to enter letters to check
 */
function GenerateLetterBtns(){
    for(let i = 0; i < 26; i++){
        let letterBtn = document.createElement("button");
        let letter = String.fromCharCode(currentLetterASCIIIndex);

        letterBtn.addEventListener("click", () => {
            checkLetter(letterBtn);
        });
        letterBtn.addEventListener("mouseover", mouseOver);
        letterBtn.addEventListener("mouseout", mouseOut);

        letterBtn.innerHTML = letter;
        setDisableState(letterBtn, false);
        letterBtn.style.backgroundColor = "aliceblue";
        letterBtn.setAttribute("id", `letter-${letter}`);
        letterBtn.setAttribute("class", "noScale");
        lettersBtn.push(letterBtn);
        
        currentLetterBtnDelai += letterBtnDelai;

        setTimeout(() =>{
            letterBtnContainer.appendChild(letterBtn);
            letterBtn.setAttribute("class", "scaleUpAnimation");
        }, currentLetterBtnDelai);
        
        currentLetterASCIIIndex++;
    }
}

/**
 * Play button click function (called when user clicked on the play button)
 */
function playBtnClick(){
    setDisableState(playBtn, true);
    playBtn.style.backgroundColor = "aliceblue";

    ResetGameValues();

    GenerateRandomWord();

    GenerateWordSlots();

    GenerateLetterBtns();
}

////////////////////////////////////////////////////////////// CODE //////////////////////////////////////////////////////////////

//Setup default hangman life image and text
updateHangmanLife();

//Choose french language
frBtn.addEventListener("click", frenchBtnClick);

frBtn.addEventListener("mouseover", mouseOver);
frBtn.addEventListener("mouseout", mouseOut);

//Choose english language
enBtn.addEventListener("click", englishBtnClick);

enBtn.addEventListener("mouseover", mouseOver);
enBtn.addEventListener("mouseout", mouseOut);

//Generate a game
playBtn.addEventListener("click", playBtnClick);

playBtn.addEventListener("mouseover", mouseOver);
playBtn.addEventListener("mouseout", mouseOut);