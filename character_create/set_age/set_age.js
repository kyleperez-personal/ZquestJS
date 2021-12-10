import * as GUI from '../../engine/gui.js';
import * as Wrapper from '../../engine/wrappers.js';
import * as Constants from './contants.js';

// We wrap the functions in here
let get_age_fnc = Wrapper.Story.Wrap(get_age);
let confirm_age_fnc = Wrapper.Story.Wrap(confirm_age);

export function set_age() {

	let age = 0;
	let age_is_confirmed = false;

	// In Infostream, set free input
	Wrapper.Info.Run(Wrapper.Info.FreeInput);
	// While in the Storystream, first echo age_question then run get_age_fnc
	Wrapper.Story.Run( get_age_fnc, age_question );

}


// Just ask how old you are
function age_question() {
	GUI.Stream.WritetoStorystream("How old are you?", "question");
}

// Echo the input age
function echo_age([age]) {
	GUI.Stream.WritetoStorystream("You are " + age + " years old.");
	GUI.Stream.WritetoStorystream("Is this alright? Yes or No.", "question");
}


// First function called in Storystream
function get_age(age) {
	
	// First grab the storystream input
	age = GUI.Stream.StorystreamInput();
	
	// If age is valid go to confirm age
	if ( Constants.MIN_PLAYER_AGE <= parseInt(age) && parseInt(age) <= Constants.MAX_PLAYER_AGE ) {
		
		// Then remove the current function from the event listener
		// And add a new one
		Wrapper.Story.Remove(get_age_fnc);
		Wrapper.Story.Run(confirm_age_fnc, echo_age, [age]);
		return;

	}
	// Otherwise provide error and prepare to run again
	else {
		GUI.Stream.WritetoStorystream("Invalid entry! Number must be between " + Constants.MIN_PLAYER_AGE + " and " + Constants.MAX_PLAYER_AGE + "!", "notice");
	}

}


// Confirm your age; second function call
function confirm_age() {

	// Get storystream input
	let answer = GUI.Stream.StorystreamInput().toLowerCase();

	// If player is good with age, confirm it
	if ( answer == "yes" || answer == "y" ) {

		GUI.Stream.WritetoStorystream("Age confirmed!");
		Wrapper.Story.Remove(confirm_age_fnc);
		Wrapper.Story.Run(Wrapper.Story.FreeInput);
		return;
	
	}
	// If not alright, dequeue current function
	// then reload get_age function
	else if ( answer == "no" || answer == "n" ) {

		GUI.Stream.WritetoStorystream("Age not confirmed!");
		Wrapper.Story.Remove(confirm_age_fnc);
		Wrapper.Story.Run(get_age_fnc, age_question);
		return;
	}
	// If answer unsupported, throw a TryAgain
	else {
		GUI.Stream.TryAgain("s");
	}


}

