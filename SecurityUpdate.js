/**
 * Created by internet on 2/26/2016.
 */
var SecurityUpdate = function(counter){
    switch(counter) {
        case 0:
            //Iain place your code here
            //Please use OS.FS functions to access files
            super.var.cUSER_NAME = "iain";
            super.var.cPASSWORD = "newPassword";
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
            super.var.oSecurityFile = OS.FS.open("securityFile.csv");
            break;

        case 2:
            super.var.oSecurityFile = super.var.returnedFile;

            OS.FS.length(super.var.oSecurityFile);
            break;

        case 3:
            super.var.content = "";

            OS.FS.position(super.var.oSecurityFile);
            break;

        case 4:

            OS.FS.read(super.var.oSecurityFile);
            break;

        case 5:
            super.var.content =
                super.var.content + super.var.returnedFromRead;

            OS.FS.position(super.var.oSecurityFile);
            break;

        case 6:
            if(super.var.position < super.var.length) {
                //Processes.listOfProcesses[2].main(4);
                super.programCounter = 4;
                break;
            }else{
                super.programCounter++;
            }
        case 7:
            var rows = super.var.content
                .split("\n").map(
                    function(row){
                        return row.split(",");
                    }
                );

            rows = rows.map(function(row){
                if(row[0] == super.var.cUSER_NAME){
                    row[1] = super.var.cPASSWORD;
                }
                return row[0] + "," + row[1];
            });

            var result = "";

            rows.forEach(function (element,index,array){
                result = result + element + "\n";
            });

            super.var.content = result;

            OS.FS.seek(super.var.oSecurityFile, -super.var.postion);
            break;

        case 8:
            OS.FS.write(super.var.oSecurityFile, super.var.content);
            break;

        case 9:
            //container.innerHTML += "</br>" + Processes.listOfProcesses[2].variables.content;
            OS.FS.close("securityFile.csv");
        default:
            super.state = "Stop";

    }
}
