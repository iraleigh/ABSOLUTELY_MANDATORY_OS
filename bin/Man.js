var man = function (counter) {
    switch (counter) {
        case 0:
            var args = this.args;
            //No args, show help
            if (args[0] == null) {
                var pathProcesses = HelpInfo.getPathManuals();
                var output;
                OS.display("To learn more about a specific process, type \"man [process-name]\"");
                for (man_i = 0; man_i < pathProcesses.length; man_i++) {
                    output = pathProcesses[man_i];
                    output += "\t";
                    output += HelpInfo.getManual(pathProcesses[man_i]);
                    OS.display(output);
                }
            } else
                OS.display(HelpInfo.getManual(args[0]));
            this.program_counter++;
            break;

        default:
            this.state = "Stop";
            this.program_counter = 0;
    }
}
Processes.listOfProcesses.push(new Process("man", man));
Processes.listOfProcesses.push(new Process("help", man));
var manHelp = "Man man";
HelpInfo.listOfHelp.push(new Manual("man", manHelp, true));
HelpInfo.listOfHelp.push(new Manual("help", manHelp, true));