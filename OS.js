var OS = {
  FS: {
    create: function(szFileName,szContent){
      //Processes.listOfDevices[0].create(szFileName,szContent);
      console.log("In Create");
      var process = Processes.findProcessByName(OS.FS.create.caller.displayName);
      container.innerHTML += "</br> Adding "+ process.name + " to queue";
      process.state = "Waiting";
      OS.ProcessQueue.enqueue(
        OS.ProcessQueue.wrapFunction(
          Processes.listOfDevices[0].create,
          OS.FS.create.caller,
          [OS.FS.create.caller.displayName,szFileName,szContent]
        )
      );
      OS.Scheduler.runNextProcess() ;
      //OS.ProcessQueue.dequeue();
      //Processes.listOfDevices[0].main();
    },
    delete: function(szFileName){
      //Processes.listOfDevices[0].delete(szFileName);
      console.log("In Delete");
      var process = Processes.findProcessByName(OS.FS.delete.caller.displayName);
      container.innerHTML += "</br> Adding "+ process.name + " to queue";
      process.state = "Waiting";
      OS.ProcessQueue.enqueue(
        OS.ProcessQueue.wrapFunction(
          Processes.listOfDevices[0].delete,
          OS.FS.delete.caller,
          [OS.FS.delete.caller.displayName,szFileName]
        )
      );
      OS.Scheduler.runNextProcess() ;
      //Processes.listOfDevices[0].main();
    },
    open: function(szFileName){
      //return Processes.listOfDevices[0].open(szFileName);
      console.log("In Open");
      var process = Processes.findProcessByName(OS.FS.open.caller.displayName);
      container.innerHTML += "</br> Adding "+ process.name + " to queue";
      process.state = "Waiting";
      OS.ProcessQueue.enqueue(
        OS.ProcessQueue.wrapFunction(
          Processes.listOfDevices[0].open,
          OS.FS.open.caller,
          [OS.FS.open.caller.displayName,szFileName]
        )
      );
      return OS.Scheduler.runNextProcess() ;
      //return Processes.listOfDevices[0].main();
    },
    close: function(szFileName){
      //Processes.listOfDevices[0].close(szFileName);
      console.log("In Close");
      var process = Processes.findProcessByName(OS.FS.close.caller.displayName);
      container.innerHTML += "</br> Adding "+ process.name + " to queue";
      process.state = "Waiting";
      OS.ProcessQueue.enqueue(
        OS.ProcessQueue.wrapFunction(
          Processes.listOfDevices[0].close,
          OS.FS.close.caller,
          [OS.FS.close.caller.displayName,szFileName]
        )
      );
      OS.Scheduler.runNextProcess() ;
      //Processes.listOfDevices[0].main();
    },
    read: function(oFilePointer){
      //return Processes.listOfDevices[0].read(oFilePointer);
      console.log("In Read");
      var process = Processes.findProcessByName(OS.FS.read.caller.displayName);
      container.innerHTML += "</br> Adding "+ process.name + " to queue";
      process.state = "Waiting";
      OS.ProcessQueue.enqueue(
        OS.ProcessQueue.wrapFunction(
          Processes.listOfDevices[0].read,
          OS.FS.read.caller,
          [OS.FS.read.caller.displayName,oFilePointer]
        )
      );
      return OS.Scheduler.runNextProcess() ;
      //return Processes.listOfDevices[0].main();
    },
    write: function(oFilePointer,szInput){
      //Processes.listOfDevices[0].write(oFilePointer,szInput);
      console.log("In Write");
      var process = Processes.findProcessByName(OS.FS.write.caller.displayName);
      container.innerHTML += "</br> Adding "+ process.name + " to queue";
      process.state = "Waiting";
      OS.ProcessQueue.enqueue(
        OS.ProcessQueue.wrapFunction(
          Processes.listOfDevices[0].write,
          OS.FS.write.caller,
          [OS.FS.write.caller.displayName,oFilePointer,szInput]
        )
      );
      OS.Scheduler.runNextProcess() ;
      //Processes.listOfDevices[0].main();
    },
    position: function(oFilePointer){
      //return Processes.listOfDevices[0].position(oFilePointer);
      console.log("In Position");
      var process = Processes.findProcessByName(OS.FS.position.caller.displayName);
      container.innerHTML += "</br> Adding "+ process.name + " to queue";
      process.state = "Waiting";
      OS.ProcessQueue.enqueue(
        OS.ProcessQueue.wrapFunction(
          Processes.listOfDevices[0].position,
          OS.FS.position.caller,
          [OS.FS.position.caller.displayName,oFilePointer]
        )
      );
      return OS.Scheduler.runNextProcess() ;
      //return Processes.listOfDevices[0].main();
    },
    length: function(oFilePointer){
      //return Processes.listOfDevices[0].length(oFilePointer);
      console.log("In length");
      console.log(oFilePointer);
      var process = Processes.findProcessByName(OS.FS.length.caller.displayName);
      container.innerHTML += "</br> Adding "+ process.name + " to queue";
      process.state = "Waiting";
      OS.ProcessQueue.enqueue(
        OS.ProcessQueue.wrapFunction(
          Processes.listOfDevices[0].lengthOfFile,
          OS.FS.length.caller,
          [OS.FS.length.caller.displayName,oFilePointer]
        )
      );
      return OS.Scheduler.runNextProcess() ;
      //return Processes.listOfDevices[0].main();
    },
    seek: function(oFilePointer,nOffset){
      //Processes.listOfDevices[0].seek(oFilePointer,nOffset);
      console.log("In seek");
      var process = Processes.findProcessByName(OS.FS.seek.caller.displayName);
      container.innerHTML += "</br> Adding "+ process.name + " to queue";
      process.state = "Waiting";
      OS.ProcessQueue.enqueue(
        OS.ProcessQueue.wrapFunction(
          Processes.listOfDevices[0].seek,
          OS.FS.seek.caller,
          [OS.FS.seek.caller.displayName,oFilePointer,nOffset]
        )
      );
      OS.Scheduler.runNextProcess() ;
      //Processes.listOfDevices[0].main();
    }
  },
  ProcessQueue: {
    queue: [],
    wrapFunction: function(fn, context, params) {
      return function() {
        return fn.apply(context,params);
      }
    },
    enqueue: function(func){
      OS.ProcessQueue.queue.push(func);
    },
    dequeue: function(){
      //var fn = OS.ProcessQueue.queue.shift();
      //return fn();
      return OS.ProcessQueue.queue.shift()();
    }
  },
  Scheduler: {
    runNextProcess: function (){
        var oNextProcess = Processes.listOfProcesses.find(function(element,index,array){
          if (element.state == "Ready") {
            console.log(element.name + " is Ready");
            return true;
          } else {
            return false;
          }
        });
        if(oNextProcess != undefined){

          oNextProcess.main(oNextProcess.program_counter);

        } else {
          return OS.Scheduler.runDevice();
        }
    },
    runDevice: function(){
      return Processes.listOfDevices[0].main();
    }
  }
};

