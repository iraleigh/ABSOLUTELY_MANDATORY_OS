/**
 * Created by Matt on 5/1/2016.
 */
//Ex: Write filename Hi this is a test of the write command.

var Write = function(counter)
{
    switch(counter)
    {
        case 0:
            this.var.args = this.args;
            this.var.szFileName = this.var.args[0];
            var hasAccess = false;
            var oTargetFile;

            //stop everything if the user does not have read/write access rights to the file.
            //oTargetFile may not be initialized
            directories.Files.forEach(function(file, index, array)
            {
                if(file.name == this.var.szFileName)
                {
                    oTargetFile = file;
                }
            });

            oTargetFile.accessGroup.forEach(function(userObject, index, array)
            {
                if(currentUserSingleton.getInstance().getUserName() == userObject.getUserName())
                {
                    hasAccess = true;
                }
            });

            //If the current user does not have access to the file stop the process. And error out.
            if(hasAccess != true)
            {
                OS.display("You do not have permission to write to " + file.accessName());
                this.state = "Stop";
                this.program_counter = 0;
            }
            else
            {
                //Possibly may need a slash in the file name? Not sure exactly what is in the initial arg.
                OS.FS.open(this.var.szFileName);
            }

            break;

        case 1:
            this.var.oFilePointer = this.returnedFile;
            this.var.fileLength = OS.FS.length(oFilePointer);
            break;

        case 2:
            //Find the end of the file.
            OS.FS.seek(this.var.oFilePointer, this.var.fileLength);
            break;

        case 3:

            this.var.szNewContent = "";

            //Append a string var until it has all of the content.
            for(var i = 1; i <= (this.var.args.length - 1); i++)
            {
                //add the new content to one string.
                this.var.szNewContent = this.var.szNewContent + " " +this.var.args[i];
            }

            //Write that string to the end of the file.
            OS.FS.write(this.var.oFilePointer, this.var.szNewContent);
            break;

        case 4:
            //Possibly may need a slash in the file name? Not sure exactly what is in the initial arg.
            OS.FS.close(this.var.szFileName);
            break;

        default:
            this.state = "Stop";
            this.program_counter = 0;
    }
};

Processes.listOfProcesses.push(new Process("Write",Write));
