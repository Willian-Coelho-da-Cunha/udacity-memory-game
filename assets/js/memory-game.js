/**
 * @description
 * Open the start game modal.
 */
openStartGameModal();

/**
 * @description
 * Open the start game modal.
 */
function openStartGameModal() {
	document.getElementById('start-game')
		.classList
		.replace(
			'modal--closed',
			'modal--opennig'
		)
	;
}

/**
 * @description
 * Close the start game modal.
 */
function closeStartGameModal() {
	let timeOutStorage = null;

	document.getElementsByClassName('modal__content__action__button--start-the-game')[0]
		.setAttribute('disabled', 'true')
	;

	document.getElementById('start-game')
		.classList
		.replace(
			'modal--opennig',
			'modal--closing'
		)
	;

	timeOutStorage = setTimeout(() => {
		clearTimeout(timeOutStorage);

		document.getElementById('start-game')
			.classList
			.replace(
				'modal--closing',
				'modal--closed'
			)
		;

		document.getElementsByClassName('modal__content__action__button--start-the-game')[0]
			.removeAttribute('disabled')
		;
	}, 500);
}

/**
* @description
* This function is called in the first time after the page is loaded, when the user clicks on 
* start game button inside the modal.
*/
function startGame() {
	closeStartGameModal();

	card.rearrangeCards();

	timer.timeOn();

	addEventListener();
}

/**
 * @description
 * Add an event listener for each card inside the game.
 */
function addEventListener() {
	const gameCards = document.querySelectorAll('.game__card');

	for (let i = 0; i < gameCards.length; i++) {
		gameCards[i].addEventListener('click', turnCard);
	}
}

/**
 * @description
 * Remove the event listener present at each card inside the game.
 */
function removeEventListener() {
	const gameCards = document.querySelectorAll('.game__card');

	for (let i = 0; i < gameCards.length; i++) {
		gameCards[i].removeEventListener('click', turnCard);
	}
}

/**
 * @description
 * Check if the clicked card is a matched card.
 * @param { string } cardHtmlId
 * @returns { boolean }
 */
function isAMatchedCard(cardHtmlId) {
	let cardMatched = false;

	for (let i = 0; i < card.matchedCards.length; i++) {
		if (card.matchedCards[i].cardHtmlId === cardHtmlId) {
			cardMatched = true;
			break;
		}
	}

	return cardMatched;
}

/**
 * @description
 * Check if the clicked card is the same card that receved previous click event.
 * @param { string } cardHtmlId
 * @returns { boolean }
 */
function isAPreviousClickedCard(cardHtmlId) {
	let previousCardClicked = false;

	if (card.clickedCards.length === 1) {
		if (card.clickedCards[0].cardHtmlId === cardHtmlId) {
			previousCardClicked = true;
		}
	}

	return previousCardClicked;
}

/**
* @description
* This function is responsable for implementing the rules of the game. Recognize the target of 
* an event, apply methods and rules and prevent some mistakes during the game. As soon as, 
* verify if the user wins the game.
* @param { event } event
* Characteristics of the event.
*/
function turnCard(event) {
	/*
	* Get card HTML identification.
	*/
	let cardHtmlId = event.target.id;

	/**
	 * Check if the clicked card is a matched card.
	 */
	if (isAMatchedCard(cardHtmlId)) {
		return;
	}

	/**
	 * Check if the clicked card is the same card that receved previous click event.
	 */
	if (isAPreviousClickedCard(cardHtmlId)) {
		return;
	}

	/**
	 * Increase the number of clicks.
	 */
	game.click++;

	/**
	 * Prevents the user's third click while the card presentation doesn't finish.
	 */
	if (game.click > 2) {
		return;
	}

	/**
	 * Increase the movements counter.
	 */
	moveCounter.increaseCounter();

	/**
	 * Add style class.
	 */
	this.classList.add('game__card--clicked');

	for (let i = 0; i < card.rearrangedCards.length; i++) {
		if (card.rearrangedCards[i].id === cardHtmlId.slice(4)) {
			/**
			 * Show the clicked card content to the user.
			 */
			this.textContent = card.rearrangedCards[i].card;

			/**
			 * Storage the clicked card information.
			 */
			let clickedCard = {
				id: card.rearrangedCards[i].id,
				card: card.rearrangedCards[i].card,
				cardHtmlId: cardHtmlId
			};

			card.clickedCards.push(clickedCard);
		}
	}

	if (card.clickedCards.length === 2) {
		if (card.clickedCards[0].cardHtmlId === card.clickedCards[1].cardHtmlId) {

			/**
			 * Storage the matched cards informations.
			 */
			card.matchedCards.push(card.clickedCards[0]);
			card.matchedCards.push(card.clickedCards[1]);

			/**
			 * Replace style classes.
			 */
			document.getElementById(card.clickedCards[0].cardHtmlId)
				.classList
				.replace(
					'game__card--clicked',
					'game__card--matched'
				)
			;

			document.getElementById(card.clickedCards[1].cardHtmlId)
				.classList
				.replace(
					'game__card--clicked',
					'game__card--matched'
				)
			;

			/**
			 * Clear the clicked cards array.
			 */
			card.clickedCards = [];

			/**
			 * Reset the number of clicks.
			 */
			game.click = 0;

			/**
			 * Check if all matches were found.
			 */
			if (card.matchedCards.length === 28) {
				removeEventListener();
				game.gameOver();
			}

		} else {
			let timeOutStorage = null;

			/**
			 * Disable the button 'Restart the game'.
			 */
			document.querySelector('.restart-the-game__button').disabled = true;

			/**
			 * Show the clicked card content to the user.
			 */
			timeOutStorage = setTimeout(() => {
				clearTimeout(timeOutStorage);
				showCardContent();
			}, 1000);
		}
	}
}

