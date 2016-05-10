var ls = function(counter){
    this.oCurrentDir = OS.FS.getPwd();

    var args = this.args;
    //traverse to specified directory
    if(args[0] != undefined){
      var aryPathChars = args[0].split();
      var szPath = " ";
      if(aryPathChars[0] != "/"){
        if(this.oCurrentDir == Directory.Files){
          szPath = "/";
        }
        else{
          szPath = this.oCurrentDir.accessName();
        }
        szPath += args[0];
      }
      else{
        szPath = args[0];
      }
      this.oCurrentDir = OS.FS.getDirectory(szPath);
    }


    var ls_directories = [];
    var ls_files = [];
    if(this.oCurrentDir == Directory.Files){
      OS.display("<b>.</b>");
      OS.display("<b>..</b>");
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
      var szFileIdentifier = "file";
      var szDirIdentifier = "directories";

      if(ls_files.length > 1){
        szFileIdentifier = "Files";
      }

        OS.display("<br>" + (ls_files.length) + " " + szFileIdentifier + ", "
         + (ls_directories.length  + 2) + " " + szDirIdentifier + ".");
    }
    else {
      var szFileIdentifier = "file";
      var szDirIdentifier = "directories";

      if(ls_files.length > 1){
        szFileIdentifier = "files";
      }

        OS.display("<br>" + (ls_files.length) + " " + szFileIdentifier + ", "
         + (ls_directories.length  + 2) + " " + szDirIdentifier + ".");
    }

    this.state = "Stop";
    this.program_counter = 0;
}

Processes.listOfProcesses.push(new Process("ls", ls));
HelpInfo.listOfHelp.push(new Manual("ls", "ls [path]", "Displays the files, <b>directories</b> and <i><b>processes</b></i> in the specified path, or in the current directory if no path is specified."));
