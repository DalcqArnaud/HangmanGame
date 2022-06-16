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

let HeadPaths = document.querySelectorAll('g[id="HangmanAllBody"]>g[id^="Head"]');
let BodyPaths = document.querySelectorAll('g[id="HangmanAllBody"]>g[id^="Body"]');
let LegsPaths = document.querySelectorAll('g[id="HangmanAllBody"]>g[id^="Legs"]');
let LeftArmPaths = document.querySelectorAll('g[id="HangmanAllBody"]>g[id^="LeftArm"]');
let RightArmPaths = document.querySelectorAll('g[id="HangmanAllBody"]>g[id^="RightArm"]');

let HangmanDudeParts = [RightArmPaths, LeftArmPaths, LegsPaths, BodyPaths, HeadPaths];

let lettersSVG = document.querySelectorAll("svg[id^='letter-']");

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
 * @param {String} letterToCheck Letter to check if it is in the random word
 */
function checkLetter(letterToCheck){
    let hasLetter = false;
    for(let i = 0; i < randomWord.length; i++){
        if(letterToCheck.toLowerCase() == randomWord[i]){
            let UpLetter = letterToCheck.toUpperCase();
            currentTds[i].innerHTML = `${UpLetter}`;
            letterFoundCount++;
            hasLetter = true;
        }
    }

    if(!hasLetter){
        currentLives--;
        updateHangmanLife();
        //Check for lose
        if(currentLives <= 0){
            gameOver();
        }
    }else{
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
 * (Called to update hangman svg and lives text according to current user lives)
 */
function updateHangmanLife(){
    if(currentLives >= HangmanDudeParts.length){
        for(let i = 0; i < HangmanDudeParts.length; i++){
            HangmanDudeParts[i].forEach(element => {
                element.style.visibility = "hidden";
            });
        }
    }
    else{
        HangmanDudeParts[currentLives].forEach(element => {
            element.style.visibility = "visible";
        });
    }
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
        let letter = String.fromCharCode(currentLetterASCIIIndex);

        let letterSVGParent = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        letterSVGParent.setAttribute("id", `Postit-${letter}`);
        letterSVGParent.setAttribute("viewBox", "0 0 84.84 103.66")

        let letterSVGDefs = document.createElement("defs");
        
        let letterSVGDefsStyle = document.createElement("style");
        letterSVGDefsStyle.textContent = ".cls-5{stroke:#1d1d1b;stroke-miterlimit:10;fill:none;stroke-width:6px}";
        
        letterSVGDefs.appendChild(letterSVGDefsStyle);
        letterSVGParent.appendChild(letterSVGDefs);

        let letterSVGSheetPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
        letterSVGSheetPath.setAttribute("id", `sheetPath-${letter}`);
        letterSVGSheetPath.setAttribute("d", "M4.17 20.57h79.07c0 26.28-1.19 53 1.46 77.48a494.57 494.57 0 0 1-79 0C3 74.37 4.14 51 4.15 20.6c0-.02.01-.03.02-.03Z");
        letterSVGSheetPath.setAttribute("transform", "translate(-1.88 -3.06)");
        letterSVGSheetPath.setAttribute("style", "stroke-miterlimit:10;stroke-width:4px;");
        letterSVGSheetPath.setAttribute("stroke", "#1d1d1b");
        letterSVGSheetPath.setAttribute("fill", "#F0F8FF");
        letterSVGParent.appendChild(letterSVGSheetPath);
        
        let letterSVGLetter = document.createElementNS("http://www.w3.org/2000/svg", "text");
        letterSVGLetter.setAttribute("id", `letter-${letter}`);
        letterSVGLetter.setAttribute("transform", "translate(21.01 80.54)");
        letterSVGLetter.setAttribute("style", "font-size:65px;");
        letterSVGLetter.setAttribute("fill", "#1d1d1b");
        letterSVGLetter.setAttribute("x", "23%");
        letterSVGLetter.setAttribute("y", "-15%");
        letterSVGLetter.setAttribute("alignment-baseline", "middle");
        letterSVGLetter.setAttribute("text-anchor", "middle");
        letterSVGLetter.textContent = letter;
        letterSVGParent.appendChild(letterSVGLetter);
        
        let letterSVGFailPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
        letterSVGFailPath.setAttribute("id", `failPath-${letter}`);
        letterSVGFailPath.setAttribute("class", "cls-5");
        letterSVGFailPath.setAttribute("d", "M16.42 36.4c8.8-6 10.91-4.84 11.47-4.36 1.48 1.3.15 5.63-2.57 14.25-2.51 7.94-3.87 10.35-3 11.07 1.53 1.23 8.33-3.38 13.25-9.29 5.48-6.59 5.8-11.39 8.56-11.46 3.07-.08 7.06 5.78 6.68 11.26s-5 9.44-12.6 16.12c-6.48 5.67-10.55 7.74-10.44 11.54A6.48 6.48 0 0 0 31.28 81c5.44 2.46 15-5.79 19.95-11.38 5.35-6.09 6.87-11 12.07-11.87A8.29 8.29 0 0 1 69.43 59c4.7 3.48 4.6 14.11-.2 19.58-3.59 4.08-8.11 3.36-11.67 8.7a16.09 16.09 0 0 0-2.37 5.93");
        letterSVGFailPath.setAttribute("transform", "translate(-1.88 -3.06)");
        letterSVGParent.appendChild(letterSVGFailPath);

        let letterSVGFoundPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
        letterSVGFoundPath.setAttribute("id", `foundPath-${letter}`);
        letterSVGFoundPath.setAttribute("class", "cls-5");
        letterSVGFoundPath.setAttribute("d", "m56.85 34.18 8 9.93a1.36 1.36 0 0 0 2.24-.18L78 24.88");
        letterSVGFoundPath.setAttribute("transform", "translate(-1.88 -3.06)");
        letterSVGParent.appendChild(letterSVGFoundPath);

        let letterSVGPinPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
        letterSVGPinPath.setAttribute("id", `pinPath-${letter}`);
        letterSVGPinPath.setAttribute("fill", "#1d1d1b");
        letterSVGPinPath.setAttribute("d", "M57.57 7.27 41.49 29.33 54.17 5.16l3.4 2.11z");
        letterSVGParent.appendChild(letterSVGPinPath);

        let letterSVGPinCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        letterSVGPinCircle.setAttribute("id", `pinCircle-${letter}`);
        letterSVGPinCircle.setAttribute("cx", "55.77");
        letterSVGPinCircle.setAttribute("cy", "6.38");
        letterSVGPinCircle.setAttribute("r", "5.88");
        letterSVGPinCircle.setAttribute("style", "stroke-miterlimit:10");
        letterSVGPinCircle.setAttribute("stroke", "#1d1d1b");
        letterSVGPinCircle.setAttribute("fill", "#1d1d1b");
        letterSVGParent.appendChild(letterSVGPinCircle);

        currentLetterBtnDelai += letterBtnDelai;

        setTimeout(() =>{
            letterBtnContainer.appendChild(letterSVGParent);
            letterSVGParent.setAttribute("class", "scaleUpAnimation");
        }, currentLetterBtnDelai);

        letterSVGParent.addEventListener("click", () => {
            letterSVGParent.setAttribute("id", `Postit-${letter}-disabled`);
            letterSVGLetter.setAttribute("fill", "#C8C8C8");
            letterSVGPinPath.setAttribute("fill", "#C8C8C8");
            letterSVGPinCircle.setAttribute("fill", "#C8C8C8");
            letterSVGPinCircle.setAttribute("stroke", "#C8C8C8");
            letterSVGSheetPath.setAttribute("stroke", "#C8C8C8");
            checkLetter(letter);
        });

        letterSVGParent.addEventListener("mouseover", () =>{
            letterSVGSheetPath.setAttribute("fill", "#AFAFAF");
        });
        letterSVGParent.addEventListener("mouseout", () => {
            letterSVGSheetPath.setAttribute("fill", "#F0F8FF");
        });

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