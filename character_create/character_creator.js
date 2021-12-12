import * as GUI from '../engine/gui.js';
import * as AgeConstants from './set_age/contants.js';
import * as Element from '../engine/elements.js';
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
		class GenderSelect
		class Genderoption

		class Agebox
		class Agelabel
		class AgeSelect

		class Racebox
		class Racelabel
		class RaceSeleect
		class Raceoption

		class Locationbox
		class RealmLabel
		class RealmSelect
		class Realmoption

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
	createAgebox();
	createRacebox();
	createLocationbox();
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

	// Create forename, surname, and shortname entries
	nameboxes.appendChild( Element.createLabel("Forenames: ", "ForenameSelect", "NameLabel") );
	nameboxes.appendChild( Element.createTextInput("ForenameSelect", "ForenameSelect") );

	nameboxes.appendChild( Element.createLabel("Surnames: ", "SurnameSelect", "NameLabel") );
	nameboxes.appendChild( Element.createTextInput("SurnameSelect", "SurnameSelect") );

	nameboxes.appendChild( Element.createLabel("Shortname: ", "ShortnameSelect", "NameLabel") );
	nameboxes.appendChild( Element.createTextInput("ShortnameSelect", "ShortnameSelect") );

	// Nobilary Entry
	// Created via js function if a noble

	PopWindowContent.appendChild(nameboxes);

}


function createGenderbox() {

	// Creat div to store everything in
	let genderbox = document.createElement('div');
	genderbox.className = "Genderbox";

	// Forename Label and Entry
	genderbox.appendChild( Element.createLabel("Gender: ", "GenderSelect", "GenderLabel") );

	// Create Selection area
	let gender_select = document.createElement('select');
	gender_select.className = "GenderSelect";
	gender_select.name = "GenderSelect";

	// add male and female options
	gender_select.appendChild( Element.createOption("Male", "male", "Genderoption") );
	gender_select.appendChild( Element.createOption("Female", "female", "Genderoption") );
	
	// add genders to selection
	genderbox.appendChild(gender_select);

	PopWindowContent.appendChild(genderbox);

}


function createAgebox() {

	// Create Box to enter in name
	let agebox = document.createElement('div');
	agebox.className = "Agebox";

	// Age Label and Input
	agebox.appendChild( Element.createLabel("Age: ", "AgeSelect", "AgeLabel") );
	agebox.appendChild( Element.createNumberInput( "AgeSelect", "AgeSelect", AgeConstants.MIN_PLAYER_AGE, AgeConstants.MAX_PLAYER_AGE ) );

	PopWindowContent.appendChild(agebox);

}


function createRacebox() {

	// Creat div to store everything in
	let racebox = document.createElement('div');
	racebox.className = "Racebox";

	// Forename Label and Entry
	racebox.appendChild( Element.createLabel("Race: ", "RaceSelect", "RaceLabel") );

	let race_select = document.createElement('select');
	race_select.className = "RaceSelect";
	race_select.name = "RaceSelect";

	// Maybe want to implement this into a genders.js file!
	race_select.appendChild( Element.createOption("Foyerian", "foyerian", "Raceoption") );
	race_select.appendChild( Element.createOption("Vitalian", "vitalian", "Raceoption") );
	race_select.appendChild( Element.createOption("Orieni Highlander", "orieni highlander", "Raceoption") );
	race_select.appendChild( Element.createOption("Convent Auroran", "convent auroran", "Raceoption") );
	race_select.appendChild( Element.createOption("Imperial", "imperial", "Raceoption") );
	race_select.appendChild( Element.createOption("Kathaic", "kathaic", "Raceoption") );
	race_select.appendChild( Element.createOption("Thurop", "thurop", "Raceoption") );
	race_select.appendChild( Element.createOption("Cstphene", "cstphene", "Raceoption") );
	race_select.appendChild( Element.createOption("Entranan", "entranan", "Raceoption") );
	race_select.appendChild( Element.createOption("Fetan", "fetan", "Raceoption") );
	race_select.appendChild( Element.createOption("Ralois", "ralois", "Raceoption") );
	race_select.appendChild( Element.createOption("Hanoir", "hanoir", "Raceoption") );
	race_select.appendChild( Element.createOption("Nerhest", "nerhest", "Raceoption") );
	race_select.appendChild( Element.createOption("Aryan", "aryan", "Raceoption") );
	race_select.appendChild( Element.createOption("Tiblan", "tiblan", "Raceoption") );
	race_select.appendChild( Element.createOption("Sophene", "sophene", "Raceoption") );
	race_select.appendChild( Element.createOption("Algus", "algus", "Raceoption") );
	race_select.appendChild( Element.createOption("Anoch", "anoch", "Raceoption") );
	race_select.appendChild( Element.createOption("Dessan", "dessan", "Raceoption") );
	race_select.appendChild( Element.createOption("Rihden", "rihden", "Raceoption") );
	race_select.appendChild( Element.createOption("Inden", "inden", "Raceoption") );
	race_select.appendChild( Element.createOption("Sinias", "sinias", "Raceoption") );
	race_select.appendChild( Element.createOption("Mokven", "mokven", "Raceoption") );
	race_select.appendChild( Element.createOption("Vanois", "vanois", "Raceoption") );


	racebox.appendChild(race_select);

	PopWindowContent.appendChild(racebox);

}


