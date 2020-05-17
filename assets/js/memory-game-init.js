/**
* @description
* Time controller.
* @property { integer } hours
* Represents the hours.
* @property { integer } minutes
* Represents the minutes.
* @property { integer } seconds
* Represents the seconds.
* @property { integer } timeOutStorage
* Storage setTimeout.
*/
const timer = {
	time: '',
	hours: 0,
	minutes: 0,
	seconds: 0,
	timeOutStorage: 0,

	/**
	 * Start counting the time.
	 */
	timerOn: () => {
		timer.timeOutStorage = setTimeout(updateTimer, 983);
	},

	/**
	 * Stop counting the time.
	 */
	timerOff: () => {
		if (timer.timeOutStorage) {
			clearTimeout(timer.timeOutStorage);
		}
	},

	/**
	 * Restart the timer when the user restarts the game.
	 */
	restartTimer: () => {
		timer.hours = 0;
		timer.minutes = 0;
		timer.seconds = 0;
		document.querySelector('.timer').textContent = '00:00:00';
	}
};

/**@description
 * This function is responsable to encreasing and displaying the current timer to the user.
 */
function updateTimer() {
	timer.time = '';
	timer.seconds++;

	if (timer.seconds > 59) {
		timer.seconds = 0;
		timer.minutes++;

		if (timer.minutes > 59) {
			timer.minutes = 0;
			timer.hours++;
		}
	}

	timer.time += timer.hours < 10 ? `0${timer.hours}:` : `${timer.hours}:`;
	timer.time += timer.minutes < 10 ? `0${timer.minutes}:` : `${timer.minutes}:`;
	timer.time += timer.seconds < 10 ? `0${timer.seconds}` : `${timer.seconds}`;
	
	document.querySelector('.timer').textContent = timer.time;
	timer.timerOn();
};

/**
* @description
* This object has two methods. They are responsable to setting and displaying a star rating 
* to the user as a way to show his or her respective performance in the game.
*/
const starRating = {
	messageNoStars: null,

	/**
	* Restart the star rating when the user restarts the game. Use a 'document fragment' 
	* to prevent reflow and new design generation.
	*/
	restartStartRating: () => {
		let _starRating = document.createDocumentFragment();
		let stars = document.querySelectorAll('.star');
		let star = null;

		for (let i = stars.length; i < 3; i++) {
			star = document.createElement('span');
			star.setAttribute('class', 'star');
			star.innerHTML = '&#10023; ';
			_starRating.appendChild(star);
			star = null;
		}

		if (document.querySelector('.indicators__star-rating__star-rating--without-stars')) {
			document.querySelector('.indicators__star-rating__star-rating--without-stars')
				.removeChild(starRating.messageNoStars)
			;

			document.querySelector('.indicators__star-rating__star-rating--without-stars')
				.appendChild(_starRating)
			;

			document.querySelector('.indicators__star-rating__star-rating--without-stars')
				.classList
				.replace(
					'indicators__star-rating__star-rating--without-stars',
					'indicators__star-rating__star-rating--with-stars'
				)
			;

			starRating.messageNoStars = null;

		} else if (document.querySelector('.indicators__star-rating__star-rating--with-stars')) {
			document.querySelector('.indicators__star-rating__star-rating--with-stars')
				.appendChild(_starRating)
			;
		}
	},

	/**
	* When a specific number of moves occur, this function is called to remove a star from 
	* the user's rating star.
	*/
	removeStar: () => {
		let stars = document.querySelectorAll('.star');
		stars[stars.length - 1].remove();

		if (stars.length === 1) {
			starRating.messageNoStars = document.createElement('span');
			starRating.messageNoStars.textContent = 'Without stars!';

			document.querySelector('.indicators__star-rating__star-rating--with-stars')
				.classList
				.replace(
					'indicators__star-rating__star-rating--with-stars',
					'indicators__star-rating__star-rating--without-stars'
				)
			;
	
			document.querySelector('.indicators__star-rating__star-rating--without-stars')
				.appendChild(starRating.messageNoStars)
			;
		}
	}
};

