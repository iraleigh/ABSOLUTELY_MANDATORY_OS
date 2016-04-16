Processes.listOfDevices['display'] = {
    name: "Display",
    state: "Ready",
    main: function (output) {
        CLI.STDOut += '\n' + output;
    },
    clear: function () {
        CLI.oldInput = "";
        CLI.currentInput = "AMOS";
    },
    outputToConsole: function () {
        CLI.currentInput += CLI.STDOut;
    }
}