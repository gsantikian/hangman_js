var sget = require('sget');

var words = ["detroit", "chicago", "boston", "hello", "banana", "whatever"];
var word = words[Math.floor(Math.random() * words.length)];

var letters = word.split('');

function Game(word) {
  this.word = word;
  this.guessesLeft = 6;
  this.hintsLeft = 2;
}

Game.prototype.decrementGuess = function() {
  this.guessesLeft -= 1;
};

Game.prototype.decrementHint = function() {
  this.hintsLeft -= 1;
}

game = new Game(word);

console.log(game.word);
console.log(game.guessesLeft);
game.decrementGuess();
console.log(game.guessesLeft);
game.decrementHint();
console.log(game.hintsLeft);