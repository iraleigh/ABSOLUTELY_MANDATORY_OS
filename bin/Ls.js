var ls = function(counter){
    this.oCurrentDir = OS.FS.getPwd();
    //console.log("Current directory: " + this.oCurrentDir);


    if(this.oCurrentDir == Directory.Files){
      for (var n = 0; n < this.oCurrentDir.length; n++){
        if(this.oCurrentDir[n].getKind() == "Directory"){
            OS.display("<b>" + this.oCurrentDir[n].accessName() + "</b>");
        }

        else
          OS.display(this.oCurrentDir[n].accessName());
      }
    }
    else{
      OS.display(".");
      OS.display("..");
      for (var n = 0; n < this.oCurrentDir.content.length; n++){
        if(this.oCurrentDir.content[n].getKind() == "Directory"){
            OS.display("<b>" + this.oCurrentDir.content[n].accessName() + "</b>");
        }

        else
          OS.display(this.oCurrentDir.content[n].accessName());
      }
    }
    if(this.oCurrentDir == Directory.Files){
      OS.display("<br>" + (this.oCurrentDir.length) + " files.");
    }
    else{
      OS.display("<br>" + (this.oCurrentDir.content.length + 2) + " files.");
    }


    this.state = "Stop";
    this.program_counter = 0;
}

Processes.listOfProcesses.push(new Process("ls", ls));
HelpInfo.listOfHelp.push(new Manual("ls", "ls", "Displays the files in the current directory."));

