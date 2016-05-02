var server = function(counter) {

	switch (counter){
		case 0:
			var args = Array.prototype.slice.call(arguments);
			this.var.fileName = args[1];
			this.var.filePointer = args[2];
			this.var.threadNum++;


			this.newThread('file_server_' + this.var.threadNum, function(counter){
				
				switch(counter){
					case 0:
						OS.FS.open(this.fileName);
						break;
					case 1:
						this.filePointer = this.var.returnedFile;
						OS.outputToConsole("Opened: "+this.filePointer.name);
						this.state = "Stop";
				}
			});



			this.threads['file_server_'+this.var.threadNum].run();
			var thread = Processes.findProcessByName('Server: thread file_server_'+this.var.threadNum);
			thread.fileName = this.var.fileName;
			thread.filePointer = this.var.filePointer;
			this.program_counter++;
			break;
		case 1:
			this.var.someThreadsRunning = this.threads.some(function(child){
				return child.thread.state !== "Stop";
			});

			if (this.var.someThreadsRunning) {
				this.program_counter = 1;
			} else {
				console.log("Server stopped");
				this.state = "Stop";
			}

			break;
		default:
			this.state = "Stop";

	}
}

var server_process = new Process("Server", server);
server_process.var.threadNum = 0;

Processes.listOfProcesses.push(server_process);