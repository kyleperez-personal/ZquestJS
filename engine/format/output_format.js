
export function stream( line ) {
	return "<p style=\"color:white\";>" + line + "</p>";
}

export function picked( line ) {
	return "<p style=\"color:grey\";>" + line + "</p>";
}

export function question( line ) {
	return "<p style=\"color:lightblue\";>" + line + "</p>";
}

export function notice( line ) {
	return "<p style=\"color:red\";>" + line + "</p>";
}

export function info( line ) {
	return "<p style=\"color:blue\";>" + line + "</p>";
}

// Maybe try 'this.notice' 
export function try_again() {
	return notice("Try again.");
}
