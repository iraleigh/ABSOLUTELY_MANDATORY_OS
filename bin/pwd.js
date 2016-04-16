var pwd = function(counter){
    if(OS.FS.getPwd() == Directory.Files)
      OS.display("/");
    else
      OS.display(OS.FS.getPwd().accessName());
    this.state = "Stop";
    this.program_counter = 0;
}
Processes.listOfProcesses.push(new Process("pwd",pwd));
