/**
 * Created by Matt on 4/9/2016.
 */

var MutexTest = function(counter){
    switch(counter)
    {
        case 0:
            OS.FS.create("testFile", "This is the content of a test file.");
            break;

        case 1:
            OS.FS.create("testFile2", "This is the content of a test file.");
            break;

        case 2:
            OS.FS.create("testFile3", "This is the content of a test file.");

            this.var.test = new Mutex("testFile");
            this.var.test2 = new Mutex("testFile2");
            this.var.test3 = new Mutex("testFile3");
            //console.log("****************************");
            this.var.test.MutexToString();
            this.var.test2.MutexToString();
            this.var.test3.MutexToString();
            //console.log("****************************");

            //break;

        //case 1:
        //    console.log(this.var.test);
        //    console.log("****************************");
            OS.mutexLock.acquire(this.var.test);
            OS.mutexLock.acquire(this.var.test2);
            OS.mutexLock.acquire(this.var.test3);
            //console.log("****************************");

            OS.mutexLock.release(this.var.test);
            OS.mutexLock.release(this.var.test2);
            OS.mutexLock.release(this.var.test3);


            break;

        default:
            this.state = "Stop";
            this.program_counter = 0;
    }
};

Processes.listOfProcesses.push(new Process("MutexTest",MutexTest));


