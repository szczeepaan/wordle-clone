/* --- TABLE OF CONTENTS ---

    1. FUNCTIONS
        1.1. getRandomInt()
        1.2. displayLetters()
        1.3. getColors()
        1.4. keyPressHandler()
        1.5. gameEnd()
    2. VARIABLES
    3. EVENT LISTENERS

 --- TABLE OF CONTENTS --- */



/* --- 1. FUNCTIONS --- */

// 1.1
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// 1.2 - insert user inputed characters into the letter area
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

// 1.3 - check user guess with the correct word, return colors of letters
function getColors(correct, guessed) {
    let colors = [];
    let correctArray = [false, false, false, false, false];

    for (let i = 0; i < correct.length; i++) {                          // figure out green and gray letters
        if (correct[i] == guessed[i]) {
            colors[i] = 'var(--green)';
            correctArray[correct.indexOf(guessed[i], 0)] = true;
            greenLetters += correct[i];
        }
        else {
            colors[i] = 'var(--gray)';
        }
    }

    for (let i = 0; i < correct.length; i++) {                          // figure out yellow letters
        if (correct.includes(guessed[i]) && correctArray[correct.indexOf(guessed[i], 0)] == false) {
            colors[i] = 'var(--yellow)';
            correctArray[correct.indexOf(guessed[i], 0)] = true;
        }
    }

    return colors;
}

// 1.4 - handle keyboard key press / on-screen keyboard click
function keyPressHandler(key, event) {
    let code = key.charCodeAt(0);
    if ((code >= 65 && code <= 90) && key.length === 1) {               // is the pressed key A-Z
        titleAnimation.cancel();
        if (currentInput.length < 5) {
            currentInput += key;
            displayLetters();
        }
    }
    else if (key == 'BACKSPACE') {
        titleAnimation.cancel();
        currentInput = currentInput.slice(0, -1);
        displayLetters();
    }
    else if (key == 'ENTER') {
        if (event.target.nodeName=='BUTTON' && event.target.type=='') { // prevent <ENTER> from pressing the most recently clicked on-screen keyboard key
            event.preventDefault();
            event.stopPropagation();
            return false;
        }
        if (currentInput.length < 5) {
            title.innerHTML = "Word is too short";
            titleAnimation.play();
        }
        else if (availableWords.includes(currentInput.toLowerCase())) {
            colors = getColors(correctWord, currentInput);

            for (let i = 0; i < 5; i++) {                               // set color of letters in game grid
                rows[guess][i].style.setProperty('color', colors[i]);
                rows[guess][i].style.setProperty('border-color', colors[i]);
                if (colors[i] !== 'var(--yellow)') {                    // set green / gray colors on on-screen keyboard
                    keys[currentInput[i].toLowerCase()].style.setProperty('background-color', colors[i]);
                    if (colors[i] == 'var(--green)') {
                        greenLetters += currentInput[i];
                    }
                }
                keys[currentInput[i].toLowerCase()].style.setProperty('color', 'var(--darker)');
            }
            for (let i = 0; i < 5; i++) {                               // color yellow keys on on-screen keyboard
                if (colors[i] == 'var(--yellow)' && !greenLetters.includes(currentInput[i])) {
                    keys[currentInput[i].toLowerCase()].style.setProperty('background-color', colors[i]);
                }
            }

            if (currentInput == correctWord) {                          // game won (correct guess)
                gameEnd('win', guess);
                this.removeEventListener('keydown', arguments.callee);
            }
            else if (currentInput != correctWord && guess >= 5) {       // game lost (ran out of guesses)
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
            titleAnimation.play();
        }
    }
}

// 1.5 - handle game end
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
        alert("Unknown game outcome '" + outcome + "'. This is likely a bug");
    }
}

/* --- 2. VARIABLES --- */

const rows = [];
const letters = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
const keys = {a: null, b: null, c: null, d: null, e: null, f: null, g: null, h: null, i: null, j: null, k: null, l: null, m: null, n: null, o: null, p: null, q: null, r: null, s: null, t: null, u: null, v: null, w: null, x: null, y: null, z: null, enter: null, backspace: null};
const title = document.querySelector('#title');                         // display above the game (ex. 'word is too short')
const endPage = document.querySelector('#end-page')                     // displayed when the game is won/lost
const infoPage = document.querySelector('#info-page')                   // displays info about the game
const infoBtn = document.querySelector('#info-btn');                    // shows the info screen
const infoExit = document.querySelector('#info-exit');                  // hides the info screen

