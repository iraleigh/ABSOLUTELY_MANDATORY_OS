var grep = function (counter) {
    switch (counter) {
        case 0:
            var args = this.args;
            this.program_counter++;
            var grepWork = CLI.getSTDIn();
            if (grepWork == "") {
                OS.display("STDIn is empty. Try piping.");
                this.state = "Stop";
                this.program_counter = 0;
                break;
            }
            grepWork = grepWork.split('\n');

            for (i = 0; i < grepWork.length; i++) {
                for (j = 0; j < args.length; j++) {
                    if (grepWork[i].includes(args[j]))
                        OS.display(grepWork[i]);
                }
            }
            this.program_counter++;
        default:
            this.state = "Stop";
            this.program_counter = 0;
    }
}
Processes.listOfProcesses.push(new Process("grep", grep));