/**
 * Created by Matt on 4/11/2016.
 */

var SleepingFile = function(counter)
{
    switch(counter)
    {
        case 0:
            console.log("EXECTUING SLEEPING FILE****************************");

            OS.FS.create("SleepDumbFile", "Dumb content");
            break;

        default:
            this.state = "Stop";
            this.program_counter = 0;
    }

};

Processes.listOfProcesses.push(new Process("SleepingFile",SleepingFile));