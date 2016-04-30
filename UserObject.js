/**
 * Created by Matt on 4/30/2016.
 */

function User(name, pw)
{
    this.userName = name;
    this.password = pw;

    this.getUserName = function()
    {
        return this.userName;
    };

    this.setUserName = function(name)
    {
        this.userName = name;
    };

    this.getPassword = function()
    {
        return this.password;
    };

    this.setPassword = function(pw)
    {
        this.password = pw;
    };

}
