/**
 * Created by Matt on 4/9/2016.
 */

var arrayOfSema = [];
var arrayOfWaitingSema = [];

function semaphore(file_name) {
    this.available = true;
    this.file_name = file_name;

    //if the same method names is weird we can change them a little.
    this.accessFileName = function() {
        return this.file_name;
    };

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

    this.SemaphoreToString = function(){
        console.log("Available == " + this.available + "\n");
        console.log("File associated with Semaphore == " + this.file_name + "\n");
    };
}

//A semaphore is passed ot the OS functions, wait, signal.