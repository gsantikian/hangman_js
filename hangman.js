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

Game.prototype.updateRevealedLetters = function(letter) {
  var indices = [];
  for (var i = 0, len = this.letters.length; i < len; i++) {
    if (letter === this.letters[i]) {
      indices.push(i);
    }
  }
  for (var i = 0, len = indices.length; i < len; i++) {
    this.revealedLetters[indices[i]] = letter;
  }
};

Game.prototype.correctGuess = function(guess) {
  return this.letters.indexOf(guess) >= 0;
};

Game.prototype.winner = function() {
  return this.revealedLetters.indexOf('_') < 0;
};

Game.prototype.hintLetter = function() {
  var indices = [];
  var hintLetters = [];
  for (var i = 0, len = this.revealedLetters.length; i < len; i++) {
    if (this.revealedLetters[i] === '_') {
      indices.push(i);
    }
  }
  for (var i = 0, len = indices.length; i < len; i++) {
    hintLetters.push(this.letters[indices[i]]);
  }
  return hintLetters[Math.floor(Math.random() * hintLetters.length)];
}

game = new Game(word);
game.populateRevealedLetters();

console.log("Welcome to Hangman!");

while (true) {
  var userInput = sget("Enter a letter or type 'hint' or 'guesses':").trim().toLowerCase();
  if (userInput === 'hint') {
    if (game.hintsLeft === 0) {
      console.log("Sorry, no hints left.");
    } else {
      game.updateRevealedLetters(game.hintLetter());
      console.log(game.revealedLetters.join(' '))
      game.decrementHint();
    }
  } else if (userInput === 'guesses'){
    console.log(game.guesses.sort().join(', '));
  } else if (userInput.length === 1 && re.test(userInput)) {
    if (game.DuplicateGuess(userInput)) {
      console.log("You have already guessed that letter. Try again.");
      continue;
    }
    game.storeGuess(userInput);
    if (game.correctGuess(userInput)) {
      game.updateRevealedLetters(userInput);
      if (game.winner()) {
      console.log(game.revealedLetters.join(' '));
      console.log("You win!");
      break;
      } else {
      console.log(game.revealedLetters.join(' '));
      continue;
      }
    } else {
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
