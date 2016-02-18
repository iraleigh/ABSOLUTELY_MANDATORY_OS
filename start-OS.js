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
      }
    },
    {
      name: "Update Security File",
      state: "Ready",
      main: function(){
        //Iain place your code here
        //Please use OS.FS functions to access files
      }
    },
    {
      name: "Find Routes",
      state: "Ready",
      main: function(){
        //Alvin place your code here
        //Please use OS.FS functions to access files
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

        console.log(szResults);

        OS.FS.create("Results.csv", szResults);
        OS.FS.close("vectorData");

        //Matt place your code here
        //Please use OS.FS functions to access files
      }
    },
    {
      name: "Calculate Stats",
      state: "Ready",
      main: function(){
        //Harry place your code here
        //Please use OS.FS functions to access files
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

    Processes.listOfProcesses[4].main();
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
