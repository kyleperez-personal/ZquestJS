import * as Engine from './engine/gui.js';

export function GenderWindow() {


	/*
	<div id="myModal" class="modal">

  <!-- Modal content -->
  <div class="modal-content">
    <span class="close">&times;</span>
    <p>Some text in the Modal..</p>
  </div>

</div>
	*/
	/*
	document.innerHTML += "<div id=\"myModal\" class=\"modal\">";
	document.innerHTML += "<div class=\"modal-content\">";
	document.innerHTML += "<span class=\"close\">&times;</span>";
	document.innerHTML += "<p>Some text in the Modal..</p>";
	document.innerHTML += "</div>";
	document.innerHTML += "</div>";
	//document.innerHTML += "";
	//document.innerHTML += "";
	//document.innerHTML += "";
	*/

	let PopWindow = document.getElementById("PopWin");
	let PopWindowContent = document.getElementById("PopWinCont");

	PopWindowContent.innerHTML += "<p>Cool text</p>";

	/*
	<button type="submit" class="btn">Login</button>
    <button type="submit" class="btn cancel" onclick="closeForm()">Close</button>
	*/
	/*
	//document.innerHTML += "<script type=\"module\" src=\"./popup_fs.js\"></script>";
	PopWindowContent.innerHTML += "<button type=\"submit\" id=\"bb\">Dummy</button>";
	document.getElementById("bb").addEventListener('mousedown', echoFemale);
	document.getElementById("bb").addEventListener('mousedown', notice);
	//modalcont.innerHTML += "";
	//modalcont.innerHTML += "<button type=\"submit\" onclick= function() { document.getElementById(\"myModal\").style.display = \"none\"; }>Login</button>";
	PopWindowContent.innerHTML += "<button type=\"submit\" id=\"ab\">Female</button>";
	document.getElementById("ab").addEventListener('mousedown', echoFemale);
	document.getElementById("ab").addEventListener('mousedown', notice);

	PopWindowContent.innerHTML += "<button type=\"submit\" id=\"cb\">male</button>";
	document.getElementById("cb").addEventListener('mousedown', echoMale);
	document.getElementById("cb").addEventListener('mousedown', notice);
	//modalcont.innerHTML += "";
	*/
	let cntr1 = document.createElement('div');
	cntr1.innerHTML = "<button type=\"submit\" id=\"bb\">Dummy</button>";
	cntr1.innerHTML += "<button type=\"submit\" id=\"cb\">Dummy2</button>"
	PopWindowContent.appendChild(cntr1);
	document.getElementById("bb").addEventListener('mousedown', echoFemale);
	document.getElementById("bb").addEventListener('mousedown', notice);
	document.getElementById("cb").addEventListener('mousedown', echoMale);
	document.getElementById("cb").addEventListener('mousedown', notice);

	/*
	let cntr2 = document.createElement('div');
	cntr2.innerHTML = "<button type=\"submit\" id=\"cb\">Dummy2</button>";
	PopWindowContent.appendChild(cntr2);
	document.getElementById("cb").addEventListener('mousedown', echoMale);
	document.getElementById("cb").addEventListener('mousedown', notice);
	*/
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


// Can close the form
/*
function closeForm() {
	let PopWindow = document.getElementById("PopWin");
	let PopWindowContent = document.getElementById("PopWinCont");
	PopWindowContent.innerHTML = "";
	PopWindow.style.display = "none";

}
*/

// Can redraw the form
/*
function rewriteForm() {
	let PopWindow = document.getElementById("PopWin");
	let PopWindowContent = document.getElementById("PopWinCont");
	PopWindowContent.innerHTML = "";

	PopWindowContent.innerHTML += "<button type=\"submit\" id=\"cb\">Close</button>";
	document.getElementById("cb").addEventListener('mousedown', closeForm);
}
*/