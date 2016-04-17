/**
 * Created by Matt on 4/14/2016.
 */

var SchedulerTest = function(counter)
{
    switch(counter)
    {
        case 0:
            console.log("Initialize Process1");
            this.var.Process1 = new Process("SchedulerProcess1", SchedulerProcess1);
            this.var.Process1.state = "Ready";
            Processes.listOfProcesses.push(this.var.Process1);

            console.log("Initialize Process2");
            this.var.Process2 = new Process("SchedulerProcess2", SchedulerProcess2);
            this.var.Process2.state = "Ready";
            Processes.listOfProcesses.push(this.var.Process2);

            console.log("Initialize Process3");
            this.var.Process3 = new Process("SchedulerProcess3", SchedulerProcess3);
            this.var.Process3.state = "Ready";
            Processes.listOfProcesses.push(this.var.Process3);

            console.log("Initialize Process4");
            this.var.Process4 = new Process("SchedulerProcess4", SchedulerProcess4);
            this.var.Process4.state = "Ready";
            Processes.listOfProcesses.push(this.var.Process4);

            this.program_counter++;
            break;

        default:
            this.state = "Stop";
            this.program_counter = 0;
    }

};

Processes.listOfProcesses.push(new Process("SchedulerTest",SchedulerTest));