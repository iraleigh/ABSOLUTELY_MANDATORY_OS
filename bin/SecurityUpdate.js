/**
 * Created by internet on 2/26/2016.
 */
var SecurityUpdate = function(counter){
    switch(counter) {
        case 0:
            //Iain place your code here
            //Please use OS.FS functions to access files
            this.var.cUSER_NAME = "iain";
            this.var.cPASSWORD = "newPassword";
            OS.FS.create("securityFile.csv",
                "alex,password1\n" +
                "alvin,password2\n" +
                "harry,password3\n" +
                "iain,password4\n" +
                "matt,password4\n" +
                "miles,password4"
            );
            break;
        case 1:
        
            this.var.oSecurityFile = OS.FS.open("securityFile.csv");
            break;

        case 2:
            this.var.oSecurityFile = this.var.returnedFile;

            OS.FS.length(this.var.oSecurityFile);
            break;

        case 3:
            this.var.content = "";

            OS.FS.position(this.var.oSecurityFile);
            break;

        case 4:

            OS.FS.read(this.var.oSecurityFile);
            break;

        case 5:
            this.var.content =
                this.var.content + this.var.returnedFromRead;

            OS.FS.position(this.var.oSecurityFile);
            break;

        case 6:
            if(this.var.position < this.var.length) {
                //Processes.listOfProcesses[2].main(4);
                this.program_counter = 4;
                break;
            }else{
                this.program_counter++;
            }
        case 7:
            var rows = this.var.content
                .split("\n").map(
                    function(row){
                        return row.split(",");
                    }
                );
            var cUSER_NAME = this.var.cUSER_NAME;
            var cPASSWORD = this.var.cPASSWORD;

            rows = rows.map(function(row){
                if(row[0] == cUSER_NAME){
                    row[1] = cPASSWORD;
                }
                return row[0] + "," + row[1];
            });

            var result = "";

            rows.forEach(function (element,index,array){
                result = result + element + "\n";
            });

            this.var.content = result;

            OS.FS.seek(this.var.oSecurityFile, -this.var.postion);
            break;

        case 8:
            OS.FS.write(this.var.oSecurityFile, this.var.content);
            break;

        case 9:
            //container.innerHTML += "</br>" + Processes.listOfProcesses[2].variables.content;
            OS.FS.close("securityFile.csv");
        default:
            this.state = "Stop";

    }
}
Processes.listOfProcesses.push(new Process("SecurityUpdate",SecurityUpdate));
