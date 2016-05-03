/**
 * Created by Matt on 4/30/2016.
 */

//Still need to test, and error out if incorrect input is given.

var SwitchUser = function(counter)
{
    switch(counter)
    {
        case 0:
            var args = this.args;
            console.log(args[0]);
            console.log(args[1]);
            //just find the userObject that equals the username and password provided?

            OS.Users.forEach(function(userObject,index,array)
            {
                //console.log(userObject);
                userObject.getUserName();
                userObject.getPassword();
                if(userObject.getUserName() == args[0] && userObject.getPassword() == args[1])
                {
                    console.log(userObject);
                    OS.UserSwap(userObject);
                }
            });
            this.program_counter++;
            break;

        default:
            this.state = "Stop";
            this.program_counter = 0;
    }
};

Processes.listOfProcesses.push(new Process("su",SwitchUser));
