function acl(){
    this.userRead = false;
    this.userWrite = false;
    this.userExecute = false;

    this.groupRead = false;
    this.groupWrite = false;
    this.groupExecute = false;

    this.otherRead = false;
    this.otherWrite = false;
    this.otherExecute = false;

    this.owner = [];
    this.group = [];

    this.setUserRead = function(szPermission){
      this.userRead = szPermission;
    }

    this.setUserWrite = function(szPermission){
      this.userWrite = szPermission;
    }

    this.setUserExecute = function(szPermission){
      this.userExecute = szPermission;
    }

    this.setGroupRead = function(szPermission){
      this.groupRead = szPermission;
    }

    this.setGroupWrite = function(szPermission){
      this.groupWrite = szPermission;
    }

    this.setGroupExecute = function(szPermission){
      this.groupExecute = szPermission;
    }

    this.setOtherRead = function(szPermission){
      this.otherRead = szPermission;
    }

    this.setOtherWrite = function(szPermission){
      this.otherWrite = szPermission;
    }

    this.setOtherExecute = function(szPermission){
      this.otherExecute = szPermission;
    }

    this.setOwner = function(oUser){
      this.owner.push(oUser);
    }

    this.setGroup = function(oGroup){
      this.group.push(oGroup);
    }

    this.getUserRead = function(){
      return this.userRead;
    }

    this.getUserWrite = function(){
      return this.userWrite;
    }

    this.getUserExecute = function(){
      return this.userExecute;
    }

    this.getGroupRead = function(){
      return this.getGroupRead;
    }

    this.getGroupWrite = function(){
      return this.getGroupWrite;
    }

    this.getGroupExecute = function(){
      return this.groupExecute;
    }

    this.getOtherRead = function(){
      return this.otherRead;
    }

    this.getOtherWrite = function(){
      return this.otherWrite;
    }

    this.getOtherExecute = function(){
      return this.otherExecute;
    }

    this.getOwner = function(){
      return this.owner;
    }

    this.getGroup = function(){
      return this.group;
    }

}
