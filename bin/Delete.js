var rm = function(counter) {
	switch(counter){
		case 0:
		var args = this.args[0];
		var isDirectory = false;
		var forceRemoval = false;
		var nameOfResource = "";

		var aryArgChars = args.split();
		console.log(aryArgChars[0]);

		if(aryArgChars[0] == "-"){
			console.log("reading arguments");
			args.forEach(function(arg, index, args_arr){
				switch (arg){
					case "-r":
					isDirectory = true;
					break;
					case "-f":
					forceRemoval = true;
					break;
					default:
					nameOfResource = arg;
				}
			});
		}

		if(isDirectory){
			console.log("Deleting a directory.");
			this.oWorkingDir = OS.FS.getDirectory(this.args[this.args.length - 1]);
			this.parentDir = this.oWorkingDir.parentDir;
			if(this.parentDir != Directory.Files && this.oWorkingDir.parentDir.fileType == "Directory"){
				for (var n = 0; n < this.parentDir.length; n++){
					if(this.parentDir.content[n].name == this.oWorkingDir){
						this.parentDir.content.splice(n,1);
					}
					else if (this.oWorkingDir.parentDir == Directory.Files){
						for (var n = 0; n < Directory.Files.length; n++){
							if(Directory.Files[n].name == this.oWorkingDir){
								Directory.Files.splice(n,1);
							}
						}
					}
					else{
						OS.display("Cannot delete the root directory.");
					}
				}
			}
		}

		OS.FS.delete(nameOfResource);
		break;
		default:
		this.state = "Stop";
		this.program_counter = 0;
		console.log(Directory.Files);
	}
}
Processes.listOfProcesses.push(new Process("rm",rm));
