Processes.listOfDevices['keyboard'] = {
    name: "Keyboard",
    state: "Ready",
    main: function (input) {
        var nameOfProcess;
        var process;
        pipes = input.split('|');
        console.log(pipes);
        for (i = 0; i < pipes.length; i++) {
            input = pipes[i].trim();
            input = input.split(" ");
            nameOfProcess = input.shift();
            process = Processes.findProcessByName(nameOfProcess);
            console.log(nameOfProcess);
            console.log(input);
            if (process) {
                process.args = input;
                process.state = "Ready";
                while (Processes.findProcessByName(nameOfProcess).state != "Stop")
                    OS.Scheduler.runNextProcess();
                //} else if(nameOfProcess == ""){
                //  OS.Scheduler.runNextProcess();
            } else {
                return CLI.status.BAD_COMMAND;
            }
        }
    }
}