/**
 * Created by Matt on 3/28/2016.
 */
var Touch = function(counter){

    var arg = this.args;
    var doesntExist;

    console.log(arg);
    console.log(OS.FS.open(arg));

    switch(counter)
    {
        case 0:
            if(OS.FS.open(arg) == undefined)
            {
                doesntExist = true;
            }
            else
            {
                doesntExist = false;
            }
            break;

        case 1:
            if(doesntExist == true)
            {
                OS.FS.create(CLI.currentInput, arg); //CLI.currentInput is the file name after that touch command.
                console.log(arg + " File created");
            }
            else
            {
                arg.setDate(new Date());
                console.log("Updated date for file " + arg);
            }
            break;

        case 2:
            if(doesntExist == false)
            {
                OS.FS.close(arg);
            }
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