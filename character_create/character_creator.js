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

// BUGS
/*
	In fresh program, pick Convent Auroran as race
	--> Exile selections options not showing

	Probably caused since Holy Order Selection is set as 'no'
	Which means that Holy Order Select box returns NULL
	Which does not produce options

	Should be able to fix with if statement
*/
// TODO
/*
	set Convent Auroran Exile status
		-- DONE: Changing values when changing holy orders
			Make sure can't change exile status when on bad holy order
	Cstphene Guardsman status question if from Cstphon and in army and not in holy order
	Ask if served in Lizard War if age is high enough and in military
	set flags on form leave
		-- diasporic: from location other than race's home location
		-- settler: Imperial subject in Empire + diasporic
		-- imperial status: provincial if Imperial from provinces, governorate otherwise
	
	Will have to pass all fields to system
*/

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

		class ExileStatusSelect
		class ExileLabel
		class ExileStatusoption

		class Confirm
		class ConfirmButton
*/

const PopWindow = document.getElementById('PopWin');
const PopWindowContent = document.getElementById('PopWinCont');

// Need to usee this as a global variable to make things work
let warningMessagePrinted = false; // If given holy order will make a Convent Auroran an exile
let nobilaryBoxWritten = false; // If extra input box for nobilaries have been accepted

let exileBoxWritten = false; // If box for exile selection is written


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


// Create the title of the form
function createTitle() {

	let title = document.createElement('div');
	title.className = "Title";
	title.textContent = "Character Creator";
	PopWindowContent.appendChild(title);

}


// Create all of the boxes that hold the names of a character
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

	// Nobilary Entry created elsewhere

	PopWindowContent.appendChild(nameboxes);

}


// Create selection box for genders
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

	// Some careers may be gender specific
	// So when gender changes, need to repopulate availible careers
	gender_select.onchange = function() { repopulateCareers(); };

	// Create male and female gender options
	// If really want to, can add more in genders.js file
	// Construct below shouldn't need any changing to do so
	Gender.Genders.forEach( function(element) { Element.conditionalCreateOption( element, gender_select, "Genderoption", true ); } );

	// Add genders to selection
	genderbox.appendChild(gender_select);

	PopWindowContent.appendChild(genderbox);

}


// Create box to accept age input
function createAgebox() {

	// Create Box to enter in name
	let agebox = document.createElement('div');
	agebox.className = "Agebox";

	// Age Label and Input
	agebox.appendChild( Element.createLabel("Age: ", "AgeSelect", "AgeLabel") );
	agebox.appendChild( Element.createNumberInput( "AgeSelect", "AgeSelect", Constants.MIN_PLAYER_AGE, Constants.MAX_PLAYER_AGE ) );

	PopWindowContent.appendChild(agebox);

}


// Create select element to pick race
function createRacebox() {

	// Creat div to store everything in
	let racebox = document.createElement('div');
	racebox.className = "Racebox";

	// Race Label and Entries
	racebox.appendChild( Element.createLabel("Race: ", "RaceSelect", "RaceLabel") );

	let race_select = document.createElement('select');
	race_select.className = "RaceSelect";
	race_select.name = "RaceSelect";
	race_select.id = "RaceSelect";

	// Populate races to 'select'
	// Enabled races only get populated
	Race.Races.forEach( function(element) { Element.conditionalCreateOption( element, race_select, "Raceoption", true ); } );

	// If race changes from Convent Auroran to something else
	// or something else to Convent Auroran, need to print important messages
	// In particular holy order warnings and show exile box
	race_select.onchange = function() {
		updateOrderWarnings();
		modifyExileBox();
	};

	racebox.appendChild(race_select);

	PopWindowContent.appendChild(racebox);

}


// Create boxes to pick realm and region within realm
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

	// On changing realm, need to repopulate regions
	// Also, certain backgrounds and careers may be restricted
	realm_select.onchange = function () {
		repopulateRegions();
		repopulateCareers();
		repopulateBackgrounds();
	};

	// Add enabled realms
	Realm.Realms.forEach( function(element) { Element.conditionalCreateOption( element, realm_select, "Realmoption", true ); } );

	locationbox.appendChild(realm_select);
	PopWindowContent.appendChild(locationbox);


	// Create region box
	let regionbox = document.createElement('div');
	regionbox.className = "Regionbox";
	regionbox.id = "Regionbox";

	regionbox.appendChild( Element.createLabel("Region: ", "RegionSelect", "RegionLabel") );
		
	let region_select = document.createElement('select');
	region_select.className = "RegionSelect";
	region_select.id = "RegionSelect";
	region_select.name = "RegionSelect";

	// Some regions in a realm might not have certain backgrounds availible
	region_select.onchange = function() { repopulateBackgrounds(); };

	regionbox.appendChild(region_select);

	PopWindowContent.appendChild(regionbox);
	// Initialily just repopulate regions; shortcut here
	// Done since updates happen so often
	repopulateRegions();

}

