/*
        Hangman Game Source Code
        Justin Delaney
        UCLA Extension Coding Boot Camp
*/
'use strict';

var masterWordList =
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

/* var wordHints =
    [
        "Balls & Brooms... Bumps & Bruises",
        "Who? Not me?...",
        "Roar... be very afraid",
        "Some times a killer smile isn't everything",
        "Dodging bullets let and right out here!",
        "That ghost is such a perve",
        "Gives a new meaning to the mile high club",
        "The real we need to get rid of fossil fuel",
        "Stop hitting yourself!",
        "Not forest gump",
        "look at me. I'm a big strong man. Come at me bro!"
    ]; */

const totalMaxTries = 9;

//Hangman Game Object


var hangmanGame = {
    wordList: masterWordList,
    guessingWord: [],
    guessedLetters: [],
    currentWord: "",
    lastWordIdx: -1,
    wins: 0,
    losses: 0,
    maxTries: totalMaxTries,
    hasfinished: true,

    //Reset Game Function

    resetGame: function () {
        var idx = -1;
        do {
            idx = Math.floor(Math.random() * this.wordList.length);
        } while (idx === this.lastWordIdx)

        this.currentWord = this.wordList[idx];
        this.lastWordIdx = idx;

        this.guessingWord = [];
        this.guessedLetter = [];

        this.remainingGuesses = this.maxTries;

        this.hasFinished = false;

        var len = this.currentWord.length;
        for (var i = 0; i < len; i++); {

            if (this.currentWord[i] === " ") {
                this.guessingWord.push(space);
            } else {
                this.guessingWord.push("_");
            }
        }

        document.getElementById(you - win) = "display: none";
        document.getElementById(you - lose) = "display: none";

        this.updateDisplay();
    },

    updateDisplay: function () {
        document.getElementById("totalWins").innertext = this.wins;
        document.getElementById("totalLosses").innertext = this.losses;

        var tempWord = "";
        for (var i = 0; i < this.guessingWord.length; i++) {
            if (this.guessingWord[i] === space) {
                tempWord += "&nbsp;";
            } else {
                tempWord += this.guessingWord[i];
            }
        }
        document.getElementById("currentWord").innertext = tempWord;
        document.getElementById("remainingGuesses").innertext = this.remainingGuesses;
        document.getElementById("guessedLetters").innertext = this.guessedLetters;
    },

    makeGuess: function (letter) {
        if (this.remainingGuesses > 0) {
            if (this.guessedLetters.indexOf() === -1) {
                this.guessedLetters.push(letter);
                this.evaluategGuess(letter);
            }
        }
        this.checkWinLose();
        this.updateDisplay();
    },

    evaluateGuess: function (letter) {
        var positions = [];

        for (var i = 0; i < this.currentWord.length; i++) {
            if (this.currentWord[i] === letter) {
                positions.push(i);
            }
        }
        if (positions.length <= 0) {
            this.remainingGuesses--;
        } else {
            for (var i = 0; i < positions.length; i++) {
                this.guessingWord[positions[i]] = letter;
            }
        }
    },

    checkWinLose: function () {
        if (this.guessingWord.indexOf("_") === -1) {
            document.getElementById("you-win") = "display: block";
            this.wins++;
            this.hasFinished = true;
            return;
        }
        if (this.remainingGuesses <= 0) {
            document.getElementById("you-lose") = "display: block";
            this.losses++;
            this.hasFinished = true;
            return;
        }
    },
};

//var validGuesses = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]

function isLetter(keyCode) {
    return (keyCode >= 65 && keyCode <= 90);
}

document.onkeydown = function (event) {
    if (hangmanGame.hasFinished) {
        hangmanGame.resetGame();
        hangmanGame.hasFinished = false;
    } else {
        if (isLetter(event.keyCode)) {
            hangmanGame.makeGuess(event.key.toUpperCase());
        }
    }
};

















