import * as GUI from './gui.js'

const InfoInputBox = document.getElementById('infoinput');
const StoryInputBox = document.getElementById('storyinput');

const Infostream = document.getElementById('infostream');
const Storystream = document.getElementById('storystream');

// Class for running functions in the story section
export class Story {


	// Add a function to the event listeners
	static Run( some_func, prerun_func = none, args = [] ) {

		// First run the prerun function
		prerun_func(args);

		// Then queue up the the next function
		StoryInputBox.addEventListener( 'keyup', some_func );
		return;

	}


	// Remove a function from the event listener
	static Remove( some_func, prerun_func = none, args = [] ) {

		prerun_func(args);

		StoryInputBox.removeEventListener( 'keyup', some_func );
		return;

	}


	// Wrapping function that takes a function as an argument
	// Essentially prepares it for use in the 'Run'/'Remove' functions
	static Wrap( some_func ) {

		// Declare a function that accepts some keypress 'e'
		let f = function(e) {
			// Looking at the keypress code
			switch(e.code) {
				// If it's 'Enter'
				case "Enter":

					// First read the input box and clear it
					GUI.Stream.ReadStoryInputBox();
					// Do nothing if the input is empty
					if( !GUI.Stream.StorystreamInput() ) return;
					// Then check to see if the input is a command (help, etc); run it if true
					GUI.Stream.RunStorystreamCommand( GUI.Stream.StorystreamInput() );
	
					// If the input is not a command, write out the input then run the function
					if ( !GUI.Stream.HasRunCommand() ) {
						GUI.Stream.WritetoStorystream( ">> " + GUI.Stream.StorystreamInput() );
						some_func();
					}//end if
			}//end switch
		}//end f
	
		return f;		

	}

	// Write some dialogue
	/*
	static WriteDialogue( person, line ) {

		let ln = "<p><span class=\"Character\">" + person + "</span>" + ": ";
		ln += "<span class=\"Dialogue\">" + line + "</span></p>";

		Engine.GUI.PushToStorystack(ln);
		Engine.GUI.WriteStorystream();

	}*/


	static FreeInput = Story.Wrap(none);



}//end Story



// Class for running functions in the info section.
export class Info {


	// Functions to queue and dequeue functions to the story
	static Run( some_func, prerun_func = none, args = [] ) {

		prerun_func(args);
		InfoInputBox.addEventListener( 'keyup', some_func );
		return;

	}


	static Remove( some_func, prerun_func = none, args = [] ) {

		prerun_func(args);
		InfoInputBox.removeEventListener( 'keyup', some_func );
		return;

	}


	static Wrap( some_func ) {

		let f = function(e) {
			switch(e.code) {
				case "Enter":

					GUI.Stream.ReadInfoInputBox();
					if( !GUI.Stream.InfostreamInput() ) return;
					GUI.Stream.RunInfostreamCommand( GUI.Stream.InfostreamInput() );
	
					// If a command has been run, just exit immediately
					if ( !GUI.Stream.HasRunCommand() ) {
						GUI.Stream.WritetoInfostream( ">> " + GUI.Stream.InfostreamInput() );
						some_func();
					}
			}
		}
	
		return f;		

	}


	static FreeInput = Info.Wrap(none);


}//end Info


// Function that does absolutely nothing.
function none() { return; }