// These two lines break everything
//var gbl = require('globals/attributes/global_attributes.js');
//var format = require('globals/capitalization/format_functions.js');
//var my_include = require('test_include.js');
//import * as my_module from 'my_module.js';

//import * as globals from './globals/attributes/global_attributes.js';
//import * as write from './globals/write/write.js';
//import * as output from './globals/capitalization/output_format.js';

import * as Engine from './engine/engine.js';
//import * as GUI from './engine/stream.js';
import * as Test from './game.js';
// Note the info and story input sections
//const info_input_box = document.getElementById('infoinput');
//const story_input_box = document.getElementById('storyinput');

// Add listners for when you put the key up
//globals.info_input_box.addEventListener('keyup', infostream_update);
//globals.story_input_box.addEventListener('keyup', storystream_update);


//Engine.GUI.AddListeners();
//GUI.Stream.AddListeners();

//Engine.GUI.PushtoStorystack(output.dialogue("Kyle Perez", "Hello World!"));
//Engine.GUI.WriteStorystream();
Engine.Story.WriteDialogue("Kyle Perez", "Hello World!")

Test.game();


/*
// How to update the infostream: the left text box
function infostream_update(e) {

	// Decide what to do based on the input
	switch(e.code) {

		case "Enter":

			
			if ( globals.info_input_box.value == "clear" ) {
				GUI.clear_infostream();
				return;
			}

			
			//let new_entry = "<p>" + globals.info_input_box.value + "</p>";
			//write.push_to_stack( new_entry, infostack );
			//write.push_to_stack( globals.info_input_box.value, infostack );
			//write.write_infostream( infostack );
			GUI.update_infostream( output.stream(">> " + globals.info_input_box.value) );
			globals.info_input_box.value = "";
			return;
		

	}//end switch
	  

}


// How to update the storystream: the right text box
function storystream_update(e) {

	switch(e.code) {

		case "Enter":

			
			if ( globals.story_input_box.value == "clear" ) {
				GUI.clear_storystream();
				return;
			}

			
			
			//let new_entry = "<p>" + globals.story_input_box.value + "</p>";
			//write.push_to_stack( new_entry, storystack );
			//write.write_storystream( storystack );
			
			GUI.update_storystream( output.stream(">> " + globals.story_input_box.value) );
			globals.story_input_box.value = "";
			return;


	}//end switch

}

/*
let infostack = [];
let storystack = [];

// How to update the infostream: the left text box
function infostream_update(e) {

	// Decide what to do based on the input
	switch(e.code) {

		case "Enter":

			
			if ( globals.info_input_box.value == "clear" ) {
				write.clear_infostream(infostack);
				return;
			}

			
			//let new_entry = "<p>" + globals.info_input_box.value + "</p>";
			//write.push_to_stack( new_entry, infostack );
			//write.push_to_stack( globals.info_input_box.value, infostack );
			//write.write_infostream( infostack );
			write.update_infostream( output.stream(">> " + globals.info_input_box.value), infostack );
			globals.info_input_box.value = "";
			return;
		

	}//end switch
	  

}

//import { say_hi } from './my_module.js';
//import {  }

// How to update the storystream: the right text box
function storystream_update(e) {

	switch(e.code) {

		case "Enter":

			
			if ( globals.story_input_box.value == "clear" ) {
				write.clear_storystream(storystack);
				return;
			}

			
			
			//let new_entry = "<p>" + globals.story_input_box.value + "</p>";
			//write.push_to_stack( new_entry, storystack );
			//write.write_storystream( storystack );
			
			write.update_storystream( output.stream(">> " + globals.story_input_box.value), storystack );
			globals.story_input_box.value = "";
			return;


	}//end switch

}
*/