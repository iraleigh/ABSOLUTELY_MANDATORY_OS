var man = function (counter) {
    switch (counter) {
        case 0:
            var args = this.args;
            //No args, show help
            if (args[0] == null) {
                var pathProcesses = HelpInfo.getPathManuals();
                for (man_i = 0; man_i < pathProcesses.length; man_i++) {
                    OS.display(pathProcesses[man_i]);
                    OS.display(HelpInfo.getManual(pathProcesses[man_i]));
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
HelpInfo.listOfHelp.push(new Manual("man", "Man man", true));