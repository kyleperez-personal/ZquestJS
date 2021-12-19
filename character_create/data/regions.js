class Region {

	#_name;
	#_value;

	constructor( region_name, region_value ) {
		this.#_name = region_name;
		this.#_value = region_name.toLowerCase();
	}

	name() { return this.#_name; }
	value() { return this.#_value; }

}

// Highlander provinces
let Foyer = new Region("Foyer", "foyer");
let Vility = new Region("Vility", "vility");
let Zarata = new Region("Zarata", "zarata");

// Highlander governorates
let Narena = new Region("Narena", "narena");
let Centa = new Region("Centa", "centa");
let Betiera = new Region("Betiera", "betiera");
let Pallon = new Region("Pallon", "pallon");
let Ostorn = new Region("Ostorn", "ostorn");
let Lifus = new Region("Lifus", "lifus");
let Sonal = new Region("Sonal", "sonal");
let Deseret = new Region("Deseret", "deseret");
let Anglia = new Region("Anglia", "anglia");
let Halfon = new Region("Halfon", "halfon");

// Special Highlander division
let EFT = new Region("Era Free Trade", "eft");

// Imperial provinces
let Imperia = new Region("Imperia", "imperia");
let Valle = new Region("Valle", "valle");
let Petral = new Region("Petral", "petral");
let Aurora_Nova = new Region("Aurora Nova", "aurora nova");
let Coulon = new Region("Coulon", "coulon");
let Enrenan = new Region("Enrenan", "enrenan");
let Hiten = new Region("Hiten", "hiten");

// Autonomous Imperial areas
let Kathay = new Region("Kathay", "kathay");
let Thurop = new Region("Thurop", "thurop");

// Imperial Governorates
let Entrana = new Region("Entrana", "entrana");
let Ralaer = new Region("Ralaer", "ralaer");
let Hanor = new Region("Hanor", "hanor");
let Fetedal = new Region("Fetedal", "fetedal");
let Nerhast = new Region("Nerhast", "nerhast");
let Cstphon = new Region("Cstphon", "cstphon");
let Arya = new Region("Arya", "arya");
let Tiblus = new Region("Tiblus", "tiblus");
let Sophos = new Region("Sophos", "sophos");
let Alges = new Region("Alges", "alges");
let Anoch = new Region("Anoch", "anoch");
let Edessa = new Region("Edessa", "edessa");
let Rihde = new Region("Rihde", "rihde");
let Inden = new Region("Inden", "inden");
let Siniasus = new Region("Siniasus", "siniasus");
let Mokvon = new Region("Mokvon", "mokvon");
let Vanas = new Region("Vanas", "vanas");

export const HighlanderRegions = [Foyer, Vility, Zarata, Narena, Centa, Betiera, Pallon, Ostorn, Lifus, Sonal, Deseret, Anglia, Halfon, EFT];
export const ImperialRegions = [Imperia, Valle, Petral, Aurora_Nova, Coulon, Enrenan, Hiten, Kathay, Thurop, Entrana, Ralaer, Hanor, Fetedal, Nerhast, Cstphon, Arya, Tiblus, Sophos, Alges, Anoch, Edessa, Rihde, Inden, Siniasus, Mokvon, Vanas];