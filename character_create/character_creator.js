//import * as GUI from '../engine/gui.js';
import * as Constants from './data/contants.js';
import * as Element from '../engine/elements.js';
import * as Gender from './data/genders.js';
import * as Race from './data/races.js';
import * as Realm from './data/realms.js';
import * as HolyOrder from './data/holyorders.js';
import * as Career from './data/careers.js';
import * as Background from './data/backgrounds.js';

import * as Restrictions from './data/restrictions.js';

// TODO
/*
	set Convent Auroran Exile status
	set flags on form leave
		-- diasporic: from location other than race's home location
		-- settler: Imperial subject in Empire + diasporic
		-- imperial status: provincial if Imperial from provinces, governorate otherwise
	Cstphene Guardsman status question if from Cstphon and in army and not in holy order
	Ask if served in Lizard War if age is high enough and in military
	
	Will have to pass all fields to system
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
		class Regionoption

		class HolyOrderbox
		class JoinHolyOrderSelect
		class JoinHolyOrderLabel
		class JoinHolyOrderoption

		class HolyOrderSelect
		class HolyOrderoption
		class HolyOrderLabel

		class Careerbox
		class CareerSelect
		class CareerLabel
		class Careeroption

		class Backgroundbox
		class BackgroundSelect
		class BackgroundLabel
		class Backgroundoption

		class Confirm
		class ConfirmButton
*/

const PopWindow = document.getElementById('PopWin');
const PopWindowContent = document.getElementById('PopWinCont');

// Need to usee this as a global variable to make things work
let warningMessagePrinted = false;
let nobilaryBoxWritten = false;


// Make the character creation form
export function CharacterCreate() {

	createTitle();
	createNameboxes();
	createGenderbox();
	createAgebox();
	createRacebox();
	createLocationbox();
	createHolyOrderbox();
	createCareerbox();
	createBackgroundbox();

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
	nameboxes.id = "Nameboxes";

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
	gender_select.id = "GenderSelect";

	gender_select.onchange = function() {repopulateCareers(); };

	// Create male and female gender options
	// If really want to, can add more in genders.js file
	// Construct below lets us do so easily!
	Gender.Genders.forEach( function(element) { Element.conditionalCreateOption( element, gender_select, "Genderoption", true ); } );

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
	agebox.appendChild( Element.createNumberInput( "AgeSelect", "AgeSelect", Constants.MIN_PLAYER_AGE, Constants.MAX_PLAYER_AGE ) );

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
	Race.Races.forEach( function(element) { Element.conditionalCreateOption( element, race_select, "Raceoption", true ); } );

	// If race changes from Convent Auroran to something else
	// or something else to Convent Auroran, need to print messages
	race_select.onchange = function() { updateOrderWarnings(); };

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
	realm_select.onchange = function () {
		repopulateRegions();
		repopulateCareers();
		repopulateBackgrounds();
	};

	// Add realms
	Realm.Realms.forEach( function(element) { Element.conditionalCreateOption( element, realm_select, "Realmoption", true ); } );

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
	region_select.onchange = function() { repopulateBackgrounds(); };

	regionbox.appendChild(region_select);

	PopWindowContent.appendChild(regionbox);
	repopulateRegions();

}


