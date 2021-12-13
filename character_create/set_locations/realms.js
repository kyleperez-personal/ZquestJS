import * as Regions from './regions.js';

class Realm {

	#_name;
	#_value;
	#_regions;

	constructor( long_name, identifier, const_regions ) {
		this.#_name = long_name;
		this.#_value = identifier.toLowerCase();
		this.#_regions = const_regions;
	}

	name() { return this.#_name; }
	value() { return this.#_value; }
	regions() { return this.#_regions; }

}

let Highlands = new Realm("The Highlands", "highlands", Regions.HighlanderRegions);
let Empire = new Realm("The Empire of the Eternal Warlord", "empire", Regions.ImperialRegions);


export const Realms = [Highlands, Empire];