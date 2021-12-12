import * as Constants from './constants.js';


const InfoInputBox = document.getElementById('infoinput');
const StoryInputBox = document.getElementById('storyinput');

const Infostream = document.getElementById('infostream');
const Storystream = document.getElementById('storystream');

// General use popup window and content
//const PopWindow = document.getElementById('PopWin');
//const PopWindowContent = document.getElementById('PopWinCont');



// Class that holds all the relevant information of the gui.
export class Stream {

	// Important Characters for formatting in HTML
	static #_Tab = "&nbsp;&nbsp;&nbsp;&nbsp;";
	static Tab(i=1) { return GUI.#_Tab.repeat(i); }

	// Max allowable length of the streams
	static #_MaxStackSize = Constants.MAX_STACK_SIZE;

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
	static WritetoStorystream( some_str, style="stream" ) {

		let nstyle = style.toLowerCase();
		let some_line = "";

		// Create a new div
		let newdiv = document.createElement('div');
	

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

		// Append div to storystream
		newdiv.innerHTML = some_line;
		Storystream.scrollIntoView(false);
		Storystream.appendChild(newdiv);

		// If storystream too long, remove first element
		if ( Storystream.children.length >= Stream.#_MaxStackSize ) {
			Storystream.removeChild(Storystream.children[0]);
		}
		
	}

	// Add an additional string to the story stream
	static WritetoInfostream( some_str, style="stream" ) {

		let nstyle = style.toLowerCase();
		let some_line = "";

		let newdiv = document.createElement('div');

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

		newdiv.innerHTML = some_line;
		Infostream.scrollIntoView(false);
		Infostream.appendChild(newdiv);

		// If storystream too long, remove first element
		if ( Infostream.children.length >= Stream.#_MaxStackSize ) {
			Infostream.removeChild(Infostream.children[0]);
		}

	}


	static TryAgain(ident = "storystream") {

		let nident = ident.toLowerCase();

		switch(nident) {

			case "storystream":
			case "s":
				Stream.WritetoStorystream("Try Again.", "n");
				break;
			case "infostream":
			case "i":
				Stream.WritetoInfostream("Try Again.", "n");
				break;
			default:
				alert("Function call 'GUI.TryAgain(ident)' has an unsupported 'ident'.\n. Use 's' or 'n'.");

		}

	}



	// Run commands for the story/infostream
	static RunStorystreamCommand( some_command ) {

		let lwr_cmd = some_command.toLowerCase(); // Convert the command to lowercase
		Stream.#_HasRunCommand = true; // Assume a command has been run

		// Check to see which command to run
		switch(lwr_cmd) {

			case "clear":
				Stream.WritetoStorystream("<br>".repeat(20));
				Storystream.scrollIntoView(false);
				break;
			case "clear hard":
				while ( Storystream.firstChild ) Storystream.removeChild(Storystream.firstChild);
				break;
			case "help":
				Stream.WritetoStorystream("Help here");
				break;
			// If no command
			default:
				Stream.#_HasRunCommand = false; // Assert that no command has been run
				break;

		}

	}

	static RunInfostreamCommand( some_command ) {

		let lwr_cmd = some_command.toLowerCase();
		Stream.#_HasRunCommand = true;

		switch(lwr_cmd) {

			case "clear":
				Stream.WritetoInfostream("<br>".repeat(20));
				Infostream.scrollIntoView(false);
				break;
			case "clear hard":
				while ( Infostream.firstChild ) Infostream.removeChild(Infostream.firstChild);
				break;
			case "help":
				Stream.WritetoInfostream("Help here");
				break;
			default:
				Stream.#_HasRunCommand = false;
				break;

		}

	}

	//---------------------------------------------------------------------------------------------------------------------------------------


	// Clone functions
	/*
	static WriteDialogue( person, line ) {

		let ln = "<p><span class=\"Character\">" + person + "</span>" + ": ";
		ln += "<span class=\"Dialogue\">" + line + "</span></p>";

		GUI.PushToStorystack(some_line);
		GUI.WritetoStorystream(some_line);

	}*/








}//end class Stream