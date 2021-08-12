//import * as test from './character_create/set_age/set_age.js';
//import * as GUI from './engine/stream.js';
import * as Engine from './engine/engine.js';
import * as output from './engine/format/output_format.js';

let get_age_fnc = Engine.Story.Wrap(get_age);
let confirm_age_fnc = Engine.Story.Wrap(do_confirm);

export function game() {


	let age = 0;
	let age_is_confirmed = false;

	Engine.Story.Run( get_age_fnc, age_question );
	

}


// Called 1st
function age_question() {

	//GUI.Stream.UpdateStorystream(output.question("How old are you?"));
	Engine.GUI.UpdateStorystream(output.question("How old are you?"));
	return;

}


function echo_age([age]) {

	//GUI.Stream.UpdateStorystream(output.stream("You are " + age + " years old"));
	//GUI.Stream.UpdateStorystream(output.stream("Is this alright? Yes or No."));
	Engine.GUI.UpdateStorystream(output.stream("You are " + age + " years old"));
	Engine.GUI.UpdateStorystream(output.stream("Is this alright? Yes or No."));

}


// Called Next
function get_age(age) {
	//GUI.Stream.UpdateInfostream(output.stream("get_age runs!"));

	//age = GUI.Stream.StorystreamInput();
	age = Engine.GUI.StorystreamInput();
	

	if ( 18 <= parseInt(age) && parseInt(age) <= 65 ) {
		

		// Then remove the current function from the event listener
		//dequeue(get_age);
		//GUI.story_input_box.removeEventListener( 'keyup', g );
		// And add a new one
		//GUI.story_input_box.addEventListener( 'keyup', f );
		Engine.Story.Remove(get_age_fnc);
		Engine.Story.Run(confirm_age_fnc, echo_age, [age]);
		//alt_queue(ca);
		//alt_dequeue(ga);
		//queue(do_confirm);

		return;
	}
	else {
		Engine.GUI.UpdateStorystream(output.notice("Invalid entry! Number must be between 18 and 65!"));
		//GUI.Stream.UpdateStorystream(output.notice("Invalid entry! Number must be between 18 and 65!"));
		//queue(get_age);
	}

}


// Confirm your age
function do_confirm() {

	// If age is alright, remove old event listener and terminate
	//if ( GUI.Stream.StorystreamInput() == "Yes" ) {
	if ( Engine.GUI.StorystreamInput() == "Yes" ) {
		Engine.GUI.UpdateStorystream(output.stream("Age confirmed!"));
		//GUI.Stream.UpdateStorystream(output.stream("Age confirmed!"));
		//GUI.story_input_box.removeEventListener('keyup', do_confirm);
		//GUI.story_input_box.removeEventListener( 'keyup', g );
		//dequeue(do_confirm);
		Engine.Story.Remove(confirm_age_fnc);
		//alt_dequeue(ca);

		return;
	}
	// If not alright, dequeue current function
	// then reload get_age function
	//else if ( GUI.Stream.StorystreamInput() == "No" ) {
	else if ( Engine.GUI.StorystreamInput() == "No" ) {
		Engine.GUI.UpdateStorystream(output.stream("Age not confirmed!"));
		//GUI.Stream.UpdateStorystream(output.stream("Age not confirmed!"));
		//GUI.story_input_box.removeEventListener('keyup', do_confirm);
		//GUI.story_input_box.addEventListener('keyup', get_age);
		//GUI.story_input_box.removeEventListener( 'keyup', g );
		//alt_queue(ga);
		//alt_dequeue(ca);
		//queue(get_age);
		//GUI.story_input_box.addEventListener( 'keyup', f );
		//dequeue(do_confirm);
		//queue(get_age);
		//age_question();
		Engine.Story.Remove(confirm_age_fnc);
		Engine.Story.Run(get_age_fnc, age_question);
		return;
	}
	else {
		Engine.GUI.UpdateStorystream( output.try_again() );
		//GUI.Stream.UpdateStorystream( output.try_again() );
		//queue(do_confirm);
	}


}







