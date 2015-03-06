var sget = require('sget');

var words = ["detroit", "chicago", "boston", "banana", "car"];
var word = words[Math.floor(Math.random() * words.length)];
var wordLength = word.length;
var letters = word.split('');

var numberOfGuesses = 6;
var guessedLetters = [];

console.log(word);
console.log(wordLength);
console.log(letters);



// should let user guess a limited number of times (6?)
// should keep track of the letters the user has already guessed
// display guesses on request
// offer up 2 1-letter hints on request