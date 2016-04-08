function Thread(parent, givenName, parentVariables, callback){
	this.parent = parent;
	this.name = parent + ": thread " +  givenName;
	this.callback = callback;
	this.var = parentVariables;
	this.thread;

	this.run = function() {
		this.thread = new Process(this.name, this.callback);
		this.thread.var = this.var;
		this.thread.state = "Ready";
		Processes.listOfProcesses.push(this.thread);
	}

	this.sleep = function(millisecond){

		this.thread.state = "Stop";
		setTimeout(function(thread){
			thread.state = "Ready";
			start();
		},millisecond, this.thread);

	}
}