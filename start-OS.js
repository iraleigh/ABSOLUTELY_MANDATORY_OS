var Directory = {
  Files: [],
}

function File(szName,szContent){
    this.name = szName;
    this.content = szContent;
    this.position = 0;
    this.length = szContent.length;
    this.isName = function (szName) {
      return this.name === szName;
    }
    this.accessName = function(){
      return this.name;
    }
    this.accessContent = function(){
      return this.content;
    }
    this.accessPosition = function(){
      return this.position;
    }
    this.accessLength = function(){
      return this.length;
    }
    this.mutatePosition = function(nPosition) {
      this.position = nPosition;
    }
    this.mutateContent = function(szNewContent){
      this.content = szNewContent;
    }
}


var OS = {
  FS: {
    create: function(szFileName,szContent){
      Directory.Files.push(new File(szFileName,szContent));
    },
    delete: function(szFileName){
      var file;
      for each(file in Directory.Files){
        if(file.isName(szFileName)) delete file;
      }
    },
    open: function(szFileName){
      var file;
      for each(file in Directory.Files){
        if(file.isName(szFileName)) return file;
      }
    },
    close: function(szFileName){
      console.log(szFileName + " was closed.");
    },
    read: function(oFilePointer){
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
      return content;
    },
    write: function(oFilePointer,szInput){
      var contentOfFile = oFilePointer.accessContent();
      var positionInFile = oFilePointer.accessPosition();
      var lengthOfInput = szInput.length;
      var endIndex = positionInFile + lengthOfInput;
      var subString = contentOfFile.substring(positionInFile, endIndex);
      oFilePointer.mutateContent(contentOfFile.replace(subString,szInput));
    },
    position: function(oFilePointer){
      return oFilePointer.accessPosition();
    },
    length: function(oFilePointer){
      return oFilePointer.accessLength();
    },
    seek: function(oFilePointer,nOffset){
      var currentPosition = oFilePointer.accessPosition();
      var newPosition = currentPosition + nOffset;
      var length = oFilePointer.accessLength();
      if(newPosition >= 0 && newPosition < length){

        oFilePointer.mutatePosition(newPosition);
      }
    }
  }
}

