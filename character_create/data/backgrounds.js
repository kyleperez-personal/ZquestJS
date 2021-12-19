class Background {

	#_name;
	#_value;
	
	#_isNoble;

	#_isEnabled;

	constructor(
		career_name,
		career_value,
		noble,
		enabled
	) {
		this.#_name = career_name;
		this.#_value = career_value.toLowerCase();
		
		this.#_isNoble = noble;

		this.#_isEnabled = enabled;

	}

	name() { return this.#_name; }
	value() { return this.#_value; }

	isNoble() { return this.#_isNoble; }

	isEnabled() { return this.#_isEnabled; }

}

let Rural = new Background("Rural", "rural", false, true);
let Urban = new Background("Urban", "urban", false, true);
let Lowborn = new Background("Lowborn", "lowborn", false, true);
let Spiritual = new Background("Spiritual", "spiritual", false, true);
let Militarist = new Background("Militarist", "militarist", false, true);
let Minor_Nobility = new Background("Minor Nobility", "minor nobility", true, true);
let Nobility = new Background("Nobility", "nobility", true, true);
let High_Nobility = new Background("High Nobility", "high nobility", true, true);


export const Backgrounds = [ Rural, Urban, Lowborn, Spiritual, Militarist, Minor_Nobility, Nobility, High_Nobility ];