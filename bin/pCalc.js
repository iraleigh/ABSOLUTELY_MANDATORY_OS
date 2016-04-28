var pCalc = function(counter){

  switch(counter{

    case 0:
      //Open file
      this.var.szFilename = this.args[0];
      this.var.returnedFile = OS.FS.open(this.var.szFileName);
    break;

    case 1:
      //Read file
      this.var.szPosition = OS.FS.position(this.var.returnedFile);
    break;

    case 2:
      this.var.szFileLenght = OS.FS.length(this.var.returnedFile);
    break;

    case 3:
      while(OS.FS.position(this.var.returnedFile) < this.var.szFileLenght){
        this.var.szFileContent += OS.FS.read(this.var.returnedFile);
      }
    break;

    case 4:
    //Aggregate momentum


    //Aggregate centripetal acceleration

    //Aggregate projectile range

    break;

  })
    this.var.szFilename = this.args[0];

    OS.FS.open(this.var.szFileName);



    this.state = "Stop";
    this.program_counter = 0;
}
Processes.listOfProcesses.push(new Process("pCalc",pCalc));
