import * as GUI from '../../engine/gui.js';
import * as Wrapper from '../../engine/wrappers.js';
import * as Element from '../../engine/elements.js';

// We wrap the functions in here
//let get_age_fnc = Wrapper.Story.Wrap(get_age);
//let confirm_age_fnc = Wrapper.Story.Wrap(confirm_age);

/*
export function set_age() {

	let age = 0;
	let age_is_confirmed = false;

	// In Infostream, set free input
	Wrapper.Info.Run(Wrapper.Info.FreeInput);
	// While in the Storystream, first echo age_question then run get_age_fnc
	//Wrapper.Story.Run( get_age_fnc, age_question );

}*/

export function build_gender_option( textContent, value, className ) {

	let ret = document.createElement('option');
	ret.className = className;
	ret.value = value;
	ret.textContent = textContent;

	return ret;
}