$(document).ready(function() {
   
    //start button to initiate the page
    $('#start').click(function() {
        console.log("start button was selected");
        $('#start').hide();
        game.startGame();
    });

    //object of all the functions that make the game run
    var game = {	
        //variable to track 10 second count down
    	time: 10,
        //variable to hold the changing timer 
        coutdownTimer: 0,
        //variable to keep track of which question you are on
        questionCounter: 0,

    	correctGuesses: 0,
    	incorrectGuess: 0,

        noGuessBoolean: false,
        noGuess:0,

    	trivia:[{
        question: "How many different color party hats are there?",
        choices: ["1", "3", "5", "7"],       
        answer: "5",},
        {
        question: "What year was old school runesape server brought back?",
        choices: ["2000", "2004", "2007", "2010"],        
        answer: "2007",},
        {
        question: "What location allows you to sell any tradeable item",
        choices: ["grand exchange", "varrock", "lumbridge", "white castle"],      
        answer: "grand exchange",
    	}],

        startGame: function() {
            
            if(game.questionCounter < game.trivia.length){
                // $('#timer').html(" ");
                console.log("start game function initiated");
                $('#timer').html(game.time);

                game.coutdownTimer = setInterval(game.countdownFunction, 1000);

                game.pickQuestion();
                game.setChoices();
            }else{
                console.log("end of game");
                game.endGame();
            }
        },

        //function for picking and setting question
        pickQuestion: function(){
            console.log("pick question function has been reached");
            $('#question').html(game.trivia[game.questionCounter].question);
        },

        //function to set choices
        setChoices: function(){
            $.each(game.trivia[game.questionCounter].choices, function(index,value){
                var answer = $('<div>')
                    .addClass("divChoices")
                    .attr('data-id',index)
                    .attr('data-value',value)
                    .html(game.trivia[game.questionCounter].choices[index])               
                    .on('click',game.checkAnswer);

                $('#answer').append(answer);
                // console.log($('#answer').html());
            });
        },

        // function to display the count down timer
        countdownFunction: function(){

            if(game.time > 0){
                game.time--;
                $('#timer').html(game.time);
                //console.log("timer " + game.time);
            }else{
                
                game.noGuessBoolean = true;
                game.checkAnswer();

            }
        },

        checkAnswer: function(){

            if($(this).data('value') == game.trivia[game.questionCounter].answer){
                console.log("answer correct");
                game.correctGuesses++;
                game.questionCounter++;
                clearInterval(game.coutdownTimer);
                $('#timer').html("You answered Correct!");
                //add image in answer
                $('#answer').html("");
                game.time = 10;
                
                var nextQuestion = setTimeout(game.startGame,2000);

            }else if(game.noGuessBoolean == true){
                game.noGuessBoolean=false;
                console.log("didnt answer");
                game.noGuess++;
                game.questionCounter++;
                clearInterval(game.coutdownTimer);
                $('#timer').html("You failed to answer!");
                //add image in answer
                $('#answer').html("");
                game.time = 10;
                
                var nextQuestion = setTimeout(game.startGame,2000);

            }else{
                console.log("answer fail");
                game.incorrectGuess++;
                game.questionCounter++;
                clearInterval(game.coutdownTimer);
                $('#timer').html("You answered Wrong... NOOB!");
                //add image in answer
                $('#answer').html("");
                game.time = 10;
                
                var nextQuestion = setTimeout(game.startGame,2000);

            }
        },

        endGame: function(){
            $('#timer').html("You answered: " + game.correctGuesses + " correct.");
            $('#question').html("You answered: " + game.incorrectGuess + " wrong.");
            $('#answer').html("You had: " + game.noGuess + " unanswered.")
            
            var resetButton = $('<button>')
                .addClass("gameButton")
                .html("Have another Go?")               
                .on('click',game.reset);

            $('#resetBtn').html(resetButton);
        },

        reset: function(){
            console.log("reset game started");
            game.time = 10;

            game.coutdownTimer= 0;

            game.questionCounter= 0;

            game.correctGuesses= 0;
            game.incorrectGuess= 0;

            game.noGuessBoolean= false;
            game.noGuess=0;

            $('#timer').empty();
            $('#question').empty();
            $('#answer').empty();
            $('#resetBtn').empty();
            game.startGame();
        }
    };
});
