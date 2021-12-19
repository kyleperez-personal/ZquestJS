// JS file that allows quick creation of HTML elements

// Create an 'option' element
export function createOption( textContent, value, className ) {

	let ret = document.createElement('option');
	ret.className = className;
	ret.value = value;
	ret.textContent = textContent;

	return ret;

}


// Create a 'label' element
export function createLabel( textContent, htmlFor, className ) {

	let ret = document.createElement('label');
	ret.className = className;
	ret.htmlFor = htmlFor
	ret.textContent = textContent;

	return ret;

}


// Create an 'input' element of type 'text'
export function createTextInput( name, className ) {

	let ret = document.createElement('input');
	ret.className = className;
	ret.name = name;
	ret.type = "text";
	ret.spellcheck = "false";

	return ret;

}

// Create an 'input' element of type 'number' with mins and maxes accepted
//	min and max are numbers (not strings)
export function createNumberInput( name, className, min = 0, max = 100 ) {

	let ret = document.createElement('input');
	ret.className = className;
	ret.name = name;
	ret.type = "number";
	ret.min = min.toString();
	ret.max = max.toString();

	return ret;

}

// Create just a simple line of text
export function createLine( textContent, className, name ) {

	let ret = document.createElement('div');
	ret.className = className;
	ret.name = name;
	ret.textContent = textContent;

	return ret;

}

// Selectively append an html element to another element
// Done if element is listed as enabled plus constraint is satisfied
export function conditionalCreateOption( element, parent_element, style, constraint = true ) {
	if ( element.is_enabled() && constraint ) parent_element.appendChild( createOption(element.name(), element.value(), style) );
}