/**
 * Created by Matt on 4/30/2016.
 */

//function CurrentUserSingleton()
//{
//    //this.currentUser = new User("Guest", "Password");
//    //this.currentUser = null;
//    var currentUser;
//
//    this.createInstance = function()
//    {
//            currentUser = new User("Guest", "Password");
//            return currentUser;
//    };
//
//    this.setInstance = function(userObj)
//    {
//        currentUser = userObj;
//    };
//
//    this.getInstance = function()
//    {
//        console.log(currentUser);
//        if( currentUser === null || currentUser === undefined)
//        {
//            currentUser = this.createInstance();
//            console.log("after create");
//            console.log(currentUser);
//        }
//
//        return currentUser;
//    };
//}

//getInstance: function () {
//            if(currentUser == undefined)
//            {
//                currentUser = currentUserSingleton.createInstance();
//                console.log("after create");
//                console.log(currentUser);
//            }
//
//            return currentUser;
//        },

//this.currUser = userObj;
//this.currUserName = userObj.getUserName();
//this.currUserPassword = userObj.getPassword();
//
//this.getCurrentUserName = function()
//{
//    return this.currUserName;
//};
//
//this.getCurrentUserPassword = function()
//{
//    return this.currUserPassword;
//}


//IF THE THING I"M GOING TO TRY DOESN"T WORK GO BACK TO THIS HEADACHE OF SCOPE ISSUE BULL SHIT
//I'm trying to make a singleton and failing I think. Idk javascript syntax...

//This works don't you mother fucking touch it without consulting Matt...
var CurrentUserSingleton = (function()
{
    var currentUser = undefined;
    //Default this current user to guest in init.d when the OS starts
    //initializes the instance of currentUser.

    return { // public interface
        getInstance: function () {
            if(currentUser === undefined || currentUser === null)
            {
                currentUser = CurrentUserSingleton.createInstance();
            }

            return currentUser;
        },

        setInstance: function (userObj)
        {
            currentUser = userObj;
        },

        createInstance: function()
        {
            console.log("User signed in as guest IS CREATED");
            currentUser = new User("Guest", "Password");
            console.log(currentUser);
            return currentUser;
        }
    };
})();