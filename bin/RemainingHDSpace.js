/**
 * Created by Matt on 4/27/2016.
 */

var RemainingHDSpace = function(counter)
{
    switch(counter)
    {
        case 0:
            break;

        default:
            this.state = "Stop";
            this.program_counter = 0;
    }
};

Processes.listOfProcesses.push(new Process("HDSpace",RemainingHDSpace));
