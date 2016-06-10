
module.exports = function(app) { // app is an instance of express

    var models = require("./models/models.server")();
    require("./services/user.service.server.js")(app, models);
    require("./services/website.service.server.js")(app, models);
    require("./services/page.service.server.js")(app, models);
    require("./services/widget.service.server.js")(app, models);
    
    // app.get("/say/:something", function(req, res) {
    //     var msg = req.params['something'];
    //     res.send({message: msg})

    // });
    
    // var users = [
    //     {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
    //     {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
    //     {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
    //     {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
    // ];
   /* require("./services/website.service.server.js")(app);*/

  



    app.get("/users/:id", function(req,res){
        var id = req.params.id;
        for(var i in users){
            if(users[i]._id === id){
                res.send(users[i]);
                return;
            }
        }
        res.send({});
    });
};

/*
module.exports =function(app) {
    
    require("./services/user.service.server.js")(app);
    
    app.get("/say/:something",function(req, res){  //here first res is request object going to server and res object is for response from server
        var msg = req.params['something'];
        res.send({message:msg});
    console.log(msg);
    });
app.get("/users/:id")


    var users = [
        {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
        {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
        {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
    ];

    app.get("/users")
    for(var i in users)
        var id =req.params.userId;
        if(users[i]._id=== id)
        {
            res.send(users[i]);
            return;
        }

};*/
