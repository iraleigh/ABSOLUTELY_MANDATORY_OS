Processes.listOfDevices['display'] = {
   name: "Display",
   state: "Ready",
   main: function(output){
       container.innerHTML += output;
   }
}