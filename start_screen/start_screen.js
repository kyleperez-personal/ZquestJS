import * as GUI from '../engine/gui.js';
//import * as SetAge from '../character_create/set_age/set_age.js';
import * as Create from '../character_create/character_creator.js';

export function load() {

	let StartScreen = document.getElementById("StartScreen");
	document.getElementById("StartButton").addEventListener('mousedown', hide_screen);

}

function hide_screen() {

	StartScreen.style.display = "none";

	//SetAge.set_age();
	Create.CharacterCreate();

}