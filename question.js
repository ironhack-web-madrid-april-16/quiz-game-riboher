var Question = function(id,question,correctAnswer,hint,points){
	this.id = id;
	this.question = question;
	this.correctAnswer = correctAnswer;
	this.hint = hint;
	this.points = points;
	this.checkAnswer = function(userAnswer){
		var correct = false;
		if(userAnswer == this.correctAnswer){
			correct = true;
		}
		return correct;
	}
}

module.exports = Question;