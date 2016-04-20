var ls = function(counter){
    Directory.Files.forEach(function(file,index,fileArray){
        OS.display(file.accessName());
    });
    this.state = "Stop";
    this.program_counter = 0;
}
Processes.listOfProcesses.push(new Process("ls", ls));
HelpInfo.listOfHelp.push(new Manual("ls", "ls", "Displays the files in the current directory."));