var Processes = {
  generateListOfProcesses: function(){
    Processes.listOfProcesses.forEach(function(element,index,array){
      element.main.displayName = element.name;
    });
  },
  findProcessByName: function(szProcessName){
    var oProcess;
    Processes.listOfProcesses.forEach(function(element,index,array){
      if(element.name == szProcessName){
        oProcess = element;
      }
    });
    return oProcess;
  },
  listOfProcesses: [/*
    {
      name: "Bank Book Calculator",
      state: "Ready",
      programCounter: 0,
      variables:{

      },
      main: function(counter){
        switch(counter){
          case 0:

            var aryBankBook = new Array;
            var nBankBookTotal = 0.0;
            var container = window.document.getElementById('container');

            //Create data for file if it doesn't exist
            var szFileName = "bankBook.csv";
            Processes.listOfProcesses[0].variables.szFileName = szFileName;
            var nBankBookSize = 25;

              for (i = 0; i < nBankBookSize; i++){
                //Create a bank book with net positive values

                var szTransactionType = getTransactionType();
                var nTransactionAmount = getTransactionAmount(szTransactionType);

                if(i == 0){
                  aryBankBook[i,0] = szTransactionType;
                  aryBankBook[i,1] = nTransactionAmount;
                }
                else{
                  //console.log(i);
                  var j = i - 1;
                  var nPreviousAmount = aryBankBook[j,1];
                  var szPreviousType = aryBankBook[j,0];
                  while(nPreviousAmount == nTransactionAmount){
                    szTransactionType = getTransactionType();
                    nTransactionAmount = getTransactionAmount(szTransactionType);
                  }
                  aryBankBook[i,0] = szTransactionType;
                  aryBankBook[i,1] = nTransactionAmount;

                }
                console.log(aryBankBook[i,0]);
                console.log(aryBankBook[i,1]);

              }

              //Create file
              var szFileContents;
              for(k = 0; k < nBankBookSize; k++){
                console.log(k);
                console.log(aryBankBook[k,0]);
                console.log(aryBankBook[k,1]);
                szFileContents = szFileContents + aryBankBook[k,0] + ",";
                szFileContents = szFileContents + aryBankBook[k,1] + ",";

              }
              OS.FS.create(szFileName,szFileContents);

          break;
          case 1:

            console.log(Processes.listOfProcesses[0].variables.szFileName);
            OS.FS.open(Processes.listOfProcesses[0].variables.szFileName);

          break;
          case 2:
            Processes.listOfProcesses[0].variables.oBankBookFile = 
              Processes.listOfProcesses[0].variables.returnedFile;

              //length of CSV file
              OS.FS.length(Processes.listOfProcesses[0].variables.oBankBookFile);
          break;
          case 3:
              Processes.listOfProcesses[0].variables.szContent = "";

              //read in the CSV file and assign it to contents
              OS.FS.position(Processes.listOfProcesses[0].variables.oBankBookFile)
          break;
          case 4:
              OS.FS.read(Processes.listOfProcesses[0].variables.oBankBookFile);
          break;
          case 5:
              Processes.listOfProcesses[0].variables.szContent +=
                Processes.listOfProcesses[0].variables.returnedFromRead;

              OS.FS.position(Processes.listOfProcesses[0].variables.oBankBookFile);
          break;
          case 6:
              if (Processes.listOfProcesses[0].variables.position <
                   Processes.listOfProcesses[0].variables.length){
                Processes.listOfProcesses[0].programCounter = 0;
                break;
              } else {
                Processes.listOfProcesses[0].programCounter++;
                break;
              }
          case 7:

          var szBankBook = Processes.listOfProcesses[0].variables.szContent;

          //loop to parse CSV
            var aryBankBook = new Array;
            var aryTempBook = szBankBook.split(",");
            for (i = 0; i < aryTempBook.length; i++){
              var nRowFloat = i / 2;
              var nBankBookRow = Math.floor(nRowFloat);
              if(i % 2 == 0){
                aryBankBook[nBankBookRow,0] = aryTempBook[i];
              }
              else{
                aryBankBook[nBankBookRow,1] = aryTempBook[i];
              }
            }

            //add running total
            for (i = 0; i < aryBankBook.length; i++){
              nBankBookTotal = (nBankBookTotal + Number(aryBankBook[i,1]))
              console.log(nBankBookTotal);
            }

            //display results
            var szFormattedResults = "Bank Book<br>";
            szFormattedResults = "<table>";
            for (i = 0; i < aryBankBook.length; i++){
              szFormattedResults = szFormattedResults + "<tr><td>";
              szFormattedResults = szFormattedResults + aryBankBook[i,0];
              szFormattedResults = szFormattedResults + "</td>"
              szFormattedResults = szFormattedResults + "<td style=\"text-align:right\">"
              szFormattedResults = szFormattedResults + aryBankBook[i,1];
              szFormattedResults = szFormattedResults + "</td></tr>"
            }
            szFormattedResults = szFormattedResults + "<tr><td>"
            szFormattedResults = szFormattedResults + "Total: </td>"
            szFormattedResults = szFormattedResults + "<td style=\"text-align:right\">"
            szFormattedResults = szFormattedResults + nBankBookTotal;
            szFormattedResults = szFormattedResults + "</td></tr></table>"

            Processes.listOfProcesses[0].programCounter++;

              break;
          default:
              Processes.listOfProcesses[0].state = "Stop";


        }

        function getTransactionType(){
            var nTransactionType = Math.floor(Math.random() * 4.0);
            var szTransactionName;

            if (nTransactionType == 0)
              szTransactionName = "Deposit";
            else if (nTransactionType == 1)
              szTransactionName = "Withdrawal";
            else if (nTransactionType == 2)
              szTransactionName = "Check";
            else if (nTransactionType == 3)
              szTransactionName = "Debit";

              //console.log(szTransactionName);

            return szTransactionName;
        }

        function getTransactionAmount(szTransactionType){
              var nTransactionAmount;
              var nFormattedResult;
              if (szTransactionType == "Deposit")
                nTransactionAmount = 500.0 * Math.random();
              else if (szTransactionType == "Withdrawal")
                nTransactionAmount = -100.0 * Math.random();
              else if (szTransactionType == "Check")
                nTransactionAmount = -250.0 * Math.random();
              else
                nTransactionAmount = -160.0 * Math.random();

                nFormattedResult = Number(nTransactionAmount).toFixed(2);
                //console.log(nFormattedResult);

              return nFormattedResult;
        }

      }
    },
    {
      name: "Contact Manager",
      state: "Ready",
      programCounter: 0,
      variables:{},
      main: function(counter){
        switch (counter){
          case 0:
          console.log("Contact Manger called.")
          //Sorry for this:
          //Contacts from https://www.briandunning.com/sample-data/
          OS.FS.create("ContactManager.csv",
          "James,Butt,6649 N Blue Gum St,New Orleans,LA,70116,504-621-8927,jbutt@gmail.com\n"
          + "Josephine,Darakjy,4 B Blue Ridge Blvd,Brighton,MI,48116,810-292-9388,josephine_darakjy@darakjy.org\n"
          + "Art,Venere,8 W Cerritos Ave #54,Bridgeport,NJ,8014,856-636-8749,art@venere.org\n"
          + "Lenna,Paprocki,639 Main St,Anchorage,AK,99501,907-385-4412,lpaprocki@hotmail.com\n"
          + "Donette,Foller,34 Center St,Hamilton,OH,45011,513-570-1893,donette.foller@cox.net\n"
          + "Simona,Morasca,3 Mcauley Dr,Ashland,OH,44805,419-503-2484,simona@morasca.com\n"
          + "Mitsue,Tollner,7 Eads St,Chicago,IL,60632,773-573-6914,mitsue_tollner@yahoo.com\n"
          + "Leota,Dilliard,7 W Jackson Blvd,San Jose,CA,95111,408-752-3500,leota@hotmail.com\n"
          + "Sage,Wieser,5 Boston Ave #88,Sioux Falls,SD,57105,605-414-2147,sage_wieser@cox.net\n"
          + "Kris,Marrier,228 Runamuck Pl #2808,Baltimore,MD,21224,410-655-8723,kris@gmail.com\n"
          + "Minna,Amigon,2371 Jerrold Ave,Kulpsville,PA,19443,215-874-1229,minna_amigon@yahoo.com\n"
          + "Abel,Maclead,37275 St  Rt 17m M,Middle Island,NY,11953,631-335-3414,amaclead@gmail.com\n"
          + "Kiley,Caldarera,25 E 75th St #69,Los Angeles,CA,90034,310-498-5651,kiley.caldarera@aol.com\n"
          + "Graciela,Ruta,98 Connecticut Ave Nw,Chagrin Falls,OH,44023,440-780-8425,gruta@cox.net\n"
          + "Cammy,Albares,56 E Morehead St,Laredo,TX,78045,956-537-6195,calbares@gmail.com\n"
          + "Mattie,Poquette,73 State Road 434 E,Phoenix,AZ,85013,602-277-4385,mattie@aol.com\n"
          + "Meaghan,Garufi,69734 E Carrillo St,Mc Minnville,TN,37110,931-313-9635,meaghan@hotmail.com\n"
          + "Gladys,Rim,322 New Horizon Blvd,Milwaukee,WI,53207,414-661-9598,gladys.rim@rim.org\n"
          + "Yuki,Whobrey,1 State Route 27,Taylor,MI,48180,313-288-7937,yuki_whobrey@aol.com\n"
          + "Fletcher,Flosi,394 Manchester Blvd,Rockford,IL,61109,815-828-2147,fletcher.flosi@yahoo.com\n"
          + "Bette,Nicka,6 S 33rd St,Aston,PA,19014,610-545-3615,bette_nicka@cox.net\n"
          + "Veronika,Inouye,6 Greenleaf Ave,San Jose,CA,95111,408-540-1785,vinouye@aol.com\n"
          + "Willard,Kolmetz,618 W Yakima Ave,Irving,TX,75062,972-303-9197,willard@hotmail.com\n"
          + "Maryann,Royster,74 S Westgate St,Albany,NY,12204,518-966-7987,mroyster@royster.com\n"
          + "Alisha,Slusarski,3273 State St,Middlesex,NJ,8846,732-658-3154,alisha@slusarski.com\n"
          + "Allene,Iturbide,1 Central Ave,Stevens Point,WI,54481,715-662-6764,allene_iturbide@cox.net\n"
          + "Chanel,Caudy,86 Nw 66th St #8673,Shawnee,KS,66218,913-388-2079,chanel.caudy@caudy.org\n"
          + "Ezekiel,Chui,2 Cedar Ave #84,Easton,MD,21601,410-669-1642,ezekiel@chui.com\n"
          + "Willow,Kusko,90991 Thorburn Ave,New York,NY,10011,212-582-4976,wkusko@yahoo.com\n"
          + "Bernardo,Figeroa,386 9th Ave N,Conroe,TX,77301,936-336-3951,bfigeroa@aol.com\n"
          + "Ammie,Corrio,74874 Atlantic Ave,Columbus,OH,43215,614-801-9788,ammie@corrio.com\n"
          + "Francine,Vocelka,366 South Dr,Las Cruces,NM,88011,505-977-3911,francine_vocelka@vocelka.com\n"
          + "Ernie,Stenseth,45 E Liberty St,Ridgefield Park,NJ,7660,201-709-6245,ernie_stenseth@aol.com\n"
          + "Albina,Glick,4 Ralph Ct,Dunellen,NJ,8812,732-924-7882,albina@glick.com\n"
          + "Alishia,Sergi,2742 Distribution Way,New York,NY,10025,212-860-1579,asergi@gmail.com\n"
          + "Solange,Shinko,426 Wolf St,Metairie,LA,70002,504-979-9175,solange@shinko.com\n"
          + "Jose,Stockham,128 Bransten Rd,New York,NY,10011,212-675-8570,jose@yahoo.com\n"
          + "Rozella,Ostrosky,17 Morena Blvd,Camarillo,CA,93012,805-832-6163,rozella.ostrosky@ostrosky.com\n"
          + "Valentine,Gillian,775 W 17th St,San Antonio,TX,78204,210-812-9597,valentine_gillian@gmail.com\n"
          + "Kati,Rulapaugh,6980 Dorsett Rd,Abilene,KS,67410,785-463-7829,kati.rulapaugh@hotmail.com\n"
          + "Youlanda,Schemmer,2881 Lewis Rd,Prineville,OR,97754,541-548-8197,youlanda@aol.com\n"
          + "Dyan,Oldroyd,7219 Woodfield Rd,Overland Park,KS,66204,913-413-4604,doldroyd@aol.com\n"
          + "Roxane,Campain,1048 Main St,Fairbanks,AK,99708,907-231-4722,roxane@hotmail.com\n"
          + "Lavera,Perin,678 3rd Ave,Miami,FL,33196,305-606-7291,lperin@perin.org\n"
          + "Erick,Ferencz,20 S Babcock St,Fairbanks,AK,99712,907-741-1044,erick.ferencz@aol.com\n"
          + "Fatima,Saylors,2 Lighthouse Ave,Hopkins,MN,55343,952-768-2416,fsaylors@saylors.org\n"
          + "Jina,Briddick,38938 Park Blvd,Boston,MA,2128,617-399-5124,jina_briddick@briddick.com\n"
          + "Kanisha,Waycott,5 Tomahawk Dr,Los Angeles,CA,90006,323-453-2780,kanisha_waycott@yahoo.com\n"
          + "Emerson,Bowley,762 S Main St,Madison,WI,53711,608-336-7444,emerson.bowley@bowley.org\n"
          + "Blair,Malet,209 Decker Dr,Philadelphia,PA,19132,215-907-9111,bmalet@yahoo.com");
          break;
          case 1:
          OS.FS.open("ContactManager.csv");
          break;

          case 2:
          Processes.listOfProcesses[1].variables.oContactManagerFile =
          Processes.listOfProcesses[1].variables.returnedFile;


          OS.FS.length(Processes.listOfProcesses[1].variables.oContactManagerFile);

          //Dump the content into rows variable
          break;
          case 3:
          Processes.listOfProcesses[1].variables.content = "";

          OS.FS.position(Processes.listOfProcesses[1].variables.oContactManagerFile);
          break;

          case 4:

          OS.FS.read(Processes.listOfProcesses[1].variables.oContactManagerFile);
          break;

          case 5:
          Processes.listOfProcesses[1].variables.content =
          Processes.listOfProcesses[1].variables.content
          + Processes.listOfProcesses[1].variables.returnedFromRead;

          OS.FS.position(Processes.listOfProcesses[1].variables.oContactManagerFile);
          break;

          case 6:
          if(Processes.listOfProcesses[1].variables.position
            < Processes.listOfProcesses[1].variables.length) {
            Processes.listOfProcesses[1].programCounter = 4
            break;
          }else{
            Processes.listOfProcesses[1].programCounter++;
          }
          break;

          case 7:
          Processes.listOfProcesses[1].variables.rows =
          Processes.listOfProcesses[1].variables.content
          .split("\n").map(
            function(row){
              return row.split(",");
            }
          );

          OS.FS.close("ContactManager.csv");
          break;

          case 8:
          //Hardcoded search person
          console.log("Searching info for Fletcher,Flosi");
          var searchFirstName = "Fletcher";
          var searchLastName = "Flosi";
          var output = "";
          var rows = Processes.listOfProcesses[1].variables.rows;
          //Search through all the entries
          for (i = 0; i < rows.length; i++) {
            if (rows[i][0] == searchFirstName && rows[i][1] == searchLastName) {
              //Write the entry to output variable
              for (j = 0; j < rows[i].length; j++) {
                output += rows[i][j];
                //Add a comma except for at the end
                if (j < (rows[i].length - 1))
                output += ",";
              }
              output += "\n";
            }
          }
          console.log("To be written: " + output);
          Processes.listOfProcesses[1].variables.output = output;
          //Open and write to the resultant file
          OS.FS.create("ContactManager Results.csv", "");
          break;

          case 9:
          var oContactManagerResultFile = OS.FS.open("ContactManager Results.csv");
          break;

          case 10:
          Processes.listOfProcesses[1].variables.oContactManagerResultFile =
          Processes.listOfProcesses[1].variables.returnedFile;
          var output = Processes.listOfProcesses[1].variables.output;

          OS.FS.write(Processes.listOfProcesses[1].variables.oContactManagerResultFile, output);
          break;

          case 11:
          //container.innerHTML += "</br>" + Processes.listOfProcesses[1].variables.output;
          OS.FS.close("ContactManager Results.csv");

          default:
          Processes.listOfProcesses[1].state = "Stop";
      }
      }
    },
    {
      name: "Update Security File",
      state: "Ready",
      programCounter: 0,
      variables:{},
      main: function(counter){
        switch(counter) {
          case 0:
          //Iain place your code here
          //Please use OS.FS functions to access files
          Processes.listOfProcesses[2].variables.cUSER_NAME = "iain";
          Processes.listOfProcesses[2].variables.cPASSWORD = "newPassword";
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
          Processes.listOfProcesses[2].variables.oSecurityFile =
          OS.FS.open("securityFile.csv");
          break;

          case 2:
          Processes.listOfProcesses[2].variables.oSecurityFile =
          Processes.listOfProcesses[2].variables.returnedFile;

          OS.FS.length(Processes.listOfProcesses[2].variables.oSecurityFile);
          break;

          case 3:
          Processes.listOfProcesses[2].variables.content = "";

          OS.FS.position(Processes.listOfProcesses[2].variables.oSecurityFile);
          break;

          case 4:

          OS.FS.read(Processes.listOfProcesses[2].variables.oSecurityFile);
          break;

          case 5:
          Processes.listOfProcesses[2].variables.content =
          Processes.listOfProcesses[2].variables.content
          + Processes.listOfProcesses[2].variables.returnedFromRead;

          OS.FS.position(Processes.listOfProcesses[2].variables.oSecurityFile);
          break;

          case 6:
          if(Processes.listOfProcesses[2].variables.position
            < Processes.listOfProcesses[2].variables.length) {
            //Processes.listOfProcesses[2].main(4);
            Processes.listOfProcesses[2].programCounter = 4
            break;
          }else{
            Processes.listOfProcesses[2].programCounter++;
          }
          case 7:
          var rows = Processes.listOfProcesses[2].variables.content
          .split("\n").map(
            function(row){
              return row.split(",");
            }
          );

          rows = rows.map(function(row){
            if(row[0] == Processes.listOfProcesses[2].variables.cUSER_NAME){
              row[1] = Processes.listOfProcesses[2].variables.cPASSWORD;
            }
            return row[0] + "," + row[1];
          });

          var result = "";

          rows.forEach(function (element,index,array){
            result = result + element + "\n";
          });

          Processes.listOfProcesses[2].variables.content = result;

          OS.FS.seek(Processes.listOfProcesses[2].variables.oSecurityFile,
          -Processes.listOfProcesses[2].variables.postion);
          break;

          case 8:
          OS.FS.write(Processes.listOfProcesses[2].variables.oSecurityFile,
            Processes.listOfProcesses[2].variables.content);
          break;

          case 9:
          //container.innerHTML += "</br>" + Processes.listOfProcesses[2].variables.content;
          OS.FS.close("securityFile.csv");
          default:
          Processes.listOfProcesses[2].state = "Stop";

      }
    }
    },
    {
      name: "Routes",
      state: "Ready",
      programCounter: 0,
      variables:{},
      main: function(counter){
        //Alvin place your code here
        //Please use OS.FS functions to access files
        // instantiating a csv file while passing through 100 routes to it
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

         Processes.listOfProcesses[3].variables.oRouteFile =
           OS.FS.open("route.csv");
         break;
         case 2:
         Processes.listOfProcesses[3].variables.oRouteFile =
         Processes.listOfProcesses[3].variables.returnedFile;
         OS.FS.length(Processes.listOfProcesses[3].variables.oRouteFile);
         break;
         case 3:

         Processes.listOfProcesses[3].variables.content = "";


         OS.FS.position(Processes.listOfProcesses[3].variables.oRouteFile);
         break;
         case 4:
         OS.FS.read(Processes.listOfProcesses[3].variables.oRouteFile);
         break;

         case 5:

         Processes.listOfProcesses[3].variables.content =
           Processes.listOfProcesses[3].variables.content
           + Processes.listOfProcesses[3].variables.returnedFromRead;


         OS.FS.position(Processes.listOfProcesses[3].variables.oRouteFile);
         break;
         case 6:

         if(Processes.listOfProcesses[3].variables.position
           < Processes.listOfProcesses[3].variables.length){
           //Processes.listOfProcesses[3].main(4);
           Processes.listOfProcesses[3].programCounter = 4
           break;
         } else {
           Processes.listOfProcesses[3].programCounter++;
         }
         var rows = Processes.listOfProcesses[3].variables.content
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
         Processes.listOfProcesses[3].variables.result = result;

         OS.FS.create("result.csv", result);
         break;

         case 7:
         OS.FS.close("route.csv");
         break;

         case 8:
         //container.innerHTML += "</br>" + Processes.listOfProcesses[3].variables.result;
         OS.FS.close("result.csv");
         default:
         Processes.listOfProcesses[3].state = "Stop";
       }
      }
    },
    {
      name: "Calculate Vectors",
      state: "Ready",
      programCounter: 0,
      variables:{},
      main: function(counter){
        switch (counter){
          case 0:
              var oVectorDataPointer;
              var iFileLength;

              // Format for the CSV file is ( i-component,j-component )
              OS.FS.create("vectorData.csv", "4,2,\n" +
                                             "1,7,\n" +
                                             "-3,2,\n" +
                                             "6,9,\n" +
                                             "0,1,\n" +
                                             "2,5,\n" +
                                             "1,-9,\n" +
                                             "2,-2,\n" +
                                             "5,5,\n" +
                                             "-8,-10,\n");
          break;
          case 1:
              //pointer to CSV file
              OS.FS.open("vectorData.csv");
          break;
          case 2:
              Processes.listOfProcesses[4].variables.oVectorDataPointer = 
                 Processes.listOfProcesses[4].variables.returnedFile;
              //length of CSV file
              OS.FS.length(Processes.listOfProcesses[4].variables.oVectorDataPointer);
          break;
          case 3:
              Processes.listOfProcesses[4].variables.szContent = "";

              //read in the CSV file and assign it to contents
              OS.FS.position(Processes.listOfProcesses[4].variables.oVectorDataPointer)
          break;
          case 4:
              OS.FS.read(Processes.listOfProcesses[4].variables.oVectorDataPointer);
          break;
          case 5:
              Processes.listOfProcesses[4].variables.szContent +=
                Processes.listOfProcesses[4].variables.returnedFromRead;

              OS.FS.position(Processes.listOfProcesses[4].variables.oVectorDataPointer);
          break;
          case 6:
              if (Processes.listOfProcesses[4].variables.position <
                   Processes.listOfProcesses[4].variables.length){
                Processes.listOfProcesses[4].programCounter = 4;
                break;
              } else {
                Processes.listOfProcesses[4].programCounter++;
                break;
              }
          case 7:

              //take the contents and put it in an array
              var szVectorData = Processes.listOfProcesses[4].variables.szContent.split(",");

              //Idk why, but I need to -2 from the length instead of -1.
              var i = (szVectorData.length - 2);


              var iOutputDataJ = 0;
              var iOutputDataI = 0;

              //Loop while we have more vectors to add.
              while (i >= 0) {
                  //add I component
                  if (i % 2 == 0) {
                      iOutputDataI = (iOutputDataI + (+szVectorData[i]))
                  }

                  //add J component
                  if (i % 2 == 1) {
                      iOutputDataJ = (iOutputDataJ + (+szVectorData[i]));
                  }

                  i--;
              }

              var szResults = (iOutputDataI.toString() + "i, ") + iOutputDataJ.toString() + "j";


              OS.FS.create("Results.csv", szResults);
          break;
          case 8:
              OS.FS.close("vectorData");
          default:
          Processes.listOfProcesses[4].state = "Stop";
        }
      }
    },
    {
      name: "Calculate Stats",
      state: "Ready",
      programCounter: 0,
      variables:{},
      main: function(counter){
        switch(counter){
          case 0:
              console.log("Calculating Stats.");
              OS.FS.create("statsFile.csv",
                  "1.10\n" + "5.09\n" + "0.97\n" + "1.59\n" + "4.60\n" + "0.32\n" +
                  "0.55\n" + "1.45\n" + "0.14\n" + "4.47\n" + "1.20\n" + "3.50\n" +
                  "5.02\n" + "4.67\n" + "5.22\n" + "2.69\n" + "3.98\n" + "3.17\n" +
                  "3.03\n" + "2.21\n" + "0.69\n" + "4.47\n" + "3.31\n" + "1.17\n" +
                  "0.76\n" + "1.17\n" + "1.57\n" + "2.62\n" + "1.66\n" + "2.05\n");
          break;
          case 1:

             Processes.listOfProcesses[5].variables.oStatsFile = OS.FS.open("statsFile.csv");

          break;
          case 2:

              OS.FS.length(Processes.listOfProcesses[5].variables.oStatsFile);

          break;
          case 3:

              Processes.listOfProcesses[5].variables.szContent = "";
              OS.FS.position(Processes.listOfProcesses[5].variables.oStatsFile)

          break;  
          case 4:

              OS.FS.read(Processes.listOfProcesses[5].variables.oStatsFile)

          break;
          case 5:

              Processes.listOfProcesses[5].variables.szContent +=
                Processes.listOfProcesses[5].variables.returnedFromRead;

              OS.FS.position(Processes.listOfProcesses[5].variables.oStatsFile);

          break;
          case 6:
              if( Processes.listOfProcesses[5].variables.position < 
                    Processes.listOfProcesses[5].variables.length) {

                Processes.listOfProcesses[5].programCounter = 4;
                break;

              } else {

                Processes.listOfProcesses[5].programCounter++;
                break;

              }
          case 7:

          var rows = 
          Processes.listOfProcesses[5].variables.szContent.split("\n").map(function (row) {
                  return row.split(",");
              });

          oStatsFile = Processes.listOfProcesses[5].variables.oStatsFile;

          var result = "";

              // Sort data in ascending order and display on console
              var sortData = function (file) {
                  file.sort();
                  result += "\nSorted data (ascending order): " + file;
                  result += "\nNumber of data: " + file.length;
              };
              sortData(rows);

              // Find the smallest value of the data
              // After sorting data, first index of the array is the smallest value
              var minValue = function (file) {
                  minValue = file[0];
                  result += "\nMinimum value: " + minValue;
              };
              minValue(rows);

              // Find the biggest value
              // Rearrange the array in reverse order,
              // the biggest value is in the first index of the array
              var maxValue = function (file) {
                  file.sort();    // this makes sure the array is sorted first
                  file.reverse();
                  maxValue = file[0];
                  result += "\nMaximum value: " + maxValue;
              };
              maxValue(rows);

              // Find the range which are also minimum value and maximum value
              var dataRange = function (file) {
                  result += "\nData range: ( " + minValue + ", " + maxValue + " )";
              };
              dataRange(rows);

              // Find the total sum of the data by using for-loop
              var totalSum = function (file) {
                  var total = 0;
                  for (var i = 0; i < file.length; i++) {
                      total = total + file[i];
                  }
                  totalSum = total;
                  result += "\nTotal sum: " + totalSum;
              };
              totalSum(rows);

              // Find the average value of the data
              var meanValue = function (file) {
                  meanValue = totalSum / file.length;
                  result += "\nMean value: " + meanValue;
              };
              meanValue(rows);

              // Find the median value of the data
              var medianValue = function (file) {
                  // Array need to be sorted first in order to find the median
                  file.sort();

                  // Check if the array's size is even or odd
                  if (file.length % 2 === 1) {
                      medianValue = file[(file.length / 2) - .5];
                  }
                  else if (file.length % 2 === 0) {
                      var position1 = (file.length / 2);
                      var position2 = (file.length / 2) - 1;
                      medianValue = (file[position1] + file[position2]) / 2;
                  }
                  result += "\nMedian Value: " + medianValue;
              };
              medianValue(rows);

              // Find sample variance
              var sampleVariance = function (file) {
                  var sum = 0;
                  for (var i = 0; i < file.length; i++) {
                      var temp = file[i] - meanValue;
                      var temp1 = Math.pow(temp, 2);
                      sum = sum + temp1;
                  }
                  sampleVariance = sum / (file.length - 1);
                  result += "\nSample Variance: " + sampleVariance;
              };
              sampleVariance(rows);

              // Find standard deviation
              var standardDeviation = function (file) {
                  // Standard deviation is the square root of sample variance
                  standardDeviation = Math.sqrt(sampleVariance);
                  result += "Standard Deviation: " + standardDeviation;
              };
              standardDeviation(rows);

              OS.FS.create("statsResult.csv", result);

          break;
          case 8:
              OS.FS.close("statsFile.csv");

          break;
          case 9:
              OS.FS.close("statsResult.csv");

          default:
              Processes.listOfProcesses[5].state = "Stop";
        }
      }
    },
    {
      name: "Custon Process",
      state: "Stop",
      programCounter: 0,
      variables:{},
      main: function(){
        //Lets do some thing fun here
        //Please use OS.FS functions to access files
      }
    },
 */ ],
  listOfDevices: [
    {
      name: "File IO",
      state: "Ready",
      main: function(){
        console.log(OS.ProcessQueue.queue.length);
        if (OS.ProcessQueue.queue.length > 0){
          return OS.ProcessQueue.dequeue();
        } else {
          return OS.Scheduler.runNextProcess();
        }
      },
      create: function(szNameOFCallingFunction,szFileName,szContent){
        console.log("Device creating for " + szNameOFCallingFunction);
        var process = Processes.findProcessByName(szNameOFCallingFunction);
        container.innerHTML += "</br>Creating "+szFileName+" for "+process.name;
        console.log(process.state);
        process.state = "Ready";
        process.programCounter++;
        Directory.Files.push(new File(szFileName,szContent));
      },
      delete: function(szNameOFCallingFunction,szFileName){
        console.log("Device deleting for " + szNameOFCallingFunction);
        var process = Processes.findProcessByName(szNameOFCallingFunction);
        container.innerHTML += "</br>Deleting "+szFileName+" for "+process.name;
        console.log(process.state);
        process.state = "Ready";
        process.programCounter++;
        for(var file of Directory.Files){
          if(file.isName(szFileName));
        }
      },
      open: function(szNameOFCallingFunction,szFileName){
        console.log("Device opening for " + szNameOFCallingFunction);
        var process = Processes.findProcessByName(szNameOFCallingFunction);
        container.innerHTML += "</br>Opening "+szFileName+" for "+process.name;
        console.log(process.state);
        process.state = "Ready";
        process.programCounter++;
        for(var file of Directory.Files){
          if(file.isName(szFileName)) {
            process.variables.returnedFile = file;
            console.log(file);
            return file;
          }
        }
      },
      close: function(szNameOFCallingFunction,szFileName){
        console.log("Device closing for " + szNameOFCallingFunction);
        var process = Processes.findProcessByName(szNameOFCallingFunction);
        container.innerHTML += "</br>Closing "+szFileName+" for "+process.name;
        console.log(process.state);
        process.state = "Ready";
        process.programCounter++;
        console.log(szFileName + " was closed.");
      },
      read: function(szNameOFCallingFunction,oFilePointer){
        console.log("Device reading for " + szNameOFCallingFunction);
        var process = Processes.findProcessByName(szNameOFCallingFunction);
        container.innerHTML += "</br>Reading from "+oFilePointer.accessName();
        console.log(process.state);
        process.state = "Ready";
        process.programCounter++;
        var content;
        var position = oFilePointer.accessPosition();
        var length = oFilePointer.accessLength();
        var endIndex = position + 100;
        if (position >= length){
          return "";
        } else if(endIndex <= length){
          content = oFilePointer.accessContent().substring(position, endIndex);
          oFilePointer.mutatePosition(endIndex);
        }else {
          content = oFilePointer.accessContent().substring(position);
          oFilePointer.mutatePosition(length);
        }
        process.variables.returnedFromRead = content;
      },
      write: function(szNameOFCallingFunction,oFilePointer,szInput){
        console.log("Device writing for " + szNameOFCallingFunction);
        var process = Processes.findProcessByName(szNameOFCallingFunction);
        container.innerHTML += "</br>Writing to "+oFilePointer.accessName();
        console.log(process.state);
        process.state = "Ready";
        process.programCounter++;
        var contentOfFile = oFilePointer.accessContent();
        var positionInFile = oFilePointer.accessPosition();
        var lengthOfInput = szInput.length;
        var endIndex = positionInFile + lengthOfInput;
        var subString = contentOfFile.substring(positionInFile, endIndex);
        oFilePointer.mutateContent(contentOfFile.replace(subString,szInput));
      },
      position: function(szNameOFCallingFunction,oFilePointer){
        console.log("Device finding postion for " + szNameOFCallingFunction);
        var process = Processes.findProcessByName(szNameOFCallingFunction);
        container.innerHTML += "</br>Accessing position of "+oFilePointer.accessName();
        console.log(process.state);
        process.state = "Ready";
        process.programCounter++;
        process.variables.position =  oFilePointer.accessPosition();
      },
      lengthOfFile: function(szNameOFCallingFunction,oFilePointer){
        console.log("Device acquiring length for " + szNameOFCallingFunction);
        var process = Processes.findProcessByName(szNameOFCallingFunction);
        container.innerHTML += "</br>Accessing length of "+oFilePointer.accessName();
        console.log(process.state);
        process.state = "Ready";
        process.programCounter++;
        console.log(oFilePointer);
        process.variables.length = oFilePointer.accessLength();
      },
      seek: function(szNameOFCallingFunction,oFilePointer,nOffset){
        console.log("Device seeking for " + szNameOFCallingFunction);
        var process = Processes.findProcessByName(szNameOFCallingFunction);
        container.innerHTML += "</br>Seeking "+oFilePointer.accessName();+
                               " offset: "+ nOffset;
        console.log(process.state);
        process.state = "Ready";
        process.programCounter++;
        var currentPosition = oFilePointer.accessPosition();
        var newPosition = currentPosition + nOffset;
        var length = oFilePointer.accessLength();
        if(newPosition >= 0 && newPosition < length){
          oFilePointer.mutatePosition(newPosition);
        }
      }
    },
  ]
}