function createLocationbox() {

	// Creat div to store everything in
	let locationbox = document.createElement('div');
	locationbox.className = "Locationbox";

	// Forename Label and Entry
	locationbox.appendChild( Element.createLabel("Realm: ", "RealmSelect", "RealmLabel") );

	let realm_select = document.createElement('select');
	realm_select.className = "RealmSelect";
	realm_select.name = "RealmSelect";
	realm_select.id = "RealmSelect";
	realm_select.onchange = repopulateRegions;

	// Add realms
	realm_select.appendChild( Element.createOption("The Highlands", "highlands", "Realmoption") );
	realm_select.appendChild( Element.createOption("The Empire of the Eternal Warlord", "empire", "Realmoption") );

	locationbox.appendChild(realm_select);
	PopWindowContent.appendChild(locationbox);

	// Create box and initialize it for the Highlands
	let regionbox = document.createElement('div');
	regionbox.className = "Regionbox";
	regionbox.id = "Regionbox";

	regionbox.appendChild( Element.createLabel("Region: ", "RegionSelect", "RegionLabel") );
		
	let region_select = document.createElement('select');
	region_select.className = "RegionSelect";
	region_select.id = "RegionSelect";
	region_select.name = "RegionSelect";

	PopWindowContent.appendChild(region_select);
	repopulateRegions();

}


function repopulateRegions() {
	/*
	Regionbox
	RegionLabel
	RegionSelect
	Regionoptions
	*/
	
	// Get the value of RealmSelect
	let realm = document.getElementById('RealmSelect').value;
	let region_options = document.getElementById("RegionSelect");

	// Then remove the children of the region_select options
	while ( region_options.firstChild ) region_options.removeChild(region_options.firstChild)

	// Then generate new region options for picked realm
	switch(realm) {

		case "highlands":
			region_options.appendChild( Element.createOption("Foyer", "foyer", "Regionoption") );
			region_options.appendChild( Element.createOption("Vility", "vility", "Regionoption") );
			region_options.appendChild( Element.createOption("Zarata", "zarata", "Regionoption") );
			region_options.appendChild( Element.createOption("Narena", "narena", "Regionoption") );
			region_options.appendChild( Element.createOption("Centa", "centa", "Regionoption") );
			region_options.appendChild( Element.createOption("Betiera", "betiera", "Regionoption") );
			region_options.appendChild( Element.createOption("Pallon", "pallon", "Regionoption") );
			region_options.appendChild( Element.createOption("Ostorn", "ostorn", "Regionoption") );
			region_options.appendChild( Element.createOption("Lifus", "lifus", "Regionoption") );
			region_options.appendChild( Element.createOption("Sonal", "sonal", "Regionoption") );
			region_options.appendChild( Element.createOption("Deseret", "deseret", "Regionoption") );
			region_options.appendChild( Element.createOption("Anglia", "anglia", "Regionoption") );
			region_options.appendChild( Element.createOption("Halfon", "halfon", "Regionoption") );
			region_options.appendChild( Element.createOption("Era Free Trade", "eft", "Regionoption") );
			return;
		case "empire":
			region_options.appendChild( Element.createOption("Imperia", "imperia", "Regionoption") );
			region_options.appendChild( Element.createOption("Valle", "valle", "Regionoption") );
			region_options.appendChild( Element.createOption("Petral", "petral", "Regionoption") );
			region_options.appendChild( Element.createOption("Aurora Nova", "aurora nova", "Regionoption") );
			region_options.appendChild( Element.createOption("Coulon", "coulon", "Regionoption") );
			region_options.appendChild( Element.createOption("Enrenan", "enrenan", "Regionoption") );
			region_options.appendChild( Element.createOption("Hiten", "hiten", "Regionoption") );
			region_options.appendChild( Element.createOption("Kathay", "kathay", "Regionoption") );
			region_options.appendChild( Element.createOption("Thurop", "thurop", "Regionoption") );
			region_options.appendChild( Element.createOption("Entrana", "entrana", "Regionoption") );
			region_options.appendChild( Element.createOption("Ralaer", "ralaer", "Regionoption") );
			region_options.appendChild( Element.createOption("Hanor", "hanor", "Regionoption") );
			region_options.appendChild( Element.createOption("Fetedal", "fetedal", "Regionoption") );
			region_options.appendChild( Element.createOption("Nerhast", "nerhast", "Regionoption") );
			region_options.appendChild( Element.createOption("Cstphon", "cstphon", "Regionoption") );
			region_options.appendChild( Element.createOption("Arya", "arya", "Regionoption") );
			region_options.appendChild( Element.createOption("Tiblus", "tiblus", "Regionoption") );
			region_options.appendChild( Element.createOption("Sophos", "sophos", "Regionoption") );
			region_options.appendChild( Element.createOption("Alges", "alges", "Regionoption") );
			region_options.appendChild( Element.createOption("Anoch", "anoch", "Regionoption") );
			region_options.appendChild( Element.createOption("Edessa", "edessa", "Regionoption") );
			region_options.appendChild( Element.createOption("Rihde", "rihde", "Regionoption") );
			region_options.appendChild( Element.createOption("Inden", "inden", "Regionoption") );
			region_options.appendChild( Element.createOption("Siniasus", "siniasus", "Regionoption") );
			region_options.appendChild( Element.createOption("Mokvon", "mokvon", "Regionoption") );
			region_options.appendChild( Element.createOption("Vanas", "vanas", "Regionoption") );
			return;
		// Add other realms here
		/*
		case "somerealm":
			region_options.appendChild( Element.createOption("Name", name, "Regionoption") );
		*/
		default:
			return;

	}

}






function createHolyOrderbox() {

	// Pick if in holy order first
	// from here, go from there
	return;

}



function createCareerbox() {

	return;

}



function createBackgroundbox() {

	return;

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