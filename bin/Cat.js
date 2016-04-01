var cat = function (counter) {
    switch (counter) {
        case 0:
            var args = this.args;
            this.var.returnedFile = null;
            OS.FS.open(args[0]);
            if (args[0] == null) {
                CLI.currentInput += "<br />No file specified."
                this.state = "Stop";
                this.program_counter = 0;
                break;
            }
            break;

        case 1:
            this.var.filePointer = this.var.returnedFile;
            try {
                this.var.filePointer.accessName();
            } catch (e) {
                CLI.currentInput += "<br />File not found."
                this.state = "Stop";
                this.program_counter = 0;
                break;
            }
            this.var.filePointer.position = 0;
            OS.FS.length(this.var.filePointer);
            break;
        case 2:
            this.var.content = "";

            OS.FS.position(this.var.filePointer);
            break;
        case 3:

            OS.FS.read(this.var.filePointer);
            break;

        case 4:
            this.var.content += this.var.returnedFromRead;
            OS.FS.position(this.var.filePointer);
            break;

        case 5:
            if (this.var.position < this.var.length) {
                this.program_counter = 3;
                break;
            } else {
                this.program_counter++;
            }
            break;
        case 6:
            OS.FS.close(this.var.filePointer.accessName());
            break;

        case 7:
            CLI.currentInput += "<br />";
            CLI.currentInput += this.var.content;
            this.program_counter++;
            break;

        default:
            this.state = "Stop";
            this.program_counter = 0;
    }
}
Processes.listOfProcesses.push(new Process("cat", cat));