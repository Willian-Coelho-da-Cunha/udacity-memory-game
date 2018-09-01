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