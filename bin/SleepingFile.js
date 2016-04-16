/**
 * Created by Matt on 4/11/2016.
 */

var SleepingFile = function(counter)
{
    switch(counter)
    {
        case 0:
            console.log("SleepingFile: case 0");
            if(this.var.semaphore.accessSynchNum() == 0)
            {
                OS.FS.create("SleepDumbFile", "Dumb content");
                this.program_counter--;
                //Do not continue
                break;
            }
            else
            {
                OS.semaphores.wait(this.var.semaphore);
                OS.FS.create("SleepDumbFile", "Dumb content");
                this.var.semaphore.SemaphoreToString();
            }
            break;

        case 1:
            console.log("SleepingFile: case 1");
            this.var.SleepfilePointer = OS.FS.open("SleepDumbFile");
            break;

        case 2:
            console.log("SleepingFile: case 2");

            OS.FS.close("SleepDumbFile");
            OS.semaphores.signal(this.var.semaphore);
            this.var.semaphore.SemaphoreToString();
            break;

        default:
            this.state = "Stop";
            this.program_counter = 0;
    }

};

Processes.listOfProcesses.push(new Process("SleepingFile",SleepingFile));