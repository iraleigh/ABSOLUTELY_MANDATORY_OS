/**
 * Created by Matt on 4/9/2016.
 */

var MutexTest = function(counter){
    switch(counter)
    {
        case 0:
            OS.FS.create("testFile", "This is the content of a test file.");

            this.var.test = new mutex("testFile");
            this.var.test.MutexToString();
            break;

        case 1:
            console.log(this.var.test);
            OS.mutexLock.acquire(this.var.test);
            break;

        default:
            this.state = "Stop";
            this.program_counter = 0;
    }
};

Processes.listOfProcesses.push(new Process("MutexTest",MutexTest));


