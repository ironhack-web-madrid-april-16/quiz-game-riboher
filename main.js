var Question = require('./question.js');
var Quiz = require('./quiz.js');

var question1 = new Question(1,"Que grupo creo la cancion Patience?","guns and roses","Un arma y una flor",10);
var question2 = new Question(2,"Quien es el dueño de los derechos de autor de los beatles?","michael jackson","Su hermana enseño una teta en la superbowl",15);
var question3 = new Question(3,"Que profesion tiene lisa de grande","presidenta","POTUS",5);
var question4 = new Question(4,"Que rasgo facial comun contiene aproximadamente 550 pelos?","cejas","lo que frunces",20);

var questionnaire = [question1,question2,question3,question4];

var game = new Quiz(questionnaire);
game.init();