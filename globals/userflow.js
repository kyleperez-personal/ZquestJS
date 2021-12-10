// Includes
//import * as globals from '../attributes/global_attributes.js';
import * as GUI from '../engine/gui.js';
import * as fix from '../engine/format/format_functions.js';


export function user_answer(
	//storystack,
	my_bool,
	my_question,
	yes_message = "",
	no_message = "",
	init_message = ""
) {

	let my_answer = "";


	while (true) {

		//if ( init_message != "" ) write.update_storystream( format.stream(init_message), storystack );
		if ( init_message != "" ) GUI.Stream.UpdateStorystream( format.stream(init_message) );

		//write.update_storystream( format.question(my_question), storystack );
		GUI.Stream.UpdateStorystream( format.question(my_question) );
		//Get input

		my_answer = get_input(my_answer);


		if ( my_answer == "Yes" ) {
			//if ( yes_message != "" ) write.update_storystream( format.stream(yes_message), storystack );
			if ( yes_message != "" ) GUI.Stream.UpdateStorystream( format.stream(yes_message) );
			my_bool = true;
			return;
		}
		else if ( my_answer == "No" ) {
			//if ( no_message != "" ) write.update_storystream( format.stream(no_message), storystack );
			if ( no_message != "" ) GUI.Stream.UpdateStorystream( format.stream(no_message) );
			my_bool = false;
			return;
		}
		//else write.update_storystream( format.try_again(), storystack );
		else GUI.Stream.UpdateStorystream( format.try_again() );
		//end if

		

	}//end while

}//end user_answer



function get_input( some_input ) {

	// Wait until 'enter' gets hit
	return fix.fixformat(some_input);

}

