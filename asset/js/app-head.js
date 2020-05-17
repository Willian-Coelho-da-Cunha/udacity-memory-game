/**
* @description Time controller.
* @property { integer } hours Represents the number of hours.
* @property { integer } minutes Represents the number of minutes.
* @property { integer } seconds Represents the number of seconds.
* @property { string } time This property receives the setTimeout method.
*/

let timer = {
	hours: 0,
	minutes: 0,
	seconds: 0,
	time: '',

	/**@description Start counting the time.*/
	timeOn() {
		this.time = setTimeout(add, 983);
	},

	/**@description Stop counting the time.*/
	timeOff() {
		clearTimeout(this.time);
	},

	/**@description Restart the timer when the user restarts the game.*/
	restartTimer() {
		this.hours = 0;
		this.minutes = 0;
		this.seconds = 0;
		document.querySelector('.timer').textContent = '00:00:00';
	}
};

/**@description This function is responsable to encreasing and displaying the current timer to the user.*/
function add() {
	let clockString = '';
	
	timer.seconds++;

	if (timer.seconds > 59) {
		timer.seconds = 0;
		timer.minutes++;

		if (timer.minutes > 59) {
			timer.minutes = 0;
			timer.hours++;
		}
	}
	timer.hours < 10 ? clockString += '0' + timer.hours + ':' : clockString += timer.hours + ':';
	timer.minutes < 10 ? clockString += '0' + timer.minutes + ':' : clockString += timer.minutes + ':';
	timer.seconds < 10 ? clockString += '0' + timer.seconds : clockString += timer.seconds;
	
	document.querySelector('.timer').textContent = clockString;
	timer.timeOn();
}

/**
* @description This object has two methods. They are responsable to setting and displaying a star rating to the user as a 
* way to show his or her respective performance in the game.
*/

let starRating = {
	messageNoStars: null,

	/**
	* @description Restart the star rating when the user restarts the game. Use a 'document fragment' to prevent reflow and 
	* new design generation.
	*/
	restartStartRating() {
		let starRating = document.createDocumentFragment();
		let stars = document.querySelectorAll('.star');

		for (let i = stars.length; i < 3; i++) {
			let span = document.createElement('span');
			span.setAttribute('class', 'star');
			span.innerHTML = '&#10023; ';
			starRating.appendChild(span);
		}

		if (document.querySelector('.indicators__star-rating__star-rating--without-stars')) {
			document.querySelector('.indicators__star-rating__star-rating--without-stars')
				.removeChild(this.messageNoStars)
			;

			document.querySelector('.indicators__star-rating__star-rating--without-stars')
				.appendChild(starRating)
			;

			document.querySelector('.indicators__star-rating__star-rating--without-stars')
				.classList
				.replace(
					'indicators__star-rating__star-rating--without-stars',
					'indicators__star-rating__star-rating--with-stars'
				)
			;

			this.messageNoStars = null;

		} else if (document.querySelector('.indicators__star-rating__star-rating--with-stars')) {
			document.querySelector('.indicators__star-rating__star-rating--with-stars')
				.appendChild(starRating)
			;
		}
	},

	/**
	* @description When a specific number of moves occur, this function is called to remove a star from the user's rating 
	* star.
	*/
	removeStar() {
		let stars = document.querySelectorAll('.star');
		stars[stars.length - 1].remove();

		if (stars.length === 1) {
			this.messageNoStars = document.createElement('span');
			this.messageNoStars.textContent = 'Without stars!';

			document.querySelector('.indicators__star-rating__star-rating--with-stars')
				.classList
				.replace(
					'indicators__star-rating__star-rating--with-stars',
					'indicators__star-rating__star-rating--without-stars'
				)
			;
	
			document.querySelector('.indicators__star-rating__star-rating--without-stars')
				.appendChild(this.messageNoStars)
			;
		}
	}
};

/**
* @description Capture the number of clicks made by the user.
*
* @property { integer } moveCounter This property is responsable for capturing the clicks made by the user. The value of 
* 'moveCounter' property is not shown to the user.
*
* @property { integer } displayCounter One match occurs when two cards are equal. Therefore, two clicks are required to 
* display the cards at a time. For this reason, the 'displayCounter' is increased once every two right clicks. Right 
* clicks is the same as valid click. The value of 'displayCounter' property is shown to the user.
*/
let moveCounter = {
	moveCounter: 0,
	displayCounter: 0,

	/**
	* @description Capture the valid click. If divisible by two, increase the value of 'displayCounter' property. And, it 
	* is responsable for determining when a star will be removed from user's star rating.
	*/
	increaseCounter() {
		this.moveCounter++;

		if ((this.moveCounter % 2) === 0) {
			this.displayCounter++;
			this.showDisplayCounter();
		}

		if ((this.moveCounter === 48) || (this.moveCounter === 58) || (this.moveCounter === 68)) {
			starRating.removeStar();
		}
	},

	/**
	* @description This method is called by 'increaseCounter' method when the game needs to change the value of 'Move 
	* counter' on the Graphical User Interface.
	*/
	showDisplayCounter() {
		if (this.displayCounter <= 9) {
			document.querySelector('.indicators__move-counter__move-counter')
				.textContent = `0${String(this.displayCounter)}`
			;

		} else {
			document.querySelector('.indicators__move-counter__move-counter')
				.textContent = `${String(this.displayCounter)}`
			;
		}
	},

	/**@description This method is responsable for restarting the 'moveCounter' parameters.*/
	restartCounter() {
		this.moveCounter = 0;
		this.displayCounter = 0;
		document.querySelector(".indicators__move-counter__move-counter")
			.textContent = '00'
		;
	}
};

