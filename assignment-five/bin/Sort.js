var sort = function (counter) {
    switch (counter) {
        case 0:
            //var args = this.args;
            this.program_counter++;
            var sortWork = CLI.getSTDIn();
            if (sortWork == "") {
                OS.display("STDIn is empty. Try piping.");
                this.state = "Stop";
                this.program_counter = 0;
                break;
            }
            sortWork = sortWork.split('\n');
            sortWork.sort();
            for (i = 0; i < sortWork.length; i++)
                OS.display(sortWork[i]);

            this.program_counter++;
        default:
            this.state = "Stop";
            this.program_counter = 0;
    }
}
Processes.listOfProcesses.push(new Process("sort", sort));
HelpInfo.listOfHelp.push(new Manual("sort", "[previous_command] | sort", "Piping command: Sorts the output of the previous command in descending order."));