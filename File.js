function File(szName,szContent){
    this.name = szName;
    this.content = szContent;
    this.position = 0;
    this.length = szContent.length;
    this.fileType = "File";
    this.accessGroup = [];
    this.acl = new acl();

    //Set default permissions for a new file.
    this.acl.setUserRead(true);
    this.acl.setUserWrite(true);
    this.acl.setUserExecute(true);
    this.acl.setGroupRead(true);
    this.acl.setGroupWrite(true);
    this.acl.setOtherRead(true);

    //this.accessGroup.push(OS.Users["Super"]);
    this.accessGroup.push(CurrentUserSingleton.getInstance());
    this.fileOwner =  CurrentUserSingleton.getInstance(); //The person who is currently logged in gets to be the file owner.

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
    //I have a feeling this function will not work, becuase of the bad usage of this?>
    this.removeFromAccessGroup = function(userObject){
        var aGroup = this.accessGroup;
        this.accessGroup.forEach(function(element,index,array)
        {
            if(element.getUserName == userObject.getUserName)
            {
                aGroup.splice(index, 1);
            }
        });
        return aGroup;
    }
    this.addToAccessGroup = function (userObject){
        this.accessGroup.push(userObject);
    }
}