/**
* @description This the object game.
*
* @property { integer } play By default, the user plays the game once. But, if the user wants to play more times, this 
* property will be know.
*
* @property { integer } click - Counts how many clicks the user makes on a card. Avoid showing more than two cards each 
* chance of match.
*/

let game = {
	play: 1,
	click: 0,

	/**@description End of the game.*/
	gameOver() {
		const node = document.getElementById('game-score');
		let containerGameOver, chances, msn, stars, time;

		let clockString = '';
		let containers = [];
		let starNodes = [];
		let fragment = document.createDocumentFragment();

		timer.timeOff();

		if (document.querySelector('.containerGameOver')) {
			containers = document.querySelectorAll('.containerGameOver');
		}

		containerGameOver = document.createElement('div');
		containerGameOver.setAttribute('class', 'containerGameOver');

		/*------DISPLAY USER CHANCES OF WIN THE GAME------*/
		chances = document.createElement('h6');
		chances.setAttribute('class', 'chanceNumber');
		chances.textContent = `This was your attempt number ${String(this.play)}.`;
		containerGameOver.appendChild(chances);

		/*------DISPLAY TIMER------*/
		time = document.createElement('h5');
			timer.hours < 10 ? clockString += '0' + timer.hours + ':' : clockString += timer.hours + ':';
			timer.minutes < 10 ? clockString += '0' + timer.minutes + ':' : clockString += timer.minutes + ':';
			timer.seconds < 10 ? clockString += '0' + timer.seconds : clockString += timer.seconds;
		time.setAttribute('class', 'timeSpent');
		time.textContent = `Your time is ${String(clockString)}`;

		/*------DISPLAY MESSAGE TO THE PLAYER------*/
		starNodes = document.querySelectorAll('.star');
		msn = document.createElement('h5');
		msn.setAttribute('class', 'performanceMessage');

		if (starNodes.length !== 0) {
			let qtnStars = '';

			switch(starNodes.length) {
				case 1:
					msn.textContent = `Don't give up!!! You already won a star!`;
					break;
				case 2:
					msn.textContent = `Wow!!! Almost there! You won two stars!`;
					break;
				case 3:
					msn.textContent = `Congratulations!!! Your memory and you are incredibles. You are three stars!`;
					break;
			}

			/*------DISPLAY STARS------*/
			stars = document.createElement('h2');
			stars.setAttribute('class', 'achievedStarRating');

			for (let i = 0; i < starNodes.length; i++) {
				qtnStars += '&#10023; ';
			}

			stars.innerHTML = qtnStars;
			containerGameOver.appendChild(stars);

		} else {
			msn.textContent = `Sorry!!! You didn't win stars!!!`;
		}

		containerGameOver.appendChild(time);
		containerGameOver.appendChild(msn);

		containers = [containerGameOver, ...containers];

		for(let i = 0; i < containers.length; i++){
			fragment.appendChild(containers[i]);
		}

		node.appendChild(fragment);
		document.getElementById('game-over').classList.replace('modal--closed', 'modal--opennig');
	}
}

/**
* @description This object is responsable for existence of the game.
* @property { array } cards The content to be shown when the user clicks on any card.
* @property { array } rearrangedCards Keep the cards at a new layout.
* @property { array } clickedCards Keep the card that the user clicks on. Max: two cards.
* @property { array } matched When two cards match, they are keeped inside this array. When the array length is 28, the 
*	user wins the game.
*/

let card = {
	cards: [
		{ card: "❦",		id: 0		},
		{ card: "❧",		id: 1		},
		{ card: "☙",		id: 2		},
		{ card: "❥",		id: 3		},
		{ card: "✧",		id: 4		},
		{ card: "➳",		id: 5		},
		{ card: "💝",		id: 6		},
		{ card: "💕",		id: 7		},
		{ card: "🌹",		id: 8		},
		{ card: "🌷",		id: 9		},
		{ card: "💐",		id: 10	},
		{ card: "🌺",		id: 11	},
		{ card: "✯",		id: 12	},
		{ card: "❀",		id: 13	}
	],
	rearrangedCards: [],
	clickedCards: [],
	matched: [],

	/**
	* @description Generate random numbers between 0 and 27 (including the two numbers).
	* @returns { array } numbers at a new position.
	*/
	generateRandomNumbers() {
		let cards = [];
		let nCard = 0;
		let obj = 0;

		for (let i = 0; i <= 27; i++) {
			cards[i] = i;
		}

		for (let i = cards.length; i;) {
			nCard = Math.random() * i-- | 0;
			obj = cards[nCard];
			cards[nCard] = cards[i];
			cards[i] = obj;		
		}

		return cards;
	},

	/**
	* @description With the random numbers, this method rearrange the cards.
	*/
	rearrangeCards() {
		let newLayout = this.generateRandomNumbers();
		let duplicate = [...this.cards, ...this.cards];

		this.rearrangedCards = [];

		for (let i = 0; i <= (newLayout.length - 1); i++) {
			this.rearrangedCards.push(duplicate[newLayout[i]]);
		}
	}
};

/**
* @description This function is responsable for creating the 'game arena': the place where all cards are. This function uses 
* a 'document fragment' to prevent reflow and new design generation.
*/
function buildGame() {
	let fragment = document.createDocumentFragment();
	let card;

	for (let i = 0; i <= 27; i++) {
		card = document.createElement('div');
		card.setAttribute('id', `rr${String(i)}`);
		card.classList.add('game__card');
		card.textContent = '🍀';
		
		fragment.appendChild(card);
	}

	document.getElementById('game').appendChild(fragment);
}
