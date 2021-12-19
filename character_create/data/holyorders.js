class HolyOrder {

	#_name;
	#_value;

	constructor( holyorder_name, holyorder_value ) {
		this.#_name = holyorder_name;
		this.#_value = holyorder_value.toLowerCase();
	}

	name() { return this.#_name; }
	value() { return this.#_value; }

}

let HO_Foyer = new HolyOrder("The Holy Order of the Commander of Weapons", "foyer");
let HO_Eternity = new HolyOrder("The Holy Order of the Eternal Lady of Weapons", "eternity");
let HO_Aurora = new HolyOrder("The Holy Order of the Queen of the Ice", "aurora");
let HO_Vility = new HolyOrder("The Holy Order of the Golden Warrior", "vility");
let HO_Zerixa = new HolyOrder("The Holy Order of the Aspect of Fire", "zerixa");
let HO_Farar = new HolyOrder("The Holy Order of the Aspect of Fire", "farar");
let HO_Anylsa = new HolyOrder("The Disciples of Discipline", "anylsa");
let HO_Enteie = new HolyOrder("The Holy Order of the Fair Essence", "enteie");


export const HolyOrders = [ HO_Foyer, HO_Eternity, HO_Aurora, HO_Vility, HO_Zerixa, HO_Farar, HO_Anylsa, HO_Enteie ];