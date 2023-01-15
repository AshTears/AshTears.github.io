/* Script for the Simon Game */

const buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];   // Array to hold the randomly selected buttons
var userClickedPattern = [];    // Array to hold the user selected buttons
let level = 0;
let started = true;

// Plays the sound of the selected button
function playSound(name){
    let sound = new Audio("sounds/" + name + ".mp3");
    sound.play();
}

// NextSequence starts a new round of the game
function nextSequence(){
    level++;
    $("#level-title").text("Level " + level);   
    userClickedPattern = [];   
    let rand = Math.floor(Math.random() * 4);
    let randomChosenColour = buttonColours[rand];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

// Animates the user selected buttons
function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(() => {
        $("#"+currentColour).removeClass("pressed")
    }, 100);
}

/**
 * CheckAnswer function compares the user's answer to the game's pattern
 * @param {*integer} currentLevel 
 */
function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        if (currentLevel === 0)
            nextSequence()
        else
            checkAnswer(currentLevel - 1);                          
    }
    else {
        playSound("wrong");
        $(document).addClass("game-over");
        setTimeout(() => {
            $(document).removeClass("game-over");
        }, 5000);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        started = true;
    }
}

/* Starts a new game */
function startOver(){
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    nextSequence();
}

/* Event handler for when the user clicks a button */
$(".btn").click(function(){  
    let userChosenColour = $(this).attr("id");
    playSound(userChosenColour);
    userClickedPattern.push(userChosenColour);
    animatePress(userChosenColour);
    if (userClickedPattern.length === gamePattern.length)
        checkAnswer(userClickedPattern.length - 1);
});

/* Event Handler to start a new game */
$(document).keypress(function(){
    if (started){
        started = false;
        startOver();
    }   
});



