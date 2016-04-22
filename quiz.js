var read = require('read');

var Quiz = function(questions){
	this.questions = questions;
	this.currentQuestion = this.questions[0];
	var self = this;
	var score = 0;
	var print = console.log;
	var bonusNumber = Math.floor(Math.random() * this.questions.length);
	this.assignBonusQuestion = function(){
		this.questions[bonusNumber].points *= 2;
	}
	this.questionIsBonus = function(){
		var isBonus = false;
		if(bonusNumber == this.currentQuestion.id){
			isBonus = true;
		}
		return isBonus;
	}
	this.userInput = function(err,response){
		self.evaluateUserResponse(response);
	}
	this.ask = function(){
		if(self.questionIsBonus()){
			print("----------------------------------------------------------------------------");
			print("This question is Bonus!! Bear in mind that if you fail, you'll fail double!!");
			print("----------------------------------------------------------------------------");
		}
		var options = {
			prompt: this.currentQuestion.question + "\n>"
		};
		read(options,this.userInput);
	}
	this.evaluateUserResponse = function(response){
		if(self.currentQuestion.checkAnswer(response)){
			score += self.currentQuestion.points;
			if(self.questionIsBonus()){
				print("WOW! You guessed the bonus question! Congratulations! You scored double!. You have " + score + " points.");
			}else{
				print("Yay! That was correct. You have " + score + " points.");
			}
			if(self.currentQuestion.id == self.questions.length) {
				print("You finished the game with " + score + " points!");
			} else {
				self.currentQuestion = self.questions[self.currentQuestion.id];
				self.ask();
			}
		}else{
			score -= self.currentQuestion.points;
			print("Well...that was really not the answer. Maybe this hint will help you out");
			print("Remember though that you now have " + score + " points.");
			print(self.currentQuestion.hint);
			self.ask();
		}
	}
}

Quiz.prototype.init = function(){
	this.assignBonusQuestion();
	this.ask();
}

module.exports = Quiz;