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
}