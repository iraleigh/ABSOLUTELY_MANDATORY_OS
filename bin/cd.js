var cd = function(counter){
  //Define variables
  this.oCurrentDir = undefined;
  var szArgs = this.args[0];
  var aryArgsCharArr = szArgs.split();
  var aryParsedPath = szArgs.split("/");


  if (aryArgsCharArr[0] == "/"){
    //change to root directory
    this.oCurrentDir = Directory.Files;
  }
  else if (szArgs == ".") {
    //stay at current directory
    this.oCurrentDir = OS.FS.getPwd();
  }
  else if (szArgs == ".."){
    //change to parent directory
    this.oCurrentDir = OS.FS.getPwd();
    this.oCurrentDir = this.oCurrentDir.getParent();
    console.log("..");
    //console.log(oCurrentDir.accessName());
  }
  else if (aryArgsCharArr[0] != "/" && aryArgsCharArr[0] != ".") {
    //get current directory to change to a nested directory
    this.oCurrentDir = OS.FS.getPwd();
    console.log("1 " + this.oCurrentDir);
  }

  if(szArgs != "." && szArgs != ".."){

    for (var n = 0; n < aryParsedPath.length; n++){
      var szCurrentPathLevelName = aryParsedPath[n];

      //Change to a child of the root directory
      if (this.oCurrentDir == Directory.Files){
        for (n = 0; n < this.oCurrentDir.length; n++){
          //Matching directory found
          if (this.oCurrentDir[n].accessName() == szCurrentPathLevelName){
            this.oCurrentDir = this.oCurrentDir[n];
          }
          //Matching directory not found
          else{
            //OS.display("Directory does not exist");
          }

        }
      }
      else{
        //Change to a child of a non-root directory
        console.log("2 " + this.oCurrentDir);
        var szDirectorySize = this.oCurrentDir.content.length;
        console.log("Directory size: " + szDirectorySize);
        for (n = 0; n < szDirectorySize; n++){
          if (this.oCurrentDir.content[n].name == szCurrentPathLevelName){
            this.oCurrentDir = this.oCurrentDir.content[n]; //Matching directory found
          }

          //No matching directory foound
          else{
            //OS.display("Directory does not exist");
          }
        }
      }
    }
  }

  //Set PWD to the target directory, and exit
  OS.FS.setPwd(this.oCurrentDir);
  this.state = "Stop";
  this.program_counter = 0;
}
Processes.listOfProcesses.push(new Process("cd",cd));