// Update function to change regions based on selected realm
function repopulateRegions() {
	
	// Get the currently selected realm
	let realm = document.getElementById('RealmSelect').value;
	let region_select = document.getElementById("RegionSelect");

	// Then remove region_select options
	while ( region_select.firstChild ) region_select.removeChild(region_select.firstChild);
	
	// Populate options with regions within selected realm
	for ( let rlm of Realm.Realms ) {
		if ( rlm.value() == realm ) {
			rlm.regions().forEach( function(element) { Element.conditionalCreateOption( element, region_select, "Regionoption", true ); } );
			return;
		}
	}

}


// Holy Order Selection area
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

	// Show availible holy orders if wanted
	// Plus holy order choice has an effect on careers and convent exile status
	joinholyorder_select.onchange = function() {
		repopulateHolyOrders();
		repopulateCareers();
		modifyExileBox();
	};

	// Choices (yes and no) here
	joinholyorder_select.appendChild( Element.createOption("No", "no", "JoinHolyOrderoption") );
	joinholyorder_select.appendChild( Element.createOption("Yes", "yes", "JoinHolyOrderoption") );

	holyorderbox.appendChild(joinholyorder_select);
	PopWindowContent.appendChild(holyorderbox);

}

// Show availible holy orders to pick from
function repopulateHolyOrders() {
	
	// Get whether or not player wants to be in holy order
	let holyorderbox = document.getElementById('HolyOrderbox');
	let answer = document.getElementById('JoinHolyOrderSelect').value;

	switch(answer) {

		// If no, need to remove holy order selection info
		case "no":
			// If Convent Auroran exile warning message printed, then remove this message
			if ( warningMessagePrinted ) holyorderbox.removeChild(holyorderbox.lastChild);
			// Then need to actually remove selection boxes
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

			// On change, will need to show exile warning to convent aurorans
			// and will need to update exile choices
			holyorder_select.onchange = function() {
				showConventAuroranWarning();
				modifyExileBox();
			};

			// Populate holy orders
			HolyOrder.HolyOrders.forEach( function(element) { Element.conditionalCreateOption( element, holyorder_select, "HolyOrderoption", true ); } );

			holyorderbox.appendChild(holyorder_select);
			showConventAuroranWarning(); // Show Convent Auroran warning if applicable
			return;
		default:
			// Error catching if things break for some reason
			alert("Error in function repopulateHolyOrders, from function createHolyOrderbox; unsuppored choice in element JoinHolyOrderSelect ");
			return;

	}

}

// If you're a Convent Auroran and not a part of the correct order, print a warning
function showConventAuroranWarning() {

	let race = document.getElementById('RaceSelect').value;
	let holyorderbox = document.getElementById('HolyOrderbox');
	let order_choice = document.getElementById('HolyOrderSelect').value;

	// Just add/remove warning message, depending if its been printed
	// and if it's supposed to be printed
	if ( !warningMessagePrinted && Restrictions.is_convent_and_in_unallowed_order(race, order_choice) ) {
		holyorderbox.appendChild( Element.createLine("This will result in exile!", "ConventAuroranWarning", "ConventAuroranWarning" ) );
		warningMessagePrinted = true;
	}
	else if ( warningMessagePrinted && Restrictions.is_convent_and_in_allowed_order(race, order_choice) ) {
		holyorderbox.removeChild(holyorderbox.lastChild);
		warningMessagePrinted = false;
	}

}

// Upon changing race, need to update holy order warning about exile
function updateOrderWarnings() {

	let holyorderbox = document.getElementById('HolyOrderbox');
	let race = document.getElementById('RaceSelect').value;

	let is_in_order = document.getElementById('JoinHolyOrderSelect').value;
	if ( is_in_order == "no" ) return; // If not in an order, no need to print exile warning

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


// Create selection box for careers
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

	// Careers depend on gender, realm, and holy order, etc
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


// Create selection box for various background attributes
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
	// Need to add/remove nobiliary name input depending on background
	background_select.onchange = function() { modifyNobilaryBox(); }

	backgroundbox.appendChild(background_select);
	PopWindowContent.appendChild(backgroundbox);

	// Instantly repopulate the backgrounds
	repopulateBackgrounds();

}

// Way to populate/repopulate backgrounds
function repopulateBackgrounds() {

	// Reset background options
	let background_select = document.getElementById("BackgroundSelect");
	while ( background_select.firstChild ) background_select.removeChild(background_select.firstChild)

	// Parameters that affect backgrounds
	let nationality = document.getElementById("RealmSelect").value;
	let region = document.getElementById("RegionSelect").value;

	// For a given realm, if nobility is allowed, show all backgrounds
	if ( Restrictions.nobility_allowed(nationality, region) ) {
		Background.Backgrounds.forEach( function(element) { Element.conditionalCreateOption( element, background_select, "Backgroundoption", true ); } );
	}
	// Otherwise, just show the non-noble backgrounds
	else {
		Background.Backgrounds.forEach(
			function(element) {
				let constraint = !element.isNoble()
				Element.conditionalCreateOption( element, background_select, "Backgroundoption", constraint );
			}
		);
	}

	// Change nobilary name box if necessary
	modifyNobilaryBox();

}

