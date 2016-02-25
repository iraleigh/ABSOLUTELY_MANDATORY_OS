var charCount = 0;
var currentInput = "";
var oldInput = "AMOS<br /> \\> ";

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
        window.scrollTo(0, document.body.scrollHeight); //Keep scrolling down
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
        evt.preventDefault(); //Don't go the previous webpage!!
        if (currentInput.length > 0) { //To be safe
            currentInput = currentInput.slice(0, currentInput.length - 1); //Remove a character
            container.innerHTML = oldInput + currentInput;
        }
    }
}

function doCommand(input) {  //Commands are sent here to be parsed
    console.log(input);
    if (currentInput.toUpperCase() == "CLEAR") { //Clears screen
        container.innerHTML = "";
        oldInput = "";
        currentInput = "AMOS";
    }
}