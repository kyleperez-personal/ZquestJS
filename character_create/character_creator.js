import * as GUI from '../engine/gui.js';
import * as AgeConstants from './set_age/contants.js';
import * as Element from '../engine/elements.js';
import * as Gender from './set_gender/genders.js';
import * as Race from './set_race/races.js';
import * as Realm from './set_locations/realms.js';

// TODO
/*
	Put Holy Orders into thier own file
	Finish Career and Backgrounds sections
*/
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

		class Regionbox
		class RegionLabel
		class RegionSelect
		class Regionoptions

		class HolyOrderbox
		class JoinHolyOrderSelect
		class JoinHolyOrderLabel
		class JoinHolyOrderoption

		class HolyOrderSelect
		class HolyOrderoption
		class HolyOrderLabel

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

// Need to usee this as a global variable to make things work
let warningMessagePrinted = false;


// Make the character creation form
export function CharacterCreate() {

	createTitle();
	createNameboxes();
	createGenderbox();
	createAgebox();
	createRacebox();
	createLocationbox();
	createHolyOrderbox();
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

	// Create male and female gender options
	// If really want to, can add more in genders.js file
	// Construct below lets us do so easily!
	Gender.Genders.forEach( function(element) { gender_select.appendChild( Element.createOption(element.name(), element.value(), "Genderoption") ); } );

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
	race_select.id = "RaceSelect";

	// Populate races to 'select'
	Race.Races.forEach( function(element) { race_select.appendChild( Element.createOption(element.name(), element.value(), "Raceoption") ); } );

	// If race changes from Convent Auroran to something else
	// or something else to Convent Auroran, need to print messages
	race_select.onchange = updateOrderWarnings;

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
	Realm.Realms.forEach( function(element) { realm_select.appendChild( Element.createOption(element.name(), element.value(), "Realmoption") ); } );

	// Add selection box
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

	regionbox.appendChild(region_select);

	PopWindowContent.appendChild(regionbox);
	repopulateRegions();

}


function repopulateRegions() {
	
	// Get the value of RealmSelect
	let realm = document.getElementById('RealmSelect').value;
	let region_options = document.getElementById("RegionSelect");

	// Then remove the children of the region_select options
	while ( region_options.firstChild ) region_options.removeChild(region_options.firstChild)
	
	// Populate choosable realms
	for ( let rlm of Realm.Realms ) {
		if ( rlm.value() == realm ) {
			rlm.regions().forEach( function(element) { region_options.appendChild( Element.createOption(element.name(), element.value(), "Realmoption") ); });
			return;
		}
	}

}


function createHolyOrderbox() {

	let holyorderbox = document.createElement('div');
	holyorderbox.className = "HolyOrderbox";
	holyorderbox.id = "HolyOrderbox";

	// Whether or not you are in a holy order label
	holyorderbox.appendChild( Element.createLabel("Member of a Holy Order? ", "JoinHolyOrderSelect", "JoinHolyOrderLabel") );

	// Add selection box for picking if in holy order or not
	let joinholyorder_select = document.createElement('select');
	joinholyorder_select.className = "JoinHolyOrderSelect";
	joinholyorder_select.name = "JoinHolyOrderSelect";
	joinholyorder_select.id = "JoinHolyOrderSelect";
	// If Yes, then show holy orders and no, hide them
	joinholyorder_select.onchange = repopulateHolyOrders;

	// Choices (yes and no) here
	joinholyorder_select.appendChild( Element.createOption("No", "no", "JoinHolyOrderoption") );
	joinholyorder_select.appendChild( Element.createOption("Yes", "yes", "JoinHolyOrderoption") );

	holyorderbox.appendChild(joinholyorder_select);
	PopWindowContent.appendChild(holyorderbox);

}

