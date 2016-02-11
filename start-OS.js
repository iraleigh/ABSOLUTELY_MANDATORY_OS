var OS = {
  FS: {
    create: function(){
      console.log("Create was called");
    },
    delete: function(){
      console.log("Delete was called");
    },
    open: function(){
      console.log("Open was called");
    },
    close: function(){
      console.log("Close was called");
    },
    read: function(){
      console.log("Read was called");
    },
    write: function(){
      console.log("Write was called");
    },
    position: function(){
      console.log("Position was called");
    },
    length: function(){
      console.log("Length was called");
    },
    seek: function(){
      console.log("Seek was called");
    }
  }
}

window.onload = function(){
  start = function() {
    var container = window.document.getElementById('container');
    container.innerHTML = "Starting OS...";
    
  }
  start();
}
