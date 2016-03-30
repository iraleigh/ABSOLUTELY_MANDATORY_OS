var clear = function (CLI){
    CLI.oldInput = "";
    CLI.currentInput = "AMOS";
};
Processes.listOfProcesses.push(new Process("clear",clear(CLI)));