/**
* @description
* Capture the number of clicks made by the user.
* @property { integer } moveCounter
* This property is responsable for capturing the clicks made by the user. The value of 
* 'moveCounter' property is not shown to the user.
* @property { integer } displayCounter
* One match occurs when two cards are equal. Therefore, two clicks are required to display 
* the cards at a time. For this reason, the 'displayCounter' is increased once every two 
* right clicks. Right clicks is the same as valid click. The value of 'displayCounter' 
* property is shown to the user.
*/
const moveCounter = {
	moveCounter: 0,
	displayCounter: 0,

	/**
	* Capture the valid click. If divisible by two, increase the value of 'displayCounter' 
	* property. And, it is responsable for determining when a star will be removed from 
	* user's star rating.
	*/
	increaseCounter: () => {
		moveCounter.moveCounter++;

		if ((moveCounter.moveCounter % 2) === 0) {
			moveCounter.displayCounter++;
			moveCounter.showDisplayCounter();
		}

		if (
			moveCounter.moveCounter === 48 ||
			moveCounter.moveCounter === 58 ||
			moveCounter.moveCounter === 68
			) {
			starRating.removeStar();
		}
	},

	/**
	* This method is called by 'increaseCounter' method when the game needs to change 
	* the value of 'Move counter' on the Graphical User Interface.
	*/
	showDisplayCounter: () => {
		if (moveCounter.displayCounter <= 9) {
			document.querySelector('.indicators__move-counter__move-counter')
				.textContent = `0${moveCounter.displayCounter}`
			;

		} else {
			document.querySelector('.indicators__move-counter__move-counter')
				.textContent = `${moveCounter.displayCounter}`
			;
		}
	},

	/**
	 * This method is responsable for restarting the 'moveCounter' parameters.
	 */
	restartCounter: () => {
		moveCounter.moveCounter = 0;
		moveCounter.displayCounter = 0;
		document.querySelector('.indicators__move-counter__move-counter')
			.textContent = '00'
		;
	}
};

/**
* @description
* This the object game.
* @property { integer } play
* By default, the user plays the game once. But, if the user wants to play more times, 
* this property will be know.
* @property { integer } click
* Counts how many clicks the user makes on a card. Avoid showing more than two cards each 
* chance of match.
*/
const game = {
	play: 1,
	click: 0,

	/**
	 * End of the game.
	 */
	gameOver: () => {
		const node = document.getElementById('game-score');
		let attempt, chance, message, stars, time;

		let containers = [];
		let starRating = [];
		let fragment = document.createDocumentFragment();

		timer.timerOff();

		if (document.querySelector('.game-over__attempt')) {
			containers = document.querySelectorAll('.game-over__attempt');
		}

		attempt = document.createElement('div');
		attempt.setAttribute('class', 'game-over__attempt');

		/**
		 * Show the attempts of the user.
		 */
		chance = document.createElement('h6');
		chance.setAttribute('class', 'game-over__attempt__title');
		chance.textContent = `This was your attempt number ${game.play}.`;
		attempt.appendChild(chance);

		/**
		 * Show the spent time.
		 */
		time = document.createElement('h5');
		time.setAttribute('class', 'game-over__attempt__spent-time');
		time.textContent = `Your time is ${timer.time}`;

		/**
		 * Show a message to the user.
		 */
		starRating = document.querySelectorAll('.star');

		message = document.createElement('h5');
		message.setAttribute('class', 'game-over__attempt__message');

		if (starRating.length !== 0) {
			let achievedStars = '';

			switch(starRating.length) {
				case 1:
					message.textContent = `Don't give up!!! You already won a star!`;
					break;

				case 2:
					message.textContent = `Wow!!! Almost there! You won two stars!`;
					break;

				case 3:
					message.textContent = `Congratulations!!! Your memory and you are incredibles. You won three stars!`;
					break;
				
				default:
					message.textContent = `Congratulations!!!`;
			}

			/**
			 * Show the stars to the user.
			 */
			stars = document.createElement('h2');
			stars.setAttribute('class', 'game-over__attempt__star-rating');

			for (let i = 0; i < starRating.length; i++) {
				achievedStars += '&#10023; ';
			}

			stars.innerHTML = achievedStars;
			attempt.appendChild(stars);

		} else {
			message.textContent = `Sorry!!! You didn't win stars!!!`;
		}

		attempt.appendChild(time);
		attempt.appendChild(message);

		containers = [attempt, ...containers];

		for(let i = 0; i < containers.length; i++){
			fragment.appendChild(containers[i]);
		}

		node.appendChild(fragment);
		document.getElementById('game-over')
			.classList
			.replace(
				'modal--closed',
				'modal--opennig'
			)
		;

		document.getElementById('game-over')
			.scroll({
				top: 0,
				left: 0,
				behavior: 'smooth'
			})
		;
	}
}

