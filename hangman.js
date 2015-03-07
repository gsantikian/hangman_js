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
  this.revealedLetters = [];
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

Game.prototype.DuplicateGuess = function(guess) {
  return this.guesses.indexOf(guess) >= 0;
};

Game.prototype.populateRevealedLetters = function() {
  for (var i = 0; i < this.wordLength; i++) {
    this.revealedLetters[i] = '_';
  }
};

game = new Game(word);
game.populateRevealedLetters();

console.log("Welcome to Hangman!");

while (true) {
  var userInput = sget("Enter a letter or type 'hint' or 'guesses':").trim().toLowerCase();
  if (userInput === 'hint') {
    console.log("HINT!!!!");
  } else if (userInput === 'guesses'){
    console.log(game.guesses.sort().join(', '));
  } else if (userInput.length === 1 && re.test(userInput)) {
    //Check if letter has already been guessed
    //If already guessed, have user try again
    if (game.DuplicateGuess(userInput)) {
      console.log("You have already guessed that letter. Try again.");
      continue;
    }
    //If input is a new guess, add letter to guesses array
    game.storeGuess(userInput);
    //If letter is in letters array, reveal letters.
    //If all letters have been guessed correctly show winning screen
    //else have user input another letter
    //If letter is not in letters array, decrement guesses and have user try again.
    //Also, check that guesses != 0
  } else {
    console.log("Invalid input. Please try again.");
  }
}
