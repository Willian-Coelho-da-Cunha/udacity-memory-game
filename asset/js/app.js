$("#question").modal();

function startGame(){
	/*------CHANGE THE GAME PROPERTIES------*/
	game.gameOn = true;
	game.gameOff = false;
}

function turnCard(event){}

function delayDisplayCard(){}

function restartGame(){
	/*------CHANGE THE GAME PROPERTIES------*/
	game.gameOn = false;
	game.gameOff = true;
	game.click = 0;

	/*------IF THE USER CLICK ON THE BUTTON WITH OUT MATCH NO CARDS------*/
	let cardMatrix = [];
	cardMatrix = document.querySelectorAll(".card-match");

	if (cardMatrix === null) {

	} else {

	}
}