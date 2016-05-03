var rm = function(counter) {
	switch(counter){
	    case 0:
	    if (this.args[0] == null) {
	        OS.display("No file or directory specified");
	        this.state = "Stop";
	        this.program_counter = 0;
	        return;
	    }
		var args = this.args;
		this.isDirectory = false;
		this.forceRemoval = false;
		this.nameOfResource = "";

		this.aryArgChars = args[0].split();
		console.log(this.aryArgChars[0]);

		//-r
		for (var n = 0; n < this.args.length; n++){
			if(this.args[n] == "-r"){
				this.isDirectory = true;
			}
		}

		//-f
		for (var n = 0; n < this.args.length; n++){
			if(this.args[n] == "-f"){
				this.forceRemoval = true;
			}
		}

		this.nameOfResource = this.args[this.args.length - 1];

		var path = this.nameOfResource.split("/");
		var name = path.pop();


		this.oTargetDirectory = OS.FS.getDirectory(path.join("/"));

		var isRoot = this.oTargetDirectory == Directory.Files;

		var directory = isRoot ? Directory.Files : this.oTargetDirectory.content;

		this.oTargetFile = directory.find(function(resource){
			return resource.name == name;
		});
		    try{
		        this.oTargetFile.fileType;
		    } catch (e) {
		            OS.display("File or directory not found");
		            this.program_counter = 0;
		            this.state = "Stop";
		            break;
		    }
		if(this.oTargetFile.fileType == "Directory"){
		    if (this.isDirectory == true) {
		        if (this.nameOfResource == "bin" && !this.forceRemoval && isRoot) { //Protected folders
		            this.program_counter++;
		            OS.display("This directory cannot be deleted");
		        } else
		            OS.FS.delete(this.nameOfResource);
			}
			else{
				this.program_counter ++;
				OS.display("Error: the target is a directory.  Use -r option to delete.");
			}
		}
		else if (this.oTargetFile.fileType == "File") {
			OS.FS.delete(this.nameOfResource);
		}
		else{
			this.program_counter ++;
			OS.display("Unable to determine file type");
		}

		break;
		default:
		this.state = "Stop";
		this.program_counter = 0;
		console.log(Directory.Files);
	}
}

Processes.listOfProcesses.push(new Process("rm", rm));
HelpInfo.listOfHelp.push(new Manual("rm", "rm [flags] [file_name]\n-r\tDeletes directories\n-f\tForce deletion", "Deletes a given file or folder."));
