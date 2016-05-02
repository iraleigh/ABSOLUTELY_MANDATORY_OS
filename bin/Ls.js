var ls = function(counter){
    this.oCurrentDir = OS.FS.getPwd();
    //console.log("Current directory: " + this.oCurrentDir);

    var ls_directories = [];
    var ls_files = [];
    if(this.oCurrentDir == Directory.Files){
      for (var n = 0; n < this.oCurrentDir.length; n++){
        if(this.oCurrentDir[n].getKind() == "Directory"){
            ls_directories.push("<b>" + this.oCurrentDir[n].accessName() + "</b>");
        }
        else
          ls_files.push(this.oCurrentDir[n].accessName());
      }
    }
    else {
        OS.display("<b>.</b>");
        OS.display("<b>..</b>");
      for (var n = 0; n < this.oCurrentDir.content.length; n++){
        if(this.oCurrentDir.content[n].getKind() == "Directory"){
            ls_directories.push("<b>" + this.oCurrentDir.content[n].accessName() + "</b>");
        }

        else
          ls_files.push(this.oCurrentDir.content[n].accessName());
      }
    }

    ls_directories.sort();
    ls_files.sort();
    for (var ls_i = 0; ls_i < ls_directories.length; ls_i++)
        OS.display(ls_directories[ls_i]);
    for (var ls_i = 0; ls_i < ls_files.length; ls_i++)
        OS.display(ls_files[ls_i]);

    if (this.oCurrentDir == Directory.Files) {
        OS.display("<br>" + (this.oCurrentDir.length) + " objects");
    }
    else {
        OS.display("<br>" + (this.oCurrentDir.content.length + 2) + " objects");
    }

    this.state = "Stop";
    this.program_counter = 0;
}

Processes.listOfProcesses.push(new Process("ls", ls));
HelpInfo.listOfHelp.push(new Manual("ls", "ls", "Displays the files, <b>directories</b> and <i><b>processes</b></i> in the current directory."));

