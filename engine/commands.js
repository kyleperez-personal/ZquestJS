import * as Engine from './engine.js';
import * as output from './format/output_format.js';

const Infostream = document.getElementById('infostream');
const Storystream = document.getElementById('storystream');

// Functions for running commands
export function ClearStorystream() {
	Storystream.innerHTML = ""; // Reset the inner html
	Engine.GUI.BackupStoryData(); // Save the array just in case
	Engine.GUI.ResetStoryData();; // Reset the story data
	//StoryInputBox.value = ""; // Clear the input box
}

export function ClearInfostream() {
	Infostream.innerHTML = "";
	Engine.GUI.BackupInfoData();
	Engine.GUI.ResetInfoData();
		//InfoInputBox.value = "";
}


export function StorystreamHelp() {
	Engine.GUI.PushToStorystack( output.notice("Help:") );
	Engine.GUI.PushToStorystack( output.info("-clear") );
	Engine.GUI.PushToStorystack( output.stream("\tClear the story window of all text.") );
	Engine.GUI.PushToStorystack( output.info("-help") );
	Engine.GUI.PushToStorystack( output.stream("\tSee all the help commands.") );
	Engine.GUI.PushToStorystack( output.info("-recover") );
	Engine.GUI.PushToStorystack( output.stream("\tRecover the story window's text from the last clear.") );

	Engine.GUI.WriteStorystream();

}
	
export function InfostreamHelp() {
	Engine.GUI.PushToInfostack( output.notice("Help:") );
	Engine.GUI.PushToInfostack( output.info("-clear") );
	Engine.GUI.PushToInfostack( output.stream("\tClear the information window of all text.") );
	Engine.GUI.PushToInfostack( output.info("-help") );
	Engine.GUI.PushToInfostack( output.stream("\tSee all the help commands availible to the info window.") );
	Engine.GUI.PushToInfostack( output.info("-recover") );
	Engine.GUI.PushToInfostack( output.stream("\tRecover the info window's text from the last clear.") );

	Engine.GUI.WriteInfostream();
	}


export function RecoverStorystream() {
	Engine.GUI.ReadStoryBackup();
	Engine.GUI.WriteStorystream(); // Then rewrite the storystream
	}
export function RecoverInfostream() {
	Engine.GUI.ReadInfoBackup();
	Engine.GUI.WriteInfostream();
	}