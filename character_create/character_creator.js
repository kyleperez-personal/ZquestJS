import * as GUI from '../engine/gui.js';
// NOTICE:
// Currently input for text boxes doesn't work!

/*
	Elements/classes that need CSS
		class Title

		class NameLabel
		class ForenameSelect
		class SurnameSelect
		class NobilarySelect
		class ShortnameSelect
		class Nameboxes

		class Genderbox
		class Genderlabel
		class Genderbox
		class Genderoption

		class Confirm
		class ConfirmButton
*/

/*
	Things to include:
		Name Select (depends on background; includes short name)
		Gender select
		Age Select
		Race Select
		Location Select
		Holy Order Select
		Career Select
		Background Select
*/

const PopWindow = document.getElementById('PopWin');
const PopWindowContent = document.getElementById('PopWinCont');



export function CharacterCreate() {

	createTitle();
	createNameboxes();
	createGenderbox();
	// createAgebox();
	// createRacebox();
	// createLocationbox();
	// createHolyOrderbox();
	// createCareerbox();
	// createBackgroundbox();

	createExitButton();

	PopWindow.style.display = "block";

}



function createTitle() {

	// Create div to hold title and append it to popup
	let title = document.createElement('div');
	title.className = "Title";
	title.textContent = "Character Creator";
	PopWindowContent.appendChild(title);

}


function createNameboxes() {

	// Create Box to enter in name
	let nameboxes = document.createElement('div');
	nameboxes.className = "Nameboxes";

	// Forename Label and Entry
	let forename_label = document.createElement('label');
	forename_label.className = "NameLabel";
	forename_label.htmlFor = "ForenameSelect";
	forename_label.textContent = "Forenames: ";

	let forename_box = document.createElement('input');
	forename_box.className = "ForenameSelect";
	forename_box.name = "ForenameSelect";
	forename_box.type = "text";
	forename_box.spellcheck = "false";

	nameboxes.appendChild(forename_label);
	nameboxes.appendChild(forename_box);

	// Surname Label and Entry
	let surname_label = document.createElement('label');
	surname_label.className = "NameLabel";
	surname_label.htmlFor = "SurnameSelect";
	surname_label.textContent = "Surnames: ";

	let surname_box = document.createElement('input');
	surname_box.className = "SurnameSelect";
	surname_box.name = "SurnameSelect";
	surname_box.type = "text";
	surname_box.spellcheck = "false";

	nameboxes.appendChild(surname_label);
	nameboxes.appendChild(surname_box);

	// Shortname label and entry
	let shortname_label = document.createElement('label');
	shortname_label.className = "NameLabel";
	shortname_label.htmlFor = "ShortnameSelect";
	shortname_label.textContent = "Shortname: ";

	let shortname_box = document.createElement('input');
	shortname_box.className = "ShortnameSelect";
	shortname_box.name = "ShortnameSelect";
	shortname_box.type = "text";
	shortname_box.spellcheck = "false";

	nameboxes.appendChild(shortname_label);
	nameboxes.appendChild(shortname_box);

	// Nobilary Entry
	// Created via js function if a noble

	PopWindowContent.appendChild(nameboxes);

}


function createGenderbox() {

	// Creat div to store everything in
	let genderbox = document.createElement('div');
	genderbox.className = "Genderbox";

	// Forename Label and Entry
	let genderbox_label = document.createElement('label');
	genderbox_label.className = "GenderLabel";
	genderbox_label.htmlFor = "GenderSelect";
	genderbox_label.textContent = "Gender: ";

	let gender_select = document.createElement('select');
	gender_select.className = "GenderSelect";
	gender_select.name = "GenderSelect";

	// Maybe want to implement this into a genders.js file!
	let male = document.createElement('option');
	male.className = "Genderoption";
	male.value = "male";
	male.textContent = "Male";

	let female = document.createElement('option');
	female.className = "Genderoption";
	female.value = "female";
	female.textContent = "Female";

	gender_select.appendChild(male);
	gender_select.appendChild(female);
	genderbox.appendChild(genderbox_label);
	genderbox.appendChild(gender_select);

	PopWindowContent.appendChild(genderbox);

}



function createExitButton() {

	// Exit button
	// Create div that holds exit button
	let confirm = document.createElement('div');
	confirm.className = "Confirm";
	// Create exit button and add listener to submit form
	let confirm_button = document.createElement('button');

	confirm_button.className = "ConfirmButton"
	confirm_button.type = "submit";
	confirm_button.id = "ConfirmButton";
	confirm_button.textContent = "Confirm";
	
	confirm_button.addEventListener('mousedown', finishCreation);
	// Append button to above div and div to document
	confirm.appendChild(confirm_button);
	PopWindowContent.appendChild(confirm);

}


function finishCreation() {

	// Remove all children, etc
	// Make sure that everything is good in input
	PopWindow.style.display = "none";
	//alert("Button triggers");

}






/*
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
}*/