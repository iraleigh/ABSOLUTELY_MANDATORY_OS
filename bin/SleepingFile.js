/**
 * Created by Matt on 4/11/2016.
 */

var SleepingFile = function(counter)
{
    switch(counter)
    {
        case 0:
            console.log("EXECTUING SLEEPING FILE****************************");
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
                //this.program_counter++;
            }


            break;

        case 1:
            console.log("SleepingFile: case 1");
            var criticalSection = 0;
            //Simulate critial section of code.
            for(var i = 0; i <= 1000; i++)
            {
                criticalSection++;
            }
            console.log(criticalSection);
            OS.FS.create("SleepDumbFile2", "Dumb content2");
            this.program_counter++;
            break;

        case 2:
            console.log("SleepingFile: case 1");
            OS.semaphores.signal(this.var.semaphore);
            this.var.semaphore.SemaphoreToString();

            OS.FS.create("SleepDumbFile3", "Dumb content3");
            this.program_counter++;
            break;

        default:
            this.state = "Stop";
            this.program_counter = 0;
    }

};

Processes.listOfProcesses.push(new Process("SleepingFile",SleepingFile));