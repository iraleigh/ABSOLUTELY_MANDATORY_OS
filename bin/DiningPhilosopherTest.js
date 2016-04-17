/**
 * Created by alvinlu on 4/16/16.
 */
/**
 * Created by alvinlu on 4/11/16.
 */
var diningPhilosopher = function(counter) {

    this.var.sema = new Semaphore(2); // number of threads allowed to be run associated to the amount of philosophers divided by 2 trunchated
    var forkVar = 5; // number of forks associated with the amount of philosophers
    console.log(forkVar + " is the amount of forks it starts with");
    var oneVar = 0;
    var twoVar = 0;
    var threeVar = 0;
    var fourVar = 0;
    var fiveVar = 0;

    this.newThread('one', function(counter){
        switch(counter){
            case 0:
                if(this.var.sema.accessSynchNum() != 0) {
                    OS.semaphores.wait(this.var.sema); //wait
                    oneVar = 2;
                    forkVar = forkVar - 2;
                }

                if(this.var.sema.accessSynchNum() == 0){
                    this.program_counter++;
                }
                break;

            case 1:
                if(oneVar == 2) { // checks itself if it has 2 forks, so it can release it
                    OS.semaphores.signal(this.var.sema); //signal
                    oneVar = 0;
                    forkVar = forkVar + 2;
                    if(forkVar == 5){
                        this.program_counter--;
                    }
                }else{
                    console.log("Philosopher 1 Wait");
                }
                break;
            default:
                this.state = 'Stop';
                break;
        }
    });
    this.newThread('two', function(counter){
        switch(counter){
            case 0:
                if(this.var.sema.accessSynchNum() != 0) {
                    OS.semaphores.wait(this.var.sema); //wait
                    twoVar = 2;
                    forkVar = forkVar - 2;
                }

                if(this.var.sema.accessSynchNum() == 0){
                    this.program_counter++;
                }
                break;

            case 1:
                if(twoVar == 2) { // checks itself if it has 2 forks, so it can release it
                    OS.semaphores.signal(this.var.sema); //signal
                    twoVar = 0;
                    forkVar = forkVar + 2;
                    if(forkVar == 5){
                        this.program_counter--;
                    }
                }else{
                    console.log("Philosopher 2 Wait");
                }
                break;
            default:
                this.state = 'Stop';
                break;
        }
    });
    this.newThread('three', function(counter){
        switch(counter){
            case 0:
                if(this.var.sema.accessSynchNum() != 0) {
                    OS.semaphores.wait(this.var.sema); //wait
                    threeVar = 2;
                    forkVar = forkVar - 2;
                }

                if(this.var.sema.accessSynchNum() == 0){
                    this.program_counter++;
                }
                break;

            case 1:
                if(threeVar == 2) { // checks itself if it has 2 forks, so it can release it
                    OS.semaphores.signal(this.var.sema); //signal
                    threeVar = 0;
                    forkVar = forkVar + 2;
                    if(forkVar == 5){
                        this.program_counter--;
                    }
                }else{
                    console.log("Philosopher 3 Wait");
                }
                break;
            default:
                this.state = 'Stop';
                break;
        }
    });
    this.newThread('four', function(counter){
        switch(counter){
            case 0:
                if(this.var.sema.accessSynchNum() != 0) {
                    OS.semaphores.wait(this.var.sema); //wait
                    fourVar = 2;
                    forkVar = forkVar - 2;
                }

                if(this.var.sema.accessSynchNum() == 0){
                    this.program_counter++;
                }
                break;

            case 1:
                if(fourVar == 2) { // checks itself if it has 2 forks, so it can release it
                    OS.semaphores.signal(this.var.sema); //signal
                    fourVar = 0;
                    forkVar = forkVar + 2;
                    if(forkVar == 5){
                        this.program_counter--;
                    }
                }else{
                    console.log("Philosopher 4 Wait");
                }
                break;
            default:
                this.state = 'Stop';
                break;
        }
    });
    this.newThread('five', function(counter){
        switch(counter){
            case 0:
                if(this.var.sema.accessSynchNum() != 0) {
                    OS.semaphores.wait(this.var.sema); //wait
                    fiveVar = 2;
                    forkVar = forkVar - 2;
                }

                if(this.var.sema.accessSynchNum() == 0){
                    this.program_counter++;
                }
                break;

            case 1:
                if(fiveVar == 2) { // checks itself if it has 2 forks, so it can release it
                    OS.semaphores.signal(this.var.sema); //signal
                    fiveVar = 0;
                    forkVar = forkVar + 2;
                    if(forkVar == 5){
                        this.program_counter--;
                    }
                }else{
                    console.log("Philosopher 5 Wait");
                }
                break;
            default:
                this.state = 'Stop';
                break;
        }
    });
    

    //create a while loop of 60 seconds for the process to run in
    setTimeout(function () {
        Processes.findProcessByName("DineTest: thread one").state = 'Stop'; //stops the thread
        Processes.findProcessByName("DineTest: thread two").state = 'Stop';
        Processes.findProcessByName("DineTest: thread three").state = 'Stop';
        Processes.findProcessByName("DineTest: thread four").state = 'Stop';
        Processes.findProcessByName("DineTest: thread five").state = 'Stop';
        this.state = 'Stop';
    },600); // 60000ms = 1 minute

    this.threads['one'].run();
    this.threads['two'].run();
    this.threads['three'].run();
    this.threads['four'].run();
    this.threads['five'].run();

    this.state = 'Pause';

}
Processes.listOfProcesses.push(new Process('DineTest', diningPhilosopher));