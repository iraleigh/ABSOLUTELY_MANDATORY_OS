/**
 * Created by internet on 2/26/2016.
 */
var StatsCalculator =  function(counter){
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

            this.var.oStatsFile = OS.FS.open("statsFile.csv");

            break;
        case 2:

            OS.FS.length(this.var.oStatsFile);

            break;
        case 3:

            this.var.szContent = "";
            OS.FS.position(this.var.oStatsFile);

            break;
        case 4:

            OS.FS.read(this.var.oStatsFile);

            break;
        case 5:

            this.var.szContent += this.var.returnedFromRead;

            OS.FS.position(this.var.oStatsFile);

            break;
        case 6:
            if( this.var.position < this.var.length) {

                this.program_counter = 4;
                break;

            } else {

                this.program_counter++;
                break;

            }
        case 7:

            var rows =
                this.var.szContent.split("\n").map(function (row) {
                    return row.split(",");
                });

            oStatsFile = this.var.oStatsFile;

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
            this.state = "Stop";
    }
}

Processes.listOfProcesses.push(new Process("Calculate Stats", StatsCalculator));