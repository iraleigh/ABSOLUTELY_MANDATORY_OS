var CLI = {
    currentInput: "",
    oldInput: "AMOS",
    textHeight: 0,
    STDIn: "",
    STDOut: "",
    cursor: "_",
    status: {
        OK: 0,
        BAD_COMMAND: 1
    },
    commandHistory: [],
    commandPosition: 0,
    getSTDIn: function () {
        return this.STDIn.trim();
    }
}

var container;
window.onload = function () {
    Processes.generateListOfProcesses();
    container = window.document.getElementById('container');

    addDummyFiles();
    OS.FS.setPwd(Directory.Files);
    console.log(OS.FS.getPwd());
    //ABSOLUTELY MANDATORY OS -- AMOS
    setInterval(cursor, 500);
    CLI.commandHistory = new Array();
    CLI.commandHistory.push("");
    container.innerHTML = CLI.oldInput;
    CLI.textHeight = document.getElementById('container').offsetHeight;
    console.log(CLI.textHeight);
    CLI.oldInput += "<br /> \\> ";
    container.innerHTML = CLI.oldInput + CLI.cursor;

}

document.onkeypress = function (evt) {
    evt = evt || window.event;
    if (evt.charCode == 13) { // On enter
        //Grab the function here
        CLI.commandPosition = 0;
        CLI.commandHistory.splice(1, 0, CLI.currentInput);
        if (CLI.commandHistory.length > 21) // n+1 -- limit how back history goes
            CLI.commandHistory.pop();
        var cmdStatus = doCommand(CLI.currentInput);
        start();
        //Prep terminal for new line
        if (cmdStatus == CLI.status.BAD_COMMAND)
            CLI.currentInput += "<br/>Unknown command";

        CLI.STDIn = "";
        CLI.STDOut = "";
        CLI.currentInput += "<br /> \\> ";
        container.innerHTML = CLI.oldInput + CLI.currentInput;

        CLI.oldInput = CLI.oldInput + CLI.currentInput;
        CLI.currentInput = "";

    } else if (evt.charCode != 60 && evt.charCode != 62) { // A character is typed (Not '<' or '>' for HTML reasons)
        CLI.currentInput += String.fromCharCode(evt.which);
        container.innerHTML = CLI.oldInput + CLI.currentInput;
    }
    window.scrollTo(0, document.body.scrollHeight); //Keep scrolling down

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
    } else if (evt.keyCode == 38) { //Up key history
        evt.preventDefault();
        if (CLI.commandPosition + 1 < CLI.commandHistory.length) {
            CLI.commandPosition++;
            CLI.currentInput = CLI.commandHistory[CLI.commandPosition];
            container.innerHTML = CLI.oldInput + CLI.currentInput + CLI.cursor;
        }
    } else if (evt.keyCode == 40) { //Down key history
        evt.preventDefault();
        if (CLI.commandPosition - 1 > -1) {
            CLI.commandPosition--;
            CLI.currentInput = CLI.commandHistory[CLI.commandPosition];
            container.innerHTML = CLI.oldInput + CLI.currentInput + CLI.cursor;
        }
    }
}

function doCommand(input) {  //Commands are sent here to be parsed
    return Processes.listOfDevices['keyboard'].main(CLI.currentInput);
}

function cursor() {
    if (CLI.cursor == "")
        CLI.cursor = "_";
    else
        CLI.cursor = "";
    container.innerHTML = CLI.oldInput + CLI.currentInput + CLI.cursor;
}
