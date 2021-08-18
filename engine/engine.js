import * as Command from './commands.js';


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
					GUI.ReadStoryInputBox();
					// Do nothing if the input is empty
					if( !GUI.StorystreamInput() ) return;
					// Then check to see if the input is a command (help, etc); run it if true
					GUI.RunStorystreamCommand( GUI.StorystreamInput() );
	
					// If the input is not a command, write out the input then run the function
					if ( !GUI.HasRunCommand() ) {
						GUI.WritetoStorystream( ">> " + GUI.StorystreamInput() );
						some_func();
					}//end if
			}//end switch
		}//end f
	
		return f;		

	}

	// Write some dialogue
	static WriteDialogue( person, line ) {

		let ln = "<p><span class=\"Character\">" + person + "</span>" + ": ";
		ln += "<span class=\"Dialogue\">" + line + "</span></p>";

		GUI.PushToStorystack(ln);
		GUI.WriteStorystream();

	}


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
		GUI.InfoInputBox.removeEventListener( 'keyup', some_func );
		return;

	}


	static Wrap( some_func ) {

		let f = function(e) {
			switch(e.code) {
				case "Enter":

					GUI.ReadInfoInputBox();
					if( !GUI.InfostreamInput() ) return;
					GUI.RunInfostreamCommand( GUI.InfostreamInput() );
	
					// If a command has been run, just exit immediately
					if ( !GUI.HasRunCommand() ) {
						GUI.WritetoInfostream( ">> " + GUI.InfostreamInput() );
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



const InfoInputBox = document.getElementById('infoinput');
const StoryInputBox = document.getElementById('storyinput');

const Infostream = document.getElementById('infostream');
const Storystream = document.getElementById('storystream');



// Class that holds all the relevant information of the gui.
export class GUI {

	// Important Characters for formatting in HTML
	static #_Tab = "&nbsp;&nbsp;&nbsp;&nbsp;";
	static Tab(i=1) { return GUI.#_Tab.repeat(i); }

	// The data of the storystream and infostream
	static #_StoryData = [];
	static #_InfoData = [];

	// Max allowable length of the streams
	static #_MaxStackSize = 200;

	// Whether or not the just run input is a reserved command
	static #_HasRunCommand = false;

	// Saved input of the text boxes
	static #_StorystreamInput = "";
	static #_InfostreamInput = "";

	// Return the above
	static HasRunCommand() { return this.#_HasRunCommand; }

	static StorystreamInput() { return this.#_StorystreamInput; }
	static InfostreamInput() { return this.#_InfostreamInput; }

	static StoryData() { return this.#_StoryData; }
	static InfoData() { return this.#_InfoData; }

	// Clearing the story/info data of all info
	static ResetStoryData() { GUI.#_StoryData = []; }
	static ResetInfoData() { GUI.#_InfoData = []; }



	// Read then clear the input boxes
	static ReadStoryInputBox() {
		this.#_StorystreamInput = StoryInputBox.value;
		StoryInputBox.value = "";
	}
	static ReadInfoInputBox() {
		this.#_InfostreamInput = InfoInputBox.value;
		InfoInputBox.value = "";
	}



	// Add an additional string to the storystream
	static WritetoStorystream( some_str, style="stream" ) {

		// Just comment out all but the last 2 lines to restore
		let nstyle = style.toLowerCase();
		let some_line = "";

		// Pick the style of the string
		switch(nstyle) {

			case "stream":
			case "s":
				some_line = "<p>" + "<span class=\"Stream\">" + some_str + "</span></p>";
				break;
			case "picked":
			case "p":
				some_line = "<p>" + "<span class=\"Picked\">" + some_str + "</span></p>";
				break;
			case "question":
			case "q":
			case "?":
				some_line = "<p>" + "<span class=\"Question\">" + some_str + "</span></p>";
				break;
			case "notice":
			case "n":
			case "!":
				some_line = "<p>" + "<span class=\"Notice\">" + some_str + "</span></p>";
				break;
			case "info":
			case "i":
				some_line = "<p>" + "<span class=\"Info\">" + some_str + "</span></p>";
				break;
			default:
				some_line = "<p>" + "<span class=\"Notice\">" + "ERROR: Invalid identifier in function 'WritetoStorystream' in argument 'style'" + "</span></p>";
				break;

		}

		GUI.PushToStorystack(some_line); // Push the new string to the data container
		GUI.WriteStorystream(); // Write the storystream's gui

		
	}

	// Add an additional string to the story stream
	static WritetoInfostream( some_str, style="stream" ) {

		// Just comment out all but the last 2 lines to restore
		let nstyle = style.toLowerCase();
		let some_line = "";

		// Pick the style of the string
		switch(nstyle) {

			case "stream":
			case "s":
				some_line = "<p>" + "<span class=\"Stream\">" + some_str + "</span></p>";
				break;
			case "picked":
			case "p":
				some_line = "<p>" + "<span class=\"Picked\">" + some_str + "</span></p>";
				break;
			case "question":
			case "q":
			case "?":
				some_line = "<p>" + "<span class=\"Question\">" + some_str + "</span></p>";
				break;
			case "notice":
			case "n":
			case "!":
				some_line = "<p>" + "<span class=\"Notice\">" + some_str + "</span></p>";
				break;
			case "info":
			case "i":
				some_line = "<p>" + "<span class=\"Info\">" + some_str + "</span></p>";
				break;
			default:
				some_line = "<p>" + "<span class=\"Notice\">" + "ERROR: Invalid identifier in function 'WritetoInfostream' in argument 'style'" + "</span></p>";
				break;

		}

		
		GUI.PushToInfostack(some_line);
		GUI.WriteInfostream();

	}


	static TryAgain(ident = "storystream") {

		let nident = ident.toLowerCase();

		switch(nident) {

			case "storystream":
			case "s":
				GUI.PushToStorystack("<p><span class=\"Notice\">Try Again.</span></p>");
				GUI.WriteStorystream();
				break;
			case "infostream":
			case "i":
				GUI.PushToInfostack("<p><span class=\"Notice\">Try Again.</span></p>");
				GUI.WriteInfostream();
				break;
			default:

		}

	}



	// Run commands for the story/infostream
	static RunStorystreamCommand( some_command ) {

		let lwr_cmd = some_command.toLowerCase(); // Convert the command to lowercase
		GUI.#_HasRunCommand = true; // Assume a command has been run

		// Check to see which command to run
		switch(lwr_cmd) {

			case "clear":
				Command.ClearStorystream();
				//GUI.ClearStorystream();
				break;
			case "clear hard":
				Command.HardClearStorystream();
				break;
			case "help":
				Command.StorystreamHelp();	
			//GUI.StorystreamHelp();
				break;
			// If no command
			default:
				GUI.#_HasRunCommand = false; // Assert that no command has been run
				break;

		}

	}

	static RunInfostreamCommand( some_command ) {

		let lwr_cmd = some_command.toLowerCase();
		GUI.#_HasRunCommand = true;

		switch(lwr_cmd) {

			case "clear":
				Command.ClearInfostream();
				//GUI.ClearInfostream();
				break;
			case "clear hard":
				Command.HardClearStorystream();
				break;
			case "help":
				Command.InfostreamHelp();
				//GUI.InfostreamHelp();
				break;
			default:
				GUI.#_HasRunCommand = false;
				break;

		}

	}

	//---------------------------------------------------------------------------------------------------------------------------------------


	// Supporting methods	
	// Push some string to the infostack
	static PushToStorystack( some_str ) {
		// If the stack is too long, remove the first element
		if ( GUI.#_StoryData.length >= GUI.#_MaxStackSize ) {
			// Remove the first element from the innerHTML
			Storystream.innerHTML = Storystream.innerHTML.replace(GUI.#_StoryData[0], "");
			// Then remove that element from the data
			GUI.#_StoryData.shift();
		}

		// Then push our string to the stack
		GUI.#_StoryData.push( some_str );
	}

	static PushToInfostack( some_str ) {
		if ( GUI.#_InfoData.length >= GUI.#_MaxStackSize ) {
			Infostream.innerHTML = Infostream.innerHTML.replace(GUI.#_InfoData[0], "");
			GUI.#_InfoData.shift();
		}

		GUI.#_InfoData.push( some_str );
		return;
	}



	// Write the storystack to the gui
	static WriteStorystream() {
		//Storystream.innerHTML = "";
		//for ( let line in GUI.#_StoryData ) Storystream.innerHTML += GUI.#_StoryData[line];
		Storystream.innerHTML += GUI.#_StoryData[GUI.#_StoryData.length - 1];
		Storystream.scrollIntoView(false); // Scroll to the bottom of the div
	}

	// Write the storystack to the gui
	static WriteInfostream() {
		//Infostream.innerHTML = "";
		//for ( let line in GUI.#_InfoData ) Infostream.innerHTML += GUI.#_InfoData[line];
		Infostream.innerHTML += GUI.#_InfoData[GUI.#_InfoData.length - 1];
		Infostream.scrollIntoView(false); // Scroll to the bottom of the div
	}





	// Clone functions
	static WriteDialogue( person, line ) {

		let ln = "<p><span class=\"Character\">" + person + "</span>" + ": ";
		ln += "<span class=\"Dialogue\">" + line + "</span></p>";

		GUI.PushToStorystack(some_line);
		GUI.WriteStorystream();

	}








}//end class