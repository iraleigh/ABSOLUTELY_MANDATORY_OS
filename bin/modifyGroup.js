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
            OS.FS.open(this.var.fileName);
            break;

        case 1:
            console.log("Enter case 1");
            this.var.addFlag = false;
            this.var.rmFlag = false;
            this.var.returnedfile = this.var.returnedFile;
            console.log(this.var.returnedfile.name);
            this.var.length = OS.FS.length(this.var.returnedfile);
            break;

        case 2:
            OS.FS.seek(this.var.returnedfile, this.var.length);
            break;

        case 3:
            OS.FS.position(this.var.returnedfile);
            break;

        case 4:
            if(this.var.args[0] == "add")
            {
                console.log("add flag true");
                this.var.addFlag = true;
            }
            else if(this.var.args[0] == "rm")
            {
                console.log("remove flag true");
                this.var.rmFlag = true;
            }

            var szUserName = this.var.args[1];
            var szFileName = this.var.args[2];
            var gFile;
            var contentFromRead = "";
            var readUserArray;
            var newContent = "";
            var returnedF = this.var.returnedfile;
            console.log(szFileName);
            if(this.var.addFlag == true)
            {
                console.log("if add flag is true");
                Directory.Files.forEach(function(file,index,array)
                {
                    if(file instanceof Dir)
                    {
                        file.content.forEach(function(groupFile, index, array)
                        {
                            if(groupFile.name == szFileName)
                            {
                                console.log("in first if statement");
                                OS.FS.write(returnedF, szUserName + "\n");
                                //oTargetFile = element;
                            }
                        });
                    }
                });
            }
            if(this.var.rmFlag == true)
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
                                contentFromRead = OS.FS.read(returnedF);
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

            this.program_counter++;
            break;

        case 5:
            console.log("enter case 2");
            OS.FS.close(this.var.args[2]);
            break;

        default:
            this.state = "Stop";
            this.program_counter = 0;
    }
};

Processes.listOfProcesses.push(new Process("usermod",modifyGroup));