var Processes = {
  listOfProcesses: [
    {
      name: "Bank Book Calculator",
      state: "Ready",
      main: function(){

        //Miles place your code here
        //Please use OS.FS functions to access files
      }
    },
    {
      name: "Contact Manager",
      state: "Ready",
      main: function(){

        //Alex place your code here
        //Please use OS.FS functions to access files

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

		var oContactManagerFile = OS.FS.open("ContactManager.csv");
        var length = OS.FS.length(oContactManagerFile);
        var content = "";

		//Dump the content into rows variable
		while(OS.FS.position(oContactManagerFile) < length){
          var content = content + OS.FS.read(oContactManagerFile);
        }

        var rows = content.split("\n").map(function(row){
          return row.split(",");
        });

		OS.FS.close("ContactManager Results.csv");

		//Hardcoded search person
		console.log("Searching info for Fletcher,Flosi");
		var searchFirstName = "Fletcher";
		var searchLastName = "Flosi";
		var output = "";
		//Search through all the entries
		for (i = 0; i < rows.length; i++){
			if (rows[i][0] == searchFirstName && rows[i][1] == searchLastName){
				//Write the entry to output variable
				for (j = 0; j <rows[i].length; j++){
					output += rows[i][j];
					//Add a comma except for at the end
					if (j < (rows[i].length - 1))
						output += ",";
				}
				output += "\n";
			}
		}
		console.log("To be written: "+ output);

		//Open and write to the resultant file
		OS.FS.create("ContactManager Results.csv","");
		var oContactManagerResultFile = OS.FS.open("ContactManager Results.csv");
		OS.FS.write(oContactManagerResultFile,output);
		OS.FS.close("ContactManager Results.csv");
      }
    },
    {
      name: "Update Security File",
      state: "Ready",
      main: function(){

        //Iain place your code here
        //Please use OS.FS functions to access files
        var cUSER_NAME = "iain";
        var cPASSWORD = "newPassword";
        OS.FS.create("securityFile.csv",
          "alex,password1\n" +
          "alvin,password2\n" +
          "harry,password3\n" +
          "iain,password4\n" +
          "matt,password4\n" +
          "miles,password4"
        );
        var oSecurityFile = OS.FS.open("securityFile.csv");
        var length = OS.FS.length(oSecurityFile);
        var content = "";
        while(OS.FS.position(oSecurityFile) < length){
          var content = content + OS.FS.read(oSecurityFile);
        }

        var rows = content.split("\n").map(function(row){
          return row.split(",");
        });

        rows = rows.map(function(row){
          if(row[0] == cUSER_NAME){
            row[1] = cPASSWORD;
          }
          return row[0] + "," + row[1];
        });

        content = ""

        rows.forEach(function (element,index,array){
          content = content + element + "\n";
        });

        OS.FS.seek(oSecurityFile, -OS.FS.position(oSecurityFile));
        OS.FS.write(oSecurityFile,content);
        OS.FS.close("securityFile.csv");
      }
    },
    {
      name: "Find Routes",
      state: "Ready",
      main: function(){

        // instantiating a csv file while passing through 100 routes to it
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

        // creating a pointer to the csv file
        var oRouteFile = OS.FS.open("route.csv");

        var length = OS.FS.length(oRouteFile);
        var content = "";

        while(OS.FS.position(oRouteFile) < length){
          var content = content + OS.FS.read(oRouteFile);
        }

        var rows = content.split("\n").map(function(row){
          return row.split(",");
        });

        var result = "";

        // parsing through the content for a specific route
        rows.forEach(function (element,index,array){
          if(rows[index][0] == "SFO" && rows[index][1] == "MEM"){
            result = rows[index][0] + " " + rows[index][1] + " " + rows[index][2];
          }
        });


        OS.FS.create("result.csv", result);
        OS.FS.close("route.csv");
        OS.FS.close("result.csv");

      }
    },
    {
      name: "Calculate Vectors",
      state: "Ready",
      main: function(){

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

        //pointer to CSV file
        oVectorDataPointer = OS.FS.open("vectorData.csv");
        //length of CSV file
        iFileLength = OS.FS.length(oVectorDataPointer);

        var szContent = "";

        //read in the CSV file and assign it to contents
        while(OS.FS.position(oVectorDataPointer) < iFileLength)
        {
            szContent = szContent + OS.FS.read(oVectorDataPointer);
        }

        //take the contents and put it in an array
        var szVectorData = szContent.split(",");

        //Idk why, but I need to -2 from the length instead of -1.
        var i = ( szVectorData.length - 2 );


        var iOutputDataJ = 0;
        var iOutputDataI = 0;

        //Loop while we have more vectors to add.
        while( i >= 0)
        {
          //add I component
          if( i%2 == 0)
          {
              iOutputDataI = (iOutputDataI + (+szVectorData[i]))
          }

          //add J component
          if( i%2 == 1)
          {
              iOutputDataJ = (iOutputDataJ + (+szVectorData[i]));
          }

            i--;
        }

        var szResults = (iOutputDataI.toString() + "i, ") + iOutputDataJ.toString() + "j";


        OS.FS.create("Results.csv", szResults);
        OS.FS.close("vectorData");

      }
    },
    {
      name: "Calculate Stats",
      state: "Ready",
      main: function(){

        //Harry place your code here
        //Please use OS.FS functions to access files
          console.log("Calculating Stats.");
          OS.FS.create("statsFile.csv",
              "1.10\n" + "5.09\n" + "0.97\n" + "1.59\n" + "4.60\n" + "0.32\n" +
              "0.55\n" + "1.45\n" + "0.14\n" + "4.47\n" + "1.20\n" + "3.50\n" +
              "5.02\n" + "4.67\n" + "5.22\n" + "2.69\n" + "3.98\n" + "3.17\n" +
              "3.03\n" + "2.21\n" + "0.69\n" + "4.47\n" + "3.31\n" + "1.17\n" +
              "0.76\n" + "1.17\n" + "1.57\n" + "2.62\n" + "1.66\n" + "2.05\n");

          var oStatsFile = OS.FS.open("statsFile.csv");
          var iLength = OS.FS.length(oSStatsFile);
          var szContent = "";
          while (OS.FS.position(oStatsFile) < iLength)
          {
              var szContent = szContent + OS.FS.read(oStatsFile);
          }

          var rows = szContent.split("\n").map(function(row)
          {
              return row.split(",");
          });

          var result = "";

          // Sort data in ascending order and display on console
          var sortData = function(file)
          {
              file.sort();
              result += "\nSorted data (ascending order): " + file;
              result += "\nNumber of data: " + file.length;
          };
          sortData(oStatsFile);

          // Find the smallest value of the data
          // After sorting data, first index of the array is the smallest value
          var minValue = function(file)
          {
              minValue = file[0];
              result += "\nMinimum value: " + minValue;
          };
          minValue(oStatsFile);

          // Find the biggest value
          // Rearrange the array in reverse order,
          // the biggest value is in the first index of the array
          var maxValue = function(file)
          {
              file.sort();		// this makes sure the array is sorted first
              file.reverse();
              maxValue = file[0];
              result += "\nMaximum value: " + maxValue;
          };
          maxValue(oStatsFile);

          // Find the range which are also minimum value and maximum value
          var dataRange = function(file)
          {
              result += "\nData range: ( " + minValue + ", " + maxValue + " )";
          };
          dataRange(oStatsFile);

          // Find the total sum of the data by using for-loop
          var totalSum = function(file)
          {
              var total = 0;
              for (var i = 0; i < file.length; i++)
              {
                  total = total + file[i];
              }
              totalSum = total;
              result +=  "\nTotal sum: " + totalSum;
          };
          totalSum(oStatsFile);

          // Find the average value of the data
          var meanValue = function(file)
          {
              meanValue = totalSum/file.length;
              result += "\nMean value: " + meanValue;
          };
          meanValue(oStatsFile);

          // Find the median value of the data
          var medianValue = function(file)
          {
              // Array need to be sorted first in order to find the median
              file.sort();

              // Check if the array's size is even or odd
              if ( file.length % 2 === 1)
              {
                  medianValue = file[(file.length / 2) - .5];
              }
              else if ( file.length % 2 === 0)
              {
                  var position1 = (file.length / 2);
                  var position2 = (file.length / 2) - 1;
                  medianValue = (file[position1] +file[position2]) / 2;
              }
              result += "\nMedian Value: " + medianValue;
          };
          medianValue(oStatsFile);

          // Find sample variance
          var sampleVariance = function(file)
          {
              var sum = 0;
              for (var i = 0; i < file.length; i++)
              {
                  var temp = file[i] - meanValue;
                  var temp1 = Math.pow(temp,2);
                  sum = sum + temp1;
              }
              sampleVariance = sum/(file.length - 1);
              result += "\nSample Variance: " + sampleVariance;
          };
          sampleVariance(oStatsFile);

          // Find standard deviation
          var standardDeviation = function(file)
          {
              // Standard deviation is the square root of sample variance
              standardDeviation = Math.sqrt(sampleVariance);
              result += "Standard Deviation: " + standardDeviation;
          };
          standardDeviation(oStatsFile);

          OS.FS.create("statsResult.csv", result);
          OS.FS.close("statsFile.csv");
          OS.FS.close("statsResult.csv");
      }
    },
    {
      name: "Custon Process",
      state: "Ready",
      main: function(){

        //Lets do some thing fun here
        //Please use OS.FS functions to access files
      }
    },
  ]
}





