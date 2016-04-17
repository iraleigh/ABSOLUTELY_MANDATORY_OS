/**
 * Created by Matt on 4/14/2016.
 */

var SchedulerProcess3 = function(counter)
{
    switch(counter)
    {
        case 0:
            console.log("case 0 Processes 3");
            OS.FS.create("file", "file Content");
            //this.program_counter++;
            break;

        case 1:
            console.log("case 1 Processes 3");
            OS.FS.create("file", "file Content");
            //this.program_counter++;
            break;

        case 2:
            console.log("case 2 Processes 3");
            OS.FS.create("file", "file Content");
            //this.program_counter++;
            break;

        case 3:
            console.log("case 3 Processes 3");
            OS.FS.create("file", "file Content");
            //this.program_counter++;
            break;

        default:
            this.state = "Stop";
            this.program_counter = 0;
    }
};

Processes.listOfProcesses.push(new Process("SchedulerProcess3",SchedulerProcess3));
