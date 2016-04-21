var echo = function (counter) {
    switch (counter) {
        case 0:
            var args = this.args;
            var szOutput = "";
            while (args.length > 0)
                szOutput += args.shift() + " ";
            OS.display(szOutput);
            this.program_counter++;
            break;

        default:
            this.state = "Stop";
            this.program_counter = 0;
    }
}
Processes.listOfProcesses.push(new Process("echo", echo));
HelpInfo.listOfHelp.push(new Manual("echo", "echo [word_1], ... ,[word_n]", "Outputs a sentence that you type. Good when piped with save command.\nExample: 'echo Hello World! | save Hi'\nPoor man's nano."));