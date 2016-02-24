var container;
window.onload = function(){
  start = function() {
    container = window.document.getElementById('container');
    container.innerHTML = "Starting OS...";
    Processes.generateListOfProcesses();

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
  start();
}
