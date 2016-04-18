/**
 * Created by internet on 2/26/2016.
 */
var VectorCalculator = function (counter){
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
            this.var.oVectorDataPointer = this.var.returnedFile;
            //length of CSV file
            OS.FS.length(this.var.oVectorDataPointer);
            break;
        case 3:
            this.var.szContent = "";

            //read in the CSV file and assign it to contents
            OS.FS.position(this.var.oVectorDataPointer);
            break;
        case 4:
            OS.FS.read(this.var.oVectorDataPointer);
            break;
        case 5:
            this.var.szContent += this.var.returnedFromRead;

            OS.FS.position(this.var.oVectorDataPointer);
            break;
        case 6:
            if (this.var.position < this.var.length){
                this.program_counter = 4;
                break;
            } else {
                this.program_counter++;
                break;
            }
        case 7:

            //take the contents and put it in an array
            var szVectorData = this.var.szContent.split(",");

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
            this.state = "Stop";
    }
}

Processes.listOfProcesses.push(new Process("CalculateVectors", VectorCalculator));

