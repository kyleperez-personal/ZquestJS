class Gender {

	#_name;
	#_value;
	#_is_enabled;

	constructor( gender_name, enabled ) {
		this.#_name = gender_name;
		this.#_value = gender_name.toLowerCase();
		this.#_is_enabled = enabled;
	}

	name() { return this.#_name; }
	value() { return this.#_value; }
	is_enabled() { return this.#_is_enabled; }

}

let Male = new Gender("Male", true);
let Female = new Gender("Female", true);

export const Genders = [Male, Female];