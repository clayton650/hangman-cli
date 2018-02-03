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
	this.current_guess_count = 0;
	const guessed_letters=[];
	this.max_guess_count = function(){
		return this.letterObjectArray.map(letter => letter.isLetter()).length/3;
	}
	this.display = function(){
		return this.letterObjectArray.map(letter => letter.display()).join("");
	};
	this.guess = function(guess){
		guess = guess.trim();
		if(guessed_letters.indexOf(guess) === -1){
			guessed_letters.push(guess);
			let match_array = this.letterObjectArray.map(letter => letter.isMatch(guess));
			console.log("** Here is the match some function: ", match_array.some(match => match));
			if(!match_array.some(match => match)){
				this.current_guess_count++;
			}
			return guessed_letters;
		}else{
			return guessed_letters;
		}
	};
	this.hasWon = function(){
		let correct_guesses = this.letterObjectArray.map(function(letter){
			return letter.isLetter() && letter.guessed===false;
		});
		return !correct_guesses.some(guess => guess===false);
	};
	this.hasLost = function(){
		return this.current_guess_count >= this.max_guess_count;
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