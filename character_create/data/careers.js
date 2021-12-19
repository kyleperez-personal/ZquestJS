class Career {

	#_name;
	#_value;

	#_isMilitary;
	#_isDoctor;

	#_isEnabled;

	constructor(
		career_name,
		career_value,
		military,
		doctor,
		enabled
	) {
		this.#_name = career_name;
		this.#_value = career_value.toLowerCase();
		
		this.#_isMilitary = military;
		this.#_isDoctor = doctor;

		this.#_isEnabled = enabled;

	}

	name() { return this.#_name; }
	value() { return this.#_value; }
	
	isMilitary() { return this.#_isMilitary; }
	isDoctor() { return this.#_isDoctor; }

	isEnabled() { return this.#_isEnabled; }

}

// Working class
let Farmer = new Career("Farmer", "farmer", false, false, true);
let Laborer = new Career("Laborer", "laborer", false, false, true);
let Factory_Worker = new Career("Factory Worker", "factory worker", false, false, true);
let Driver = new Career("Driver", "driver", false, false, true);
// Academic
let Student = new Career("Career", "career", false, false, true);
let Professor = new Career("Professor", "professor", false, false, true);
// Professional
let Doctor = new Career("Doctor", "doctor", false, true, true);
let Engineer = new Career("Engineer", "engineer", false, false, true);
let Archaeologist = new Career("Archaeologist", "archaeologist", false, false, true);
let Anthropologist = new Career("Anthropologist", "anthropologist", false, false, true);
let Historian = new Career("Historian", "historian", false, false, true);
let Linguist = new Career("Linguist", "linguist", false, false, true);
let Merchant = new Career("Merchant", "merchant", false, false, true);
// Military/Law Enforcement
// Might not be valid for certain nationalities, etc
let Police = new Career("Police", "police", false, false, true);
let Sailor = new Career("Sailor", "sailor", true, false, true);
let Airman = new Career("Airman", "airman", true, false, true);
let Infantry = new Career("Infantry", "infantry", true, false, true);
let Cavalry = new Career("Cavalry", "cavalry", true, false, true);
let Ordinance = new Career("Ordinance", "ordinance", true, false, true);
let Medic = new Career("Medic", "medic", true, false, true); // Medic is not considered a doctor
let Sniper = new Career("Sniper", "sniper", true, false, true);
let Officer = new Career("Officer", "officer", true, false, true);
let Military_Doctor = new Career("Military Doctor", "military doctor", true, true, true); // Military doctor considered military
let Covert_Operations = new Career("Covert Operations", "covert operations", false, false, true); // Covert operations not considered military

export const Careers = [ Farmer, Laborer, Factory_Worker, Driver, Student, Professor, Doctor, Engineer, Archaeologist, Anthropologist, Historian, Linguist, Merchant, Police, Sailor, Airman, Infantry, Cavalry, Ordinance, Medic, Sniper, Officer, Military_Doctor, Covert_Operations ];