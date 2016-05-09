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
    oTargetDir.content.push(new File("Corinthians.txt", "Love is patient, love is kind. It does not envy, it does not boast, it is not proud. \nIt does not dishonor others, it is not self-seeking, it is not easily angered, it keeps no record of wrongs. \nLove does not delight in evil but rejoices with the truth. It always protects, always trusts, always hopes, always perseveres. \nLove never fails. But where there are prophecies, they will cease; where there are tongues, they will be stilled; where there is knowledge, it will pass away."));
    oTargetDir.content.push(new File("Luke.txt", "But love your enemies, do good to them, and lend them without expecting to get anything back. \nThen your reward will be great, and you will be children of the Most High, because he is kind to the ungrateful and wicked."));
}