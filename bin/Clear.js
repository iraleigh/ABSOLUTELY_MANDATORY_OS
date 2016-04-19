var clear = function (){
    OS.clearScreen();
    this.state = "Stop";
};
Processes.listOfProcesses.push(new Process("clear", clear));
Processes.listOfProcesses.push(new Process("cls", clear));
HelpInfo.listOfHelp.push(new Manual("clear", "clear", "Clears the contents of the screen for a nice clean feeling."));