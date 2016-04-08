function Thread(parent, id, parentVariables, callback){
	this.parent = parent;
	this.name = parent + ": thread " +  id;
	this.id = id;
	this.callback = callback;
	this.var = parentVariables;

	this.run = function() {
		console.log(this.name);
		// var thread = new Process(this.name, this.callback);
		// thread.var = this.var;
		// listOfProcesses.push(thread);
	}

}