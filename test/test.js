// Works with below
//document.addEventListener('keydown', logKey);

const input_box = document.getElementById('infoinput');

input_box.addEventListener('keydown', logKey);

function logKey(e) {

	infostream.textContent += ` ${e.code}`;

}