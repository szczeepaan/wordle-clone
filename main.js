function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// insert user inputed characters into the letter area
function displayLetters() {
    for (let i = 0; i < 5; i++) {
        if (currentInput[i] === undefined) {
            rows[guess][i].innerHTML = '';
        }
        else {
            rows[guess][i].innerHTML = currentInput[i];
        }
    }
}

// check user guess with the correct word, return colors of letters
function getColors(correct, guessed) {
    let colors = [];
    let correctArray = [false, false, false, false, false];

    for (let i = 0; i < correct.length; i++) {
        if (correct[i] == guessed[i]) {
            colors[i] = 'var(--green)';
            correctArray[correct.indexOf(guessed[i], 0)] = true;
        }
        else {
            colors[i] = 'var(--gray)';
        }
    }

    for (let i = 0; i < correct.length; i++) {
        if (correct.includes(guessed[i]) && correctArray[correct.indexOf(guessed[i], 0)] == false) {
            colors[i] = 'var(--yellow)';
            correctArray[correct.indexOf(guessed[i], 0)] = true;
        }
    }

    return colors;
}

// handle game end
function gameEnd(outcome, guessAmount) {
    if (outcome == 'win') {
        endPage.style.setProperty('display', 'flex');
        endPage.innerHTML = "<p style='color: var(--green); font-weight: bold;'>You won!</p><p>The correct word was <span class='correct-word'>" + correctWord + "</span></p><p>Guess amount: <span id='guess-amount'>" + Number(guessAmount + 1) + "</span></p><a href='index.html'>Play again</a>";
    }
    else if (outcome == 'lose') {
        endPage.style.setProperty('display', 'flex');
        endPage.innerHTML = "<p style='color: var(--red); font-weight: bold;'>You lost!</p><p>The correct word was <span class='correct-word'>" + correctWord + "</span></p><a href='index.html'>Play again</a>";
    }
    else {
        console.log("Unknown game outcome '" + outcome + "'");
    }
}

const rows = [];
const title = document.querySelector('#title');                         // display above the game (ex. 'word is too short')
const endPage = document.querySelector('#end-page')                     // displayed when the game is won/lost

let n = getRandomInt(0, words.length - 1);                              // generate random index to pick a random word
let correctWord = words[n].toUpperCase();
console.log(correctWord);
let currentInput = '';                                                  // player input / guess
let colors = [];
let guess = 0;                                                          // guess counter (0-5)

// fill the array of html elements [row][letter]
for (let i = 0; i < 6; i++) {
    rows[i] = document.querySelectorAll('#container .row:nth-child(' + Number(i + 1) + ') .letter')
}

// when player holds a key down
window.addEventListener('keydown', function(event) {
    let key = event.key.toUpperCase();
    let code = key.charCodeAt(0);
    if ((code >= 65 && code <= 90) && key.length === 1) {
        title.innerHTML = "";
        if (currentInput.length < 5) {
            currentInput += key;
            displayLetters();
        }
    }
    else if (key == 'BACKSPACE') {
        title.innerHTML = "";
        currentInput = currentInput.slice(0, -1);
        displayLetters();
    }
    else if (key == 'ENTER') {
        if (currentInput.length < 5) {
            title.innerHTML = "Word is too short";
        }
        else if (availableWords.includes(currentInput.toLowerCase())) {
            colors = getColors(correctWord, currentInput);
            for (let i = 0; i < 5; i++) {
                rows[guess][i].style.setProperty('color', colors[i]);
            }
            if (currentInput == correctWord) {          // check if won/ran out of guesses
                gameEnd('win', guess);
                this.removeEventListener('keydown', arguments.callee);
            }
            else if (currentInput != correctWord && guess >= 5) {
                gameEnd('lose', guess);
                this.removeEventListener('keydown', arguments.callee);
            }
            else {
                guess++;
                currentInput = '';
                colors = [];
            }
        }
        else {
            title.innerHTML = "Not in word list";
        }
    }
});