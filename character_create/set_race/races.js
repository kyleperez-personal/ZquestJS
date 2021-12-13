class Race {

	#_name;
	#_value;

	constructor( race_name ) {
		this.#_name = race_name;
		this.#_value = race_name.toLowerCase();
	}

	name() { return this.#_name; }
	value() { return this.#_value; }

}

// Highlander races
let Foyerian = new Race("Foyerian");
let Vitalian = new Race("Vitalian");
let Orieni_Highlander = new Race("Orieni Highlander");

// Convent Aurorans
let Convent_Auroran = new Race("Convent Auroran");

// Imperials + Subjects
let Imperial = new Race("Imperial");
let Kathaic = new Race("Kathaic");
let Thurop = new Race("Thurop");
let Cstphene = new Race("Cstphene");
let Entranan = new Race("Entranan");
let Fetan = new Race("Fetan");
let Ralois = new Race("Ralois");
let Hanoir = new Race("Hanoir");
let Nerhest = new Race("Nerhest");
let Aryan = new Race("Aryan");
let Tiblan = new Race("Tiblan");
let Sophene = new Race("Sophene");
let Algus = new Race("Algus");
let Dessan = new Race("Dessan");
let Rihden = new Race("Rihden");
let Inden = new Race("Inden");
let Sinias = new Race("Sinias");
let Mokven = new Race("Mokven");
let Vanois = new Race("Vanois");

// Just all of the races
export const Races = [Foyerian, Vitalian, Orieni_Highlander, Convent_Auroran, Imperial, Kathaic, Thurop, Cstphene, Entranan, Fetan, Ralois, Hanoir, Nerhest, Aryan, Tiblan, Sophene, Algus, Dessan, Rihden, Inden, Sinias, Mokven, Vanois];