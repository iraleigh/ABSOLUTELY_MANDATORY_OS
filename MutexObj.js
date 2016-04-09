/**
 * Created by Matt on 4/9/2016.
 */

function mutex() {
    this.available = true;
    //Include file name that is locked/unlocked?

    this.accessAvailable = function(){
        return this.available;
    };

    /*
    *   the setAvailable method is for the OS ONLY!
    *   If you use it in your code a fiery hell
    *   will rain down upon you!
    */
    this.setAvailable = function(available){
        this.available = available;
    };

    this.MutexToString = function(){
        console.log("Available == " + this.available + "\n");
    };
}

//A mutex is passed to the OS functions, acquire, release.
//A semaphore is passed ot the OS functions, wait, signal.