// Add/remove nobilary name input
function modifyNobilaryBox() {

	// Pull up namebox container + current background
	let nameboxes = document.getElementById("Nameboxes");
	let backgrnd = document.getElementById("BackgroundSelect").value;

	// Determine noble status of current background
	let nbl_status = false;
	for ( let b of Background.Backgrounds ) {
		if ( b.value() == backgrnd ) {
			nbl_status = b.isNoble();
			break;
		}
	}

	// If box has already been written + new status is noble, do nothing
	// Or if box not written and new status is not noble, do nothing
	if ( (nobilaryBoxWritten && nbl_status) || (!nobilaryBoxWritten && !nbl_status) ) return;
	
	// If noble box is written and am not noble, remove noble box
	if ( nobilaryBoxWritten && !nbl_status ) {
		nameboxes.removeChild(nameboxes.lastChild);
		nameboxes.removeChild(nameboxes.lastChild);
		nobilaryBoxWritten = false;
		return;
	}
	// If noble box is not written and is a noble, make noble box
	if ( !nobilaryBoxWritten && nbl_status ) {
		nameboxes.appendChild( Element.createLabel("Nobilary: ", "NobilarySelect", "NameLabel") );
		nameboxes.appendChild( Element.createTextInput("NobilarySelect", "NobilarySelect") );
		nobilaryBoxWritten = true;
		return;
	}

}


// Modifying exile status selection based on rest of character sheet
function modifyExileBox() {

	// Exile status set by race (Convent Auroran) and holy order status
	let backgroundbox = document.getElementById("Backgroundbox");
	let race = document.getElementById("RaceSelect").value;
	let holy_order_status = document.getElementById("JoinHolyOrderSelect").value;

	// If no exile selection box present and race is not convent auroran, do nothing
	if ( !exileBoxWritten && race != "convent auroran" ) {
		//alert("do nothing");
		return;
	}
	// If box is written and is convent auroran
	else if ( exileBoxWritten && race == "convent auroran" ) {

		// Remove selection box
		backgroundbox.removeChild(backgroundbox.lastChild);

		// Then create new selection box
		let exile_select = document.createElement('select');
		exile_select.className = "ExileStatusSelect";
		exile_select.name = "ExileStatusSelect";
		exile_select.id = "ExileStatusSelect";

		// Determine if character is in a holy order
		let holy_order_status = document.getElementById("JoinHolyOrderSelect").value;

		// If so, find holy order and populate choices appropriately
		if ( holy_order_status == "yes" ) {

			let holy_order = document.getElementById("HolyOrderSelect").value;

			// If Holy order allowed for Convent Aurorans, give both choices
			// Otherwise, force choice to be yes (and unable to change it)
			for ( let h of HolyOrder.HolyOrders ) {
				if ( h.value() == holy_order ) {
					if ( h.ConventsAllowed() ) {
						exile_select.appendChild( Element.createOption("No", "no", "ExileStatusoption") );
						exile_select.appendChild( Element.createOption("Yes", "yes", "ExileStatusoption") );
						exile_select.value = "no";
					}
					else {
						exile_select.appendChild( Element.createOption("Yes", "yes", "ExileStatusoption") );
						//exile_select.value = "yes";
					}
					break;
				}
			}
			backgroundbox.appendChild(exile_select);
		}

		return;
	}
	// If box written and not a convent auroran, remove selection box
	else if ( exileBoxWritten && race != "convent auroran" ) {
		//alert("erase");
		backgroundbox.removeChild(backgroundbox.lastChild);
		backgroundbox.removeChild(backgroundbox.lastChild);
		exileBoxWritten = false;
		return;
	}
	// If not written and a convent auroran, make box with options
	//else if ( !exileBoxWritten && race == "convent auroran" ) {
	else {

		// Label
		backgroundbox.appendChild( Element.createLabel("Exile Status: ", "ExileStatusSelect", "ExileLabel") );
		
		// Selection
		let exile_select = document.createElement('select');
		exile_select.className = "ExileStatusSelect";
		exile_select.name = "ExileStatusSelect";
		exile_select.id = "ExileStatusSelect";
 
		if ( holy_order_status == "yes" ) {
			let holy_order = document.getElementById("HolyOrderSelect").value;
			//alert(holy_order);

			for ( let h of HolyOrder.HolyOrders ) {
				if ( h.value() == holy_order ) {
					if ( h.ConventsAllowed() ) {
						exile_select.appendChild( Element.createOption("No", "no", "ExileStatusoption") );
						exile_select.appendChild( Element.createOption("Yes", "yes", "ExileStatusoption") );
						exile_select.value = "no";
					}
					else {
						exile_select.appendChild( Element.createOption("Yes", "yes", "ExileStatusoption") );
						//exile_select.value = "yes";
					}
					break;
				}
			}
		}

		backgroundbox.appendChild(exile_select);
		exileBoxWritten = true;
		return;
	}

}





// Create button to close form
// Will later add functionality to retrieve data from form, etc
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

// Just hides the character creator
function finishCreation() {

	// Remove all children, etc
	// Make sure that everything is good in input
	PopWindow.style.display = "none";
	//alert("Button triggers");

	// Save character data here

}