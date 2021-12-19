class Region {

	#_name;
	#_value;

	#_is_enabled;

	constructor(
		region_name,
		region_value,
		enabled
	) {
		this.#_name = region_name;
		this.#_value = region_value.toLowerCase();
		this.#_is_enabled = enabled;
	}

	name() { return this.#_name; }
	value() { return this.#_value; }
	is_enabled() { return this.#_is_enabled; }

}

// Highlander provinces
let Foyer = new Region("Foyer", "foyer", true);
let Vility = new Region("Vility", "vility", true);
let Zarata = new Region("Zarata", "zarata", true);

// Highlander governorates
let Narena = new Region("Narena", "narena", true);
let Centa = new Region("Centa", "centa", true);
let Betiera = new Region("Betiera", "betiera", true);
let Pallon = new Region("Pallon", "pallon", true);
let Ostorn = new Region("Ostorn", "ostorn", true);
let Lifus = new Region("Lifus", "lifus", true);
let Sonal = new Region("Sonal", "sonal", true);
let Deseret = new Region("Deseret", "deseret", true);
let Anglia = new Region("Anglia", "anglia", true);
let Halfon = new Region("Halfon", "halfon", true);

// Special Highlander division
let EFT = new Region("Era Free Trade", "eft", true);
let SpiritArchipelago = new Region("Spirit Archipelago", "spirit archipelago", false);

// Imperial provinces
let Imperia = new Region("Imperia", "imperia", true);
let Valle = new Region("Valle", "valle", true);
let Petral = new Region("Petral", "petral", true);
let Aurora_Nova = new Region("Aurora Nova", "aurora nova", true);
let Coulon = new Region("Coulon", "coulon", true);
let Enrenan = new Region("Enrenan", "enrenan", true);
let Hiten = new Region("Hiten", "hiten", true);

// Autonomous Imperial areas
let Kathay = new Region("Kathay", "kathay", true);
let Thurop = new Region("Thurop", "thurop", true);

// Imperial Governorates
let Entrana = new Region("Entrana", "entrana", true);
let Ralaer = new Region("Ralaer", "ralaer", true);
let Hanor = new Region("Hanor", "hanor", true);
let Fetedal = new Region("Fetedal", "fetedal", true);
let Nerhast = new Region("Nerhast", "nerhast", true);
let Cstphon = new Region("Cstphon", "cstphon", true);
let Arya = new Region("Arya", "arya", true);
let Tiblus = new Region("Tiblus", "tiblus", true);
let Sophos = new Region("Sophos", "sophos", true);
let Alges = new Region("Alges", "alges", true);
let Anoch = new Region("Anoch", "anoch", true);
let Edessa = new Region("Edessa", "edessa", true);
let Rihde = new Region("Rihde", "rihde", true);
let Inden = new Region("Inden", "inden", true);
let Siniasus = new Region("Siniasus", "siniasus", true);
let Mokvon = new Region("Mokvon", "mokvon", true);
let Vanas = new Region("Vanas", "vanas", true);

// Auroran dummy regions
let dummy = new Region("Dummy", "dummy", true);

export const HighlanderRegions = [Foyer, Vility, Zarata, Narena, Centa, Betiera, Pallon, Ostorn, Lifus, Sonal, Deseret, Anglia, Halfon, EFT, SpiritArchipelago];
export const ImperialRegions = [Imperia, Valle, Petral, Aurora_Nova, Coulon, Enrenan, Hiten, Kathay, Thurop, Entrana, Ralaer, Hanor, Fetedal, Nerhast, Cstphon, Arya, Tiblus, Sophos, Alges, Anoch, Edessa, Rihde, Inden, Siniasus, Mokvon, Vanas];
export const AuroranRegions = [dummy];