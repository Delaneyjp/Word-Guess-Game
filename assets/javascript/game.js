/*
   JUSTIN DELANEY
   UCLA CODING BOOTCAMP
   2019
*/



var masterWordList = // Word list
    [
        "harry potter",
        "scarface",
        "the lion king",
        "the dark knight",
        "the matrix",
        "scary movie",
        "snakes on a plane",
        "jurassic park",
        "fight club",
        "saving private ryan",
        "gladiator",
        "coming to america",
        "limitless",
        "bad boys",
        "lord of the rings"
    ];

const totalMaxTries = 9;
const space = "space";

// Hangman - Object
var hangmanGame = {
    wordList: masterWordList,       //  List of Movie Titles
    guessingWord: [],               //  Holds the characters guessed right
    guessedLetters: [],             //  Holds the guessed letters
    currentWord: "",                //  Holds the current word we're guessing from the wordList
    lastWordIdx: -1,                //  Holds the last word index, so we don't pick the same word twice in a row 
    wins: 0,                        //  Total wins
    losses: 0,                      //  Total losses
    maxTries: totalMaxTries,        //  Max tries, front const above
    remainingGuesses: 0,            //  Remaining guesses, zero it out.
    hasFinished: true,              //  If we've either won or loss

    //--------------------------------------------------------
    // resetGame() function, which will reset all of our game variables.
    resetGame: function () {
        var idx = -1;
        do {
            idx = Math.floor(Math.random() * this.wordList.length);
        } while (idx === this.lastWordIdx)

        this.currentWord = this.wordList[idx];
        this.lastWordIdx = idx;

        // Zero out arrays
        this.guessingWord = [];
        this.guessedLetters = [];

        // Reset remainingTries
        this.remainingGuesses = this.maxTries;

        this.hasFinished = false;

        // Build the word and add underscores in place of letters
        var len = this.currentWord.length;
        for (var i = 0; i < len; i++) {

            if (this.currentWord[i] === " ") {
                this.guessingWord.push(space);
            } else {
                this.guessingWord.push("_");
            }
        }

        // Hide win and lose alerts
        document.getElementById("pressKeyTryAgain").style.cssText = "display: none";
        document.getElementById("newGame").style.cssText = "display: none";
        document.getElementById("youWin").style.cssText = "display: none";
        document.getElementById("youLose").style.cssText = "display: none";

        // Show display
        this.updateDisplay();
    },

    // Updates the HTML display area with counters
    updateDisplay: function () {
        // Total Wins & Looses
        document.getElementById("totalWins").innerText = this.wins;
        document.getElementById("totalLosses").innerText = this.losses;


        // currentword being guessed
        var tempWord = "";
        for (var i = 0; i < this.guessingWord.length; i++) {
            if (this.guessingWord[i] === space) {
                tempWord += "&nbsp;";
            } else {
                tempWord += this.guessingWord[i];
            }
        }

        document.getElementById("currentWord").innerHTML = tempWord;
        document.getElementById("remainingGuesses").innerText = this.remainingGuesses;
        document.getElementById("guessedLetters").innerText = this.guessedLetters;
    },

    // Begins the game
    makeGuess: function (letter) {
        if (this.remainingGuesses > 0) {
            // Make sure we didn't use this letter yet
            if (this.guessedLetters.indexOf(letter) === -1) {
                this.guessedLetters.push(letter);
                this.evaluateGuess(letter);
            }
        }
        this.checkWinLose();
        this.updateDisplay();
    },
    evaluateGuess: function (letter) {
        // Array to store positions of letters in string
        var positions = [];

        // Loop through word finding all instances of guessed letter, store in an array.
        for (var i = 0; i < this.currentWord.length; i++) {
            if (this.currentWord[i] === letter) {
                positions.push(i);
            }
        }

        // if none, remove a guess
        if (positions.length <= 0) {
            this.remainingGuesses--;
        } else {
            // Loop through and replace the underscore with the guessed letter.
            for (var i = 0; i < positions.length; i++) {
                this.guessingWord[positions[i]] = letter;
            }
        }
    },
    checkWinLose: function () {
        if (this.guessingWord.indexOf("_") === -1) {
            document.getElementById("youWin").style.cssText = "display: block";
            document.getElementById("pressKeyTryAgain").style.cssText = "display: block";
            this.wins++;
            this.hasFinished = true;
            return;
        }
        if (this.remainingGuesses <= 0) {
            this.losses++;
            document.getElementById("youLose").style.cssText = "display: block";
            document.getElementById("pressKeyTryAgain").style.cssText = "display: block";
            this.hasFinished = true;
            return;
        }
    },
};
//----------------------------------------------------------
// isLetter(keyCode)
// Check if the keyCode falls between A-Z
function isLetter(keyCode) {
    return (keyCode >= 65 && keyCode <= 90);
}
//---------------------------------------------------------
// Keyboard event handler
document.onkeydown = function (event) {
    // If game over, click to reset. Or click to guess.
    if (hangmanGame.hasFinished) {
        hangmanGame.resetGame();
        hangmanGame.hasFinished = false;
    } else {
        // Check to make sure a-z was pressed.
        if (isLetter(event.keyCode)) {
            hangmanGame.makeGuess(event.key.toLowerCase());
        }
    }
};
//--------------------------------------------------------