/**
 * Created by alvinlu on 5/6/16.
 */
var Pswd = function(counter){
    var args = this.args;
    console.log(args[0]);
    console.log(args[1]);
    console.log(args[2]);
    var userExists = false;

    OS.Users.forEach(function(userObject,index,array) {

        if(userObject.getUserName() == args[0] && userObject.getPassword() != args[1])
        {
            userExists = true;
            OS.display("This is not the current password of this user, please try again with the correct password");
            this.state = "Stop";
        }
        if(userObject.getUserName() == args[0] && userObject.getPassword() == args[1])
        {
            userExists = true;
            userObject.setPassword(args[2]);
            this.state = "Stop";
        }

    });
    if(userExists != true){
        OS.display("Can't change the password of a user that doesn't exist");
        this.state = "Stop";
    }
    this.state = "Stop";
};
Processes.listOfProcesses.push(new Process("pswd", Pswd));
HelpInfo.listOfHelp.push(new Manual("pswd", "pswd [username] [password] [new password]", "Changes the current password to the newly desired"));