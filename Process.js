function Process (name,main) {
	this.name = name;
	this.state = "Stop";
	this.program_counter = 0;
	this.var = {};
	this.main = main;
	this.threads = [];
	this.main.displayName = this.name;
	this.execAccess = [];
	this.execAccess.push(new User("matt", "cool"));
	this.execAccess.push(new User("admin", "amos"));
	//These are the commands the Guest user has access to.
	if(this.name == "ls" || this.name == "cat" || this.name == "Write" || this.name == "su" || this.name == "man" || this.name == "help")
	{
		this.execAccess.push(new User("Guest", "Pass"));
	}
	this.last_access = Date.now();

	this.setLastAccess = function (ObjDate){
        this.last_access = ObjDate;
    };

	this.newThread = function(name, callback) {
		this.threads[name] = new Thread(this.name, name, this.var,callback);
	};

	this.addExecAccess = function(userObject)
	{
		this.execAccess.push(userObject);
	};

	this.removeExecAccess = function(userObject)
	{
		var aGroup = this.execAccess;
		this.execAccess.forEach(function(element,index,array)
		{
			if(element.getUserName == userObject.getUserName)
			{
				aGroup.splice(index, 1);
			}
		});
		return aGroup;
	}
}