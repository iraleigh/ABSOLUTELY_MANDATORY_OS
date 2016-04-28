var CAPACITY = 100000000;


Processes.listOfDevices['file_io'] = {
      main: function(){
        console.log(OS.ProcessQueue.queue.length);
        if (OS.ProcessQueue.queue.length > 0){
          return OS.ProcessQueue.dequeue();
        }
      },
      create: function(szNameOFCallingFunction,szFileName,szContent){
        console.log("Device creating for " + szNameOFCallingFunction);
        var process = Processes.findProcessByName(szNameOFCallingFunction);
        //container.innerHTML += "</br>Creating "+szFileName+" for "+process.name;
        console.log(process.state);
        process.state = "Ready";

        process.program_counter++;

        if (Processes.listOfDevices['file_io'].capacityReached()) {
          process.state = "Stop";
          OS.display("Hard Drive Capacity Reached! Process: " + process.name + " terminated.");
        } else {
          Directory.Files.push(new File(szFileName,szContent));
        }
        
      },
      delete: function(szNameOFCallingFunction,szFileName){
        var szSetPwd = false;
        var aryParsedPath = szFileName.split("/");
        var aryPathChars = szFileName.split();
        var oCurrentDir = undefined;

        var oTargetFile = OS.FS.getDirectory(szFileName);
        console.log("Target file: " + szFileName);

        if(oTargetFile.fileType == "Directory"){
          console.log("Target is a directory.");
          var oParentDir = oTargetFile.parentDir;
          if(oParentDir != Directory.Files){
            var nTargetIndex = undefined;
            for (var n = 0; n < oParentDir.content.length; n++){
              if(oParentDir.content[n].name == aryParsedPath[aryParsedPath.length -1]){
                nTargetIndex = n;
                console.log("Target directory is at index " + n);
              }
            }
            oParentDir.content.splice(nTargetIndex,1); //delete target
          }
          else{
            var nTargetIndex = undefined;
            for (var n = 0; n < Directory.Files.length; n++){
              if(Directory.Files[n].name == aryParsedPath[aryParsedPath.length -1]){
                nTargetIndex = n;
                console.log("Target directory is at index " + n);
              }
            }
            Directory.Files.splice(nTargetIndex, 1);
            console.log("Deleting directory.");
          }
        }
        else if (oTargetFile.fileType == "File"){
          console.log("Target is a file.");
          //Target is a file, not a directory
          var szParentPath = "";
          if(aryPathChars[0] == "/"){
            szParentPath += "";
          }
          for(var n = 0; n < aryParsedPath.length -1; n++){
            szParentPath += aryParsedPath[n] + "/";
          }
          var oParentDir = OS.FS.getDirectory(szParentPath);

          if(oParentDir != Directory.Files){
            var nTargetIndex = undefined;
            for (var n = 0; n < oParentDir.content.length; n++){
              if(oParentDir.content[n].name == aryParsedPath[aryParsedPath.length -1]){
                nTargetIndex = n;
                console.log("Target file is at index " + n);
              }
            }
            oParentDir.content.splice(nTargetIndex,1);
          }
          else{
            var nTargetIndex = undefined;
            for (var n = 0; n < Directory.Files.length; n++){
              if(Directory.Files[n].name == aryParsedPath[aryParsedPath.length -1]){
                nTargetIndex = n;
                console.log("Target file is at index " + n);
              }
            }
            Directory.Files.splice(nTargetIndex,1);
            console.log("Deleting target file.");
          }

        }
        else{
          console.log("Unable to read file type.");
        }
        console.log("Device deleting for " + szNameOFCallingFunction);
        var process = Processes.findProcessByName(szNameOFCallingFunction);
        //container.innerHTML += "</br>Deleting "+szFileName+" for "+process.name;
        console.log(process.state);
        process.state = "Ready";

        process.program_counter++;

        if(OS.FS.getPwd() == Directory.Files){
          szSetPwd = true;
        }

        Directory.Files = Directory.Files.filter(function(file, index ,directory){
          return !file.isName(szFileName);
        });
        if(szSetPwd == true){
          OS.FS.setPwd(Directory.Files);
        }
      },
      open: function(szNameOFCallingFunction,szFileName){
        console.log("Device opening for " + szNameOFCallingFunction);
        var process = Processes.findProcessByName(szNameOFCallingFunction);
        //container.innerHTML += "</br>Opening "+szFileName+" for "+process.name;
        console.log(process.state);
        process.state = "Ready";
        process.var.returnedFile = undefined;
        process.program_counter++;
        //get directory
        var aryParsedPath = szFileName.split("/");
        var nPathDepth = aryParsedPath.length;
        var szPathString = "";
        var oTargetDir = undefined;
        console.log(szFileName);
          console.log(aryParsedPath);

        if(aryParsedPath.length > 1){
          for(var n = 0; n < aryParsedPath.length -1; n++){
            szPathString += aryParsedPath[n] + "/";
            console.log("Path length > 1");
          }
          oTargetDir = OS.FS.getDirectory(szPathString);
            console.log("Path length > 2");
        }
        else{
          console.log("Path length = 1");
          oTargetDir = OS.FS.getPwd();
        }

        if(oTargetDir == Directory.Files){
          console.log("File is located at root directory.");
          for(var n = 0; n < Directory.Files.length; n++){
            if(Directory.Files[n].isName(aryParsedPath[nPathDepth -1 ])) {
              process.var.returnedFile = Directory.Files[n];
              console.log("Found the file.");
              return Directory.Files[n];
            }
          }
        }
        else{
          console.log("File is located in a subdirectory");
          for(var n = 0; n < Directory.Files.length; n++){
            if(oTargetDir.content[n].isName(aryParsedPath[nPathDepth - 1])) {
              process.var.returnedFile = oTargetDir.content[n];
              console.log(oTargetDir.content[n]);
              return oTargetDir.content[n];
            }
          }
        }


      },
      close: function(szNameOFCallingFunction,szFileName){
        console.log("Device closing for " + szNameOFCallingFunction);
        var process = Processes.findProcessByName(szNameOFCallingFunction);
       // container.innerHTML += "</br>Closing "+szFileName+" for "+process.name;
        console.log(process.state);
        process.state = "Ready";

        process.program_counter++;

        console.log(szFileName + " was closed.");
      },
      read: function(szNameOFCallingFunction,oFilePointer){
        console.log("Device reading for " + szNameOFCallingFunction);
        var process = Processes.findProcessByName(szNameOFCallingFunction);
       // container.innerHTML += "</br>Reading from "+oFilePointer.accessName();
        console.log(process.state);
        process.state = "Ready";

        process.program_counter++;

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

        process.var.returnedFromRead = content;

      },
      write: function(szNameOFCallingFunction,oFilePointer,szInput){
        console.log("Device writing for " + szNameOFCallingFunction);
        var process = Processes.findProcessByName(szNameOFCallingFunction);
       // container.innerHTML += "</br>Writing to "+oFilePointer.accessName();
        console.log(process.state);
        process.state = "Ready";

        process.program_counter++;

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
      //  container.innerHTML += "</br>Accessing position of "+oFilePointer.accessName();
        console.log(process.state);
        process.state = "Ready";

        process.program_counter++;
        process.var.position =  oFilePointer.accessPosition();

      },
      lengthOfFile: function(szNameOFCallingFunction,oFilePointer){
        console.log("Device acquiring length for " + szNameOFCallingFunction);
        var process = Processes.findProcessByName(szNameOFCallingFunction);
     //   container.innerHTML += "</br>Accessing length of "+oFilePointer.accessName();
        console.log(process.state);
        process.state = "Ready";

        process.program_counter++;
        console.log(oFilePointer);
        process.var.length = oFilePointer.accessLength();

      },
      seek: function(szNameOFCallingFunction,oFilePointer,nOffset){
        console.log("Device seeking for " + szNameOFCallingFunction);
        var process = Processes.findProcessByName(szNameOFCallingFunction);
     //   container.innerHTML += "</br>Seeking "+oFilePointer.accessName();+
                               " offset: "+ nOffset;
        console.log(process.state);
        process.state = "Ready";

        process.program_counter++;

        var currentPosition = oFilePointer.accessPosition();
        var newPosition = currentPosition + nOffset;
        var length = oFilePointer.accessLength();
        if(newPosition >= 0 && newPosition < length){
          oFilePointer.mutatePosition(newPosition);
        }
      },

      capacityReached: function() {

        var currentSize = Directory.Files.reduce(flatten_callback, Directory.Files[0].accessLength());

        return currentSize >= CAPACITY;
      }

    }


var flatten_callback = function (previous, current, index, array){
  if (current instanceof Dir) {
    return current.content.reduce(flatten_callback, previous);
  } else {
    return previous + current.accessLength();
  }
}

