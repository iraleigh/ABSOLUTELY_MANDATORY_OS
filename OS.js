var OS = {
        FS: {
            create: function (szFileName, szContent) {
                //Processes.listOfDevices[0].create(szFileName,szContent);
                console.log("In Create");
                var process = Processes.findProcessByName(OS.FS.create.caller.displayName);
                //   container.innerHTML += "</br> Adding "+ process.name + " to queue";
                process.state = "Waiting";
                OS.ProcessQueue.enqueue(
                    OS.ProcessQueue.wrapFunction(
                        Processes.listOfDevices['file_io'].create,
                        OS.FS.create.caller,
                        [OS.FS.create.caller.displayName, szFileName, szContent]
                    )
                );
                OS.Scheduler.runNextProcess();
                //OS.ProcessQueue.dequeue();
                //Processes.listOfDevices['file_io'].main();
            },
            delete: function (szFileName) {
                //Processes.listOfDevices['file_io'].delete(szFileName);
                console.log("In Delete");
                var process = Processes.findProcessByName(OS.FS.delete.caller.displayName);
                //  container.innerHTML += "</br> Adding "+ process.name + " to queue";
                process.state = "Waiting";
                OS.ProcessQueue.enqueue(
                    OS.ProcessQueue.wrapFunction(
                        Processes.listOfDevices['file_io'].delete,
                        OS.FS.delete.caller,
                        [OS.FS.delete.caller.displayName, szFileName]
                    )
                );
                OS.Scheduler.runNextProcess();
                //Processes.listOfDevices['file_io'].main();
            },
            open: function (szFileName) {
                //return Processes.listOfDevices['file_io'].open(szFileName);
                console.log("In Open");
                var process = Processes.findProcessByName(OS.FS.open.caller.displayName);
                //    container.innerHTML += "</br> Adding "+ process.name + " to queue";
                process.state = "Waiting";
                OS.ProcessQueue.enqueue(
                    OS.ProcessQueue.wrapFunction(
                        Processes.listOfDevices['file_io'].open,
                        OS.FS.open.caller,
                        [OS.FS.open.caller.displayName, szFileName]
                    )
                );
                return OS.Scheduler.runNextProcess();
                //return Processes.listOfDevices['file_io'].main();
            },
            close: function (szFileName) {
                //Processes.listOfDevices['file_io'].close(szFileName);
                console.log("In Close");
                var process = Processes.findProcessByName(OS.FS.close.caller.displayName);
                //   container.innerHTML += "</br> Adding "+ process.name + " to queue";
                process.state = "Waiting";
                OS.ProcessQueue.enqueue(
                    OS.ProcessQueue.wrapFunction(
                        Processes.listOfDevices['file_io'].close,
                        OS.FS.close.caller,
                        [OS.FS.close.caller.displayName, szFileName]
                    )
                );
                OS.Scheduler.runNextProcess();
                //Processes.listOfDevices['file_io'].main();
            },
            read: function (oFilePointer) {
                //return Processes.listOfDevices['file_io'].read(oFilePointer);
                console.log("In Read");
                var process = Processes.findProcessByName(OS.FS.read.caller.displayName);
                //container.innerHTML += "</br> Adding "+ process.name + " to queue";
                process.state = "Waiting";
                OS.ProcessQueue.enqueue(
                    OS.ProcessQueue.wrapFunction(
                        Processes.listOfDevices['file_io'].read,
                        OS.FS.read.caller,
                        [OS.FS.read.caller.displayName, oFilePointer]
                    )
                );
                return OS.Scheduler.runNextProcess();
                //return Processes.listOfDevices['file_io'].main();
            },
            write: function (oFilePointer, szInput) {
                //Processes.listOfDevices['file_io'].write(oFilePointer,szInput);
                console.log("In Write");
                var process = Processes.findProcessByName(OS.FS.write.caller.displayName);
                //   container.innerHTML += "</br> Adding "+ process.name + " to queue";
                process.state = "Waiting";
                OS.ProcessQueue.enqueue(
                    OS.ProcessQueue.wrapFunction(
                        Processes.listOfDevices['file_io'].write,
                        OS.FS.write.caller,
                        [OS.FS.write.caller.displayName, oFilePointer, szInput]
                    )
                );
                OS.Scheduler.runNextProcess();
                //Processes.listOfDevices['file_io'].main();
            },
            position: function (oFilePointer) {
                //return Processes.listOfDevices['file_io'].position(oFilePointer);
                console.log("In Position");
                var process = Processes.findProcessByName(OS.FS.position.caller.displayName);
                //    container.innerHTML += "</br> Adding "+ process.name + " to queue";
                process.state = "Waiting";
                OS.ProcessQueue.enqueue(
                    OS.ProcessQueue.wrapFunction(
                        Processes.listOfDevices['file_io'].position,
                        OS.FS.position.caller,
                        [OS.FS.position.caller.displayName, oFilePointer]
                    )
                );
                return OS.Scheduler.runNextProcess();
                //return Processes.listOfDevices['file_io'].main();
            },
            length: function (oFilePointer) {
                //return Processes.listOfDevices['file_io'].length(oFilePointer);
                console.log("In length");
                console.log(oFilePointer);
                var process = Processes.findProcessByName(OS.FS.length.caller.displayName);
                //    container.innerHTML += "</br> Adding "+ process.name + " to queue";
                process.state = "Waiting";
                OS.ProcessQueue.enqueue(
                    OS.ProcessQueue.wrapFunction(
                        Processes.listOfDevices['file_io'].lengthOfFile,
                        OS.FS.length.caller,
                        [OS.FS.length.caller.displayName, oFilePointer]
                    )
                );
                return OS.Scheduler.runNextProcess();
                //return Processes.listOfDevices['file_io'].main();
            },
            seek: function (oFilePointer, nOffset) {
                //Processes.listOfDevices['file_io'].seek(oFilePointer,nOffset);
                console.log("In seek");
                var process = Processes.findProcessByName(OS.FS.seek.caller.displayName);
                //     container.innerHTML += "</br> Adding "+ process.name + " to queue";
                process.state = "Waiting";
                OS.ProcessQueue.enqueue(
                    OS.ProcessQueue.wrapFunction(
                        Processes.listOfDevices['file_io'].seek,
                        OS.FS.seek.caller,
                        [OS.FS.seek.caller.displayName, oFilePointer, nOffset]
                    )
                );
                OS.Scheduler.runNextProcess();
                //Processes.listOfDevices['file_io'].main();
            }
        },
        display: function (output) {
            Processes.listOfDevices['display'].main(output);
        },
        clearScreen: function () {
            Processes.listOfDevices['display'].clear();
        },
        ProcessQueue: {
            queue: [],
            wrapFunction: function (fn, context, params) {
                return function () {
                    return fn.apply(context, params);
                }
            },
            enqueue: function (func) {
                OS.ProcessQueue.queue.push(func);
            },
            dequeue: function () {
                //var fn = OS.ProcessQueue.queue.shift();
                //return fn();
                return OS.ProcessQueue.queue.shift()();
            }
        },
        Scheduler: {
            runNextProcess: function () {
                var oNextProcess = Processes.listOfProcesses.find(function (element, index, array) {
                    if (element.state == "Ready") {
                        console.log(element.name + " is Ready");
                        return true;
                    } else {
                        return false;
                    }
                });
                if (oNextProcess != undefined) {

                    oNextProcess.main(oNextProcess.program_counter);

                } else {
                    return OS.Scheduler.runDevice();
                }
            },
            runDevice: function () {
                return Processes.listOfDevices['file_io'].main();
            }
        },
        mutexLock: {
            //Mutexlock and semaphores almost same thing
            //Semaphores only require a key to access the file.
            //read, write, close, open
            //These methods should take a mutex object?

            //array of files
            arrayOfMutexes: [],

            //basically locking it
            acquire: function(mutex) {

                var available;

                //I think we need to add something here
                if(arrayOfMutexes.indexOf(mutex) >= 0)
                {
                    available = false;
                }
                else
                {
                    available = true;
                }

                while(!available)
                {
                    //Wait for resource to become available.
                }

                arrayOfMutexes.push(mutex);

                console.log("****************************");
                arrayOfMutexes.forEach(function (element, index, array)
                {
                    console.log(element);
                });
                console.log("****************************");

                mutex.setAvailable(false);
            },

            //obviously unlocking it
            release: function(mutex) {

                arrayOfMutexes.foreach(function (element, index, array)
                {
                    if(arrayOfMutexes[index] == mutex) {
                        arrayOfMutexes.pop();//basically saying it's not a locked object anymore
                    }
                });

                mutex.setAvailable(true);
            }
        },
        semaphores: {
            wait: function(S) {
                //while(S <= 0)
                //{
                //    //Wait for signal
                //}
                //S--;
            },
            signal: function(S) {
                //S++;
            }
        }
}
;

