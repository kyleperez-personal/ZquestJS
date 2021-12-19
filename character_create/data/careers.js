class Career {

	#_name;
	#_value;
	#_is_enabled;

	#_is_military;
	#_is_doctor;

	constructor(
		career_name,
		career_value,
		enabled,
		military,
		doctor
	) {
		this.#_name = career_name;
		this.#_value = career_value.toLowerCase();
		this.#_is_enabled = enabled;

		this.#_is_military = military;
		this.#_is_doctor = doctor;

	}

	name() { return this.#_name; }
	value() { return this.#_value; }
	is_enabled() { return this.#_is_enabled; }

	is_military() { return this.#_is_military; }
	is_doctor() { return this.#_is_doctor; }

}

// Working class
let Farmer = new Career("Farmer", "farmer", true, false, false);
let Laborer = new Career("Laborer", "laborer", true, false, false);
let Factory_Worker = new Career("Factory Worker", "factory worker", true, false, false);
let Driver = new Career("Driver", "driver", true, false, false);
// Academic
let Student = new Career("Career", "career", true, false, false);
let Professor = new Career("Professor", "professor", true, false, false);
// Professional
let Doctor = new Career("Doctor", "doctor", true, false, true);
let Engineer = new Career("Engineer", "engineer", true, false, false);
let Archaeologist = new Career("Archaeologist", "archaeologist", true, false, false);
let Anthropologist = new Career("Anthropologist", "anthropologist", true, false, false);
let Historian = new Career("Historian", "historian", true, false, false);
let Linguist = new Career("Linguist", "linguist", true, false, false);
let Merchant = new Career("Merchant", "merchant", true, false, false);
// Military/Law Enforcement
// Might not be valid for certain nationalities, etc
let Police = new Career("Police", "police", true, false, false);
let Sailor = new Career("Sailor", "sailor", true, true, false);
let Airman = new Career("Airman", "airman", true, true, false);
let Infantry = new Career("Infantry", "infantry", true, true, false);
let Cavalry = new Career("Cavalry", "cavalry", true, true, false);
let Ordinance = new Career("Ordinance", "ordinance", true, true, false);
let Medic = new Career("Medic", "medic", true, true, false); // Medic is not considered a doctor
let Sniper = new Career("Sniper", "sniper", true, true, false);
let Officer = new Career("Officer", "officer", true, true, false);
let Military_Doctor = new Career("Military Doctor", "military doctor", true, true, true); // Military doctor considered military
let Covert_Operations = new Career("Covert Operations", "covert operations", true, false, false); // Covert operations not considered military

export const Careers = [ Farmer, Laborer, Factory_Worker, Driver, Student, Professor, Doctor, Engineer, Archaeologist, Anthropologist, Historian, Linguist, Merchant, Police, Sailor, Airman, Infantry, Cavalry, Ordinance, Medic, Sniper, Officer, Military_Doctor, Covert_Operations ];