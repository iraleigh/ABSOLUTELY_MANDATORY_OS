/**
 * Created by Matt on 4/30/2016.
 */

//Still need to test, and error out if incorrect input is given.

var SwitchUser = function(counter)
{
    switch(counter)
    {
        case 0:
            this.var.args = this.args;

            //just find the userObject that equals the username and password provided?

            OS.Users.forEach(function(userObject,index,array)
            {
                if(userObject.getUserName == this.var.args[0] && userObject.getPassword == this.var.args[1])
                {
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
