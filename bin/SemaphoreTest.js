/**
 * Created by Matt on 4/9/2016.
 */

var SemaphoreTest = function(counter) {
    switch(counter)
    {
        case 0:
            OS.FS.create("testFile", "This is the contents of a test file.");
            break;
        default:
            this.state = "stop";
            this.program_counter = 0;
    }
};

Processes.listOfProcesses.push(new Process("SemaTest",SemaphoreTest));
