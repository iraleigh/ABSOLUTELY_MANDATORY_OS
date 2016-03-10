function start() {
  var everyProcessStopped = false;

  while (!everyProcessStopped) {
    everyProcessStopped = Processes.listOfProcesses.every(function(element){
      if (element.state == "Stop") {
        return true;
      } else {
        return false;
      }
    });

    OS.Scheduler.runNextProcess();
    
    everyProcessStopped = Processes.listOfProcesses.every(function(element){
      if (element.state == "Stop") {
        return true;
      } else {
        return false;
      }
    });
  }
}