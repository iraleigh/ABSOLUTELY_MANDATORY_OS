var charCount = 0;
var currentInput = "";
var oldInput = "Starting AMOS...<br /> \\> ";

window.onload = function () {
    //ABSOLUTELY MADATORY OS -- AMOS
    container.innerHTML = oldInput;
}

document.onkeypress = function (evt) {
    evt = evt || window.event;
    if (evt.charCode == 13) { // On enter
        //Grab the function here
        doCommand(currentInput);

        //Prep terminal for new line
        currentInput += "<br /> \\> ";
        container.innerHTML = oldInput + currentInput;
        oldInput = oldInput + currentInput;
        currentInput = "";

    } else { // A character is typed
        currentInput += String.fromCharCode(evt.which);
        container.innerHTML = oldInput + currentInput;

    }
}

//Backspace works a little differently
document.onkeydown = function (evt) {
    evt = evt || window.event;
    if (evt.keyCode == 8) { // On backspace
        if (currentInput.length > 0) { //To be safe
            currentInput = currentInput.slice(0, currentInput.length - 1);
            container.innerHTML = oldInput + currentInput;
        }
    }
}

function doCommand(input) {  //Commands are sent here to be parsed
    console.log(input);
}