import * as GUI from './engine/gui.js';
import * as Wrapper from './engine/wrappers.js'

let get_age_fnc = Wrapper.Story.Wrap(get_age);
let confirm_age_fnc = Wrapper.Story.Wrap(do_confirm);

export function game() {

	let age = 0;
	let age_is_confirmed = false;

	Wrapper.Info.Run(Wrapper.Info.FreeInput);
	Wrapper.Story.Run( get_age_fnc, age_question );
	
}


// Called 1st
function age_question() {
	GUI.Stream.WritetoStorystream("How old are you?", "question");
	return;
}


function echo_age([age]) {

	GUI.Stream.WritetoStorystream("You are " + age + " years old.");
	GUI.Stream.WritetoStorystream("Is this alright? Yes or No.", "question");

}


// Called Next
function get_age(age) {
	
	age = GUI.Stream.StorystreamInput();
	
	// If age is valid
	if ( 18 <= parseInt(age) && parseInt(age) <= 65 ) {
		
		// Then remove the current function from the event listener
		// And add a new one
		Wrapper.Story.Remove(get_age_fnc);
		Wrapper.Story.Run(confirm_age_fnc, echo_age, [age]);
		return;

	}
	else {
		GUI.Stream.WritetoStorystream("Invalid entry! Number must be between 18 and 65!", "notice");
	}

}


// Confirm your age
function do_confirm() {

	let answer = GUI.Stream.StorystreamInput().toLowerCase();

	// If age is alright, remove old event listener and terminate
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
	else {
		GUI.Stream.TryAgain("s");
	}


}