// If want to be in holy order, show the choices
// if swap from yes to no, hide them
function repopulateHolyOrders() {
	
	let holyorderbox = document.getElementById('HolyOrderbox');
	let answer = document.getElementById('JoinHolyOrderSelect').value;

	switch(answer) {

		// If no, need to remove holy order selection info
		case "no":
			// Need to check if Convent Auroran is the currently selected race
			let race = document.getElementById('RaceSelect').value;
			let order_choice = document.getElementById('HolyOrderSelect').value;

			if ( warningMessagePrinted ) holyorderbox.removeChild(holyorderbox.lastChild);
			holyorderbox.removeChild(holyorderbox.lastChild);
			holyorderbox.removeChild(holyorderbox.lastChild);
			
			return;
		// If yes, need to add holy order selection info
		case "yes":
			// Label
			holyorderbox.appendChild( Element.createLabel("Holy Order: ", "HolyOrderSelect", "HolyOrderLabel") );
			// Add selection box for picking holy order
			let holyorder_select = document.createElement('select');
			holyorder_select.className = "HolyOrderSelect";
			holyorder_select.name = "HolyOrderSelect";
			holyorder_select.id = "HolyOrderSelect";
			holyorder_select.onchange = showConventAuroranWarning;

			// Choices
			holyorder_select.appendChild( Element.createOption("The Holy Order of the Commander of Weapons", "foyer", "HolyOrderoption") );
			holyorder_select.appendChild( Element.createOption("The Holy Order of the Eternal Lady of Weapons", "eternity", "HolyOrderoption") );
			holyorder_select.appendChild( Element.createOption("The Holy Order of the Queen of the Ice", "aurora", "HolyOrderoption") );
			holyorder_select.appendChild( Element.createOption("The Holy Order of the Golden Warrior", "vility", "HolyOrderoption") );
			holyorder_select.appendChild( Element.createOption("The Holy Order of the Spirit of Life", "zerixa", "HolyOrderoption") );
			holyorder_select.appendChild( Element.createOption("The Holy Order of the Aspect of Fire", "farar", "HolyOrderoption") );
			holyorder_select.appendChild( Element.createOption("The Disciples of Discipline", "anylsa", "HolyOrderoption") );
			holyorder_select.appendChild( Element.createOption("The Holy Order of the Fair Essence", "enteie", "HolyOrderoption") );
			
			holyorderbox.appendChild(holyorder_select);
			showConventAuroranWarning(); // Need to trigger at least once on initialization
			return;
		default:
			alert("Error in function repopulateHolyOrders, from function createHolyOrderbox; unsuppored choice in element JoinHolyOrderSelect ");
			return;

	}

}

// If you're a Convent Auroran and not a part of the correct order, print a warning
function showConventAuroranWarning() {

	let race = document.getElementById('RaceSelect').value;
	let holyorderbox = document.getElementById('HolyOrderbox');
	let order_choice = document.getElementById('HolyOrderSelect').value;

	if ( !warningMessagePrinted && race == "convent auroran" && !( order_choice == "aurora" || order_choice == "enteie" ) ) {
		holyorderbox.appendChild( Element.createLine("This will result in exile!", "ConventAuroranWarning", "ConventAuroranWarning" ) );
		warningMessagePrinted = true;
		return;
	}
	if ( warningMessagePrinted && race == "convent auroran" && (order_choice == "aurora" || order_choice == "enteie") ) {
		//alert("Triggers");
		holyorderbox.removeChild(holyorderbox.lastChild);
		warningMessagePrinted = false;
		return;
	}

}

// Upon changing race, need to update holy order warning about exile
function updateOrderWarnings() {

	let holyorderbox = document.getElementById('HolyOrderbox');
	let race = document.getElementById('RaceSelect').value;

	let is_in_order = document.getElementById('JoinHolyOrderSelect').value;
	if ( is_in_order == "no" ) return;

	let order_choice = document.getElementById('HolyOrderSelect').value;

	// If new race is not Convent Auroran and warning message is printed
	// Then remove warning
	if ( race != "convent auroran" && warningMessagePrinted ) {
		holyorderbox.removeChild(holyorderbox.lastChild);
		warningMessagePrinted = false;
		return;
	}
	// If new race is Convent Auroran and order is one that should result in exile
	// print warning
	if ( race == "convent auroran" && !( order_choice == "aurora" || order_choice == "enteie" ) ) {
		holyorderbox.appendChild( Element.createLine("This will result in exile!", "ConventAuroranWarning", "ConventAuroranWarning" ) );
		warningMessagePrinted = true;
		return;
	}

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

	// Save character data here

}