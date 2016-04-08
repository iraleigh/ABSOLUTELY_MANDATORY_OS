var testingThreads = function(counter) {
	this.var.sampleVar = "variable";

	this.newThread('one', function(counter){
		switch(counter){
			case 0:
				console.log(this.var.sampleVar);
				OS.FS.open('a');
				break;
			default:
				this.state = 'Stop';
		}
	});
	this.newThread('two', function(counter){
		switch(counter){
			case 0:
				OS.FS.open('b');
				break;
			default:
				this.state = 'Stop';
		}
	});
	this.newThread('three', function(counter){
		switch(counter){
			case 0:
				OS.FS.open('c');
				break;
			default:
				this.state = 'Stop';
		}
	});

	this.threads['one'].run();
	this.threads['two'].run();
	this.threads['three'].run();

	this.state = 'Stop';
}
Processes.listOfProcesses.push(new Process('ThreadTest', testingThreads));