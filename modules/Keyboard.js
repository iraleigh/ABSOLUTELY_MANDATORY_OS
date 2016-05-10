Processes.listOfDevices['keyboard'] = {
    main: function (input) {
        var nameOfProcess;
        var process;
        var hasAccess = false;
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
            CLI.lastCommand = nameOfProcess;
            process = Processes.findProcessByName(nameOfProcess);

            //console.log(CurrentUserSingleton.getInstance().getUserName());

            console.log("BEFORE");
            //console.log(process.execAccess[0]);
            //process.execAccess.forEach(function(element, index, array)
            //{
            //    console.log("In foreach");
            //    console.log(element);
            //    console.log(element.userName);
            //    console.log(CurrentUserSingleton.getInstance().getUserName());
            //    if(element.userName == null || element.userName == undefined || element.userName == CurrentUserSingleton.getInstance().getUserName())
            //    {
            //        if(element != undefined)
            //        {
            //            hasAccess = true;
            //        }
            //    }
            //});
            if(process == undefined)
            {
                return CLI.status.BAD_COMMAND;
            }

            for(var i = 0; i <= process.execAccess.length - 1; i++)
            {
                console.log(process.execAccess[i].getUserName());
                console.log(i);
                console.log(CurrentUserSingleton.getInstance().getUserName());
                if(process.execAccess[i].getUserName() == CurrentUserSingleton.getInstance().getUserName())
                {
                    hasAccess = true;
                }
                if(hasAccess == true)
                {
                    i = 10000000000000000000;
                }
            }
            console.log("AFTER");

            //console.log(hasAccess);
            if(hasAccess == true)
            {
                if (process) {
                    process.args = input;
                    process.state = "Ready";
                    while (Processes.findProcessByName(nameOfProcess).state != "Stop")
                        OS.Scheduler.runNextProcess();
                } else {
                    return CLI.status.BAD_COMMAND;
                }
            }
            else
            {
                OS.display("You do not have access to use this command!");
            }

        }
        OS.outputToConsole();
    }
};