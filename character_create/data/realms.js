import * as Regions from './regions.js';

class Realm {

	#_name;
	#_value;
	#_regions;

	#_is_enabled;

	constructor(
		long_name,
		identifier,
		const_regions,
		enabled
	) {
		this.#_name = long_name;
		this.#_value = identifier.toLowerCase();
		this.#_regions = const_regions;
		this.#_is_enabled = enabled;
	}

	name() { return this.#_name; }
	value() { return this.#_value; }
	regions() { return this.#_regions; }
	is_enabled() { return this.#_is_enabled; }

}

let Highlands = new Realm("The Highlands", "highlands", Regions.HighlanderRegions, true);
let Empire = new Realm("The Empire of the Eternal Warlord", "empire", Regions.ImperialRegions, true);
let Aurora = new Realm("Aurora", "aurora", Regions.AuroranRegions, false);

export const Realms = [Highlands, Empire, Aurora];