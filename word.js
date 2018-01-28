const Letter = require("./letter");

function Word(value){
	const _factory = function(value){
		return value.split("").map(letter => new Letter(letter));
	};
	this.value = value;
	this.letterObjectArray = _factory(value);	
	this.current = false;
	this.won = false;
	this.played = false;
	const guessed_letters=[];
	this.display = function(){
		return this.letterObjectArray.map(letter => letter.display()).join("");
	};
	this.guess = function(guess){
		guess = guess.trim();
		if(guessed_letters.indexOf(guess) === -1){
			guessed_letters.push(guess);
			this.letterObjectArray.forEach(letter => letter.isMatch(guess));
			return guessed_letters;
		}else{
			return guessed_letters;
		}
	};
	this.hasWon = function(){
		return !this.letterObjectArray.some(letter => letter.guessed===false);
	}
};

module.exports = Word;

//** Sample Usage: **
// let new_word = new Word("clayton");
// console.log(new_word.display());// >> _______
// new_word.guess("C");
// console.log(new_word.display());// >> c______
// new_word.guess("Y");
// console.log(new_word.display());// >> c__y___
// new_word.guess("   N   ");
// console.log(new_word.display());// >> c__y__n