class Race {

	#_name;
	#_value;
	#_is_enabled;

	constructor( race_name, enabled ) {
		this.#_name = race_name;
		this.#_value = race_name.toLowerCase();
		this.#_is_enabled = enabled;
	}

	name() { return this.#_name; }
	value() { return this.#_value; }
	is_enabled() { return this.#_is_enabled; }

}

// Highlander races
let Foyerian = new Race("Foyerian", true);
let Vitalian = new Race("Vitalian", true);
let Orieni_Highlander = new Race("Orieni Highlander", true);

// Convent Aurorans + Aurorans
let Convent_Auroran = new Race("Convent Auroran", true);
let Auroran = new Race("Auroran", false);

// Imperials + Subjects
let Imperial = new Race("Imperial", true);
let Kathaic = new Race("Kathaic", true);
let Thurop = new Race("Thurop", true);
let Cstphene = new Race("Cstphene", true);
let Entranan = new Race("Entranan", true);
let Fetan = new Race("Fetan", true);
let Ralois = new Race("Ralois", true);
let Hanoir = new Race("Hanoir", true);
let Nerhest = new Race("Nerhest", true);
let Aryan = new Race("Aryan", true);
let Tiblan = new Race("Tiblan", true);
let Sophene = new Race("Sophene", true);
let Algus = new Race("Algus", true);
let Dessan = new Race("Dessan", true);
let Rihden = new Race("Rihden", true);
let Inden = new Race("Inden", true);
let Sinias = new Race("Sinias", true);
let Mokven = new Race("Mokven", true);
let Vanois = new Race("Vanois", true);

// Just all of the races
export const Races = [Foyerian, Vitalian, Orieni_Highlander, Convent_Auroran, Auroran, Imperial, Kathaic, Thurop, Cstphene, Entranan, Fetan, Ralois, Hanoir, Nerhest, Aryan, Tiblan, Sophene, Algus, Dessan, Rihden, Inden, Sinias, Mokven, Vanois];