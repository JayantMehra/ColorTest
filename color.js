var numSquares = 6;
var colors = [];
var pickedColor;

var h1 = document.querySelector("h1");
var squares = document.querySelectorAll(".square");
var colorDisplay = document.querySelector("#colorDisplay");
var messageDisplay = document.querySelector("#message");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");


init();

function init() {
	setUpModeButtons();
	setUpSquares();
	reset();
}

function setUpModeButtons() {
	for (var i = 0; i < modeButtons.length; i++) {
		modeButtons[i].addEventListener("click", function() {
			modeButtons[0].classList.remove("selected");
			modeButtons[1].classList.remove("selected");
			this.classList.add("selected");

			if (this.textContent === "Easy") {
				numSquares = 3;
			}
			else {
				numSquares = 6;
			}
			reset();
		});
	}
}

function setUpSquares() {
	for (var i = 0; i < squares.length; i++) {
		
		//Add a click event to each square
		squares[i].addEventListener("click", function() {

			//compare square color to target
			if (this.style.backgroundColor === pickedColor) {
				messageDisplay.textContent = "Correct";
				changeColorsOnCorrectGuess();
				resetButton.textContent = "Play Again?"
			}
			else {
				this.style.backgroundColor = "#232323";
				messageDisplay.textContent = "Try Again";
			}
		});
	}
}


function reset() {
	colors = generateRandomColors(numSquares);
	pickedColor = pickColor();
	colorDisplay.textContent = pickedColor;

	resetButton.textContent = "New Colors";
	messageDisplay.textContent = "";

	for (var i = 0; i < squares.length; i++) {
		if (colors[i]) {
			squares[i].style.display = "block";
			squares[i].style.backgroundColor = colors[i];
		}
		else {
			squares[i].style.display = "none";
		}
	}

	h1.style.backgroundColor = "steelblue"	
}

//Reset/Play Again Button
resetButton.addEventListener("click", function() {
	reset();
});

function changeColorsOnCorrectGuess() {
	for (var i = 0; i < squares.length; i++) {
		squares[i].style.backgroundColor = pickedColor;
	}
	h1.style.backgroundColor = pickedColor;
}

function pickColor() {
	var random = Math.floor(Math.random() * colors.length);
	return colors[random];
}

function generateHexCode() {
	return Math.floor(Math.random() * 256);
}

function generateRandomColors(num) {
	var arr = [];

	for (var i = 0; i < num; i++) {
		var red = generateHexCode();
		var green = generateHexCode();
		var blue = generateHexCode();

		arr.push("rgb(" + red + ", " + green + ", " + blue + ")");
	}
	return arr;

}
