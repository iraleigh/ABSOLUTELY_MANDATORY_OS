var ls = function(counter){
    Directory.Files.forEach(function(file,index,fileArray){
        Processes.listOfDevices['display'].main(file.accessName() + "<br >");
    });
    this.state = "Stop";
}
Processes.listOfProcesses.push(new Process("ls",ls));