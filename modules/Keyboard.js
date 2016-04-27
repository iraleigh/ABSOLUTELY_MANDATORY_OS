Processes.listOfDevices['keyboard'] = {
    main: function (input) {
        var nameOfProcess;
        var process;
        pipes = input.split('|');
        for (var pipe_iterator = 0; pipe_iterator < pipes.length; pipe_iterator++) {
            CLI.STDIn = CLI.STDOut;
            CLI.STDOut = "";
            input = pipes[pipe_iterator].trim();
            input = input.split(" ");
            //Eliminate empty arguments from spaces
            for (var space_iterator = 0; space_iterator < input.length; space_iterator++)
                if (input[space_iterator] == "") {
                    input.splice(space_iterator, 1);
                    space_iterator--;
                }
            nameOfProcess = input.shift();
            process = Processes.findProcessByName(nameOfProcess);
            if (process) {
                process.args = input;
                process.state = "Ready";
                while (Processes.findProcessByName(nameOfProcess).state != "Stop")
                    OS.Scheduler.runNextProcess();
            } else {
                return CLI.status.BAD_COMMAND;
            }
        }
        OS.outputToConsole();
    }
};