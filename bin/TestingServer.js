var servertest = function(counter) {
	switch(counter){
		case 0:
			this.var.files = [];
			this.var.files['a'] = null;
			this.var.files['b'] = null;
			this.var.files['c'] = null;
			this.var.files['d'] = null;

			this.var.server = Processes.findProcessByName('Server');

			this.var.server.main(0, 'a', this.var.files['a']);
			this.var.server.main(0, 'b', this.var.files['b']);
			this.var.server.main(0, 'c', this.var.files['c']);
			this.var.server.main(0, 'd', this.var.files['d']);

			this.program_counter++;

			break;
		case 1:
			if(this.var.server.state == "Stop") this.program_counter++;
			break;
		default:
			this.state = "Stop";
			this.program_counter = 0;
	}
}
Processes.listOfProcesses.push(new Process("testserver", servertest));