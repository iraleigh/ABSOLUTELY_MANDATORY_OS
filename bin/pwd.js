var pwd = function(counter){
    if(OS.FS.getPwd() == Directory.Files)
      OS.display("/");
    else
      OS.display("/" + OS.FS.getPwdText());
    this.state = "Stop";
    this.program_counter = 0;
}
Processes.listOfProcesses.push(new Process("pwd",pwd));
HelpInfo.listOfHelp.push(new Manual("pwd", "pwd", "Displays the current working directory."));