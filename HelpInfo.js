var HelpInfo = {
    getManual: function (processName) {
        for (getman_i = 0; getman_i < this.listOfHelp.length; getman_i++) {
            if (this.listOfHelp[getman_i].name == processName) {
                CurrentManual.manual = this.listOfHelp[getman_i].helpText;
                CurrentManual.usage = this.listOfHelp[getman_i].usage;
                return true;
            }
        }
        return false; //Error, no manual found
    },
    listOfHelp: []
}

function Manual(name, usage, helpText) {
    this.name = name;
    this.usage = usage;
    this.helpText = helpText;
}

var CurrentManual = {
    manual: "",
    usage: ""
}