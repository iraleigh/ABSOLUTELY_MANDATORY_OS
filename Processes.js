var Processes = {
  generateListOfProcesses: function(){
    Processes.listOfProcesses.forEach(function(element,index,array){
      element.main.displayName = element.name;
    });
  },
  findProcessByName: function(szProcessName){
    var oProcess;
    Processes.listOfProcesses.forEach(function(element,index,array){
      if(element.name == szProcessName){
        oProcess = element;
      }
    });
    return oProcess;
  },

  listOfProcesses: [],
  listOfDevices: []
}
