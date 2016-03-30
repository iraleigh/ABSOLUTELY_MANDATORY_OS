var CLI = {
    currentInput: "",
    oldInput: "AMOS",
    textHeight: 0,
    status: {
        OK: 0,
        BAD_COMMAND: 1
    }
}


window.onload = function () {
    //ABSOLUTELY MADATORY OS -- AMOS
    container.innerHTML = CLI.oldInput;
    CLI.textHeight = document.getElementById('container').offsetHeight;
    CLI.oldInput += "<br /> \\>";
    container.innerHTML = CLI.oldInput;
}

document.onkeypress = function (evt) {
    evt = evt || window.event;
    if (evt.charCode == 13) { // On enter
        //Grab the function here
        var cmdStatus = doCommand(CLI.currentInput);

        //Prep terminal for new line
        if (cmdStatus == CLI.status.BAD_COMMAND)
            CLI.currentInput += "<br/>Unknown command";
        CLI.currentInput += "<br /> \\> ";
        container.innerHTML = CLI.oldInput + CLI.currentInput;

        CLI.oldInput = CLI.oldInput + CLI.currentInput;
        CLI.currentInput = "";

    } else { // A character is typed
        CLI.currentInput += String.fromCharCode(evt.which);
        container.innerHTML = CLI.oldInput + CLI.currentInput;
    }

    window.scrollTo(0, (document.body.scrollHeight - window.innerHeight - 5)); //Keep scrolling down

}

//Backspace works a little differently
document.onkeydown = function (evt) {
    evt = evt || window.event;
    if (evt.keyCode == 8) { // On backspace
        evt.preventDefault(); //Don't go the previous webpage!!
        if (CLI.currentInput.length > 0) { //To be safe
            CLI.currentInput = CLI.currentInput.slice(0, CLI.currentInput.length - 1); //Remove a character
            container.innerHTML = CLI.oldInput + CLI.currentInput;
        }
    }
    if (evt.keyCode == 32) {
        evt.preventDefault(); //Don't scroll page on spacebar.
        CLI.currentInput += " "; //But I still need to add a space.
    }
}

function doCommand(input) {  //Commands are sent here to be parsed
    var command = CLI.currentInput.toUpperCase().split(" ");
    console.log(command);

    if (command[0] == "CLEAR" || command[0] == "CLS") { //Clears screen
        container.innerHTML = "";
        CLI.oldInput = "";
        CLI.currentInput = "AMOS";
        return CLI.status.OK;
    }
    if (command[0] == "TEST") {  //Just to test command line
        for (i = 1; i < command.length; i++)
            console.log("Arg " + i + ":" + command[i]);
        return CLI.status.OK;
    }
    if ((command[0] == "LOREM" && command[1] == "IPSUM") || command[0] == "LI") {
        currentpos = 0;
        //var originalHeight = document.documentElement.clientHeight;
        content = Lorem; //Load in something other than Lorem when converted to MORE
        //content = "Die monster. You don't belong in this world. It was not by my hand that I am once again given flesh...";
        CLI.currentInput += "<br />";

        leaveMore:
        //Limit the number of lines on the screen
        while(currentpos < content.length){
            for (j = 0; j < ((window.innerHeight / CLI.textHeight) - 2) ; j++) {
                //Limit the width of the lines and add letters
                for (i = 0; i < (window.innerWidth / (CLI.textHeight * 0.57)) ; i++) {
                    if (currentpos >= content.length) {
                        currentpos = 0;
                        break leaveMore;
                    }
                    CLI.currentInput += content[currentpos];
                    currentpos++;
                }
                if (j < ((window.innerHeight / CLI.textHeight) - 2)) {
                    CLI.currentInput += "<br />";
                }
            }
            CLI.currentInput += "<b>~~~~~~~~~~~Press space key to continue~~~~~~~~~~~</b><br />";
        }

        return CLI.status.OK;
    }

    return CLI.status.BAD_COMMAND;
}