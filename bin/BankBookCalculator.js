/**
 * Created by internet on 2/26/2016.
 */
var bankBookCalculator = function(counter){
    switch(counter){
        case 0:

            var aryBankBook = new Array;
            this.var.nBankBookTotal = 0.0;
            var container = window.document.getElementById('container');

            //Create data for file if it doesn't exist
            var szFileName = "/bankBook.csv";
            this.var.szFileName = szFileName;
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

            break;
        case 1:

            console.log(this.var.szFileName);
            OS.FS.open(this.var.szFileName);

            break;
        case 2:
            this.var.oBankBookFile =
                this.var.returnedFile;

            //length of CSV file
            this.var.lenght = OS.FS.length(this.var.oBankBookFile);
            break;
        case 3:
            this.var.szContent = "";

            //read in the CSV file and assign it to contents
            this.var.position = OS.FS.position(this.var.oBankBookFile);
            break;
        case 4:
            this.var.szContent += OS.FS.read(this.var.oBankBookFile);
            break;
        case 5:
            this.var.szContent += this.var.returnedFromRead;

            OS.FS.position(this.var.oBankBookFile);
            break;
        case 6:
            if (this.var.position < this.var.length){
                this.program_counter = 0;
                break;
            } else {
                this.program_counter++;
                break;
            }
        case 7:

            var szBankBook = this.var.szContent;

            //loop to parse CSV
            var aryBankBook = new Array;
            var aryTempBook = szBankBook.split(",");
            for (var i = 0; i < aryTempBook.length; i++){
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
                this.var.nBankBookTotal = (this.var.nBankBookTotal + Number(aryBankBook[i,1]));
                console.log(this.var.nBankBookTotal);
            }

            //display results
            var szFormattedResults = "Bank Book<br>";
            szFormattedResults = "<table>";
            for (i = 0; i < aryBankBook.length; i++){
                szFormattedResults = szFormattedResults + "<tr><td>";
                szFormattedResults = szFormattedResults + aryBankBook[i,0];
                szFormattedResults = szFormattedResults + "</td>";
                szFormattedResults = szFormattedResults + "<td style=\"text-align:right\">";
                szFormattedResults = szFormattedResults + aryBankBook[i,1];
                szFormattedResults = szFormattedResults + "</td></tr>"
            }
            szFormattedResults = szFormattedResults + "<tr><td>";
            szFormattedResults = szFormattedResults + "Total: </td>";
            szFormattedResults = szFormattedResults + "<td style=\"text-align:right\">";
            szFormattedResults = szFormattedResults + this.var.nBankBookTotal;
            szFormattedResults = szFormattedResults + "</td></tr></table>";

            this.program_counter++;

            break;
        default:
            this.state = "Stop";


    }

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

Processes.listOfProcesses.push(new Process("BankBookCalculator", bankBookCalculator));
