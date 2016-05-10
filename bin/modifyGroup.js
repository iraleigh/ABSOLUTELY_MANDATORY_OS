/**
 * Created by Matt on 5/9/2016.
 */

// usermod (add/rm) userName groupName
// usermod add userName groupName
// usermod rm userName groupName

var modifyGroup = function(counter)
{
    switch(counter)
    {
        case 0:
            this.var.args = this.args; //arg[0] == (add/rm)
                                  //arg[1] == user to add to the group
                                  //arg[2] == the name of the group file to add or remove to.
            //Currently no error checking.
            this.var.fileName = this.var.args[2];
            console.log(this.var.args[0] + " ~0");
            console.log(this.var.args[1] + " ~1");
            console.log(this.var.args[2] + " ~2");
            console.log(this.var.args[3] + " ~3");
            this.var.filePointer = OS.FS.open(this.var.fileName);
            break;

        case 1:
            console.log(this.var.filePointer);
            console.log("Enter case 1");
            var addFlag = false;
            var rmFlag = false;
            var returnedFile = this.var.returnedFile;

            if(this.var.args[0] == "add")
            {
                console.log("add flag true");
                addFlag = true;
            }
            else if(this.var.args[0] == "rm")
            {
                console.log("remove flag true");
                rmFlag = true;
            }

            var szUserName = this.var.args[1];
            var szFileName = this.var.args[2];
            var gFile;
            var contentFromRead = "";
            var readUserArray;
            var newContent = "";
            console.log(szFileName);
            if(addFlag == true)
            {
                console.log("if add flag is true");
                Directory.Files.forEach(function(file,index,array)
                {
                    if(file instanceof Dir)
                    {
                        file.content.forEach(function(groupFile, index, array)
                        {
                            console.log(groupFile.name);
                            if(groupFile.name == szFileName)
                            {
                                console.log("in first if statement");
                                OS.FS.write(this.var.filePointer, szUserName + "\n");
                                //oTargetFile = element;
                            }
                        });
                    }
                });
            }
            if(rmFlag == true)
            {
                console.log("if remove flag is true");
                Directory.Files.forEach(function(file,index,array)
                {
                    if(file instanceof Dir)
                    {
                        file.content.forEach(function(groupFile, index, array)
                        {
                            if(groupFile == szFileName)
                            {
                                gFile = groupFile;
                                console.log("in first if statement");
                                contentFromRead = OS.FS.read(returnedFile);
                            }
                        });
                    }
                });

                //indexOF returns true if the userName is found in the group file.
                if(contentFromRead.indexOf(szUserName))
                {
                    readUserArray = contentFromRead.split("\n");

                    readUserArray.forEach(function(element, index, array)
                    {
                       if(element == szUserName)
                       {
                           readUserArray.splice(index, 1);
                       }
                    });
                }

                readUserArray.forEach(function(element, index, array)
                {
                   newContent = element + "\n";
                });

                gFile.content = " ";
                OS.FS.write(returnedFile, newContent);
            }

            //this.program_counter++;
            break;

        case 2:
            console.log("enter case 2");
            OS.FS.close(this.var.args[2]);
            break;

        default:
            this.state = "Stop";
            this.program_counter = 0;
    }
};

Processes.listOfProcesses.push(new Process("usermod",modifyGroup));