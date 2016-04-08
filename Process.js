function Process (name,main) {
	this.name = name;
	this.state = "Stop";
	this.program_counter = 0;
	this.var = {};
	this.main = main;
	this.threads = [];
	this.main.displayName = this.name;

	this.newThread = function(name, callback) {
		this.threads[name] = new Thread(this.name, name, this.var,callback);
	};
}