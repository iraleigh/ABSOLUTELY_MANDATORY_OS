/**
 * Created by Matt on 4/30/2016.
 */

//Mostly done still need to test, and error out if incorrect input is given.

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
            var user = null;
            var file = null;

            //the rm, and add is necessary, so is the userName and fileName that you want to adjust.
            //so we for sure need 3 arguments in exactly that order.

            //Check if we are removing or adding permissions to the access group of a file.
            if(args[0] == "rm")
            {
                removeFlag = true;
            }
            else if(args[0] == "add")
            {
                addFlag = true;
            }

            //Check who the user is that you want to remove or add from the access group.
            OS.Users.forEach(function(userObject,index,array)
            {
                if(userObject.getUserName == args[1])
                {
                    user = userObject;
                }
            });

            //I'm not sure if this is the correct way to get a file object...
            Directory.Files.forEach(function(File,index,array)
            {
               if(File == args[2])
               {
                   file = File;
               }
            });

            //If this person who is currently logged in owns the file let him/her modify permissions.
            if(CurrentUserSingleton.getInstance().getUserName() == file.getOwner())
            {
                if(removeFlag)
                {
                    file.removeFromAcessGroup(user)
                }
                if(addFlag)
                {
                    file.addToAccessGroup(user);
                }
            }

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