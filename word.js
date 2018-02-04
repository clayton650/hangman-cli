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
		return Math.round(this.letterObjectArray.map(letter => letter.isLetter()).length/2);
	}
	this.display = function(){
		return this.letterObjectArray.map(letter => letter.display()).join("");
	};
	this.guess = function(guess){
		guess = guess.trim();
		if(guessed_letters.indexOf(guess) === -1){
			guessed_letters.push(guess);
			let match_array = this.letterObjectArray.map(letter => letter.isMatch(guess));
			if(!match_array.some(match => match)){
				this.current_guess_count++;
			}
			return guessed_letters;
		}else{
			return guessed_letters;
		}
	};
	this.hasWon = function(){
		let letters_left_to_guess = this.letterObjectArray.filter(function(letter){
			if(letter.isLetter() && !letter.guessed){
				return letter
			};
		});
		return letters_left_to_guess.length === 0;
	};
	this.hasLost = function(){

		return this.wrongGuesses().length >= this.max_guess_count();
	};
	this.wrongGuesses = function(){
		let correct_letter_array = this.letterObjectArray.map(letter => letter.value.toLowerCase());
		let wrong_letter_array = [];
		guessed_letters.forEach(function(letter){
			if(correct_letter_array.indexOf(letter.toLowerCase()) === -1){
				wrong_letter_array.push(letter);
			}
		});
		return wrong_letter_array;
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