/**
 * Created by Matt on 4/9/2016.
 */
var arrayOfMutexes = [];
var arrayOfWaiting = [];

function Mutex(file_name) {
    this.available = true;
    this.file_name = file_name;
    //Include file name that is locked/unlocked?

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

    this.MutexToString = function(){
        console.log("Available == " + this.available + "\n");
        console.log("File associated with mutex == " + this.file_name + "\n");
    };
}

//A mutex is passed to the OS functions, acquire, release.


