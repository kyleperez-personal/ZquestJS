// Includes
import * as globals from '../../globals/attributes/global_attributes.js';
import * as format from '../../globals/capitalization/format_functions.js';
//import * as userflow from '../../globals/converse/userflow.js';
import * as Engine from '../../engine/gui.js';

export function set_age() {

	GUI.Stream.UpdateStorystream(output.stream("Hello World!"));
	// Return value
	let age = 0;

	// Temporary
	let age_is_confirmed = false;
	/*
	// While not confirmed, get the age
	while ( !age_is_confirmed ) {

		// Pick the age
		pick_age(age);

		// Confirm it
		userflow.user_answer(
			//storystack,
			age_is_confirmed,
			"Is this alright?",
			"Alright",
			"Let's try again then.",
			"You are " + age + " years old."
		);

	}//end while

	return age;
	*/
}//end set_age




//----------------------------------------------------
// Non-exported functions
function pick_age( number ) {

	let age_str = "";

	while ( true ) {

		//GUI.Stream.UpdateStorystream(output.question("How old are you?\n Enter a number: "));
		Engine.GUI.WritetoStorystream("How old are you?\n Enter a number: ", "question");
		/*
		write.update_storystream(
			output.question("How old are you?"),
			storystack
		);

		write.update_storystream(
			output.stream("Enter a number between"),
			storystack
		);
		*/

		//GUI.Stream.UpdateStorystream("Your age: ");
		Engine.GUI.WritetoStorystream("Your age: ");
		/*
		write.update_storystream(
			output.stream("Your age: "),
			storystack
		);
		*/

		// Wait until input is gotten from storystream box

		age_str = format.fixformat(GUI.StoryInputBox.value);

		if ( age_str.length == 2 ) {

			age = parseInt(age_str);
			if ( globals.MIN_PLAYER_AGE <= age && age <= globals.MAX_PLAYER_AGE ) return;
			else {

				//GUI.Stream.UpdateStorystream(output.notice("Age condition not satisfied!"));
				Engine.GUI.WritetoStorystream("Age condition not satisfied!", "notice");
				/*
				write.update_storystream(
					output.notice("Age condition not satisfied!"),
					storystack
				);
				*/
			}

		}
		else {
			//GUI.Stream.UpdateStorystream(output.notice("Your input is not the correct length!"));
			Engine.GUI.WritetoStorystream("Your input is not the correct length!", "notice");
			/*
			write.update_storystream(
				output.notice("Your input is not the correct length!"),
				storystack
			);
			*/
		}//end if


	}//end while

}//end pick_age
