const Word = require("./word");
const inquirer = require("inquirer");

function Game(word_array){
	_factory = function(word_array){
		let objectArray = word_array.map(word => new Word(word));
		objectArray[Math.floor(Math.random()*objectArray.length)].current = true; //set random word to current
		return objectArray;
	};
	this.wordObjectArray = _factory(word_array);
	this.current_word = function(){
		return this.wordObjectArray.find(word => word.current);
	};
	this.set_new_current = function(){
		let available_words = this.wordObjectArray.filter(word => !word.played && !word.current);
		if(available_words.length > 0){
			available_words[Math.floor(Math.random()*available_words.length)].current = true; //set random word to current
			return true;
		}else{
			return false;
		}
	};
};

function play(game){
	let current_word = game.current_word();
	inquirer.prompt([
		{
			name: 'letter',
			message: 'Guess a letter (a-z): ',
			validate: function(letter){
				letter = letter.trim().toLowerCase();
				//source: https://stackoverflow.com/questions/9862761/how-to-check-if-character-is-a-letter-in-javascript
				let isValid = letter.length === 1 && letter.match(/[a-z]/i) != null;
				if(!isValid){
					console.log("\n [ Only input one letter at a time. No numbers or special characters. ]")
				}
				return isValid
			}
		}
	]).then(answers => {
 		let guessed_letter = current_word.guess(answers.letter);
 		console.log(current_word.display());
 		console.log(guessed_letter.toString());
 		//TODO: Has lost and score, display gueses left, display score
 		if(current_word.hasWon()){
 			console.log("\n ** You Won! **");
 			current_word.current = false;
 			current_word.won = true;
 			current_word.played = true;
 			let new_word_set = game.set_new_current();
 			if(new_word_set){
 				console.log("\n ** Here is your new word **");
 				console.log(current_word.display());
 				play(game);
 			}else{
 				console.log("\n **** Game Over ****");
 			}
 		}else{
 			play(game);
 		}
	});
}

//TODO: move to index.js?
//TODO: updated word array and handle special characters
const word_array = ["clayton", "Everley"];
const game = new Game(word_array);
console.log("///////////////////");
console.log("**** Welcome to Hangman ****");
console.log(game.current_word().display());
play(game);



