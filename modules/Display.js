Processes.listOfDevices['display'] = {
   name: "Display",
   state: "Ready",
   main: function(output){
       CLI.currentInput += "<br />";
       CLI.currentInput += output;
   },
   clear: function(){
   	   CLI.oldInput = "";
       CLI.currentInput = "AMOS";
   }
}