// title animation
const titleAnimation = title.animate(
    [
        { opacity: 0 },
        { opacity: 0.25 },
        { opacity: 0.5 },
        { opacity: 0.75 },
        { opacity: 1 },
        { opacity: 1 },
        { opacity: 1 },
        { opacity: 1 },
        { opacity: 1 },
        { opacity: 1 },
        { opacity: 1 },
        { opacity: 1 },
        { opacity: 1 },
        { opacity: 1 },
        { opacity: 1 },
        { opacity: 1 },
        { opacity: 1 },
        { opacity: 1 },
        { opacity: 1 },
        { opacity: 1 },
        { opacity: 0.75 },
        { opacity: 0.5 },
        { opacity: 0.25 },
        { opacity: 0 }
    ],
    {
        duration: 2500,
        iterations: 1
    }
);

titleAnimation.cancel();                                                // prevents the animation from playing on startup

let n = getRandomInt(0, words.length - 1);                              // generate random index to pick a random word
let correctWord = words[n].toUpperCase();
console.log('⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣠⣤⣤⣤⣤⣤⣤⣤⣤⣤⣤⣤⣤⣤⣤⣤⣤⣤⣤⣤⣤⣤⣤⣄⣀⣀⣀⣀⣀⣀\n⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⣴⡿⠟⠉⠉⠉⠉⠉⠉⠉⠀⢀⣀⣠⠤⠶⠶⠶⠶⠦⠤⠤⠄⠈⣉⡉⠉⠉⠉⠛⠛⠻⠿⢿⣿⣿⣶⣶⣶⣤⣄\n⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣼⡿⠋⠀⠀⠀⠀⠀⠀⢀⣤⠖⠛⠉⣁⣠⣤⠤⠴⠶⠶⠶⠤⢤⣤⣀⡀⠀⠀⠀⠀⠉⠉⠉⠉⠉⣀⣀⣀⣤⣍⡙⠻⢿⣶⣤⡀\n⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⣾⠟⠀⠀⠀⠀⠀⣀⠴⠚⢉⡤⠔⢚⣉⡩⠤⠤⠤⠤⠤⠤⣤⠄⠀⠀⠀⠈⠉⠉⠀⠀⠀⠉⠉⣉⣉⣀⣀⣀⠀⠈⠙⠀⠀⠈⠻⢿⣶⣄\n⠀⠀⠀⠀⠀⠀⠀⠀⢠⣿⠏⠀⠀⠀⢀⡴⠊⠁⣠⠞⣉⡤⠞⠋⠀⠀⠀⠀⠀⠀⠀⠀⠈⢳⡀⠀⠀⠀⠀⠀⠀⠀⠾⢛⡍⠉⠀⠀⠀⠉⠛⠦⣄⠀⠀⠀⠀⠀⠙⣿⡇\n⠀⠀⠀⠀⠀⠀⠀⢠⣿⠏⠀⠀⠀⠀⠈⠀⠠⠞⢁⡞⠉⠀⠀⠀⣀⣀⣀⣀⣀⠀⠀⠀⠀⠀⡇⠀⠀⠀⠀⠀⠀⠀⢰⠋⠀⠀⠀⠀⠀⠀⠀⠀⠘⢇⠀⠀⠀⠀⠀⣿⡇\n⠀⠀⠀⠀⠀⢀⣴⣿⠟⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠀⣠⣶⣿⣿⣿⣿⣿⣿⠿⠿⠿⣶⣦⣄⠀⠀⠀⠀⠀⠀⠀⠀⢸⠀⠀⣀⣀⣤⣤⣤⣤⣄⠀⠈⠀⠀⠀⠀⠀⠸⣿⣆\n⠀⠀⠀⢀⣴⣿⣿⣿⣖⠒⠦⢄⡀⠀⠀⣤⣤⡖⢀⣾⣿⣭⣿⣿⣿⣿⣿⣿⣤⣄⡀⠈⠙⣿⣷⠀⠀⠀⠀⢀⣀⡀⣠⣴⣿⣿⣿⣿⣯⣭⣿⣿⣷⠄⢤⣄⣀⣀⣀⣀⠈⠻⣷⣤⡀\n⠀⠀⣴⣿⢟⡿⠁⠀⣀⣤⣶⣶⣾⣶⣤⣈⠀⠚⠉⠉⠉⠉⠁⠀⣀⣴⡆⠉⠉⠛⠿⣿⣶⣿⠿⠀⠀⠀⠀⠘⠿⢿⣿⡿⠿⠛⠋⠉⠉⠉⠉⠁⠀⠀⠀⠀⠀⠀⢰⣌⠛⢦⡈⢿⣿\n⠀⣼⡟⢡⡞⠀⢠⣾⡿⠋⠁⠀⣰⡈⠛⠿⣿⣷⣦⣤⣤⣤⣴⣾⠿⠋⠀⠀⠀⠀⠀⠀⠉⠁⠀⠀⠀⠀⠀⠀⠀⠀⣿⡇⠀⠀⠀⠀⠀⣀⡀⠀⠀⣠⣶⣶⣶⣶⣶⣄⢹⡇⠙⡆⣿\n⢸⣿⠁⢸⡇⠀⣿⡏⠀⠀⠀⢰⣿⣧⣄⡀⠀⠈⠉⠉⠉⠉⠉⠁⠀⠀⠀⠀⠀⠀⠀⠀⢀⢀⠀⠀⠀⠀⠀⠀⠀⠀⢿⣷⣄⡀⠀⠀⠀⠻⢿⣶⣿⣿⠋⣰⡄⠀⠙⠛⠈⡇⠀⡇⣿\n⢸⣿⠀⢸⡇⠀⣿⡄⢠⣤⣶⣿⣿⠛⠻⢿⣷⣤⣄⡀⠀⠀⠀⠀⣀⡤⠤⢤⣤⠾⣴⡿⠿⠿⠇⠀⠀⠀⠀⠀⠀⠀⠀⠉⠻⣿⣦⣄⠀⠀⠀⠀⠀⠀⠀⣿⣇⡀⠀⢀⣠⠇⢀⢧⣿\n⠘⣿⣇⠈⢇⠀⢿⣷⡈⠉⠁⢹⣿⣄⠀⠀⠀⠙⠻⣿⣿⣶⣤⣀⡀⠀⠀⠀⠀⠀⢿⣧⡀⢶⣶⣾⣶⣶⡄⠀⠀⠀⠀⠀⣴⣿⢿⠿⠳⠦⣀⡀⠀⠀⣠⣿⣿⣧⠀⠈⣁⡤⢾⣿⡿\n⠀⠙⣿⣆⠘⠦⣌⣙⠃⠀⠀⠘⢿⣿⣷⣤⣀⡀⠀⣿⣇⠉⠙⠛⠻⠿⢷⣶⣤⣤⣌⣻⠗⠈⠁⠀⠀⠀⠀⠀⣶⣦⣴⣾⠟⠁⠀⠀⠀⠀⠀⢉⣠⣾⣿⣿⣿⣿⠀⠉⠀⢀⣾⡟\n⠀⠀⠈⢻⣷⣦⣤⠉⠁⠀⠀⠀⠀⠹⣿⣟⠻⢿⣷⣿⣿⣦⣀⠀⠀⠀⠀⠈⢙⣿⠿⠿⠿⣷⣶⣶⣤⣤⣤⣀⣈⣉⣉⣁⣀⣀⣀⣀⣤⣤⣶⠿⠻⣿⡏⢻⣿⣿⡆⠀⠀⣾⡟\n⠀⠀⠀⠀⠙⢿⣷⣄⠀⠀⠀⠀⠀⠀⠙⣿⣦⠀⠀⣿⣿⣿⣿⣿⣶⣶⣤⣀⣾⡿⠀⠀⠀⠀⠀⠈⠉⣿⡏⠉⠛⠛⢻⣿⡟⠛⠋⠉⠉⣿⣧⠀⠀⣿⣇⣸⣿⣿⡇⠀⢸⣿⠁\n⠀⠀⠀⠀⠀⠀⠹⣿⣇⠀⠀⠀⠀⠀⠀⠈⠻⣷⣤⣼⡿⠀⠈⠙⠛⠿⣿⣿⣿⣷⣶⣶⣤⣤⣀⣀⣀⣿⣇⣀⣀⣀⣀⣿⣇⣀⣀⣤⣤⣼⣿⣶⣾⣿⣿⣿⣿⣿⠇⠀⢸⣿\n⠀⠀⠀⠀⠀⠀⠀⢻⣿⣄⠀⠀⠀⠀⠀⠀⠀⠈⠻⣿⣅⡀⠀⠀⠀⠀⠀⢸⣿⠛⠛⠿⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠀⠀⢸⣿\n⠀⠀⠀⠀⠀⠀⠀⠀⠙⣿⣦⡀⠀⠀⠀⠀⠀⠀⠀⠈⠻⢿⣦⣀⠀⠀⢠⣿⠏⠀⠀⠀⠀⠀⠈⢹⣿⠛⠿⠿⠿⠿⣿⣿⣿⡿⣿⣿⣿⣿⢿⣿⡿⢿⣿⢟⣿⡟⠀⠀⢸⣿⡆\n⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠻⣷⣦⡀⢀⣄⡀⠀⣀⣀⠀⠀⠉⠻⢿⣶⣿⡏⠀⠀⠀⠀⠀⠀⠀⢸⣿⠀⠀⠀⠀⠀⣾⡟⠀⠀⢀⣿⡟⠀⣼⣿⠁⢼⣿⣾⡿⠁⠀⠀⠈⣿⡇\n⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠻⣿⣦⣈⠙⠲⢤⣈⠙⠲⢤⣀⠀⠈⠙⠛⠿⢷⣶⣦⣤⣤⣄⣼⣿⣀⣀⣀⣀⣀⣿⣄⣀⣠⣾⣟⣠⣴⣿⣷⣶⠿⠟⠋⠀⠀⠀⠀⠀⢿⡇\n⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠛⠿⣿⣦⣄⡉⠓⠦⢤⣈⠑⠲⢤⣄⡀⠀⠈⠉⠉⠉⠛⠛⠛⠛⠛⠛⠛⠛⠛⠛⠛⠛⠛⠛⠋⠉⠉⠉⠀⠀⢀⡆⠀⠀⡀⠀⠀⢸⡇\n⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠻⢿⣶⣤⣀⡈⠉⠓⠶⢤⣉⡛⠶⢤⣀⣀⠀⠀⠀⠈⠉⠉⠉⠘⠒⠒⠒⠀⠀⠀⠀⠀⠀⢀⣠⠴⠋⠀⠀⠀⡇⠀⠀⢸⣿\n⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠉⠛⠻⣿⣶⣦⣀⠀⠈⠉⠓⠒⠢⠭⣭⣀⣀⠀⠉⠉⠉⠉⠉⠉⠀⠒⠒⠒⠋⠉⠉⠀⠀⠀⣠⡴⠚⠁⠀⠀⢸⣿\n⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠙⠿⣿⣶⣄⡀⠀⠀⠀⠀⠀⠀⠉⠉⠉⠉⠑⠒⠒⠒⠒⠒⠒⠒⠒⠒⠒⠒⠋⠁⠀⠀⠀⠀⢀⣾⡿\n⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠛⠿⣷⣦⣤⣤⣤⣄⣀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⣿⡟⠁\n⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠉⠉⠛⠿⠿⣿⣶⣶⣤⣀⣀⡀⠀⠀⠀⠀⠀⠀⠀⣀⣠⣤⣶⡿⠟⠁\n⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠉⠛⠛⠛⠻⠿⠿⠿⠿⠟⠛⢛⢋⠉⡁');
let currentInput = '';                                                  // player input / guess
let colors = [];                                                        // colors of letters returned by 1.3. getColors()
let greenLetters = '';                                                  // string containing letters which are green. used for determining on-screen keyboard key colors
let guess = 0;                                                          // guess counter (0-5)
let infoOpen = false;                                                   // is the info page open
keys.enter = document.querySelector('#enter');
keys.backspace = document.querySelector('#backspace');

