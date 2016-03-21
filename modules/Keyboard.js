Processes.listOfDevices['keyboard'] = {
      name: "Keyboard",
      state: "Ready",
      main: function(input){
      	input = input.split(" ");
      	var nameOfProcess = input.shift();
        var process = Processes.findProcessByName(nameOfProcess);

        console.log(nameOfProcess);
        console.log(input);

        if (process) {
        	process.args = input;
        	process.state = "Ready";
        	OS.Scheduler.runNextProcess();
        } else if(nameOfProcess == ""){
          OS.Scheduler.runNextProcess();
        } else if (nameOfProcess == "cls" || nameOfProcess == "clear"){
            return "clear";
        } else if (nameOfProcess == "touch"){
            return "touch";
        }
        else {
        	return CLI.status.BAD_COMMAND;
        }
      }
    } 