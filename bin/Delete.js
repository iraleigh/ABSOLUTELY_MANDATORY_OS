var rm = function(counter) {
	switch(counter){
		case 0:
			var args = this.args;
			var isDirectory = false;
			var forceRemoval = false;
			var nameOfResource = "";

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

			OS.FS.delete(nameOfResource);
			break;
		default:
			this.state = "Stop";
			this.program_counter = 0;
			console.log(Directory.Files);
	}
}
Processes.listOfProcesses.push(new Process("rm", rm));
HelpInfo.listOfHelp.push(new Manual("rm", "rm [file_name]", "Deletes a given file."));