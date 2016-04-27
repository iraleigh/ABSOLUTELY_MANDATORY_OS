var save = function (counter) {
    switch (counter) {
        case 0:
            var args = this.args;
            this.program_counter++;
            var saveWork = CLI.getSTDIn();
            if (saveWork == "") {
                OS.display("STDIn is empty. Try piping.");
                this.state = "Stop";
                this.program_counter = 0;
                break;
            }
            if (args[0] == "") {
                OS.display("No output name specified")
                this.state = "Stop";
                this.program_counter = 0;
                break;
            }
            alreadyExists = false;
            Directory.Files.forEach(function (file, index, fileArray) {
                if (args[0] == file.accessName()) {
                    alreadyExists = true;
                }
            });
            if (alreadyExists == true) {
                OS.display("File already exists");
                this.state = "Stop";
                this.program_counter = 0;
                break;
            }
            Directory.Files.push(new File(args[0], saveWork));
            OS.display("Saved to " + args[0]);

            this.program_counter++;
        default:
            this.state = "Stop";
            this.program_counter = 0;
    }
}
Processes.listOfProcesses.push(new Process("save", save));
HelpInfo.listOfHelp.push(new Manual("save", "[previous_command] | save [file_destination]", "Piping command: Saves the output of the previous command to the given file destination."));