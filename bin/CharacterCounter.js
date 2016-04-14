var CharacterCounter = function (counter){
    this.var.testFile = "file";
    var result = "";

    this.newThread('one', function(counter){
        switch(counter){
            case 0:
                OS.FS.create("charTestFile.csv",
                    "Create a process that opens multiple threads." +
                    "Each thread will watch for a character Aa .. Zz, 1 .. 0," +
                    " Special Characters. Each time the thread finds a character," +
                    " it updates the count for that character in a shared array. " +
                    "Output the array to a file.");
                break;

            case 1:
                this.var.oCharTestFile = OS.FS.open("charTestFile.csv");
                break;

            case 2:
                OS.FS.length(this.var.oCharTestFile);
                break;

            case 3:
                this.var.szContent = "";
                OS.FS.position(this.var.oCharTestFile);
                break;

            case 4:
                OS.FS.read(this.var.oCharTestFile);
                break;

            case 5:
                this.var.szContent += this.var.returnedFromRead;
                OS.FS.position(this.var.oCharTestFile);
                break;

            case 6:
                if (this.var.position < this.var.length/2){
                    this.program_counter = 4;
                    break;
                }
                else {
                    this.program_counter++;
                    break;
                }

            case 7:
                var string  =  this.var.szContent;
                var getFrequency = function(string){
                    var frequency = {};
                    for (var i=0; i<string.length; i++){
                        var character = string.charAt(i);
                        if (frequency[character]){
                            frequency[character]++;
                        }
                        else{
                            frequency[character] = 1;
                        }
                    }
                    result += frequency;
                }
                getFrequency(string);
                OS.FS.create("charCount.csv", result);
                break;

            case 8:
                OS.FS.close("charCount.csv");

                break;
            case 9:
                OS.FS.close("charCount.csv");

            default:
                this.state = 'Stop';

        }
    });

    this.newThread('two', function(counter){
        switch(counter){
            case 0:
                OS.FS.create("charTestFile1.csv",
                    "Create your own process – This process must come from one of these" +
                    "specialties … Math, Physics, Chemistry, or Data Processing. The process " +
                    "must read a file and output a file, or update a file. The process must " +
                    "calculate or change the data in some significant fashion. It must either " +
                    "spawn another process or it must create up to 3 threads to perform a process.");
                break;

            case 1:
                this.var.oCharTestFile = OS.FS.open("charTestFile1.csv");
                break;

            case 2:
                OS.FS.length(this.var.oCharTestFile);
                break;

            case 3:
                this.var.szContent = "";
                OS.FS.position(this.var.oCharTestFile);
                break;

            case 4:
                OS.FS.read(this.var.oCharTestFile);
                break;

            case 5:
                this.var.szContent += this.var.returnedFromRead;
                OS.FS.position(this.var.oCharTestFile);
                break;

            case 6:
                if (this.var.position < this.var.length){
                    this.program_counter = 4;
                    break;
                }
                else {
                    this.program_counter++;
                    break;
                }

            case 7:
                var string  =  this.var.szContent;
                var getFrequency = function(string){
                    var frequency = {};
                    for (var i=0; i<string.length; i++){
                        var character = string.charAt(i);
                        if (frequency[character]){
                            frequency[character]++;
                        }
                        else{
                            frequency[character] = 1;
                        }
                    }
                    result += frequency;
                }
                getFrequency(string);
                OS.FS.create("charCount.csv", result);
                break;

            case 8:
                OS.FS.close("charCount.csv");

                break;
            case 9:
                OS.FS.close("charCount.csv");

            default:
                this.state = 'Stop';

        }
    });

    this.threads['one'].run();
    this.threads['two'].run();

    this.state = 'Stop';
}

Processes.listOfProcesses.push(new Process("CountCharacters", CharacterCounter));