/**
* @description
* This function is called when the user doesn't get match two cards. This function is responsable for 
* preparing the game arena for a new attempt.
*/
function showCardContent() {

	/**
	 * Apply the initial style to the cards.
	 */
	document.getElementById(card.clickedCards[0].cardHtmlId)
		.textContent = '🍀'
	;

	document.getElementById(card.clickedCards[0].cardHtmlId)
		.classList
		.remove('game__card--clicked')
	;

	document.getElementById(card.clickedCards[1].cardHtmlId)
		.textContent = '🍀'
	;

	document.getElementById(card.clickedCards[1].cardHtmlId)
		.classList
		.remove('game__card--clicked')
	;

	/**
	 * Clear the clicked cards array.
	 */
	card.clickedCards = [];

	/**
	 * Reset the number of clicks.
	 */
	game.click = 0;

	/**
	 * Enable the button 'Restart the game'.
	 */
	document.querySelector('.restart-the-game__button').disabled = false;
}

/**
* @description
* This function is responsable for restarting the game when the game ends and the user wants 
* to play again and all the times that the user click on the restart game button. This 
* function calls some methods to restart the game and prepared the game arena. As well as, 
* the game controllers.
*/
function restartGame() {
	let matchedCards = [];
	let clickedCard = null;

	/**
	 * Remove the event listener present at each card inside the game.
	 */
	removeEventListener();

	/**
	 * Reset the number of clicks.
	 */
	game.click = 0;

	/**
	 * Stop the timer.
	 */
	timer.timeOff();

	/**
	 * Check if the user clicks on the button when there is no matched cards.
	 */
	matchedCards = document.querySelectorAll('.game__card--matched');

	if (matchedCards) {
		if (matchedCards.length === 28) {

			/**
			 * Increase the number of attempts of winning the game.
			 */
			game.play++;
		}

		/**
		 * Apply the initial style to the cards.
		 */
		for (let i = 0; i < matchedCards.length; i++) {
			matchedCards[i].textContent = '🍀';
			matchedCards[i].classList.remove('game__card--matched');
		}
	}

	/**
	 * Fix a bug that appears when the user clicks on one card and clicks on the button 
	 * Restart the game.
	 */
	clickedCard = document.querySelector('.game__card--clicked');

	if (clickedCard) {
		clickedCard.textContent = '🍀';
		clickedCard.classList.remove('game__card--clicked');
	}

	/**
	 * Restart the card properties.
	 */
	card.matchedCards = [];
	card.clickedCards = [];

	/**
	 * Restart the timer, the start rating and the movements counter.
	 */
	timer.restartTimer();
	starRating.restartStartRating();
	moveCounter.restartCounter();

	/**
	 * Start the game.
	 */
	startGame();
}

/**
 * @description
 * Restart the game when the user clicks on the button 'Play again', inside the game over modal.
 */
function restartGameFromGameOverModal() {
	closeGameOverModal();
	restartGame();
}

/**
 * @description
 * Close the game over modal.
 */
function closeGameOverModal() {
	let timeOutStorage = null;

	document.getElementsByClassName('modal__content__action__button--close')[0]
		.setAttribute('disabled', 'true')
	;

	document.getElementsByClassName('modal__content__action__button--play-again')[0]
		.setAttribute('disabled', 'true')
	;

	document.getElementById('game-over')
		.classList
		.replace(
			'modal--opennig',
			'modal--closing'
		)
	;

	timeOutStorage = setTimeout(() => {
		clearTimeout(timeOutStorage);

		document.getElementById('game-over')
			.classList
			.replace(
				'modal--closing',
				'modal--closed'
			)
		;

		document.getElementsByClassName('modal__content__action__button--close')[0]
			.removeAttribute('disabled')
		;

		document.getElementsByClassName('modal__content__action__button--play-again')[0]
			.removeAttribute('disabled')
		;
	}, 1000);
}
