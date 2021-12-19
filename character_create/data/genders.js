class Gender {

	#_name;
	#_value;
	
	#_isEnabled;

	constructor( gender_name, enabled ) {
		this.#_name = gender_name;
		this.#_value = gender_name.toLowerCase();

		this.#_isEnabled = enabled;
	}

	name() { return this.#_name; }
	value() { return this.#_value; }
	
	isEnabled() { return this.#_isEnabled; }

}

let Male = new Gender("Male", true);
let Female = new Gender("Female", true);

export const Genders = [Male, Female];