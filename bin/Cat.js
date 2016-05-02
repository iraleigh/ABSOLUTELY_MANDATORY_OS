var cat = function (counter) {
    switch (counter) {
        case 0:
          var hasAccess = false;
          var oTargetFile;

          //Hard coded cannot cat multiple files and check at the same time.
          this.var.szFileName = this.args[1];

          //Check to see if the current user has permission to read from the file.
          directories.Files.forEach(function(file, index, array)
          {
              if(file.name == this.var.szFileName)
              {
                  oTargetFile = file;
              }
          });

          oTargetFile.accessGroup.forEach(function(userObject,index,array)
          {
              if(currentUserSingleton.getInstance().getUserName() == userObject.getUserName())
              {
                  hasAccess = true;
              }
          });

          //Written this way to try to maintain logic of the cat process.
          //If the current user does not have permission to read from the file, error out.
          if(hasAccess != true)
          {
              OS.display("You do not have permission to read from " + oTargetFile.accessName());
              this.state = "Stop";
              this.program_counter = 0;
          }
          else
          {
              var args = this.args;
              this.var.returnedFile = null;
              OS.FS.open(args[0]);
              if (args[0] == null) {
                  OS.display("No file specified");
                  this.state = "Stop";
                  this.program_counter = 0;
                  break;
              }
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
HelpInfo.listOfHelp.push(new Manual("cat", "cat [file_name]", "Displays the contents of a file."));
