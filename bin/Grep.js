var grep = function (counter) {
    switch (counter) {
        case 0:
            var args = this.args;
            this.program_counter++;
            var grepWork = CLI.STDIn;

            grepWork = grepWork.split('\n');
  
            for (i = 0; i < grepWork.length; i++) {
                if (grepWork[i].includes(args[0]))
                    OS.display(grepWork[i]);
            }
            this.program_counter++;
        default:
                    this.state = "Stop";
            this.program_counter = 0;
    }
}
Processes.listOfProcesses.push(new Process("grep", grep));