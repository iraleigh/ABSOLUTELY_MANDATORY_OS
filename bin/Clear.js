var clear = function (){
    OS.clearScreen();
};
Processes.listOfProcesses.push(new Process("clear",clear()));