/**
 * Created by Matt on 4/30/2016.
 */

//Still need to test, and error out if incorrect input is given.

//Workaround; I was having trouble keeping their values
var suglobal = {
    args: [],
    instance: 0,
    questionMode: false
}

var SwitchUser = function (counter) {
    switch (counter) {

        case 0:
            this.program_counter++;
            suglobal.args = this.args;
            //console.log(args[0]);
            //console.log(args[1]);
            //just find the userObject that equals the username and password provided?
            suglobal.instance = CurrentUserSingleton.getInstance();


            if (suglobal.args[0] == null) {                //Uncomment conditional if you want one-line login back
                suglobal.questionMode = true;                //Turned off so the password would be hidden in **** stars
                CLI.prompt("Username: ");
                this.state = "Stop";
            }

            break;
        case 1:
            if (suglobal.questionMode == true)
                suglobal.args[0] = CLI.promptResult;
            this.program_counter++;
            if (suglobal.questionMode == true) {
                CLI.passwordMode = true;
                CLI.prompt("Password: ");
                this.state = "Stop";
            }
            break;

        case 2:
            CLI.passwordMode = false;
            if (suglobal.questionMode == true)
                suglobal.args[1] = CLI.promptResult;
            OS.Users.forEach(function (userObject, index, array) {
                ////console.log(userObject);
                //userObject.getUserName();
                //userObject.getPassword();
                if (userObject.getUserName().toUpperCase() == suglobal.args[0].toUpperCase() && userObject.getPassword() == suglobal.args[1]) {
                    //console.log(userObject);
                    OS.UserSwap(userObject);
                }
            });

            var check = CurrentUserSingleton.getInstance();

            if (suglobal.instance.getUserName() == check.getUserName()) {
                OS.display("You entered the incorrect password or user name");
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