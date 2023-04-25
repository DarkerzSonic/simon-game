// Step 2
var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var gameStarted = false;

var level = 0;

function nextSequence() {
    $('#level-title').text('Level ' + ++level);
    var randomNumber = Math.round(3 * Math.random());
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    //console.log(randomNumber);

    // Step 3
    $('#' + randomChosenColor).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);

    // Step 8
    userClickedPattern = [];
}

// Step 4
$('.btn').click(function () {

    var userChosenColor = $(this).attr('id');
    playSound(userChosenColor);

    userClickedPattern.push(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
    // if (gameStarted == true) {
    //     userClickedPattern.push(userChosenColor);
    //     checkAnswer(userClickedPattern.length - 1);
    // }
});

// Step 5
function playSound(name) {
    let audio = new Audio('sounds/' + name + '.mp3');
    audio.play();
}

// Step 6
function animatePress(currentColor) {
    $('#' + currentColor).addClass("pressed");
    setTimeout(function () {
        $('#' + currentColor).removeClass("pressed");
    }, 100);
}

$(document).on("keypress", function (event) {
    if (event.key == 'a') {
        gameStarted = true;
        nextSequence();
    }
});

// Step 8
function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] == userClickedPattern[currentLevel]) {
        if (currentLevel + 1 == level) {
            setTimeout(nextSequence, 1000);
            userClickedPattern = [];
        }
    }
    else {
        let audio = new Audio('sounds/wrong.mp3');
        audio.play();

        $('body').addClass('game-over');
        setTimeout(function () {
            $('body').removeClass('game-over')
        }, 200);

        $('#level-title').text('Game Over, Press Any Key To Restart');
        startOver();
    }

}

// Step 10
function startOver() {
    level = 0;
    gamePattern = [];
    gameStarted = false;
}