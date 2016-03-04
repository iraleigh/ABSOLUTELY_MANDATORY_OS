function Process (name,main) {
	this.name = name;
	this.state = "Ready";
	this.program_counter = 0;
	this.var = {}

	this.main = main;

}