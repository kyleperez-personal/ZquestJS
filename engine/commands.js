import * as Engine from './engine.js';

const Infostream = document.getElementById('infostream');
const Storystream = document.getElementById('storystream');


// Functions for running commands
export function ClearStorystream() {
	// Just write a lot of newlines to the terminal
	for ( let i = 0; i < 20; ++i ) Engine.GUI.WritetoStorystream("<br>");
}

export function ClearInfostream() {
		for ( let i = 0; i < 20; ++i ) Engine.GUI.WritetoInfostream("<br>");
}


export function HardClearStorystream() {
	// Clear the window
	Storystream.innerHTML = "";
	// Then reset the stored story data
	Engine.GUI.ResetStoryData();
}

export function HardClearInfostream() {
	Infostream.innerHTML = "";
	Engine.GUI.ResetInfoData();
}


export function StorystreamHelp() {
	Engine.GUI.WritetoStorystream( "Help:", "notice" );
	Engine.GUI.WritetoStorystream( "-clear", "info" );
	Engine.GUI.WritetoStorystream( Engine.GUI.Tab() + "Clear the story window of text." );
	Engine.GUI.WritetoStorystream( "-clear hard", "info" );
	Engine.GUI.WritetoStorystream( Engine.GUI.Tab() + "Set the story window's html to be empty. Erased text cannot be recovered." );
	Engine.GUI.WritetoStorystream( "-help", "info" );
	Engine.GUI.WritetoStorystream( Engine.GUI.Tab() + "See all the help commands." );

}
	
export function InfostreamHelp() {
	Engine.GUI.WritetoInfostream( "Help:", "notice" );
	Engine.GUI.WritetoInfostream( "-clear", "info" );
	Engine.GUI.WritetoInfostream( Engine.GUI.Tab() + "Clear the information window of all text." );
	Engine.GUI.WritetoInfostream( "-clear hard", "info" );
	Engine.GUI.WritetoInfostream( Engine.GUI.Tab() + "Set the info window's html to be empty. Erased text cannot be recovered." );
	Engine.GUI.WritetoInfostream( "-help", "info" );
	Engine.GUI.WritetoInfostream( Engine.GUI.Tab() + "See all the help commands availible to the info window." );
}
