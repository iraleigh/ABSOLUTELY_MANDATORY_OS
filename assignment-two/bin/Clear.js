var clear = function (){
    OS.clearScreen();
    this.state = "Stop";
};
Processes.listOfProcesses.push(new Process("clear", clear));
Processes.listOfProcesses.push(new Process("cls", clear));