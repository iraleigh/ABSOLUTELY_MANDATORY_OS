/*
* Description:
* The cp utility copies the contents of source_file to target_file.
*
*  Options:
* -f Overwrite existing files of the same name without prompting the user.
*
* -i Prompt the user before overwriting existing files.
*
* -n Do not overwrite any existing files.
*
* -R If the source file is a directory, copy all of its contents,
*     maintaining the structure.
*
* -v Verbose mode. Display all file names as they are copied.
*
*/

var cp = function(counter) {
	switch(counter){
		case 0:
			var args = this.args;
      var szForceOverwrite = false;
      var szInteractiveMode = false;
      var szForbidOverwrite = false;
      var szRecursiveCopy = false;
      var szVerboseMode = false;
      var szSourceFile = new String();
      var szTargetFile = new String();
      var szTargetExists = false;
      var szWriteThisFile = false;

      var szArgZero = args[0];

      //Check Options
      if (szArgZero.charAt(0) == '-'){
        //Exit on mutually-exclusive options
        if(szArgZero.includes('f') && szArgZero.includes('i')){
          OS.display("Cannot force overwrite with interactive mode.<br/>");
          return 1;
        }
        else if (szArgZero.includes('f') && szArgZero.includes('n')){
          OS.display("Cannot simultaneously force and forbid overwrites.<br/>");
          return 1;
        }
        else if (szArgZero.includes('n') && szArgZero.includes('i')){
          OS.display("Cannot forbid overwrites with interactive mode.<br/>");
          return 1;
        }

        //Set compatible options
        if(szArgZero.includes('f')){
          szForceOverwrite = true;
        }
        if(szArgZero.includes('i')){
          szInteractiveMode = true;
        }
        if(szArgZero.includes('n')){
          szForbidOverwrite = true;
        }
        if(szArgZero.includes('R')){
          szRecursiveCopy = true;
        }
        if(szArgZero.includes('v')){
          szVerboseMode = true;
        }

        //set file names
        if(args[1] == null || args[2] == null){
          OS.display("Error: Missing a filename argument.<br/>");
          return 2;
        }
        szSourceFile = args[1];
        szTargetFile = args[2];
      }
      else{  //no options specified
        if(args[0] == null || args[1] == null){
          OS.display("Error: Missing a filename argument.<br/>");
          return 2;
        }
        szSourceFile = args[0];
        szTargetFile = args[1];
      }


      //Open and read the source file
			var szSource = OS.FS.open(szSourceFile);
      var szSourceContent = OS.FS.read(szSource);
      OS.FS.close(szSource);

      //Check to see if the destination file exists
      if(OS.FS.open(szTargetFile) != null){
        szTargetExists = true;
      }

      //Prompt user to replace if in interactive mode
      if(szInteractiveMode == true && szTargetExists == true){
        OS.display("Replace existing file " + szTargetFile + "? y/n: ");
        //Get input from keyboard.
        //set new variable equal to input decision
        //if yes, force overwrite of target file.
        OS.display("<br/>");
      }

      //Display filenames if in verbose mode.
      if(szVerboseMode == true){
        OS.display("Copying " + szSourceFile + " to " + szTargetFile + "<br/>");
      }

      //Write target file.
      if(szForceOverwrite == true){
        szWriteThisFile == true;
      }
      else{
        szWriteThisFile == false;
      }
      if(szForbidOverwrite == true){
        szWriteThisFile = false;
      }
      if(szTargetExists == false){
        szWriteThisFile = true;
      }

      if(szWriteThisFile == true){
        OS.FS.create(szTargetFile, szSourceContent);
      }

      //Implement recursive copy if/when directories are implemented


			break;
		default:
			this.state = "Stop";
			this.program_counter = 0;
			console.log(Directory.Files);
	}
  return 0;
}

Processes.listOfProcesses.push(new Process("cp", cp));
