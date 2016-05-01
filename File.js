function File(szName,szContent){
    this.name = szName;
    this.content = szContent;
    this.position = 0;
    this.length = szContent.length;
    this.fileType = "File";
    this.fileOwner = currentUserSingleton.getInstance().getUserName(); //The person who is currently logged in gets to be the file owner.

    //Added date object to file definition.
    this.date = new Date(); //new Date(); creates a date object with the current date/time.
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
    this.getKind = function(){
      return this.fileType;
    }
    this.getOwner = function(){
        return this.fileOwner;
    }
    this.setOwner = function(newOwner){
        this.fileOwner = newOwner;
    }
    this.removeFromAcessGroup = function(userObject){
        this.accessGroup.forEach(function(element,index,array)
        {
            if(element.getUserName == userObject.getUserName)
            {
                this.accessGroup.splice(index, 1);
            }
        });
    }
    this.addToAccessGroup = function (userObject){
        this.accessGroup.push(userObject);
    }
}
