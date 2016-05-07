/**
 * Created by Matt on 4/30/2016.
 */

//Still need to test, and error out if incorrect input is given.

var SwitchUser = function (counter) {
    var args = this.args;
    switch (counter) {
        case 0:

            this.program_counter++;
            console.log(args[0]);
            console.log(args[1]);
            //just find the userObject that equals the username and password provided?
            var instance = CurrentUserSingleton.getInstance();
            if (args[0] == null) {
                args[1] = "amos";
                args[0] = CLI.prompt("Username: ");
                this.state = "Stop";
                break;
            }
        //    break;
        //case 1:
            //alert("got here");

            OS.Users.forEach(function (userObject, index, array) {
                ////console.log(userObject);
                //userObject.getUserName();
                //userObject.getPassword();
                if (userObject.getUserName() == args[0] && userObject.getPassword() == args[1]) {
                    //console.log(userObject);
                    OS.UserSwap(userObject);
                    UserFlags.hasAccess = false;
                    UserFlags.recentSwitch = true;
                }
            });

            var check = CurrentUserSingleton.getInstance();

            if (instance.getUserName() == check.getUserName()) {
                OS.display("You entered the incorrect password or user name.");
            }
            else {
                OS.display("You logged in as " + CurrentUserSingleton.getInstance().getUserName());
            }

            this.program_counter++;
            break;

        default:
            this.state = "Stop";
            this.program_counter = 0;
    }
};

Processes.listOfProcesses.push(new Process("su", SwitchUser));
HelpInfo.listOfHelp.push(new Manual("su", "su\nOptional: su [username] [password]", "Changes the current user."));