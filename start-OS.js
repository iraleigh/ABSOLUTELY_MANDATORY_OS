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
      var file;
      for (i = 0; i < Directory.Files.length; i++){
        if(Directory.Files[i].isName(szFileName)) delete Directory.Files[i];
      }
    },
    open: function(szFileName){
      var file;
      for (i = 0; i < Directory.Files.length; i++){
        if(Directory.Files[i].isName(szFileName)) return Directory.Files[i];
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

        var aryBankBook = new Array;
        var nBankBookTotal = 0.0;
        var container = window.document.getElementById('container');

        //Create data for file if it doesn't exist
        var szFileName = "bankBook.csv";
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



        //open file
        console.log(szFileName);
        var oBankBookFile = OS.FS.open(szFileName);
        //var szBankBookFile = Directory.Files[0];
        var szBankBook= OS.FS.read(oBankBookFile);
        console.log(szBankBook);


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

        //container.innerHTML = szFormattedResults;
        //log(szFormattedResults);
        //create new file
        //save results to new file

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
  Processes.listOfProcesses[0].main();
}
