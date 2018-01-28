const Word = require("./word");
const inquirer = require("inquirer");

function Game(word_array){
	_factory = function(word_array){
		let objectArray = word_array.map(word => new Word(word));
		objectArray[Math.floor(Math.random()*objectArray.length)].current = true; //set random word to current
		return objectArray;
	}
	this.wordObjectArray = _factory(word_array);
	this.current_word = function(){
		return this.wordObjectArray.find(word => word.current);
	}
}

function play(new_game){

	let current_word = new_game.current_word();

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
 	
 		let guessed_letters = current_word.guess(answers.letter);
 		let display = current_word.display();
 		console.log(display);
 		console.log(guessed_letters.toString());

 		play(new_game);
	});

}

const word_array = ["clayton harley thompson jr", "Everley Parker Thompson the first"];
const new_game = new Game(word_array);
console.log("///////////////////")
console.log("** Welcome to Hangman **")
play(new_game);



