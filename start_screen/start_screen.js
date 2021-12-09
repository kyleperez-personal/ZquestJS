import * as GUI from '../engine/gui.js';
import * as Game from "../test.js"

export function load() {

	let StartScreen = document.getElementById("StartScreen");
	document.getElementById("StartButton").addEventListener('mousedown', hide_screen);

}

function hide_screen() {

	StartScreen.style.display = "none";

	Game.game();

}