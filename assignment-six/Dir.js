function Dir(szName,oParentDir){
    this.name = " ";
    this.content = new Array;
    this.fileType = "Directory";
    this.parentDir = "";
    //this.position = 0;
    //this.length = szContent.length;

    //Added date object to file definition.
    this.date = new Date(); //new Date(); creates a date object with the current date/time.
    this.parentDir = oParentDir;
    this.name = szName;
    this.accessGroup = [];
    this.acl = new acl();

    //Set default permissions for a new directory.
    this.acl.setUserRead(true);
    this.acl.setUserWrite(true);
    this.acl.setUserExecute(true);
    this.acl.setGroupRead(true);
    this.acl.setGroupWrite(true);


    this.accessGroup.push(CurrentUserSingleton.getInstance());
    this.fileOwner =  CurrentUserSingleton.getInstance(); 

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

    this.toString = function(){
      szDirContents = "\nDirectory: "
      szDirContents += this.name + '\n';
      var nFiles = 0;
      var nDirectories = 0;
      for(var n = 0; n < this.content.length; n++){
        if(this.content[n].fileType == "File"){
          nFiles++;
        }
        if(this.content[n].fileType == "Directory"){
          nDirectories++;
        }
      }
      szDirContents += nFiles + " Files, and " + nDirectories + " subdirectories."

      return szDirContents;
    }

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
