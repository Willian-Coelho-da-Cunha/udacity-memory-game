/**
* @description Represents the time controllers.
* @param {integer} hours - The value is the same as a digital clock.
* @param {integer} minutes - The value is the same as a digital clock.
* @param {integer} seconds - The value is the same as a digital clock.
* @param {string} time - This property receive the setTimeout method
*/
let timer = {
	hours: 0,
	minutes: 0,
	seconds: 0,
	time: "",
	/**
	* @description Start the digital timer
	*/
	timeOn(){
		this.time = setTimeout(add, 983);
	},
	/**
	* @description Stop the digital timer
	*/
	timeOff(){
		clearTimeout(this.time);
	},
	/**
	* @description Restart the timer when the user restarts the game.
	*/
	restartTimer(){
		this.hours = 0;
		this.minutes = 0;
		this.seconds = 0;
		const place = document.querySelector(".timer");
		place.textContent = "00:00:00";
	}
};
/**
* @description This function is responsable to encrease and display the current timer to the user
*/
function add(){
	const objTimer = document.querySelector(".timer");
	let clockString = "";
	
	timer.seconds++;
	if (timer.seconds > 59){
		timer.seconds = 0;
		timer.minutes++;
		if (timer.minutes > 59){
			timer.minutes = 0;
			timer.hours++;
		}
	}
	timer.hours < 10 ? clockString += "0" + timer.hours + ":" : clockString += timer.hours + ":";
	timer.minutes < 10 ? clockString += "0" + timer.minutes + ":" : clockString += timer.minutes + ":";
	timer.seconds < 10 ? clockString += "0" + timer.seconds : clockString += timer.seconds;
	
	objTimer.textContent = clockString;
	timer.timeOn();
}

/**
* @description This object has two methods. They are responsable to set and display a star rating to the user as a way 
* to show his or her respective performance.
*/
let starRating = {
	/**
	* @description Restart the star rating when the user restarts the game.
	* Use a 'document fragment' to prevent reflow and new design generation.
	*/
	restartStartRating(){
		const rating = document.querySelector(".star-rating");
		let star = [];
		star = document.querySelectorAll(".star");
		let stars = document.createDocumentFragment();
		/*posReview-1: Stars' number must be until 3*/
		for (let i = star.length; i < 3; i++) {
			let span = document.createElement("span");
			span.setAttribute("class", "star");
			span.innerHTML = "&#10023; ";
			stars.appendChild(span);
		}
		rating.appendChild(stars);
	},
	/**
	* @description When a specific number of moves happen, this function is called to remove a star from the user rating star.
	*/
	removeStar(){
		let star = [];
		star = document.querySelectorAll(".star");
		star[star.length-1].remove();
	}
};

/*------MOVE COUNTER SECTION------*/
let moveCounter = {
	moveCounter: 0,
	displayCounter: 0,
	increaseCounter(){
		this.moveCounter++;
		if ((this.moveCounter % 2) === 0){
			this.displayCounter++;
			this.showDisplayCounter();
		}
		if ((this.moveCounter === 38) || (this.moveCounter === 58) || (this.moveCounter === 78)) {
			starRating.removeStar();
		}
	},
	showDisplayCounter(){
		const displayPlace = document.querySelector(".move-counter");
		let show;
		show = this.displayCounter <= 9 ? "0" + this.displayCounter : this.displayCounter;
		displayPlace.textContent = show;
	},
	restartCounter(){
		const displayPlace = document.querySelector(".move-counter");
		this.moveCounter = 0;
		this.displayCounter = 0;
		displayPlace.textContent = "00";
	}
};

/*------GAME SECTION------*/
let game = {
	play: 1,
	click: 0,
	gameOver(){
		timer.timeOff();

		/*------DISABLE THE EVENT------*/
		let container = document.querySelector("#game-arena");
		$(container).off('click', 'DIV');

		const node = document.getElementById("game-score");
		let fragment, chances, clockString, starNodes, msn, stars, time;
		clockString = "";

		fragment = document.createDocumentFragment();

		/*------DISPLAY USER CHANCES OF WIN THE GAME------*/
		chances = document.createElement("h6");
		chances.setAttribute("class", "chances");
		chances.textContent = "This was your attempt number " + this.play + ".";
		fragment.appendChild(chances);

		/*------DISPLAY TIMER------*/
		time = document.createElement("h5");
			timer.hours < 10 ? clockString += "0" + timer.hours + ":" : clockString += timer.hours + ":";
			timer.minutes < 10 ? clockString += "0" + timer.minutes + ":" : clockString += timer.minutes + ":";
			timer.seconds < 10 ? clockString += "0" + timer.seconds : clockString += timer.seconds;
		time.textContent = "Your time is " + clockString;

		/*------DISPLAY MESSAGE TO THE PLAYER------*/
		starNodes = [];
		starNodes = document.querySelectorAll(".star");
		msn = document.createElement("h5");
		if (starNodes.length !== 0) {
			switch(starNodes.length) {
				case 1:
					msn.textContent = "Don\'t give up!!! You already won a star!";
					break;
				case 2:
					msn.textContent = "Wow!!! Almost there! You won two stars!";
					break;
				case 3:
					msn.textContent = "Congratulations!!! Your memory and you are incredibles. You are three stars!";
					break;
			}
			/*------DISPLAY STARS------*/
			stars = document.createElement("h2");
			stars.setAttribute("class", "text-center");
			let qtnStars = "";
			for (let i = 0; i < starNodes.length; i++) {
				qtnStars += "&#10023; ";
			}
			stars.innerHTML = qtnStars;
			fragment.appendChild(stars);

		} else {
			msn.textContent = "Sorry!!! You didn\'t win stars!!!";
		}

		fragment.appendChild(time);
		fragment.appendChild(msn);
		node.appendChild(fragment);

		$("#gameOver").modal();
	}
}

/*------CARD------*/
let card = {
	cards: [
		{card: "❦", id: 0},
		{card: "❧", id: 1},
		{card: "☙", id: 2},
		{card: "❥", id: 3},
		{card: "❣", id: 4},
		{card: "➳", id: 5},
		{card: "💝", id: 6},
		{card: "💕", id: 7},
		{card: "🌹", id: 8},
		{card: "🌷", id: 9},
		{card: "💐", id: 10},
		{card: "🌺", id: 11},
		{card: "ꙮ", id: 12},
		{card: "❀", id: 13}],
	rearrangedCards: [],
	clickedCards: [],
	numberOfMatchedCards: 0,
	matchedCards: 0,
	matched: [],
	generateRandomNumbers(){
		let cards = [];
		for (let i = 0; i <= 27; i++) {
			cards[i] = i;
		}
		for (let i = cards.length; i;) {
			let nCard = Math.random() * i-- | 0;
			let obj = cards[nCard];
			cards[nCard] = cards[i];
			cards[i] = obj;		
		}
		return cards;
	},
	rearrangeCards(){
		this.rearrangedCards = [];
		let newLayout = this.generateRandomNumbers();
		let duplicate = [...this.cards, ...this.cards];
		for (let i = 0; i <= (newLayout.length - 1); i++) {
			this.rearrangedCards.push(duplicate[newLayout[i]]);
		}
	}
};

function gameArena(){
	const node = document.getElementById("game-arena");
	let fragment = document.createDocumentFragment();
	let card;
	for (let i = 0; i <= 27; i++){
		card = document.createElement("div");
		card.setAttribute("id", "rr"+i);
		card.classList.add("col-3", "card", "text-center");
		card.textContent = "Willian";
		
		fragment.appendChild(card);
	}
	node.appendChild(fragment);
}