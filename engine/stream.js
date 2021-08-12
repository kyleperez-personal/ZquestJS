//import * as globals from '../attributes/global_attributes.js';
import * as output from './format/output_format.js';



export const InfoInputBox = document.getElementById('infoinput');
export const StoryInputBox = document.getElementById('storyinput');

export const Infostream = document.getElementById('infostream');
export const Storystream = document.getElementById('storystream');


// Class that holds all the relevant information of the gui.
export class Stream {

	// Private variables + Returners

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
	static StorystreamInput() { return this.#_StorystreamInput; }
	static InfostreamInput() { return this.#_InfostreamInput; }


	// Methods

	// Add an additional string to the storystream
	static UpdateStorystream( some_str ) {
		this.#_StorystreamInput = StoryInputBox.value; // Save the input field
		Stream.PushToStorystack(some_str); // Push the new string to the data container
		Stream.WriteStorystream(); // Write the storystream's gui
		
	}

	// Add an additional string to the story stream
	static UpdateInfostream( some_str ) {
		this.#_InfostreamInput = InfoInputBox.value;
		Stream.PushToInfostack(some_str);
		Stream.WriteInfostream();
	}

	// Run commands for the story/infostream
	static RunStorystreamCommand( some_command ) {

		let lwr_cmd = some_command.toLowerCase(); // Convert the command to lowercase
		Stream.#_HasRunCommand = true; // Assume a command has been run

		// Check to see which command to run
		switch(lwr_cmd) {

			case "clear":
				Stream.ClearStorystream();
				return;
			case "help":
				Stream.StorystreamHelp();
				return;
			case "recover":
				Stream.RecoverStorystream();
				return;
			// If no command
			default:
				Stream.#_HasRunCommand = false; // Assert that no command has been run
				return;

		}

	}

	static RunInfostreamCommand( some_command ) {

		let lwr_cmd = some_command.toLowerCase();
		this.#_HasRunCommand = true;

		switch(lwr_cmd) {

			case "clear":
				Stream.ClearInfostream();
				return;
			case "help":
				Stream.InfostreamHelp();
				return;
			case "recover":
				Stream.RecoverInfostream();
				return;
			default:
				Stream.#_HasRunCommand = false;
				return;

		}

	}

	// Activates upon hitting 'clear'
	static ClearStorystream() {
		Storystream.innerHTML = ""; // Reset the inner html
		Stream.#_StoryDataBackup = Stream.#_StoryData; // Save the array just in case
		Stream.#_StoryData.length = 0; // Reset the story data
		StoryInputBox.value = ""; // Clear the input box
	}

	static ClearInfostream() {
		Infostream.innerHTML = "";
		Stream.#_InfoDataBackup = Stream.#_InfoData;
		Stream.#_InfoData.length = 0;
		InfoInputBox.value = "";
	}


	static StorystreamHelp() {
		Stream.PushToStorystack( output.notice("Help:") );
		Stream.PushToStorystack( output.info("-clear") );
		Stream.PushToStorystack( output.stream("\tClear the story window of all text.") );
		Stream.PushToStorystack( output.info("-help") );
		Stream.PushToStorystack( output.stream("\tSee all the help commands.") );
		Stream.PushToStorystack( output.info("-recover") );
		Stream.PushToStorystack( output.stream("\tRecover the story window's text from the last clear.") );

		Stream.WriteStorystream();

	}
	static InfostreamHelp() {
		Stream.PushToInfostack( output.notice("Help:") );
		Stream.PushToInfostack( output.info("-clear") );
		Stream.PushToInfostack( output.stream("\tClear the information window of all text.") );
		Stream.PushToInfostack( output.info("-help") );
		Stream.PushToInfostack( output.stream("\tSee all the help commands availible to the info window.") );
		Stream.PushToInfostack( output.info("-recover") );
		Stream.PushToInfostack( output.stream("\tRecover the info window's text from the last clear.") );

		Stream.WriteInfostream();
	}


	static RecoverStorystream() {
		Stream.#_StoryData = Stream.#_StoryDataBackup; // Get the data from the backup entry
		Stream.WriteStorystream(); // Then rewrite the storystream
	}
	static RecoverInfostream() {
		Stream.#_InfoData = Stream.#_InfoDataBackup;
		Stream.WriteInfostream();
	}

	



	// Supporting methods	
	// Push some string to the infostack
	static PushToStorystack( some_str ) {
		// If the stack is too long, remove the first element
		if ( Stream.#_StoryData.length >= Stream.#_MaxStackSize ) Stream.#_StoryData.shift();

		// Then push our string to the stack
		Stream.#_StoryData.push( some_str );
	}

	// Write the storystack to the gui
	static WriteStorystream() {
		Storystream.innerHTML = "";
		for ( let line in Stream.#_StoryData ) Storystream.innerHTML += Stream.#_StoryData[line];
		Storystream.scrollIntoView(false); // Scroll to the bottom of the div
	}



	// Similar for infostack
	static PushToInfostack( some_str ) {
		// If the stack is too long, remove the first element
		if ( Stream.#_InfoData.length >= Stream.#_MaxStackSize ) Stream.#_InfoData.shift();

		// Then push our string to the stack
		Stream.#_InfoData.push( some_str );
		return;
	}

	// Write the storystack to the gui
	static WriteInfostream() {
		Infostream.innerHTML = "";
		for ( let line in Stream.#_InfoData ) Infostream.innerHTML += Stream.#_InfoData[line];
		Infostream.scrollIntoView(false); // Scroll to the bottom of the div
	}



	// Listeners + their functions
	static AddListeners() {
		InfoInputBox.addEventListener('keyup', Stream.InfostreamKeypress);
		StoryInputBox.addEventListener('keyup', Stream.StorystreamKeypress);
		//this.#info_input_box.addEventListener('keyup', this.infostream_update);
		//this.#story_input_box.addEventListener('keyup', this.storystream_update);
		//document.getElementById('infoinput').addEventListener('keyup', this.infostream_update);
		//document.getElementById('storyinput').addEventListener('keyup', this.storystream_update);
	}




	// How to update the infostream: the left text box
	static InfostreamKeypress(e) {

		// Decide what to do based on the input
		switch(e.code) {

			case "Enter":

				// Run a command if possible
				Stream.RunInfostreamCommand(InfoInputBox.value);
				// Then clear the input box
				
				// If command has not been run, send the text input to the screen
				if ( !Stream.#_HasRunCommand ) Stream.UpdateInfostream( output.stream(">> " + InfoInputBox.value) );

				InfoInputBox.value = "";

				
				
				
				return;
	

		}//end switch
  

	}//end infostream_keypress


	// How to update the storystream: the right text box
	static StorystreamKeypress(e) {

		switch(e.code) {

			case "Enter":

				Stream.RunStorystreamCommand(StoryInputBox.value);

		
				if ( Stream.#_HasRunCommand ) {
					Stream.#_HasRunCommand = false;
					StoryInputBox.value = "";
					return;
				}

				
				Stream.UpdateStorystream( output.stream(">> " + StoryInputBox.value) );
				StoryInputBox.value = "";
				return;


		}//end switch

	}//end storystream_keypress




}//end class




