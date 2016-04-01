/**
 * Created by Matt on 3/28/2016.
 */
var Touch = function(counter){

    switch(counter)
    {
        case 0:
            this.var.fileName = this.args;

            if(OS.FS.open(this.fileName) == undefined)
            {
                this.var.doesntExist = true;
                //console.log("doesntExist == TRUE~~~~~~~~~~~~~")
            }
            else
            {
                this.var.doesntExist = false;
                //console.log("doesntExist == FALSE~~~~~~~~~~~~~")
            }
            break;

        case 1:

            if(this.var.doesntExist == true)
            {
                OS.FS.create(this.var.fileName, ""); //CLI.currentInput is the file name after that touch command.
                console.log(this.var.fileName + " has been created");
            }
            else
            {
                this.var.fileName.setDate(new Date());
                console.log("Updated date for file - " + this.var.fileName);
            }
            break;

        case 2:
                OS.FS.close(this.var.fileName);
            break;

        default:
            this.state = "Stop";
    }

    //http://www.linfo.org/touch.html
    //Syntax: touch file_name
    //I.E: touch Matt's_File

    //if file exists update the date.
    //if file does not exist create a new file with that name.

    //Creates new empty files
    //updates time stamps of the most recent access and modification.
};

Processes.listOfProcesses.push(new Process("Touch",Touch));