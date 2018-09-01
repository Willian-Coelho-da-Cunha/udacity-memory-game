/*------TIMER SECTION------*/
let timer = {
	hours: 0,
	minutes: 0,
	seconds: 0,
	timeOn(){
		let clock;
		if (game.gameOn){
			clock = setTimeout(add, 983);
		} else {
			clock = clearTimeout(add, 983);
		}
	},
	restartTimer(){
		this.hours = 0;
		this.minutes = 0;
		this.seconds = 0;
		const place = document.querySelector(".timer");
		place.textContent = "00:00:00";
	}
};
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

/*------GAME SECTION------*/
let game = {
	gameOn: false,
	gameOff: false,
	play: 1,
	click: 0,
	gameOver(){

		this.gameOff = true;
		this.gameOn = false;

		const node = document.getElementById("game-score");
		let fragment, chances, clockString;
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
					msn.textContent = "Tha\'s cool!!! You won two stars!";
					break;
				case 3:
					msn.textContent = "Great!!! You won three stars!";
					break;
				case 4:
					msn.textContent = "Wow!!! Almost there! You won four stars!";
					break;
				case 5:
					msn.textContent = "Congratulations!!! Your memory and you are incredibles. You are five stars!";
					break;
			}
			/*------DISPLAY STARS------*/
			document.createElement("h2");
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