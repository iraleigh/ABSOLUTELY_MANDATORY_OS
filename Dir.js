function Dir(szName,oParentDir){
    this.name = " ";
    this.content = new Array
    this.fileType = "Directory";
    this.parentDir = "";
    //this.position = 0;
    //this.length = szContent.length;

    //Added date object to file definition.
    this.date = new Date(); //new Date(); creates a date object with the current date/time.
    this.parentDir = oParentDir;
    this.name = szName;
    this.setDate = function (ObjDate){
        this.date = ObjDate;
    }
    this.accessDate = function(){
        return this.date;
    }

    this.isName = function (szName) {
      return this.name === szName;
    }
    this.accessName = function(){
      return this.name;
    }
    this.setName = function(szName){
      this.name = szName;
      return;
    }
    this.accessContent = function(){
      return this.content;
    }
    this.getKind = function(){
      return this.fileType;
    }
    this.getLength = function(){
      return this.content.length;
    }
    this.getContent = function(){
      return this.content;
    }
    this.getParent = function(){
      return this.parentDir;
    }
    this.setParent = function(oParent){
      this.parentDir = oParent;
    }
    /*this.accessPosition = function(){
      return this.position;
    }*/
    /*this.accessLength = function(){
      return this.length;
    }*/
    /*this.mutatePosition = function(nPosition) {
      this.position = nPosition;
    }*/
    /*this.mutateContent = function(szNewContent){
      this.content = szNewContent;
    }*/
}