/**
* @description
* This object is responsable for existence of the game.
* @property { array } cards
* The content to be shown when the user clicks on any card.
* @property { array } rearrangedCards
* Storage the cards at a new layout.
* @property { array } clickedCards
* Storage the card that the user clicks on. Max: two cards.
* @property { array } matchedCards
* When two cards match, they are storaged inside this array. When the array length is 28, 
* the user wins the game.
*/
const card = {
	cards: [
		{ card: '❦',		id: '0'		},
		{ card: '❧',		id: '1'		},
		{ card: '☙',		id: '2'		},
		{ card: '❥',		id: '3'		},
		{ card: '✧',		id: '4'		},
		{ card: '➳',		id: '5'		},
		{ card: '💝',		id: '6'		},
		{ card: '💕',		id: '7'		},
		{ card: '🌹',		id: '8'		},
		{ card: '🌷',		id: '9'		},
		{ card: '💐',		id: '10'	},
		{ card: '🌺',		id: '11'	},
		{ card: '✯',		id: '12'	},
		{ card: '❀',		id: '13'	}
	],
	rearrangedCards: [],
	clickedCards: [],
	matchedCards: [],

	/**
	 * Generate random numbers between 0 and 27 (including the two numbers).
	 */
	generateRandomNumbers: () => {
		let randomNumber = 0;
		let numbers = [];
		let number = 0;

		for (let i = 0; i <= ((card.cards.length * 2) - 1); i++) {
			numbers[i] = i;
		}

		for (let i = numbers.length; i;) {
			randomNumber = Math.random() * i-- | 0;
			number = numbers[randomNumber];
			numbers[randomNumber] = numbers[i];
			numbers[i] = number;		
		}

		return numbers;
	},

	/**
	 * With the random numbers, this method rearrange the cards.
	 */
	rearrangeCards: () => {
		let numbers = card.generateRandomNumbers();
		let duplicate = [...card.cards, ...card.cards];

		card.rearrangedCards = [];

		for (let i = 0; i < numbers.length; i++) {
			card.rearrangedCards.push(duplicate[numbers[i]]);
		}
	}
};

/**
* @description
* This function is responsable for creating the 'game arena': the place where all cards 
* are. This function uses a 'document fragment' to prevent reflow and new design generation.
*/
function buildGame() {
	let fragment = document.createDocumentFragment();
	let _card = null;

	for (let i = 0; i < (card.cards.length * 2); i++) {
		_card = document.createElement('div');
		_card.setAttribute('id', `card${i}`);
		_card.classList.add('game__card');
		_card.textContent = '🍀';
		
		fragment.appendChild(_card);
		_card = null;
	}

	document.getElementById('game')
		.appendChild(fragment)
	;
}
