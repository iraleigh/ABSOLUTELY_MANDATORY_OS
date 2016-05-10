/**
 * Created by Matt on 4/27/2016.
 */

var RemainingHDSpace = function(counter)
{
    switch(counter)
    {
        case 0:
            var currentSize = Directory.Files.reduce(flatten_callback, Directory.Files[0].accessLength()); //Calculate number of bytes taken up
                currentSize = CAPACITY - currentSize; //CAPACITY is the size of the hard drive, this sets currentSize to the space left
                currentSize = (currentSize / 1000000); //Convert bytes to MB
            OS.display(currentSize+" MB");
            this.program_counter++;
            break;

        default:
            this.state = "Stop";
            this.program_counter = 0;
    }
};

Processes.listOfProcesses.push(new Process("HDSpace",RemainingHDSpace));
HelpInfo.listOfHelp.push(new Manual("HDSpace", "HDSpace", "Displays how much storage is available."));