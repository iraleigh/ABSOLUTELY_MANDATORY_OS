function Process (name,main) {
	this.name = name;
	this.state = "Stop";
	this.program_counter = 0;
	this.var = {};
	this.main = main;
	this.threads = [];

	this.newThread = function(callback) {
		this.threads.push(new Thread(this.name, this.threads.length, this.var,callback));
	};
}