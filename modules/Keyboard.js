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
            if (UserFlags.recentSwitch){
                for (var i_access = 0; i_access <= process.execAccess.length - 1; i_access++)
                {
                    console.log(process.execAccess[i_access].getUserName());
                    console.log(i_access);
                    console.log(CurrentUserSingleton.getInstance().getUserName());
                    if (process.execAccess[i_access].getUserName() == CurrentUserSingleton.getInstance().getUserName())
                    {
                        UserFlags.hasAccess = true;
                        UserFlags.recentSwitch = false;
                    }
                }
            }
            console.log("AFTER");
            //console.log(hasAccess);
            if (UserFlags.hasAccess == true || nameOfProcess == "ls" || nameOfProcess == "cat" || nameOfProcess == "Write" || nameOfProcess == "su" || nameOfProcess == "man" || nameOfProcess == "help")
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