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
    this.mutatePositon = function(nPosition) {
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
      for(var file of Directory.Files){
        if(file.isName(szFileName)) delete file;
      }
    },
    open: function(szFileName){
      for(var file of Directory.Files){
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
        oFilePointer.mutatePositon(endIndex);
      }else {
        content = oFilePointer.accessContent().substring(position);
        oFilePointer.mutatePositon(length);
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
      if(newPosition > 0 && newPosition < length){
        oFilePointer.mutatePositon(newPosition);
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
        //0
        //Miles place your code here
        //Please use OS.FS functions to access files
      }
    },
    {
      name: "Contact Manager",
      state: "Ready",
      main: function(){
        //1
        //Alex place your code here
        //Please use OS.FS functions to access files
      }
    },
    {
      name: "Update Security File",
      state: "Ready",
      main: function(){
        //2
        //Iain place your code here
        //Please use OS.FS functions to access files
      }
    },
    {
      name: "Find Routes",
      state: "Ready",
      main: function(){

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


        var test = false;
        var i = 0;
        while(test == false ){
          if(rows[i][0] == "CHI" && rows[i][1] == "OAK"){
            result = rows[i][0] + " " + rows[i][1] + " " + rows[i][2];
            test = true; //basically return true;
          }
          i++;
        }


        /*
        rows.forEach(function (element,index,array){
          if(rows[index][0] == "POR" && rows[index][1] == "ORL"){
            result = rows[index][0] + " " + rows[index][1] + " " + rows[index][2];
          }
          else{
            result = "Starting to destination city's route were not found.";
          }
        });
        */


        OS.FS.create("result.csv", result);
        OS.FS.close("route.csv");
        OS.FS.close("result.csv");

        console.log(result);

        //3
        //Alvin place your code here
        //Please use OS.FS functions to access files
      },
      findRoute: function(szFileName){

      }

    },
    {
      name: "Calculate Vectors",
      state: "Ready",
      main: function(){
        //4
        //Matt place your code here
        //Please use OS.FS functions to access files
      }
    },
    {
      name: "Calculate Stats",
      state: "Ready",
      main: function(){
        //5
        //Harry place your code here
        //Please use OS.FS functions to access files
      }
    },
    {
      name: "Custon Process",
      state: "Ready",
      main: function(){
        //6
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

    Processes.listOfProcesses[3].main(); //starts the find route process

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
