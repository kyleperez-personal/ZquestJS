import * as GUI from './engine/gui.js';

export function GenderWindow() {

	let PopWindow = document.getElementById("PopWin");
	let PopWindowContent = document.getElementById("PopWinCont");

	PopWindowContent.innerHTML += "<p>Cool text</p>";

	let cntr1 = document.createElement('div');
	cntr1.innerHTML = "<button type=\"submit\" id=\"bb\">Dummy</button>";
	cntr1.innerHTML += "<button type=\"submit\" id=\"cb\">Dummy2</button>"
	PopWindowContent.appendChild(cntr1);
	document.getElementById("bb").addEventListener('mousedown', echoFemale);
	document.getElementById("bb").addEventListener('mousedown', notice);
	document.getElementById("cb").addEventListener('mousedown', echoMale);
	document.getElementById("cb").addEventListener('mousedown', notice);

	PopWindow.style.display = "block";


}

function notice() {
	alert("Button triggers");
}


function echoMale() {
	let PopWindow = document.getElementById("PopWin");
	let PopWindowContent = document.getElementById("PopWinCont");
	PopWindowContent.innerHTML = "";
	PopWindow.style.display = "none";
	Engine.GUI.WritetoStorystream("You are male");

}


function echoFemale() {
	let PopWindow = document.getElementById("PopWin");
	let PopWindowContent = document.getElementById("PopWinCont");
	PopWindowContent.innerHTML = "";
	PopWindow.style.display = "none";
	Engine.GUI.WritetoStorystream("You are female");
}
