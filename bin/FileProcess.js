var fileProcess = function (counter) {
	var fileName = this.args[0].split("/").pop();

	if (Processes.findProcessByName(fileName)) {
		OS.display("<b>"+fileName + "</b> can be executed by " + 
				Processes.findProcessByName(fileName).execAccess.map(function(user) {
					return user.getUserName();
				}).join(", ")
			);
	} else {
		OS.display("<b>"+fileName + "</b> is not executable")
	}
	this.state = "Stop";
}

Processes.listOfProcesses.push(new Process("file", fileProcess));
HelpInfo.listOfHelp.push(new Manual("file", "file [file name]", "Tells whether a file is executable and who can execute it."));
