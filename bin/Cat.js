var cat = function (counter) {
    switch (counter) {
        case 0:
            var args = this.args;
            OS.FS.open(args[0]);
            break;

        case 1:
            this.var.filePointer = this.var.returnedFile;
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
            break;
    }
}
Processes.listOfProcesses.push(new Process("cat", cat));