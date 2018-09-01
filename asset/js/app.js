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
		if (cardMatrix.length === 28)) {
			/*------ADD ONE TO QUANTITY OF REPLAYS OF THE GAME------*/
			game.play++;
		}
		/*------REMOVE CARD-MATCH CLASS------*/
		for (let i = 0; i < cardMatrix.length; i++) {
			cardMatrix[i].textContent = "Willian";
			cardMatrix[i].classList.remove("card-match");
		}
	}

	/*------RESET THE CARD PROPERTIES------*/
	card.matchedCards = 0;
	card.matched = [];
	card.clickedCards = [];

	/*------RESTART TIMER------*/
	timer.restartTimer();

	/*------STAR RATING------*/
	starRating.restartStartRating();
}