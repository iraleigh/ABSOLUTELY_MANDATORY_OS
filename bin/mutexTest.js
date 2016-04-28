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
            break;
        case 3:
            this.var.test = new Mutex("testFile");
            this.var.test2 = new Mutex("testFile");
            this.var.test3 = new Mutex("testFile3");
            //console.log("****************************");
            this.var.test.MutexToString();
            this.var.test2.MutexToString();
            this.var.test3.MutexToString();
            //console.log("****************************");

            //So this commented out version doesn't work because it gets stuck on case 1, meaning the counter doesn't move towards
            //case 2 and so forth. As you can see, the one below works without the cases work perfecrtly fine. So save me.
            // PS I need help with my process, Dining Philosopher, sorry, you're going to have to bear with me on this one.
            // Alvin
            this.program_counter++;
            
            break;

        case 4:
        //    console.log(this.var.test);
        //    console.log("****************************");
            OS.mutexLock.acquire(this.var.test);
            this.program_counter++;
            break;
        case 5:
            OS.mutexLock.acquire(this.var.test2);
            this.program_counter++;
            break;
        case 6:
            OS.mutexLock.acquire(this.var.test3);
            this.program_counter++;
            break;
        case 7:
            OS.mutexLock.release(this.var.test3);
            this.program_counter++;
            break;
        case 8:
            OS.mutexLock.release(this.var.test);
            this.program_counter++;
            break;
        case 9:
            OS.mutexLock.release(this.var.test2);
        


            // OS.mutexLock.acquire(this.var.test);
            // OS.mutexLock.acquire(this.var.test2);
            // OS.mutexLock.acquire(this.var.test3);

            // arrayOfMutexes[0].MutexToString();
            // arrayOfMutexes[1].MutexToString();
            // OS.mutexLock.release(this.var.test3);
            // arrayOfMutexes[0].MutexToString();
            // OS.mutexLock.release(this.var.test);

            // arrayOfMutexes[0].MutexToString();

            // OS.mutexLock.release(this.var.test2);

            this.program_counter++

            break;

        default:
            this.state = "Stop";
            this.program_counter = 0;
    }
};

Processes.listOfProcesses.push(new Process("MutexTest",MutexTest));


