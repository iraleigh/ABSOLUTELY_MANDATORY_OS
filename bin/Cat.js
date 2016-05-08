var cat = function (counter) {
    switch (counter) {
        case 0:
          var hasAccess = false;
          var oTargetFile;
          if (this.args[0] == null) {
              OS.display("No file specified");
              this.state = "Stop";
              this.program_counter = 0;
              break;
          }
          //Hard coded cannot cat multiple files and check at the same time.
          var szFileName = this.args[0];
            console.log(this.args[0]);

          //Check to see if the current user has permission to read from the file.
            //Reading like this does not give files deeper in directories. Just the top directory.
          //Directory.Files.reduce(flatten_directories, Directory.Files[0]);
          //Directory.Files.reduce(flatten_directories, Directory.Files[0]);

          Directory.Files.forEach(function(file, index, array)
          {
              //console.log(file);
              if(file instanceof Dir)
              {
                  file.content.forEach(function(element, index, array)
                  {
                     if(element.name == szFileName)
                     {
                         oTargetFile = element;
                     }
                  });
              }
              if(file.name == szFileName)
              {
                  oTargetFile = file;
              }
          });

              try {
                  oTargetFile.accessName();
              } catch (e) {
                  OS.display("File not found");
                  this.state = "Stop";
                  this.program_counter = 0;
                  break;
              }

          if (oTargetFile.fileType == "Directory") {
              OS.display("Cannot display the contents of a directory");
              this.state = "Stop";
              this.program_counter = 0;
              break;
          }
            console.log(oTargetFile);
            var currentUser = CurrentUserSingleton.getInstance();
            console.log(currentUser);
          oTargetFile.accessGroup.forEach(function(userObject,index,array)
          {
              if(currentUser.userName == userObject.userName)
              {
                  hasAccess = true;
              }
          });

          //Written this way to try to maintain logic of the cat process.
          //If the current user does not have permission to read from the file, error out.
          if (hasAccess == false)
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

              //OS.FS.open(szFileName);
          }
          break;

        case 1:
            this.var.filePointer = this.var.returnedFile;
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
