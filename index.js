buttonColors = ["red", "blue", "green", "yellow"];
gamePattern = []; //Stores pattern provided by the computer.
userClickedPattern = []; //Tracks user click pattern.
isGameStart = false; //game is not started by default.
levelCount = 1; //Level starts at level 1.

//On clicking a button, animate the button and perform operations.
$(".btn").on("click", function () {
	var userChosenColor = this.id; //'this' returns the html attributes of the clicked button div.
	userClickedPattern.push(userChosenColor); //adds users pattern to userClickedPattern array.
	var lastIndex = userClickedPattern.length - 1; //last index of userClickedPattern
	checkAnswer(lastIndex); //passing to custom function.
	animatePress(userChosenColor);
	playSound(userChosenColor); //passes the button id to custom playSound function.
});

//This function animates the button on User click
function animatePress(userChosenColor) {
	$("#" + userChosenColor).addClass("pressed"); //Adds the class "pressed" to the button.

	//removes the class "pressed" after few seconds.
	setTimeout(function () {
		$("#" + userChosenColor).removeClass("pressed");
	}, 100);
}

//Function to play sound on button click.
function playSound(soundname) {
	//Note that the sound name is same as the button name.
	//The sound name is used as src for Audio()
	var sound = new Audio("sounds/" + soundname + ".mp3");
	sound.play();
}

//Starts the game, ie: Displays sequence to user.
function nextSequence() {
	var randomNumber = Math.floor(Math.random() * 4); //generates random number b/w 0 and 3.
	randomChosenColor = buttonColors[randomNumber]; //choses value from buttonColors array with randomNumber as its index.
	gamePattern.push(randomChosenColor); //Adds the chosen value from buttonColors array to the pattern.
	$("#" + randomChosenColor)
		.fadeOut(100)
		.fadeIn(100); //Blinks the button with id = randomChosenColor .
	playSound(randomChosenColor); //Passes the randomChosenColor to custom playSound().

	levelCount = gamePattern.length; //levelCount is a global variable
	$("#level-title").html("Level " + levelCount); //Changes Level according to gamePattern array's length.
}

//Starts the Game.
$(document).on("keydown", function (event) {
	if (event.key == "Enter") {
		if (!isGameStart) nextSequence();
		isGameStart = true;
	}
});

//Checks if the user clicked pattern is same as game pattern.
function checkAnswer(lastIndex) {
	//Checks if most recent user clicked button is same as the element in game patterns index
	if (userClickedPattern[lastIndex] == gamePattern[lastIndex]) {
		//if user finishes the sequence then show next sequence.
		if (userClickedPattern.length == gamePattern.length) {
			userClickedPattern.length = 0; //Empties userClickedPattern array.
			setTimeout(nextSequence, 1000); //No '()' in function as argument. Or else setTimeout() will invoke nextSequence() right away.
		}
	} else {
		gameOver();
	}
}

function gameOver() {
	if (isGameStart) {
		console.log("Failed at level " + levelCount);
		$("#level-title").html("Press Enter to Restart");
		playSound("wrong");
		$("body").addClass("game-over");
		setTimeout(function () {
			$("body").removeClass("game-over");
		}, 500);

		//Resets all values.
		isGameStart = false;
		gamePattern.length = 0;
		userClickedPattern.length = 0;
		levelCount = 1;
	}
}
