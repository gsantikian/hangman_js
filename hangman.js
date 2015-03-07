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

Game.prototype.updateRevealedLetters = function() {

};

Game.prototype.correctGuess = function(guess) {
  return this.letters.indexOf(guess) >= 0;
};

Game.prototype.winner = function() {
  return this.revealedLetters.indexOf('_') < 0;
}

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

    if (game.correctGuess(userInput)) {
      //update revealed letters array
      if (winner()) {
      //If all letters have been guessed correctly show winning screen
      console.log("You win!");
      break;
      } else {
      //else have user input another letter
      continue;
      }
    } else {
      // decrement guesses and have user try again.
      game.decrementGuess();
      if (game.guessesLeft === 0) {
        console.log("Game Over.");
        break;
      } else {
        continue;
      }
    }
  } else {
    console.log("Invalid input. Please try again.");
  }
}