window.onload = function(){
  start = function() {
    var container = window.document.getElementById('container');
    container.innerHTML = "Starting OS...";

    //These are some samples of how to call the functions
    //please only use OS.FS functions and nothing else

    // OS.FS.create("file1","Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero. Sed dignissim lacinia nunc. Curabitur tortor. Pellentesque nibh. Aenean quam. In scelerisque sem at dolor. Maecenas mattis. Sed convallis tristique sem. Proin ut ligula vel nunc egestas porttitor. Morbi lectus risus, iaculis vel, suscipit quis, luctus non, massa. Fusce ac turpis quis ligula lacinia aliquet. Mauris ipsum. Nulla metus metus, ullamcorper vel, tincidunt sed, euismod in, nibh. Quisque volutpat condimentum velit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nam nec ante. Sed lacinia, urna non tincidunt mattis, tortor neque adipiscing diam, a cursus ipsum ante quis turpis. Nulla facilisi. Ut fringilla. Suspendisse potenti. Nunc feugiat mi a tellus consequat imperdiet. Vestibulum sapien. Proin quam. Etiam ultrices. Suspendisse in justo eu magna luctus suscipit. Sed lectus. Integer euismod lacus luctus magna. Quisque cursus, metus vitae pharetra auctor, sem massa mattis sem, at interdum magna augue eget diam. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Morbi lacinia molestie dui. Praesent blandit dolor. Sed non quam. In vel mi sit amet augue congue elementum. Morbi in ipsum sit amet pede facilisis laoreet. Donec lacus nunc, viverra nec.");
    // OS.FS.create("file2","content");
    // OS.FS.create("file3","content");
    // OS.FS.create("file4","content");
    //var filePointer = OS.FS.open("file1");
    //container.innerHTML += "<br />"+ OS.FS.read(filePointer);
    // OS.FS.seek(filePointer,50);
    // OS.FS.write(filePointer,"This is a custom string to replace the old one");
    // container.innerHTML += OS.FS.read(filePointer);

  }
  start();
}
