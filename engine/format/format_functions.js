export function fixformat( strIn ) {
		
	// First, capitalize the first character
	//let str = strIn[0].toUpperCase();
	let str = strIn.charAt(0).toUpperCase();

	// Save the length
	let len = strIn.length;

	// Then, for every other element:
	for ( let i = 1; i < len; ++i ) {

		// If the letter is between A and Z; do this:
		if ( strIn[i] >= 'A' && strIn[i] <= 'Z' ) {

			// If the entry before is a space, do some stuff
			if (strIn[i-1] == ' ') {
				// If the next characters form "OF" or "Of"
				if ( strIn.substring(i,3) == "Of " || strIn.substring(i,3) == "OF " ) {
					str += strIn[i].toLowerCase();
					i += 1;
					str += strIn[i].toLowerCase();
					i += 1;
				}
				else if (
					strIn.substring(i,4) == "The "
					|| strIn.substring(i,4) == "THe "
					|| strIn.substring(i,4) == "ThE "
					|| strIn.substring(i,4) == "THE "
				) {
					str += strIn[i].toLowerCase();
					i += 1;
					str += strIn[i].toLowerCase();
					i += 1;
					str += strIn[i].toLowerCase();
					i += 1;
				}//end if
				// Otherwise, do nothing
			}
			// Otherwise, just make it lowercase
			else str += strIn[i].toLowerCase();
			//end if

		}
		// If the letter is between the lowercase alphabet
		else if ( strIn[i] >= 'a' && strIn[i] <= 'z' ) {

			// If the character before is a space:
			// Do some capitalization if necessary
			if (strIn[i-1] == ' ') {
				// If it's one of these 'of' things, do almost nothing
				if ( strIn.substring(i,3) == "of " || strIn.substring(i,3) == "oF " ) {
					str += 'o' + strIn[i+1].toLowerCase();
					i += 2;
				}
				// Or if it's a variation of 'the ', fix format
				else if (
					strIn.substring(i,4) == "the "
					|| strIn.substring(i,4) == "tHe "
					|| strIn.substring(i,4) == "thE "
					|| strIn.substring(i,4) == "tHE "
				) {
					i += 1;
					str += strIn[i].toLowerCase();
					i += 1;
					str += strIn[i].toLowerCase();
					i += 1;
				}
				// Otherwise, capitalize it
				else str += strIn[i].toUpperCase();
				//end if
			}//end if
			// Otherwise, do nothing

		}//end if
		// If strIn[i] is anything else, do nothing

	}//end for

	return str;


}//end fixformat




// Does almost the same thing as fixformat(), but does a few
// different things
export function lowerfixformat( strIn ) {

	let str = strIn[0].toLowerCase();

	let len = strIn.length;

	// For every other character
	for ( let i = 1; i < len; ++i ) {

		// If the character is between A an Z
		if ( strIn[i] >= 'A' && strIn[i] <= 'Z' ) {

			// If the previous character is a space
			if ( strIn[i-1] == ' ' ) {
				// If the substring is related to 'of ':
				if ( strIn.substring(i,3) == "Of " || strIn.substring(i,3) == "OF " ) str += strIn[i].toLowerCase();
				// If the substring is a variant of 'the '
				else if (
					strIn.substring(i,4) == "The "
					|| strIn.substring(i,4) == "THe "
					|| strIn.substring(i,4) == "ThE "
					|| strIn.substring(i,4) == "THE "
				) {
					str += strIn[i].toLowerCase();
				}//end if
				// Otherwise, do nothing
			}
			// If not a space, make it lowercase
			else str += strIn[i].toLowerCase();
			//end if

		}
		// Or if it's between a and z
		else if ( strIn[i] >= 'a' && strIn[i] <= 'z' ) {

			// If the previous character is a space
			if ( strIn[i-1] == ' ' ) {
				// If the substring is not related to 'of ' or 'the '
				// then capitalize it
				if (
					!(strIn.substring(i,3) == "of "
					|| strIn.substring(i,3) == "oF "
					|| strIn.substring(i,4) == "the "
					|| strIn.substring(i,4) == "tHe "
					|| strIn.substring(i,4) == "thE "
					|| strIn.substring(i,4) == "tHE ")
				) {
					str += strIn[i].toUpperCase();
				}//end if
				// Otherwise, do nothing
			}//end if
			// Otherwise, do nothing
	
		}//end if
		// Otherwise, do nothing

	}//end for

	return str;


}//end lowerfixformat


