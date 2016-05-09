var groupsFile = function() {
    var groups = new Dir ("groups",Directory.Files);
    groups.setParent(Directory.Files);
    groups.setName("groups");
    Directory.Files.push(groups);
    var oTargetDir = undefined;
    for(var n = 0; n < Directory.Files.length; n++){
        if(Directory.Files[n].name == "groups"){
            oTargetDir = Directory.Files[n];
        }
    }
    //Push new users to the appropriate group files, to give them access.
    oTargetDir.content.push(new File("newUser.txt", ""));  //New users will be put in here, and have access to ls, cat, Write, su, whoami, cd, touch, mkdir.
    oTargetDir.content.push(new File("superGroup.txt", "")); //Will be granted access to everything.
 }