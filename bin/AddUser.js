/**
 * Created by alvinlu on 5/6/16.
 */
var AddUser = function(counter){
    var args = this.args;
    console.log(args[0]);
    console.log(args[1]);
    var userExists = false;
    var temp = 0;
    //checks if user is already created
    OS.Users.forEach(function(userObject,index,array) {

        if(userObject.getUserName() == args[0])
        {
            userExists = true;
            OS.display("User already exists");
            this.state = "Stop";
        }
    });

    if(args[1] == null){
        OS.display("Needs a password to create a user");
        this.state = "Stop";
    }

    if(!userExists){
        OS.Users.push(new User(args[0], args[1]));
    }
    this.state = "Stop";

};
Processes.listOfProcesses.push(new Process("adduser", AddUser));
HelpInfo.listOfHelp.push(new Manual("adduser", "adduser [username] [password]", "Adds the user into the system if they're not on the system to begin with"));