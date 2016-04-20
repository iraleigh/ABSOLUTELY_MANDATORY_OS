function init_d() {
    //OS
    Processes.generateListOfProcesses();
    addDummyFiles();
    //CLI
    CLI.oldInput = "<b>AMOS</b>\nFor help getting started, type 'help'\n\n\\> ";
    CLI.commandHistory.push("");
    window.document.getElementById('container').innerHTML = CLI.oldInput + CLI.cursor;
}