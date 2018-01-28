//TODO: Support/ignore spaces
function Letter(value, placeholder = "_"){
	this.value = value;
	this.guessed = false;
	this.placeholder = placeholder;
	this.display = function(){
		if(this.guessed){
			return this.value;
		}else{
			return this.placeholder;
		}
	}
	this.isMatch = function (letter){
		const match = letter.trim().toLowerCase() === this.value.toLowerCase();
		if(match){
			this.guessed = match;
		}
		return match;
	}
};

module.exports = Letter;