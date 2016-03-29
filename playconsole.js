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
}

function doCommand(input) {  //Commands are sent here to be parsed
    var command = CLI.currentInput.toUpperCase().split(" ");
    var currentpos = 0;
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
        //var originalHeight = document.documentElement.clientHeight;
        CLI.currentInput += "<br />";
        currentpos = 0;
        //First limit the number of lines on the screen
        for (j = 0; j < ((window.innerHeight / CLI.textHeight) - 2) ; j++) {
            for (i = 0; i < (window.innerWidth / (CLI.textHeight * 0.57)) ; i++) {
                CLI.currentInput += Lorem[currentpos];
                currentpos++;
            }
            if (j < ((window.innerHeight / CLI.textHeight) - 3)) {
                CLI.currentInput += "<br />";
            }
        }
        currentpos = 0;
        return CLI.status.OK;
    }

    return CLI.status.BAD_COMMAND;
}