var sget = require('sget');

var words = ["detroit", "chicago", "boston", "hello", "banana", "whatever"];
var word = words[Math.floor(Math.random() * words.length)];
var re = /[a-z]/;

function Game(word) {
  this.word = word;
  this.wordLength = this.word.length;
  this.letters = this.word.split('');
  this.guessesLeft = 6;
  this.hintsLeft = 2;
  this.guesses = [];
}

Game.prototype.decrementGuess = function() {
  this.guessesLeft -= 1;
};

Game.prototype.decrementHint = function() {
  this.hintsLeft -= 1;
};

Game.prototype.storeGuess = function(guess) {
  this.guesses.push(guess);
};

Game.prototype.checkDuplicateGuess = function(guess) {
  if (this.guesses.indexOf(guess) < 0) {
    console.log("You have already guessed that letter. Try again.");
  }
};

game = new Game(word);

console.log("Welcome to Hangman!");

while (true) {
  var userInput = sget("Enter a letter or type 'hint' or 'guesses':").trim().toLowerCase();
  if (userInput === 'hint') {
    console.log("HINT!!!!");
  } else if (userInput === 'guesses'){
    console.log("GUESSES!!!");
  } else if (userInput.length === 1 && re.test(userInput)) {
    console.log("LETTERS!!!");
  } else {
    console.log("Invalid input. Please try again.");
  }
}
