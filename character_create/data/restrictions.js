// Creates restrictions on character selection
//
// We put these as functions in a file instead of inlining them
// so they can be updated more easily
//
// IE: if you want to mod the game, you can change these (and their function names)
// instead of having to pour over the entire character_creator.js code
export function is_convent_and_in_unallowed_order( race, order_choice ) {

	// IE: if Convent Auroran and not in Aurora/Enteie holy order,
	// then you're in an unallowed order!
	return race == "convent auroran" && !( order_choice == "aurora" || order_choice == "enteie" );

}

export function is_convent_and_in_allowed_order( race, order_choice ) {

	return race == "convent auroran" && (order_choice == "aurora" || order_choice == "enteie");

}

export function is_convent( race ) {

	return race == "convent auroran";

}


export function military_careers_allowed(gender, nationality, in_holy_order) {

	// IE: males of any nationality can have any career
	// Women not from the Empire can have any career
	// Male and females in holy orders can have any career
	return gender == "male" || nationality != "empire" || in_holy_order == "yes";

}


// IE: nobles exist only in the empire (excepting Kathay)
export function nobility_allowed(nationality, region) {

	return nationality == "empire" && region != "kathay";

}