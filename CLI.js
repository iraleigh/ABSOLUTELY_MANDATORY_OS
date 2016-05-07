var CLI = {
    currentInput: "",
    oldInput: "",
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
    },
    render: function () {
        container.innerHTML = CLI.oldInput + CLI.currentInput + CLI.cursor;
    },
    lastCommand: "",
    promptMode: false,
    prompt: function (question) {
        OS.display(question);
        CLI.render();
        CLI.promptMode = true;
    },
    promptResult: ""
}

var container;
window.onload = function () {
    init_d();
    setInterval(cursor, 500);
    container = window.document.getElementById('container');
}

document.onkeypress = function (evt) {
    evt = evt || window.event;
    if (evt.charCode == 13) { // On enter
        if (evt.shiftKey) { //If shift if held, insert a newline instead
            CLI.currentInput += "\n";
            CLI.render();
            window.scrollTo(0, document.body.scrollHeight); //Keep scrolling down
            return;
        }
        if (CLI.promptMode == false) {
            //Grab the function here
            CLI.commandPosition = 0;
            CLI.commandHistory.splice(1, 0, CLI.currentInput);
            if (CLI.commandHistory.length > 21) // n+1 -- limit how back history goes
                CLI.commandHistory.pop();
            var cmdStatus = doCommand(CLI.currentInput);
        } else {
            CLI.promptResult = CLI.currentInput;
            CLI.promptMode = false;
            doCommand(CLI.lastCommand);
        }
        start();
        //Prep terminal for new line
        if (cmdStatus == CLI.status.BAD_COMMAND)
            CLI.currentInput += "\nUnknown command";

        CLI.STDIn = "";
        CLI.STDOut = "";
        if (CLI.promptMode == false) {
            if (OS.FS.getPwd() == Directory.Files) {
                CLI.currentInput += "\n\n" + CurrentUserSingleton.getInstance().getUserName() + ": <b>/</b>> ";
            }
            else {
                CLI.currentInput += "\n\n" + CurrentUserSingleton.getInstance().getUserName() + ": <b>" + OS.FS.getPwdTopLevel() + "/</b>> ";
            }
        }
        container.innerHTML = CLI.oldInput + CLI.currentInput;

        CLI.oldInput = CLI.oldInput + CLI.currentInput;
        CLI.currentInput = "";

    } else if (evt.charCode != 60 && evt.charCode != 62) { // A character is typed (Not '<' or '>' for HTML reasons)
        CLI.currentInput += String.fromCharCode(evt.charCode);
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
        CLI.render();

        }
    } else if (evt.keyCode == 38) { //Up key history
        evt.preventDefault();
        if (CLI.commandPosition + 1 < CLI.commandHistory.length) {
            CLI.commandPosition++;
            CLI.currentInput = CLI.commandHistory[CLI.commandPosition];
        CLI.render();
        }
    } else if (evt.keyCode == 40) { //Down key history
        evt.preventDefault();
        if (CLI.commandPosition - 1 > -1) {
            CLI.commandPosition--;
            CLI.currentInput = CLI.commandHistory[CLI.commandPosition];
        CLI.render();
        }
    }
    window.scrollTo(0, document.body.scrollHeight); //Keep scrolling down
}

function doCommand(input) {  //Commands are sent here to be parsed
    return Processes.listOfDevices['keyboard'].main(input);
}

function cursor() {
    if (CLI.cursor == " ")
        CLI.cursor = "_";
    else
        CLI.cursor = " ";
    container.innerHTML = CLI.oldInput + CLI.currentInput + CLI.cursor;
}