function repopulateRegions() {
	
	// Get the value of RealmSelect
	let realm = document.getElementById('RealmSelect').value;
	let region_select = document.getElementById("RegionSelect");

	// Then remove the children of the region_select options
	while ( region_select.firstChild ) region_select.removeChild(region_select.firstChild);
	//alert("Triggers");
	
	// Populate choosable realms
	for ( let rlm of Realm.Realms ) {
		if ( rlm.value() == realm ) {
			rlm.regions().forEach( function(element) { Element.conditionalCreateOption( element, region_select, "Regionoption", true ); } );
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
	joinholyorder_select.onchange = function() {
		repopulateHolyOrders();
		repopulateCareers();
	};

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
			//let race = document.getElementById('RaceSelect').value;
			//let order_choice = document.getElementById('HolyOrderSelect').value;

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
			holyorder_select.onchange = function() { showConventAuroranWarning(); };

			// Choices
			HolyOrder.HolyOrders.forEach( function(element) { Element.conditionalCreateOption( element, holyorder_select, "HolyOrderoption", true ); } );

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

	if ( !warningMessagePrinted && Restrictions.is_convent_and_in_unallowed_order(race, order_choice) ) {
		holyorderbox.appendChild( Element.createLine("This will result in exile!", "ConventAuroranWarning", "ConventAuroranWarning" ) );
		warningMessagePrinted = true;
		return;
	}
	if ( warningMessagePrinted && Restrictions.is_convent_and_in_allowed_order(race, order_choice) ) {
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
	if ( !Restrictions.is_convent() && warningMessagePrinted ) {
		holyorderbox.removeChild(holyorderbox.lastChild);
		warningMessagePrinted = false;
		return;
	}
	// If new race is Convent Auroran and order is one that should result in exile
	// print warning
	if ( Restrictions.is_convent_and_in_unallowed_order(race, order_choice) ) {
		holyorderbox.appendChild( Element.createLine("This will result in exile!", "ConventAuroranWarning", "ConventAuroranWarning" ) );
		warningMessagePrinted = true;
		return;
	}

}



// Need to repopulate selects if gender/nationality/holy order status changes
function createCareerbox() {

	let careerbox = document.createElement('div');
	careerbox.className = "Careerbox";
	careerbox.id = "Careerbox";

	// Whether or not you are in a holy order label
	careerbox.appendChild( Element.createLabel("Career: ", "CareerSelect", "CareerLabel") );

	// Add selection box for picking if in holy order or not
	let career_select = document.createElement('select');
	career_select.className = "CareerSelect";
	career_select.name = "CareerSelect";
	career_select.id = "CareerSelect";

	careerbox.appendChild(career_select);
	PopWindowContent.appendChild(careerbox);

	repopulateCareers();

	

}

// If a notable thing changes, need to update potential careers
function repopulateCareers() {

	// Reset the career options
	let career_select = document.getElementById("CareerSelect");
	while ( career_select.firstChild ) career_select.removeChild(career_select.firstChild)

	let gender = document.getElementById("GenderSelect").value;
	let nationality = document.getElementById("RealmSelect").value;
	let in_holy_order = document.getElementById("JoinHolyOrderSelect").value;


	// Men, people in holy orders, or anyone not from the Empire can hold any career
	if ( Restrictions.military_careers_allowed(gender, nationality, in_holy_order) ) {
		Career.Careers.forEach(	function(element) { Element.conditionalCreateOption( element, career_select, "Careeroption", true ); } );
	}
	// Basically women from the Empire not in Holy Orders are not able to be in the military
	// unless they are military doctors!
	else {
		Career.Careers.forEach(
			function(element) {
				let constraint = element.isDoctor() || !element.isMilitary();
				Element.conditionalCreateOption( element, career_select, "Careeroption", constraint );
			}
		);
	}

}



function createBackgroundbox() {

	let backgroundbox = document.createElement('div');
	backgroundbox.className = "Backgroundbox";
	backgroundbox.id = "Backgroundbox";

	// Whether or not you are in a holy order label
	backgroundbox.appendChild( Element.createLabel("Background: ", "BackgroundSelect", "BackgroundLabel") );

	// Add selection box for picking if in holy order or not
	let background_select = document.createElement('select');
	background_select.className = "BackgroundSelect";
	background_select.name = "BackgroundSelect";
	background_select.id = "BackgroundSelect";
	background_select.onchange = function() { modifyNobilaryBox(); }

	backgroundbox.appendChild(background_select);
	PopWindowContent.appendChild(backgroundbox);

	repopulateBackgrounds();

}

// If something notable changes, need to change availible backgrounds
function repopulateBackgrounds() {

	// Reset background options
	let background_select = document.getElementById("BackgroundSelect");
	while ( background_select.firstChild ) background_select.removeChild(background_select.firstChild)

	let nationality = document.getElementById("RealmSelect").value;
	let region = document.getElementById("RegionSelect").value;

	if ( Restrictions.nobility_allowed(nationality, region) ) {
		Background.Backgrounds.forEach( function(element) { Element.conditionalCreateOption( element, background_select, "Backgroundoption", true ); } );
	}
	else {
		Background.Backgrounds.forEach(
			function(element) {
				let constraint = !element.isNoble()
				Element.conditionalCreateOption( element, background_select, "Backgroundoption", constraint );
			}
		);
	}

	// Change nobilary box if necessary
	modifyNobilaryBox();

}

function modifyNobilaryBox() {

	let nameboxes = document.getElementById("Nameboxes");
	let backgrnd = document.getElementById("BackgroundSelect").value;

	// Determine if noble status is in current background
	let nbl_status = false;
	for ( let b of Background.Backgrounds ) {
		if ( b.value() == backgrnd ) {
			nbl_status = b.isNoble();
			break;
		}
	}

	// If box has already been written + new status is noble, do nothing
	if ( (nobilaryBoxWritten && nbl_status) || (!nobilaryBoxWritten && !nbl_status) ) return;
	
	// If noble box is written and am not noble, remove noble box
	if ( nobilaryBoxWritten && !nbl_status ) {
		nameboxes.removeChild(nameboxes.lastChild);
		nameboxes.removeChild(nameboxes.lastChild);
		nobilaryBoxWritten = false;
	}
	if ( !nobilaryBoxWritten && nbl_status ) {
		nameboxes.appendChild( Element.createLabel("Nobilary: ", "NobilarySelect", "NameLabel") );
		nameboxes.appendChild( Element.createTextInput("NobilarySelect", "NobilarySelect") );
		nobilaryBoxWritten = true;
	}

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