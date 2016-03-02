/**
 * Created by internet on 2/26/2016.
 */
var RoutesCalculator = function (counter){
    switch (counter) {
        case 0:
            OS.FS.create("route.csv", "POR,ORL,3031\n" +
                "SFO,CHI,2132\n" +
                "DEN,POR,1243\n" +
                "NYC,SFO,2915\n" +
                "MIA,DEN,2067\n" +
                "HOU,NYC,1630\n" +
                "LAX,MIA,2733\n" +
                "LAS,HOU,3031\n" +
                "CLE,LAX,2132\n" +
                "SEA,LAS,1243\n" +
                "TOR,CLE,2915\n" +
                "IND,SEA,2067\n" +
                "MIN,TOR,1630\n" +
                "MIL,IND,2733\n" +
                "BOS,MIN,3031\n" +
                "PHI,MIL,2132\n" +
                "OAK,BOS,1243\n" +
                "SAC,PHI,2915\n" +
                "DAL,OAK,2067\n" +
                "OKC,SAC,1630\n" +
                "CHA,DAL,2733\n" +
                "PHX,OKC,3031\n" +
                "MEM,CHA,2132\n" +
                "ORL,PHX,1243\n" +
                "CHI,MEM,2915\n" +
                "POR,PHX,2067\n" +
                "SFO,MEM,1630\n" +
                "DEN,ORL,2733\n" +
                "NYC,CHI,3031\n" +
                "MIA,POR,2132\n" +
                "HOU,SFO,1243\n" +
                "LAX,DEN,2915\n" +
                "LAS,NYC,2067\n" +
                "CLE,MIA,1630\n" +
                "SEA,HOU,2733\n" +
                "TOR,LAX,3031\n" +
                "IND,LAS,2132\n" +
                "MIN,CLE,1243\n" +
                "MIL,SEA,2915\n" +
                "BOS,TOR,2067\n" +
                "PHI,IND,1630\n" +
                "OAK,MIN,2733\n" +
                "SAC,MIL,3031\n" +
                "DAL,BOS,2132\n" +
                "OKC,PHI,1243\n" +
                "CHA,OAK,2915\n" +
                "PHX,SAC,2067\n" +
                "MEM,DAL,1630\n" +
                "ORL,OKC,2733\n" +
                "CHI,CHA,3031\n" +
                "POR,OKC,2132\n" +
                "SFO,CHA,1243\n" +
                "DEN,PHX,2915\n" +
                "NYC,MEM,2067\n" +
                "MIA,ORL,1630\n" +
                "HOU,CHI,2733\n" +
                "LAX,POR,3031\n" +
                "LAS,SFO,2132\n" +
                "CLE,DEN,1243\n" +
                "SEA,NYC,2915\n" +
                "TOR,MIA,2067\n" +
                "IND,HOU,1630\n" +
                "MIN,LAX,2733\n" +
                "MIL,LAS,3031\n" +
                "BOS,CLE,2132\n" +
                "PHI,SEA,1243\n" +
                "OAK,TOR,2915\n" +
                "SAC,IND,2067\n" +
                "DAL,MIN,1630\n" +
                "OKC,MIL,2733\n" +
                "CHA,BOS,3031\n" +
                "PHX,PHI,2132\n" +
                "MEM,OAK,1243\n" +
                "ORL,SAC,2915\n" +
                "CHI,DAL,2067\n" +
                "POR,SAC,1630\n" +
                "SFO,DAL,2733\n" +
                "DEN,OKC,3031\n" +
                "NYC,CHA,2132\n" +
                "MIA,PHX,1243\n" +
                "HOU,MEM,2915\n" +
                "LAX,ORL,2067\n" +
                "LAS,CHI,1630\n" +
                "CLE,POR,2733\n" +
                "SEA,SFO,3031\n" +
                "TOR,DEN,2132\n" +
                "IND,NYC,1243\n" +
                "MIN,MIA,2915\n" +
                "MIL,HOU,2067\n" +
                "BOS,LAX,1630\n" +
                "PHI,LAS,2733\n" +
                "OAK,CLE,3031\n" +
                "SAC,SEA,2132\n" +
                "DAL,TOR,1243\n" +
                "OKC,IND,2915\n" +
                "CHA,MIN,2067\n" +
                "PHX,MIL,1630\n" +
                "MEM,BOS,2733\n" +
                "ORL,PHI,3031\n" +
                "CHI,OAK,2132\n"
            );
            break;
        case 1:

            super.var.oRouteFile = OS.FS.open("route.csv");
            break;
        case 2:
            super.var.oRouteFile = super.var.returnedFile;
            OS.FS.length(super.var.oRouteFile);
            break;
        case 3:

            super.var.content = "";


            OS.FS.position(super.var.oRouteFile);
            break;
        case 4:
            OS.FS.read(super.var.oRouteFile);
            break;

        case 5:

            super.var.content =
                super.var.content + super.var.returnedFromRead;


            OS.FS.position(super.var.oRouteFile);
            break;
        case 6:

            if(super.var.position < super.var.length){
                //Processes.listOfProcesses[3].main(4);
                super.programCounter = 4;
                break;
            } else {
                super.programCounter++;
            }
            var rows = super.var.content
                .split("\n").map(
                    function(row){
                        return row.split(",");
                    }
                );

            var result = "";

            // parsing through the content for a specific route
            rows.forEach(function (element,index,array){
                if(rows[index][0] == "SFO" && rows[index][1] == "MEM"){
                    result = rows[index][0] + " " + rows[index][1] + " " + rows[index][2];
                }
            });
            super.var.result = result;

            OS.FS.create("result.csv", result);
            break;

        case 7:
            OS.FS.close("route.csv");
            break;

        case 8:
            //container.innerHTML += "</br>" + Processes.listOfProcesses[3].variables.result;
            OS.FS.close("result.csv");
        default:
            super.state = "Stop";
    }
}

Processes.listOfProcesses.push(new Process("Routes", routesCalculator));