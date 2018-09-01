$("#question").modal();

function startGame(){
	/*------CHANGE THE GAME PROPERTIES------*/
	game.gameOn = true;
	game.gameOff = false;
	game.click = 0;

	/*------IF RESTART THE GAME: REMOVE CARD-MATCH CLASS------*/
	let verifyClass = document.querySelector(".card-match");
	if (!(verifyClass === null)) {
		/*------ADD ONE TO QUANTITY OF REPLAYS OF THE GAME------*/
		game.play++;

		/*------REMOVE CARD-MATCH CLASS------*/
		let cardMatrix = [];
		cardMatrix = document.querySelectorAll(".card");
		for (let i = 0; i < cardMatrix.length; i++) {
			cardMatrix[i].textContent = "Willian";
			cardMatrix[i].classList.remove("card-match");
		}
	}

	/*------RESET THE CARD PROPERTIES------*/
	card.matchedCards = 0;
	card.matched = [];
	card.clickedCards = [];

	/*------DISTRIBUTING CARDS------*/
	card.rearrangeCards();

	/*------INITIALIZING THE TIMER------*/
	timer.restartTimer();
	timer.timeOn();

	/*------STAR RATING AND MOVE COUNTER------*/
	starRating.restartStartRating();
	moveCounter.restartCounter();

	/*------GETTING THE CONTAINER------*/
	let container = document.querySelector("#game-arena");
	
	$(container).on('click', 'DIV', turnCard);
}

function turnCard(event){
	/*------GETTING THE CURRENT ID------*/
	let indice = event.target.id;

	/*------ADD STYLE CLASS------*/
	this.classList.add("card-clicked");
}

function delayDisplayCard(){}