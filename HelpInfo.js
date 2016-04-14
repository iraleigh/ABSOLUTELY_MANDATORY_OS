var HelpInfo = {
    //generateListOfProcesses: function () {
    //    Processes.listOfProcesses.forEach(function (element, index, array) {
    //        element.main.displayName = element.name;
    //    });
    //},
    //findProcessByName: function (szProcessName) {
    //    var oProcess;
    //    Processes.listOfProcesses.forEach(function (element, index, array) {
    //        if (element.name == szProcessName) {
    //            oProcess = element;
    //        }
    //    });
    //    return oProcess;
    //},
    getManual: function (processName) {
        //for (var getManualIterator = 0; getManualIterator < this.listOfHelp.length; getManualIterator++) {
        //    if (this.listOfHelp[getManualIterator].name == processName)
        //        return this.listOfHelp[getManualIterator].helpText;
        //}
        return "No manual found";
    },
    listOfHelp: []
}

function Manual(name, helpText, systemCommand) { // (string, string, bool)
    this.name = name;
    this.helpText = helpText;
    this.systemCommand = systemCommand;
}

//function Process(name, main) {
//    this.name = name;
//    this.state = "Stop";
//    this.program_counter = 0;
//    this.var = {};
//    this.main = main;
//    this.threads = [];
//    this.main.displayName = this.name;

//    this.newThread = function (name, callback) {
//        this.threads[name] = new Thread(this.name, name, this.var, callback);
//    };
//}

//function Struct(name, value) {
//    this.name = name;
//    this.value = value;
//}

//arr[0] = new Struct("name1", "value1");

//Processes.listOfProcesses.push(new Process("cat", cat));