function init_d() {
    //OS
    Processes.generateListOfProcesses();
    addDummyFiles();
    //CLI
    CLI.commandHistory.push("");
    window.document.getElementById('container').innerHTML = CLI.oldInput + CLI.cursor;
}