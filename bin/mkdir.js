var mkdir = function(counter){
  switch(counter){
    case 0:
    if (this.args[0] == null) {
        OS.display("No directory specified");
        this.state = "Stop";
        this.program_counter = 0;
        return;
    }
    //Declare variables
    var szPath = this.args[0];
    szPath = szPath.trim();
    var aryParsedPath = szPath.split("/");
    var aryDirCharArr = szPath.split();
    this.oCurrentDir = OS.FS.getPwd();
    console.log("A " + this.oCurrentDir);
    var oNewDir = undefined;

    if(aryDirCharArr[0] == "/"){
      this.oCurrentDir = Directory.Files;
    }
    //Step through directory structure to identify possible naming conflicts
    for(var n = 0; n < aryParsedPath.length; n++){
      var szCurrentPathLevelName = aryParsedPath[n];
      //var szDirIndex = oCurrentDir.findIndex(szCurrentPathLevelName);

      for (n = 0; n < this.oCurrentDir.length; n++){
        if (this.oCurrentDir[n].accessName() == szCurrentPathLevelName){
          console.log("1 " + this.oCurrentDir);
          this.oCurrentDir = this.oCurrentDir[n];
          console.log("2 " + this.oCurrentDir);
        }

      }

    }
    //Inform user of name conflict

    if (this.oCurrentDir.accessName == aryParsedPath[aryParsedPath.length -1]){
      OS.display("Directory name is already in use.  Choose another name.");
    }
    //Create new directory if there are no naming conflicts.
    else{
      console.log("4 " + this.oCurrentDir);

      var oNewDir = new Dir(aryParsedPath[aryParsedPath.length -1],this.oCurrentDir);
      console.log("5 " + this.oCurrentDir);

      oNewDir.parent = this.oCurrentDir;

      console.log("3 " + oNewDir.getParent());
      if(this.oCurrentDir == Directory.Files)
        this.oCurrentDir.push(oNewDir);
      else {
          this.oCurrentDir.content.push(oNewDir);
      }
    }

    break;


    default:
    break;}

    this.state = "Stop";
    this.program_counter = 0;
  }
  Processes.listOfProcesses.push(new Process("mkdir",mkdir));
