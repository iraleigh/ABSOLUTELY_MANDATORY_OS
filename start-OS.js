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
		console.log("Calculating Stats.");  
      OS.FS.create("statsFile.csv", 
                   "1.10\n" + "5.09\n" + "0.97\n" + "1.59\n" + "4.60\n" + "0.32\n" +
                   "0.55\n" + "1.45\n" + "0.14\n" + "4.47\n" + "1.20\n" + "3.50\n" +
                   "5.02\n" + "4.67\n" + "5.22\n" + "2.69\n" + "3.98\n" + "3.17\n" +
                   "3.03\n" + "2.21\n" + "0.69\n" + "4.47\n" + "3.31\n" + "1.17\n" + 
                   "0.76\n" + "1.17\n" + "1.57\n" + "2.62\n" + "1.66\n" + "2.05\n");
      
      var oStatsFile = OS.FS.open("statsFile.csv");
      var length = OS.FS.length(oSStatsFile);
      var content = "";
      while (OS.FS.position(oStatsFile) < length)
      {
        var content = content + OS.FS.read(oStatsFile);
      }
      
      var rows = content.split("\n").map(function(row)
        {
          return row.split(",");
        });
        
      OS.FS.close("statsFile.csv");

	       // Sort data in ascending order and display on console
      var sortData = function(file)
      {
          file.sort();
          document.write("<br>Sorted data (ascending order): " + file);
          document.write("<br>Number of data: " + file.length);
      };
      sortData(iData);

      	// Find the smallest value of the data 
	      // After sorting data, first index of the array is the smallest value
      var minValue = function(file)
      {
          minValue = file[0];
          document.write("<br>Minimum value: " + minValue);
      };
      minValue(iData);

	      // Find the biggest value
	      // Rearrange the array in reverse order,
	      // the biggest value is in the first index of the array
      var maxValue = function(file)
      {
	        file.sort();		// this makes sure the array is sorted first
          file.reverse();
          maxValue = file[0];
          document.write("<br>Maximum value: " + maxValue);
      };
      maxValue(iData);

	       // Find the range which are also minimum value and maximum value
      var dataRange = function(file)
      {
          document.write("<br>Data range: ( " + minValue + ", " + maxValue + " )");
      };
      dataRange(iData);

	       // Find the total sum of the data by using for-loop
      var totalSum = function(file)
      {
          var total = 0;
          for (var i = 0; i < file.length; i++)
          {
              total = total + file[i];
          }
          totalSum = total;
          document.write("<br>Total sum: " + totalSum);
      };
      totalSum(iData);

	       // Find the average value of the data
      var meanValue = function(file)
      {
          meanValue = totalSum/file.length;
          document.write("<br>Mean value: " + meanValue);
      };
      meanValue(iData);

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
          document.write( "<br>Median Value: " + medianValue);
      };
      medianValue(iData);

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
          document.write("<br>Sample Variance: " + sampleVariance);
      };
      sampleVariance(iData);
      
        // Find standard deviation
      var standardDeviation = function(file)
      {
        // Standard deviation is the square root of sample variance
          standardDeviation = Math.sqrt(sampleVariance);
          document.write("<br>Standard Deviation: " + standardDeviation);
      };
      standardDeviation(iData);
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
