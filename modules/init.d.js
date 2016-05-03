function init_d() {
    //Initialize the current user
    CurrentUserSingleton.getInstance();

    //initialize users on the OS.
    OS.Users.push(new User("Guest", "Password"));
    OS.Users.push(new User("matt", "cool"));

    //Set the current user to Matt so all the files upon start up will belong to me.
    CurrentUserSingleton.setInstance(OS.Users[1]);

    //OS
    Processes.generateListOfProcesses();

    //OS.Users.push(["Super"])

    console.log("before dummy");
    addDummyFiles();
    console.log("after dummy");
    //CLI
    CLI.oldInput = "<b>AMOS</b>\nFor help getting started, type 'help'\n\n/> ";
    CLI.commandHistory.push("");
    OS.FS.setPwd(Directory.Files);
    window.document.getElementById('container').innerHTML = CLI.oldInput + CLI.cursor;
    //Device init
    Processes.listOfDevices['keyboard'].name = "Keyboard";
    Processes.listOfDevices['keyboard'].state = "Ready";
    Processes.listOfDevices['display'].name = "Display";
    Processes.listOfDevices['display'].state = "Ready";
    Processes.listOfDevices['file_io'].name = "File IO";
    Processes.listOfDevices['file_io'].state = "Ready";
    //Super user init
    OS.Users['Super'] = new User('Super', 'MattsCool');
    //Set the current user back to the guest user.
    //CurrentUserSingleton.setInstance(OS.Users[0]);
    console.log(CurrentUserSingleton.getInstance());
}