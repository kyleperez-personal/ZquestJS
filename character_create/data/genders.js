class Gender {

	#_name;
	#_value;

	constructor( gender_name ) {
		this.#_name = gender_name;
		this.#_value = gender_name.toLowerCase();
	}

	name() { return this.#_name; }
	value() { return this.#_value; }

}

let Male = new Gender("Male");
let Female = new Gender("Female");

export const Genders = [Male, Female];