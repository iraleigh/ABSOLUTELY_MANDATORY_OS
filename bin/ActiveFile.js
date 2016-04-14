/**
 * Created by Matt on 4/11/2016.
 */

//Semaphore and mutex commands to the OS need to increment PC manually until it is added.

var ActiveFile = function(counter)
{
    switch(counter)
    {
        //OS.FS.create is used here to make sure the scheduler switches between processes.
        //I don't think a new process is being created with the Processes.listOfProcesses.push(new Process("SleepingFile", SleepingFile));

        case 0:
            //Hackish way of creating a new process inside of another process.
            this.var.newProcess =  new Process("SleepingFile", SleepingFile);
            this.var.newProcess.state = "Ready";

            Processes.listOfProcesses.push(this.var.newProcess);

            console.log("Initialize semaphore");
            this.var.semaphore = new Semaphore(1);

            this.var.newProcess.var.semaphore = this.var.semaphore;

            this.var.semaphore.SemaphoreToString();

            OS.semaphores.wait(this.var.semaphore);
            this.var.semaphore.SemaphoreToString();
            OS.FS.create("dumbFile0", "Dumb content0");
            //this.program_counter++;
            break;

        case 1:
            console.log("ActiveFile: case 1");
            var CriticalSection = 0;
            //Just a for loop to simulate a critical section of code.
            for(var i = 0; i <= 5000; i++)
            {
                CriticalSection++
            }
            console.log(CriticalSection);

            OS.FS.create("dumbFile1", "Dumb content1");
            //this.program_counter++;
            break;

        case 2:
            console.log("ActiveFile: case 2");
            OS.semaphores.signal(this.var.semaphore); //The sleeping file should now activate and start getting in the mix.
            console.log("Semaphore signals . . .");

            OS.FS.create("dumbFile2", "Dumb content2");
            //this.program_counter++;
            break;

        default:
            this.state = "Stop";
            this.program_counter = 0;
    }

};

Processes.listOfProcesses.push(new Process("ActiveFile",ActiveFile));