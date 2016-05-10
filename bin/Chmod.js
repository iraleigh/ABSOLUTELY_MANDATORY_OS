/**
 * Created by Matt on 4/30/2016.
 */

//Mostly done still need to test, and error out if incorrect input is given.

var chmod = function(counter)
{
    //if user is the file owner allow this person to add or remove from access group.
    //Example of Chmod usage:
    //Chmod rm userName fileName
    //Chmod add userName fileName
    //Chmod (add/rm) userName process name.
    switch(counter)
    {
        case 0:
            var args = this.args;
            var removeFlag = false;
            var addFlag = false;
            var user = null;
            var oTargetFile = null;
            var oTargetProcess = null;
            var completed = false;

            //the rm, and add is necessary, so is the userName and fileName that you want to adjust.
            //so we for sure need 3 arguments in exactly that order.

            //Check if we are removing or adding permissions to the access group of a file.
            if(args[0] == "rm")
            {
                removeFlag = true;
            }
            else if(args[0] == "add")
            {
                console.log("addFlag = true;");
                addFlag = true;
            }

            //Check who the user is that you want to remove or add from the access group.
            OS.Users.forEach(function(userObject,index,array)
            {
                if(userObject.getUserName() == args[1])
                {
                    user = userObject;
                }
            });
            console.log(user);

            console.log(args[2]);
            //I'm not sure if this is the correct way to get a file object...
            Directory.Files.forEach(function(file,index,array)
            {
                if(file instanceof Dir)
                {
                file.content.forEach(function(element, index, array)
                {
                    if(element.name == args[2])
                    {
                        console.log("in first if statement");
                        oTargetFile = element;
                    }
                });
                }
                if(file.name == args[2])
                {
                    console.log("in 2nd if statement");
                    oTargetFile = file;
                }

            });
            console.log(oTargetFile);

            Processes.listOfProcesses.forEach(function(element,index,array)
            {
                if(element.name == args[2])
                {
                    oTargetProcess = element;
                }
            });

            //If this person who is currently logged in owns the file let him/her modify permissions.
            console.log(CurrentUserSingleton.getInstance().getUserName());

            if(oTargetProcess == null)
            {
                if(CurrentUserSingleton.getInstance().getUserName() == oTargetFile.fileOwner.getUserName())
                {
                    if(removeFlag == true)
                    {
                        oTargetFile.removeFromAccessGroup(user);
                    }
                    if(addFlag == true)
                    {
                        console.log("IN PUSH USER TO ACCESS GROUP");
                        oTargetFile.addToAccessGroup(user);
                        console.log(oTargetFile.accessGroup);
                    }
                }
                else
                {
                    OS.display("You do not have the rights to give or remove access to this file.");
                }
            }

            //Adds an undefined?! what?
            if(oTargetFile == null)
            {
                oTargetProcess.execAccess.forEach(function(element,index,array)
                {
                    if(element.userName == CurrentUserSingleton.getInstance().getUserName() && removeFlag == true)
                    {
                        console.log("in remove");
                        oTargetProcess.removeExecAccess(user);
                        completed = true;
                    }
                    else if(element.userName == CurrentUserSingleton.getInstance().getUserName() && addFlag == true)
                    {
                        console.log("in add");
                        oTargetProcess.addExecAccess(user);
                        completed = true;
                    }
                });
                if(completed == false)
                {
                    OS.display("You do not have the rights to give or remove access to this process.");
                }
            }

            /*
              In order to implement full ACL support, you can do the following:
              call methods such as oTargetFile.acl.setGroupExecute(true);
              Since ACLs are more granular than the above permissions system,
              implementation will require more evaluation of the arguments.

            */

            //console.log(oTargetProcess.execAccess);

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
            this.program_counter++;
            break;

        default:
            this.state = "Stop";
            this.program_counter = 0;
    }
};

Processes.listOfProcesses.push(new Process("chmod",chmod));
HelpInfo.listOfHelp.push(new Manual("chmod", "chmod [add/rm] [user] [filename]", "Adds or removes access to the specified file for the specified user."));
