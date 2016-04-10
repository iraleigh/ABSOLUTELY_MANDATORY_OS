/**
 * Created by Matt on 4/9/2016.
 */

var SemaphoreTest = function(counter) {
    switch(counter)
    {
        case 0:
            console.log("=====Testing=====");
            //when you create the threads, you add it to the array
            //array should shift when you pop
            this.var.semaTest = new Semaphore(3);
            this.var.semaTest.SemaphoreToString();

            OS.semaphores.wait(this.var.semaTest);
            this.var.semaTest.SemaphoreToString();
            this.program_counter++;
            break;

        case 1:
            OS.semaphores.signal(this.var.semaTest);
            this.var.semaTest.SemaphoreToString();
            this.program_counter++;
            break;

        default:
            this.state = "Stop";
            this.program_counter = 0;

        // Temporary Test, what it should be is that the wait() is in the threads itself
    }
};

Processes.listOfProcesses.push(new Process("SemaTest",SemaphoreTest));
