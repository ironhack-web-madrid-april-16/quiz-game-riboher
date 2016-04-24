var read = require('read');
var User = require('./user.js');

var Quiz = function(questions){
	this.questions = questions;
	this.currentQuestion = this.questions[0];
	var self = this;
	var score = 0;
	var print = console.log;
	var bonusNumber = Math.floor(Math.random() * this.questions.length);
	var options = {};
	var registeredUsers = [
		new User("ricardo",25,2),
		new User("mikel",0,3),
		new User("alex",10,1)
	];
	this.assignBonusQuestion = function(){
		this.questions[bonusNumber].points *= 2;
	}
	this.questionIsBonus = function(){
		var isBonus = false;
		if(bonusNumber == this.currentQuestion.id - 1){
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
		options["prompt"] = this.currentQuestion.question + "\n>"
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

	this.createUser = function(err,name){
		var currentUser = new User(name,0,self.currentQuestion);
		self.ask();
	}

	this.loginUser = function(err,name){
		var userExists = false;
		for(var i = 0; i < registeredUsers.length; i++){
			if (name == registeredUsers[i].name){
				score = registeredUsers[i].totalScore;
				self.currentQuestion = self.questions[registeredUsers[i].currentQuestion - 1];
				console.log("Welcome back " + registeredUsers[i].name + "! You already have " + registeredUsers[i].totalScore + " points.");
				userExists = true;
			}
		}
		if(userExists){
			console.log()
			self.ask();
		}else{
			console.log("You sure you're registered? We didn't find a match in our DB. Please register to continue.");
			self.promptUser();
		}
	}

	this.getUserData = function(err,response){
		if(response == 'yes'){
			options["prompt"] = "You're new! Enter your name and register:\n>";
			read(options,self.createUser);
		}else if(response == 'no'){
			options["prompt"] = "Old time pal! Enter your name and let us check if there's a match\n>";
			read(options,self.loginUser);
		}else{
			self.promptUser();
		}
	}

	this.promptUser = function(){
		options["prompt"] = "New user?\n>";
		read(options,this.getUserData);
	}
}

Quiz.prototype.init = function(){
	this.promptUser();
	this.assignBonusQuestion();
}

module.exports = Quiz;