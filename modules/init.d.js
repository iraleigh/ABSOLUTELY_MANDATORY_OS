function init_d() {
    //OS
    Processes.generateListOfProcesses();
    addDummyFiles();
    //CLI
    CLI.oldInput = "<b>AMOS</b>\nFor help getting started, type 'help'\n\n ";
    CLI.commandHistory.push("");
    window.document.getElementById('container').innerHTML = CLI.oldInput + CLI.cursor;
    //Device init
    Processes.listOfDevices['keyboard'].name = "Keyboard";
    Processes.listOfDevices['keyboard'].state = "Ready";
    Processes.listOfDevices['display'].name = "Display";
    Processes.listOfDevices['display'].state = "Ready";
    Processes.listOfDevices['file_io'].name = "File IO";
    Processes.listOfDevices['file_io'].state = "Ready";


    //var guestUser = new User("Guest", "password");
    //currentUserSingleton(guestUser).getInstance();
    currentUserSingleton.getInstance();
}