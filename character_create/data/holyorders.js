class HolyOrder {

	#_name;
	#_value;

	// Probably won't need in a holy order if there aren't
	// Convent Aurorans, but still, keep here!
	#_ExilesConvents;

	#_isEnabled;

	constructor(
		holyorder_name,
		holyorder_value,
		convent,
		enabled
	) {
		this.#_name = holyorder_name;
		this.#_value = holyorder_value.toLowerCase();
	
		this.#_ExilesConvents = convent;
		
		this.#_isEnabled = enabled;
	}

	name() { return this.#_name; }
	value() { return this.#_value; }

	ConventsAllowed() { return this.#_ExilesConvents; }

	isEnabled() { return this.#_isEnabled; }

}

let HO_Foyer = new HolyOrder("The Holy Order of the Commander of Weapons", "foyer", false, true);
let HO_Eternity = new HolyOrder("The Holy Order of the Eternal Lady of Weapons", "eternity", false, true);
let HO_Aurora = new HolyOrder("The Holy Order of the Queen of the Ice", "aurora", true, true);
let HO_Vility = new HolyOrder("The Holy Order of the Golden Warrior", "vility", false, true);
let HO_Zerixa = new HolyOrder("The Holy Order of the Aspect of Fire", "zerixa", true);
let HO_Farar = new HolyOrder("The Holy Order of the Aspect of Fire", "farar", false, true);
let HO_Anylsa = new HolyOrder("The Disciples of Discipline", "anylsa", false, true);
let HO_Enteie = new HolyOrder("The Holy Order of the Fair Essence", "enteie", true, true);


export const HolyOrders = [ HO_Foyer, HO_Eternity, HO_Aurora, HO_Vility, HO_Zerixa, HO_Farar, HO_Anylsa, HO_Enteie ];