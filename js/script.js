(() => {
    
    let words = ["test", "hello", "world", "array", "computer", "microphone", "keyboard", "gamepad", "controller", "water", "switch",
                 "javascript", "streaming", "camera", "desktop", "lamp", "shoes", "pineapple", "banana", "apple", "orange", "melon", "peer"];

    let randomWord = "";
    let currentTds = [];
    let letterFoundCount = 0;
    let letterAmountToFind = Infinity;
    let maxLivesAmount = 5;
    let currentLives = 5;

    let lettersBtn = document.querySelectorAll("[id^=letter-]");

    updateHangmanLife();

    //Generate a game
    document.getElementById("play").addEventListener("click", () => {
        //reset previous game data
        console.clear();
        currentLives = maxLivesAmount;
        letterFoundCount = 0;
        currentTds = [];
        let tds = document.querySelectorAll("td");
        tds.forEach(element => {
            element.remove();
        });
        lettersBtn.forEach(element => {
            element.disabled = false;
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
            newTd.style.width = "50px";
            newTd.style.height = "50px";
            newTd.style.fontSize = "35px";
            document.getElementById("tableRow").appendChild(newTd);
            currentTds.push(newTd);
        }

        document.getElementById("tableSection").style.visibility = "visible";
    });

    //Guess letters
    for(let i = 0; i < lettersBtn.length; i++){
        lettersBtn[i].addEventListener("click", (e) => {
            //Disable the letter btn
            e.target.disabled = true;

            //Check if the letter is in the word
            checkLetter(lettersBtn[i].textContent.toLowerCase());

            //Check for win or lose
            if(letterFoundCount == letterAmountToFind){
                win();
            }
            if(currentLives <= 0){
                gameOver();
            }
        });
    }

    //Check letters
    function checkLetter(letter){
        let hasLetter = false;
        for(let i = 0; i < randomWord.length; i++){
            if(letter == randomWord[i]){
                let UpLetter = letter.toUpperCase();
                currentTds[i].innerHTML = `${UpLetter}`;
                letterFoundCount++;
                hasLetter = true;
            }
        }
        if(!hasLetter){
            currentLives--;
            updateHangmanLife();
        }
        
    }
    
    //win and lose fonctions
    function win(){
        lettersBtn.forEach(element => {
            element.disabled = true;
        });
        let upWord = randomWord.toUpperCase();
        alert(`You've won, the word was : ${upWord} \nPress Play again to start a new game!`);
    }

    function gameOver(){
        lettersBtn.forEach(element => {
            element.disabled = true;
        });
        let upWord = randomWord.toUpperCase();
        alert(`You've lost, the word was : ${upWord} \nPress Play again to start a new game!`);
    }

    function updateHangmanLife(){
        let hangmanImage = document.getElementById("HangmanImage");
        hangmanImage.setAttribute("src", `images/Hangman_${currentLives}.png`);
        let hangmanLiveText = document.getElementById("lives");
        hangmanLiveText.innerHTML = `Lives : ${currentLives}`;
    }
})();