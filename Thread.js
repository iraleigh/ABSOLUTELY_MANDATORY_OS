function Thread(parent, givenName, parentVariables, callback){
	this.parent = parent;
	this.name = parent + ": thread " +  givenName;
	this.callback = callback;
	this.var = parentVariables;

	this.run = function() {
		var thread = new Process(this.name, this.callback);
		thread.var = this.var;
		thread.state = "Ready";
		Processes.listOfProcesses.push(thread);
	}

	this.sleep = function(milliseconds) {
		//change process state to pause for milliseconds

		//switch state to paused

		//set timeout for milliseconds

		//switch state to ready
	}

	this.sleep = function(millisecond){

		this.state = "pause";
		setTimeout(function(){this.state = "ready";},5000);

	}
}