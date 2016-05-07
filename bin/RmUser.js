/**
 * Created by alvinlu on 5/6/16.
 */
var RmUser = function(counter){
    var args = this.args;
    console.log(args[0]);
    console.log(args[1]);
    var userExists = false;
    var position = 0;

    //traverses through the user list to see if it exists
    OS.Users.forEach(function(userObject,index,array) {

        if(userObject.getUserName() == args[0] && userObject.getPassword() == args[1])
        {
            userExists = true;
            position = index;
        }
        if(userObject.getUserName() == args[0] && userObject.getPassword() != args[1])
        {
            userExists = true;
            OS.display("Needs password to remove user from the system");
            this.state = "Stop";
        }
    });
    
    if(userExists == true){
        if(position > -1){
            OS.Users.splice(position, 1);
        }
        this.state = "Stop";
    }else{
        OS.display("User doesn't exists on this system");
    }

    this.state = "Stop";
    
};
Processes.listOfProcesses.push(new Process("rmuser", RmUser));
HelpInfo.listOfHelp.push(new Manual("rmuser", "rmuser [username] [password]", "Removes the user from the system if they exists"));