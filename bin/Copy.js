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
    this.var.szForceOverwrite = false;
    this.var.szInteractiveMode = false;
    this.var.szForbidOverwrite = false;
    this.var.szRecursiveCopy = false;
    this.var.szVerboseMode = false;
    this.var.szSourceFile = new String();
    this.var.szTargetFile = new String();
    this.var.szTargetExists = false;
    this.var.szWriteThisFile = false;

    var szArgZero = args[0];

    this.var.szSource;
    this.var.szSourceContent;

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
          this.var.szForceOverwrite = true;
        }
        if(szArgZero.includes('i')){
          this.var.szInteractiveMode = true;
        }
        if(szArgZero.includes('n')){
          this.var.szForbidOverwrite = true;
        }
        if(szArgZero.includes('R')){
          this.var.szRecursiveCopy = true;
        }
        if(szArgZero.includes('v')){
          this.var.szVerboseMode = true;
        }

        //set file names
        if(args[1] == null || args[2] == null){
          OS.display("Error: Missing a filename argument.<br/>");
          return 2;
        }
        this.var.szSourceFile = args[1];
        this.var.szTargetFile = args[2];
      }
      else{  //no options specified
        if(args[0] == null || args[1] == null){
          OS.display("Error: Missing a filename argument.<br/>");
          return 2;
        }
        this.var.szSourceFile = args[0];
        this.var.szTargetFile = args[1];
      }


      //Open and read the source file
			this.var.szSource = OS.FS.open(this.var.szSourceFile);
      break;

      case 1:
      this.var.szSourceContent = OS.FS.read(this.var.szSource);
      break;

      case 2:
      OS.FS.close(this.var.szSource);
      break;

      case 3:
      //Check to see if the destination file exists
      if(OS.FS.open(this.var.szTargetFile) != null){
        this.var.szTargetExists = true;
      }
      break;

      case 4:
      //Prompt user to replace if in interactive mode
      if(this.var.szInteractiveMode == true && this.var.szTargetExists == true){
        OS.display("Replace existing file " + this.var.szTargetFile + "? y/n: ");
        //Get input from keyboard.
        //set new variable equal to input decision
        //if yes, force overwrite of target file.
        OS.display("<br/>");
      }

      //Display filenames if in verbose mode.
      if(this.var.szVerboseMode == true){
        OS.display("Copying " + this.var.szSourceFile + " to " + this.var.szTargetFile + "<br/>");
      }

      //Write target file.
      if(this.var.szForceOverwrite == true){
        this.var.szWriteThisFile == true;
      }
      else{
        this.var.szWriteThisFile == false;
      }
      if(this.var.szForbidOverwrite == true){
        this.var.szWriteThisFile = false;
      }
      if(this.var.szTargetExists == false){
        this.var.szWriteThisFile = true;
      }

      if(this.var.szWriteThisFile == true){
        OS.FS.create(this.var.szTargetFile, this.var.szSourceContent);
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
HelpInfo.listOfHelp.push(new Manual("cp", "cp [file_name] [file_destination]", "Makes a copy a file with a different file name."));