// letter grid elements [row][letter]
let counter = 1;
for (let i = 0; i < 6; i++) {
    rows[i] = [];
    for (let j = 0; j < 5; j++) {
        rows[i][j] = document.querySelector('.letter:nth-child(' + counter + ')')
        counter++;
    }
}

// keyboard elements
for (let i = 0; i < letters.length; i++) {
    keys[letters[i]] = document.querySelector('#' + letters[i]);
    keys[letters[i]].tabIndex = '-1';
    keys[letters[i]].addEventListener('click', function() { keyPressHandler(letters[i].toUpperCase()); });
}

/* --- EVENT LISTENERS --- */

keys.enter.addEventListener('click', function(e) { keyPressHandler('ENTER', e) });                          // on-screen keyboard click listener
keys.backspace.addEventListener('click', function(e) { keyPressHandler('BACKSPACE', e) });                  // on-screen keyboard click listener
window.addEventListener('keydown', function(e) { keyPressHandler(e.key.toUpperCase(), e); });               // keyboard key press listener
infoBtn.addEventListener('click', () => {                                                                   // info button press listener
    if (infoOpen) {
        infoPage.style.setProperty('display', 'none');
        infoOpen = false;
    }
    else {
        infoPage.style.setProperty('display', 'block');
        infoOpen = true;
    }
});