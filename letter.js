//TODO: Support/ignore spaces
function Letter(value, placeholder = "_"){
	this.value = value;
	this.guessed = false;
	this.placeholder = placeholder;
	this.display = function(){
		if(this.guessed){
			return this.value;
		}else{
			if(this.isLetter()){
				return this.placeholder;
			}else{
				return this.value;
			}
			
		}
	};
	this.isMatch = function (letter){
		const match = letter.trim().toLowerCase() === this.value.toLowerCase();
		if(match){
			this.guessed = match;
		}
		return match;
	};
	this.isLetter = function(){
		return this.value.match(/[a-z]/i)
	}
};


module.exports = Letter;