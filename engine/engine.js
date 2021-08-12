import * as output from './format/output_format.js';
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
					// Then check to see if the input is a command (help, etc); run it if true
					GUI.RunStorystreamCommand( GUI.StorystreamInput() );
	
					// If the input is not a command, write out the input then run the function
					if ( !GUI.HasRunCommand() ) {
						GUI.UpdateStorystream( output.stream(">> " + GUI.StorystreamInput()) );
						some_func();
					}//end if
			}//end switch
		}//end f
	
		return f;		

	}


}//end Story



// Class for running functions in the info section.
export class Info {


	// Functions to queue and dequeue functions to the story
	static Run( some_func, prerun_func = none, args = [] ) {

		prerun_func(args);
		GUI.InfoInputBox.addEventListener( 'keyup', some_func );
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
					GUI.InfostreamCommand( GUI.InfostreamInput() );
	
					// If a command has been run, just exit immediately
					if ( !GUI.HasRunCommand() ) {
						GUI.UpdateInfostream( output.stream(">> " + GUI.InfostreamInput()) );
						some_func();
					}
			}
		}
	
		return f;		

	}


}//end Info


// Function that does absolutely nothing.
function none() { return; }



const InfoInputBox = document.getElementById('infoinput');
const StoryInputBox = document.getElementById('storyinput');

const Infostream = document.getElementById('infostream');
const Storystream = document.getElementById('storystream');



// Class that holds all the relevant information of the gui.
export class GUI {


	// The data of the storystream and infostream
	static #_StoryData = [];
	static #_InfoData = [];

	static #_StoryDataBackup = [];
	static #_InfoDataBackup = [];

	// Max allowable length of the streams
	static #_MaxStackSize = 20;

	// Whether or not the just run input is a reserved command
	static #_HasRunCommand = false;

	// Saved input of the text boxes
	static #_StorystreamInput = "";
	static #_InfostreamInput = "";

	// Return the above
	static HasRunCommand() { return this.#_HasRunCommand; }

	static StorystreamInput() { return this.#_StorystreamInput; }
	static InfostreamInput() { return this.#_InfostreamInput; }



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
	static UpdateStorystream( some_str ) {

		GUI.PushToStorystack(some_str); // Push the new string to the data container
		GUI.WriteStorystream(); // Write the storystream's gui

		
	}

	// Add an additional string to the story stream
	static UpdateInfostream( some_str ) {

		GUI.PushToInfostack(some_str);
		GUI.WriteInfostream();

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
			case "help":
				Command.StorystreamHelp();	
			//GUI.StorystreamHelp();
				break;
			case "recover":
				Command.RecoverStorystream();
				//GUI.RecoverStorystream();
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
			case "help":
				Command.InfostreamHelp();
				//GUI.InfostreamHelp();
				break;
			case "recover":
				Command.RecoverInfostream();
				//GUI.RecoverInfostream();
				break;
			default:
				GUI.#_HasRunCommand = false;
				break;

		}

	}


	// Functions for running commands
	//---------------------------------------------------------------------------------------------------------------------------------------
	// Activates upon hitting 'clear'
	static ClearStorystream() {
		Storystream.innerHTML = ""; // Reset the inner html
		GUI.#_StoryDataBackup = GUI.#_StoryData; // Save the array just in case
		GUI.#_StoryData.length = 0; // Reset the story data
		//StoryInputBox.value = ""; // Clear the input box
	}

	static ClearInfostream() {
		Infostream.innerHTML = "";
		GUI.#_InfoDataBackup = GUI.#_InfoData;
		GUI.#_InfoData.length = 0;
		//InfoInputBox.value = "";
	}


	static StorystreamHelp() {
		GUI.PushToStorystack( output.notice("Help:") );
		GUI.PushToStorystack( output.info("-clear") );
		GUI.PushToStorystack( output.stream("\tClear the story window of all text.") );
		GUI.PushToStorystack( output.info("-help") );
		GUI.PushToStorystack( output.stream("\tSee all the help commands.") );
		GUI.PushToStorystack( output.info("-recover") );
		GUI.PushToStorystack( output.stream("\tRecover the story window's text from the last clear.") );

		GUI.WriteStorystream();

	}
	static InfostreamHelp() {
		GUI.PushToInfostack( output.notice("Help:") );
		GUI.PushToInfostack( output.info("-clear") );
		GUI.PushToInfostack( output.stream("\tClear the information window of all text.") );
		GUI.PushToInfostack( output.info("-help") );
		GUI.PushToInfostack( output.stream("\tSee all the help commands availible to the info window.") );
		GUI.PushToInfostack( output.info("-recover") );
		GUI.PushToInfostack( output.stream("\tRecover the info window's text from the last clear.") );

		GUI.WriteInfostream();
	}


	static RecoverStorystream() {
		GUI.#_StoryData = GUI.#_StoryDataBackup; // Get the data from the backup entry
		GUI.WriteStorystream(); // Then rewrite the storystream
	}
	static RecoverInfostream() {
		GUI.#_InfoData = GUI.#_InfoDataBackup;
		GUI.WriteInfostream();
	}

	//---------------------------------------------------------------------------------------------------------------------------------------



	static BackupStoryData() { GUI.#_StoryDataBackup = GUI.#_StoryData; }
	static BackupInfoData() { GUI.#_InfoDataBackup = GUI.#_InfoData; }
	
	static ResetStoryData() { GUI.#_StoryData.length = 0; }
	static ResetInfoData() { GUI.#_InfoData.length = 0; }

	static ReadStoryBackup() { GUI.#_StoryData = GUI.#_StoryDataBackup; }
	static ReadInfoBackup() { GUI.#_InfoData = GUI.#_InfoDataBackup; }
	



	// Supporting methods	
	// Push some string to the infostack
	static PushToStorystack( some_str ) {
		// If the stack is too long, remove the first element
		if ( GUI.#_StoryData.length >= GUI.#_MaxStackSize ) GUI.#_StoryData.shift();

		// Then push our string to the stack
		GUI.#_StoryData.push( some_str );
	}

	static PushToInfostack( some_str ) {
		if ( GUI.#_InfoData.length >= GUI.#_MaxStackSize ) GUI.#_InfoData.shift();

		GUI.#_InfoData.push( some_str );
		return;
	}



	// Write the storystack to the gui
	static WriteStorystream() {
		Storystream.innerHTML = "";
		for ( let line in GUI.#_StoryData ) Storystream.innerHTML += GUI.#_StoryData[line];
		Storystream.scrollIntoView(false); // Scroll to the bottom of the div
	}

	// Write the storystack to the gui
	static WriteInfostream() {
		Infostream.innerHTML = "";
		for ( let line in GUI.#_InfoData ) Infostream.innerHTML += GUI.#_InfoData[line];
		Infostream.scrollIntoView(false); // Scroll to the bottom of the div
	}








}//end class