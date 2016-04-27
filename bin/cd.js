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
    if(this.oCurrentDir != Directory.Files){
      console.log("setting directory to ..");
      this.oCurrentDir = this.oCurrentDir.parentDir;
      console.log(".. is " + this.oCurrentDir);
    }
  }
  else if (aryArgsCharArr[0] != "/" && aryArgsCharArr[0] != ".") {
    //get current directory to change to a nested directory
    this.oCurrentDir = OS.FS.getPwd();
    console.log("Current directory: " + this.oCurrentDir);
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
            //matching directory found
          }
          else{
            if(n == (this.oCurrentDir.length - 1) && szArgs != "/"){
              OS.display("Directory does not exist");
            }
          }
        }
      }
      else{
        //Change to a child of a non-root directory

        for (n = 0; n < this.oCurrentDir.content.length; n++){
          if (this.oCurrentDir.content[n].name == szCurrentPathLevelName){
            this.oCurrentDir = this.oCurrentDir.content[n]; //Matching directory found
            console.log("Directory found");
          }
          else{
            console.log(n);
            console.log(this.oCurrentDir.content.length);
            if(n == (this.oCurrentDir.content.length - 1)){
              OS.display("Directory does not exist");
            }
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
