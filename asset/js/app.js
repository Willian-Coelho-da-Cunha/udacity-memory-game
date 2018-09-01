$("#question").modal();

function startGame(){
	/*------CHANGE THE GAME PROPERTIES------*/
	game.gameOn = true;
	game.gameOff = false;
	game.click = 0;

	/*------IF RESTART THE GAME: REMOVE CARD-MATCH CLASS------*/
	let verifyClass = document.querySelector(".card-match");
	if (!(verifyClass === null)) {
		/*------REMOVE CARD-MATCH CLASS------*/
		let cardMatrix = [];
		cardMatrix = document.querySelectorAll(".card");
		for (let i = 0; i < cardMatrix.length; i++) {
			cardMatrix[i].textContent = "Willian";
			cardMatrix[i].classList.remove("card-match");
		}
	}
}

function turnCard(event){}

function delayDisplayCard(){}