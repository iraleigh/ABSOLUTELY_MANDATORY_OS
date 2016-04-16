var cat = function (counter) {
    switch (counter) {
        case 0:
            var args = this.args;
            this.var.returnedFile = null;

            //parse file path
            szPathString = this.args[0].trim();
            aryParsedPath = szPathString.split("/");
            process.var.returnedFile = undefined;
            var oTargetFile;

            if(aryParsedPath.length > 1){
              for (var n = 0; n < aryParsedPath.length; n++ ){
                oTargetFile = aryParsedPath[n];
                for(var dir of Directory.Files){
                  if(dir.isName(oTargetFile)) {
                    oTargetFile = dir;
                    console.log(dir);
                    //return file;
                  }
                }
              }
            }

            OS.FS.open(oTargetFile);
            if (args[0] == null) {
                OS.display("No file specified");
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
                OS.display("File not found");
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
            OS.display(this.var.content);
            this.program_counter++;
            break;

        default:
            this.state = "Stop";
            this.program_counter = 0;
    }
}
Processes.listOfProcesses.push(new Process("cat", cat));
