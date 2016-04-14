var man = function (counter) {
    switch (counter) {
        case 0:
            var args = this.args;
            OS.display("test");
            program_counter++;
            break;

        default:
            this.state = "Stop";
            this.program_counter = 0;
    }
}
Processes.listOfProcesses.push(new Process("man", man));
HelpInfo.listOfHelp.push(new Manual("man", "Man man", true));