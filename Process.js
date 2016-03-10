function Process (name,main) {
	this.name = name;
	this.state = "Stop";
	this.program_counter = 0;
	this.var = {}

	this.main = main;

}