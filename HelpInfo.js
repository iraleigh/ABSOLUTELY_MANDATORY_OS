var HelpInfo = {
    //Path processes are OS functions like cat and ls, as opposed to RoutesCalculator
    //When calling man by itself, for teaching the user how to use the OS, we only want OS processes.
    getPathManuals: function(){
        var pathMans = new Array();
        for (getman_i = 0; getman_i < this.listOfHelp.length; getman_i++) {
            if (this.listOfHelp[getman_i].path)
                pathMans.push(this.listOfHelp[getman_i].name);
        }
        return pathMans;
    },
    getManual: function (processName) {
        for (getman_i = 0; getman_i < this.listOfHelp.length; getman_i++) {
            if (this.listOfHelp[getman_i].name == processName) {
                return this.listOfHelp[getman_i].helpText;
            }
        }
        return "No manual found";
    },
    listOfHelp: []
}

function Manual(name, helpText, path) { // (string, string, bool)
    this.name = name;
    this.helpText = helpText;
    this.path = path;
}