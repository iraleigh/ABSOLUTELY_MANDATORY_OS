/**
 * Created by Matt on 4/30/2016.
 */

//function currentUser(userObj)
//{
//    this.currUser = userObj;
//    this.currUserName = userObj.getUserName();
//    this.currUserPassword = userObj.getPassword();
//
//    this.getCurrentUserName = function()
//    {
//        return this.currUserName;
//    };
//
//    this.getCurrentUserPassword = function()
//    {
//        return this.currUserPassword;
//    }
//}


//I tried making a singleton object for the current user to make sure that we only have one at any time.
var currentUserSingleton = function(userObj)
{
    var currentUser;

    //Default this current user to guest in init.d when the OS starts
    function createInstance()
    {
        currentUser = userObj;
    }

    function getInstance()
    {
        if(currentUser != undefined)
        {
            currentUser = userObj;
        }

        return currentUser;
    }
};
