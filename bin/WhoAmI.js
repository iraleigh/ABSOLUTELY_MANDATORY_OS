var whoami = function (counter) {
	OS.display(CurrentUserSingleton.getInstance().getUserName());
	this.state = "Stop";
}

Processes.listOfProcesses.push(new Process("whoami", whoami));
HelpInfo.listOfHelp.push(new Manual("whoami", "whoami", "Displays the current user."));
