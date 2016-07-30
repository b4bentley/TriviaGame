$(document).ready(function() {
    //variables

    var unanswered = 0;
 

    var pick = 0;
    
    var choice;
    var display;

    //object of all the functions that make the game run
    var game = {

    	time: 30,
    	correctGuesses: 0,
    	incorrectGuess: 0,
    	coutdownTimer: 0,

    	trivia:[{
        question: "How many different color party hats are there?",
        choices: ["1", "3", "5", "7"],
        answer: 2,
        correct: "5",

    	}],


        startGame: function() {
            $('#start').hide();
            
            game.timerReset();
            game.coutdownTimer = setInterval(game.countdown, 1000);
            game.data();
        },

        countdown: function() {
            if (game.time > 0) {
                game.time--;
                $('#timer').html(game.time);
            } else {
                clearInterval(game.coutdownTimer);
                game.incorrect();
            }
        },

        timerReset: function() {
            game.time = 30;
            $('#timer').html(game.time);
        },

        check: function() {
            if ($(this).attr('data-id') == game.trivia[choice].answer) {
                game.correctGuesses++;
           		clearInterval(game.coutdownTimer);
            	$('#timer').html("CORRECT");
             	console.log("correct", game.correctGuesses);
            	game.displayAnswer();
            } else {
	            game.incorrectGuess++;
	            clearInterval(game.coutdownTimer);
	            $('#timer').html("INCORRECT");
	            console.log("incorrect", game.incorrectGuess);
	            game.displayAnswer();
            }
        },

        data: function() {
            choice = pick;
            pick++;
            $('#question').html(game.trivia[choice].question);
            $.each(game.trivia[choice].choices, function(index, value) {
                var answer = $('<p>')
                    .addClass('choice')
                    .html(game.trivia[choice].choices[index])
                    .attr('data-id', index)
                    .on('click', game.check);
                $('#answer').append(answer);
            });
        },

        displayAnswer: function() {
            $('#question').html("The correct answer was " 
            		+ game.trivia[choice].correct);
            display = setTimeout(game.nextQuestion, 2500);
        },

        nextQuestion: function() {
            if (pick !== game.trivia.length) {
                game.time = 30;
                $('#answer').empty();
                game.startGame();
            } else {
                game.endGame();
            }
        },

        endGame: function() {
            clearInterval(game.coutdownTimer);
            $('#timer').hide();
            $('#question').html('GAME OVER');
            $('#answer').html("Correct answers: " + game.correctGuesses 
            		+ "<br>Incorrect answers: " + game.incorrectGuess);
            var reset = $("<button>")
                .addClass('btn gameButton')
                .html('Play Again')
                .attr('id', 'reset');
            $('#resetBtn').html(reset);
        },

        reset: function() {
            game.time = 30;
            game.correctGuesses = 0;
            game.incorrectGuess = 0;
            pick = 0;
            game.coutdownTimer = undefined;
            choice = undefined;
            display = undefined;
            $('#timer').empty();
            $('#question').empty();
            $('#answer').empty();
            $('#resetBtn').empty();
            game.startGame();
        }
    };


    $('#resetBtn').on('click', function() {
        game.reset();
    });

       //click to start game
    $('#start').click(function() {
        game.startGame();
    });


});
