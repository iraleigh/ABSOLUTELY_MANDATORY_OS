var exit = function (counter) {
    switch (counter) {
        case 0:
            window.close();
            this.program_counter++;

        default:
            OS.display("Attempt to close browser window failed");
            this.state = "Stop";
            this.program_counter = 0;
    }
}
Processes.listOfProcesses.push(new Process("exit", exit));