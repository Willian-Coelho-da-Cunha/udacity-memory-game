$("#question").modal();

function startGame(){
	/*------DISTRIBUTING CARDS------*/
	card.rearrangeCards();

	/*------INITIALIZING THE TIMER------*/
	timer.timeOn();

	/*------GETTING THE CONTAINER------*/
	let container = document.querySelector("#game-arena");

	$(container).on('click', 'DIV', turnCard);
}

function turnCard(event){
	/*------INCREASE NUMBER OF CLICKS------*/
	game.click++;

	/*------PREVENTS THE USER'S THIRD CLICK WHILE A setTimeout FUNCTION DOES NOT END------*/
	if (game.click > 2) {
		return;
	}
	
	/*------GETTING THE CURRENT ID------*/
	let indice = event.target.id;

	/*------CHECK IF THE CARD YOU CLICKED ON IS THE SAME AS A MATCH ALREADY FOUND------*/
	for (let i = 0; i < card.matched.length; i++) {
		if (card.matched[i].idDoc === indice) {
			return;
		}
	}

	/*------CHECK IF SAME CARD RECEIVED THE SECOND CLICK------*/
	if (card.clickedCards.length === 1) {
		if (card.clickedCards[0].idDoc === indice) {
			return;
		}
	}

	/*------INCREASE THE MOVE COUNTER------*/
	moveCounter.increaseCounter();

	/*------ADD STYLE CLASS------*/
	this.classList.add("card-clicked");

	for (let i = 0; i <= 27; i++) {
		if (indice === "rr"+i){
			/*------DISPLAY THE CARD------*/
			this.textContent = card.rearrangedCards[i].card;
			/*------kEEP THE CARD------*/
			let objCard = {
				idDoc: indice,
				card: card.rearrangedCards[i].card,
				idCard: card.rearrangedCards[i].id
			};
			card.clickedCards.push(objCard);
		}
	}
	if (card.clickedCards.length === 2){
				/*------CLICKED CARDS MATCH?------*/
		if (card.clickedCards[0].idCard === card.clickedCards[1].idCard) {

			/*------ADD ONE TO MATCHED CARDS------*/
			card.matchedCards++;

			/*------KEEP THE CARDS------*/
			card.matched.push(card.clickedCards[0]);
			card.matched.push(card.clickedCards[1]);

			/*------STYLE CARD------*/
			document.querySelector("#" + card.clickedCards[0].idDoc).classList.add("card-match");
			document.querySelector("#" + card.clickedCards[1].idDoc).classList.add("card-match");
			document.querySelector("#" + card.clickedCards[0].idDoc).classList.remove("card-clicked");
			document.querySelector("#" + card.clickedCards[1].idDoc).classList.remove("card-clicked");

			/*------CLEAR THE CLICKED CARDS ARRAY------*/
			card.clickedCards = [];

			/*------RESET NUMBER OF CLICKS------*/
			game.click = 0;

			/*------VERIFY IF ALL MATCHS WERE FOUND------*/
			if (card.matchedCards === 14) {
				game.gameOver();
			}
		} else {
			let show;
			/*------SHOW CLICKED CARDS WITH SOME TIME AS DELAY------*/
			show = setTimeout(delayDisplayCard, 1000);
		}
	}
}

function delayDisplayCard(){

	/*------RESTART STYLE CARD------*/
	document.querySelector("#" + card.clickedCards[0].idDoc).textContent = "Willian";
	document.querySelector("#" + card.clickedCards[1].idDoc).textContent = "Willian";
	document.querySelector("#" + card.clickedCards[0].idDoc).classList.remove("card-clicked");
	document.querySelector("#" + card.clickedCards[1].idDoc).classList.remove("card-clicked");

	/*------CLEAR THE CLICKED ARRAY------*/
	card.clickedCards = [];

	/*------RESET NUMBER OF CLICKS------*/
	game.click = 0;

	/*------END OF TIME OUT------*/
	clearTimeout(this.show);
}

function restartGame(){
	/*------DISABLE THE EVENT------*/
	let container = document.querySelector("#game-arena");
	$(container).off('click', 'DIV');

	/*------CHANGE THE GAME PROPERTIES------*/
	game.click = 0;

	/*------INITIALIZING THE TIMER------*/
	timer.timeOff();

	/*------IF THE USER CLICK ON THE BUTTON WITH OUT MATCH NO CARDS------*/
	let cardMatrix = [];
	cardMatrix = document.querySelectorAll(".card-match");

	if (!(cardMatrix === null)) {
		if (cardMatrix.length === 28) {
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

	/*------STAR RATING AND MOVE COUNTER------*/
	starRating.restartStartRating();
	moveCounter.restartCounter();

	/*------CALL THE FUNCTION TO START THE GAME------*/
	startGame();
}