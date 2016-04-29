var help = function (counter) {
    switch (counter) {
        case 0:
            OS.display("<b><i>Absolutely Mandatory Operating System</b></i>");
            OS.display("<i>Created by Miles Bainbridge, Alex Brown, Alvin Lu, Iain Raleigh, Harry Soe, and Matt Wishoff</i>\n");
            OS.display("Here are some useful commands for operating AMOS:");
            OS.display("To learn more about any particular command, type 'man [command_name]' <i>(ie 'man help')</i>");
            //I'm going to put all the commands in an array so they can be sorted.
            //Maybe I can pull the names from the Applications folder later
            var commands = [];
            commands.push("ls");
            commands.push("cat");
            commands.push("man");
            commands.push("clear");
            commands.push("touch");
            commands.push("cp");
            commands.push("rm");
            commands.push("exit");
            commands.push("grep");
            commands.push("sort");
            commands.push("save");
            
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