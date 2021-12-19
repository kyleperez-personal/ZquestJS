class Career {

	#_name;
	#_value;

	constructor( career_name, career_value ) {
		this.#_name = career_name;
		this.#_value = career_value.toLowerCase();
	}

	name() { return this.#_name; }
	value() { return this.#_value; }

}

// Working class
let Farmer = new Career("Farmer", "farmer");
let Laborer = new Career("Laborer", "laborer");
let Factory_Worker = new Career("Factory Worker", "factory worker");
let Driver = new Career("Driver", "driver");
// Academic
let Student = new Career("Career", "career");
let Professor = new Career("Professor", "professor");
// Professional
let Doctor = new Career("Doctor", "doctor");
let Engineer = new Career("Engineer", "engineer");
let Archaeologist = new Career("Archaeologist", "archaeologist");
let Anthropologist = new Career("Anthropologist", "anthropologist");
let Historian = new Career("Historian", "historian");
let Linguist = new Career("Linguist", "linguist");
let Merchant = new Career("Merchant", "merchant");
// Military/Law Enforcement
// Might not be valid for certain nationalities, etc
let Police = new Career("Police", "police");
let Sailor = new Career("Sailor", "sailor");
let Airman = new Career("Airman", "airman");
let Infantry = new Career("Infantry", "infantry");
let Cavalry = new Career("Cavalry", "cavalry");
let Ordinance = new Career("Ordinance", "ordinance");
let Medic = new Career("Medic", "medic");
let Sniper = new Career("Sniper", "sniper");
let Officer = new Career("Officer", "officer");
let Military_Doctor = new Career("Military Doctor", "military doctor");
let Covert_Operations = new Career("Covert Operations", "covert operations");

export const Careers = [ Farmer, Laborer, Factory_Worker, Driver, Student, Professor, Doctor, Engineer, Archaeologist, Anthropologist, Historian, Linguist, Merchant, Police, Sailor, Airman, Infantry, Cavalry, Ordinance, Medic, Sniper, Officer, Military_Doctor, Covert_Operations ];