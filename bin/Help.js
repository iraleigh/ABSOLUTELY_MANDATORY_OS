var help = function (counter) {
    switch (counter) {
        case 0:
            OS.display("Here are some useful commands for operating AMOS:");
            OS.display("A complete list of processes can be found in the bin folder. Type 'cd bin', then 'ls'")
            OS.display("To learn more about any particular command, type 'man [command_name]' <i>(ie 'man help')</i>");
            //I'm going to put all the commands in an array so they can be sorted.
            //Maybe I can pull the names from the Applications folder later
            var commands = [];
            commands.push("ls");
            commands.push("cat");
            commands.push("man");
            commands.push("cd");
            commands.push("clear");
            commands.push("cp");
            commands.push("rm");
            commands.push("exit");
            commands.push("echo");
            commands.push("mkdir");
            
            commands.sort();
            for (help_i = 0 ; help_i < commands.length; help_i++)
                OS.display("<b>" + commands[help_i] + "</b>");
            this.program_counter++;
            break;

        default:
            this.state = "Stop";
            this.program_counter = 0;
    }
}
Processes.listOfProcesses.push(new Process("help", help));
HelpInfo.listOfHelp.push(new Manual("help", "help", "Displays a brief rundowns of helpful commands for using AMOS."));