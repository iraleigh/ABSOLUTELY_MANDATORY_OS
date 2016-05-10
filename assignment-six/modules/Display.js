Processes.listOfDevices['display'] = {
    main: function (output) {
        CLI.STDOut += '\n' + output;
    },
    clear: function () {
        CLI.oldInput = "";
        CLI.currentInput = "<b>AMOS</b>";
    },
    outputToConsole: function () {
        CLI.currentInput += CLI.STDOut;
    }
}