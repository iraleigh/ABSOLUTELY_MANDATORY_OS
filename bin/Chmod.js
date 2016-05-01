/**
 * Created by Matt on 4/30/2016.
 */

var Chmod = function(counter)
{
    //if user is the file owner allow this person to add or remove from access group.
    //Example of Chmod usage:
    //Chmod rm userName fileName
    //chmod add userName fileName
    switch(counter)
    {
        case 0:
            var args = this.args;
            var removeFlag = false;
            var addFlag = false;



            //this.var.args.forEach(function(element,index,array)
            //{
            //   if(element == "rm")
            //   {
            //       removeFlag = true;
            //   }
            //
            //   if(element == "add")
            //   {
            //       addFlag = true;
            //   }
            //});
            //
            //this.var.args.forEach()
            //
            //
            ////Finish this a tad later.
            //this.var.args.forEach(function(element,index,array)
            //{
            //    OS.Users.forEach(function(userObject,index,array)
            //    {
            //        if(element == "")
            //        {
            //            removeFlag = true;
            //        }
            //    });
            //});
            break;

        default:
            this.state = "Stop";
            this.program_counter = 0;
    }
};

Processes.listOfProcesses.push(new Process("Chmod",Chmod));