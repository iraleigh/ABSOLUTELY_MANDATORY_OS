var man = function (counter) {
    switch (counter) {
        case 0:
            var args = this.args;
            //No args, error out
            if (args[0] == null)
                OS.display("No process specified");
            else {
                if (HelpInfo.getManual(args[0]))
                    OS.display("<b>Usage:\t<i>" + CurrentManual.usage + "</i></b>\n" + CurrentManual.manual);
                else
                    OS.display("Manual not found");
            }

            this.program_counter++;
            break;

        default:
            this.state = "Stop";
            this.program_counter = 0;
    }
}
Processes.listOfProcesses.push(new Process("man", man));
HelpInfo.listOfHelp.push(new Manual("man", "man [process_name]","Displays the manual for a given process."));