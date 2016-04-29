/**
 * Created by Matt on 4/9/2016.
 */

function Semaphore(S) {
    this.synch_num = S;

    this.accessSynchNum = function(){
        return this.synch_num;
    };

    /*
     *   the setSynchNum method is for the OS ONLY!
     *   If you use it in your code a fiery hell
     *   will rain down upon you!
     */

    this.setSynchNum = function(synch_num){
        this.synch_num = synch_num;
    };

    this.SemaphoreToString = function(){
        console.log("Synchronization number == " + this.synch_num + "\n");
    };
}

//A semaphore is passed ot the OS functions, wait, signal.