OS.Scheduler = {
	
    runNextProcess: function () {

        var oNextProcess;
        var readyProcesses;

        readyProcesses = Processes.listOfProcesses.filter(function (process) {
            return process.state == "Ready";
        });


        var readyProcessExists = readyProcesses != undefined && readyProcesses.length > 0;

        if (readyProcessExists) {
            oNextProcess = readyProcesses.reduce(function(oldest_process, current_process){
                return oldest_process.last_access < current_process.last_access ? current_process : oldest_process;
            });
        }



        if (oNextProcess != undefined) {
            oNextProcess.setLastAccess(Date.now());
            oNextProcess.main(oNextProcess.program_counter);

        } else {
            return OS.Scheduler.runDevice();
        }
    },


    runDevice: function () {
        return Processes.listOfDevices['file_io'].main();
    }
}
