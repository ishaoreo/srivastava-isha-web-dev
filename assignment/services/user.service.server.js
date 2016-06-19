/**
 * Created by isha srivastava on 31-May-16.
 */
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var bcrypt = require("bcrypt-nodejs");

module.exports = function (app,models) { // u need sum1 to call u

    var userModel = models.userModel;
    // var users = [
    //     {_id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder"},
    //     {_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley"},
    //     {_id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia"},
    //     {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi"}
    // ];

    app.get("/auth/facebook",passport.authenticate('facebook'));
    app.get("/auth/facebook/callback",
        passport.authenticate('facebook',{
            successRedirect:'/assignment/#/user',
            failureRedirect: '/assignment/#/login'
        }));
    app.get("/api/user", getUsers);
    app.post("/api/logout", logout);
    app.get("/api/loggedIn", loggedIn);
    app.post("/api/register", register);
    //app.get("/api/user?username=:username",findUserByUsername);
    app.get("/api/user/:userId", findUserById);
    app.post("/api/user",createUser);
    app.put("/api/user/:userId",updateUser);
    app.delete("/api/user/:userId",deleteUser);
    app.post("/api/login", passport.authenticate('local'),login); //before gets to login,i want passport to see this

    passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);


    var facebookConfig = {
        clientID     : process.env.FACEBOOK_CLIENT_ID,
        clientSecret : process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL  : process.env.FACEBOOK_CALLBACK_URL
    };

    //passport.use('facebook',new FacebookStrategy(facebookConfig, facebookStrategy));
    passport.use('facebook', new FacebookStrategy(facebookConfig, facebookLogin));

    function localStrategy(username, password, done) {
        userModel
            .findUserByUsername(username)
            .then(
                function (user) {
                    if(user && bcrypt.compareSync(password, user.password)) {
                        done(null, user);
                    } else {
                        done(null, false);
                    }
                },
                function(err) {
                    done(err);
                }
            );
    }

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        userModel
            .findUserById(user._id)
            .then(
                function(user){
                    done(null, user);
                },
                function(err){
                    done(err, null);
                }
            );
    }

    // function localStrategy(username, password, done) { ///done functions this user exists or not or cannot tell
    //     userModel
    //         .findUserByUsername(username)
    //         .then(
    //             function (user) {
    //                 if(user) {
    //                     if(user && bcrypt.compareSync(password, user.password)) {
    //                         done(null, user);
    //                     } else {
    //                         done(null, false);
    //                     }
    //
    //                     done (null,user);
    //                 }
    //                 else {
    //                     done(null,false);}
    //
    //                 //res.json(user);
    //             },
    //             function(err) {
    //                 done(err);
    //             }
    //         )
    // }

// write the logout function 14th june


    function facebookLogin(token, refreshToken, profile, done) {
        console.log("refresh token"+refreshToken);

        console.log(profile);
        userModel
            .findFacebookUser(profile.id)
            .then(
                function(facebookUser) {
                    if(facebookUser) {
                        console.log(refreshToken);
                        return done(null, facebookUser);
                    } else {
                        facebookUser = {
                            username: profile.displayName.replace(/ /g,''),
                            facebook: {
                                token: token,
                                id: profile.id,
                                displayName: profile.displayName
                            }
                        };
                        userModel
                            .createUser(facebookUser)
                            .then(
                                function(user) {
                                    done(null, user);
                                }
                            );
                    }
                }
            );
    }


    //
    // function facebookStrategy(token, refreshToken, profile, done) {
    //     console.log(profile);
    //     // res.send(200);
    //     userModel
    //         .findFacebookUser(profile.id)
    //         .then(
    //             function (facebookUser) {
    //                 if(facebookUser){
    //                     return done(null,facebookUser);
    //                 }else{
    //                     facebookUser={
    //                         username:profile.displayName.replace(/ /g,''),
    //                         facebook: {
    //                             id:    String,
    //                             token: String,
    //                             displayName: String
    //                         }
    //                     };
    //                     userModel
    //                         .createUser(facebookUser)
    //                         .then(
    //                             function(user){
    //                                 done(null,user);
    //
    //                             }
    //                         );
    //
    //                 }
    //
    //             }
    //         );
    //
    // }

    function register(req,res){
        var username = req.body.username;
        var password = req.body.password;
        userModel
            .findUserByUsername(username)
            .then(
                function (user) {
                    if(user){
                        res.status(400).send("Sorry, but username already exists");
                        return;
                    }else
                    {
                        req.body.password = bcrypt.hashSync(req.body.password);
                        return userModel
                            .createUser(req.body);

                    }
                },
                function(err){
                    res.status(400).send(err);
                }

            )
            .then(
                function (user) {
                    if (user) {
                        req.login(user, function (err) {
                                if (err) {
                                    res.status(400).send(err);
                                } else {
                                    res.json(user);
                                }
                            }
                        );
                    }
                },
                function (err){
                    res.status(400).send(err);
                }
            );
    }

    function deleteUser(req,res){

        var id = req.params.userId;

        userModel
            .deleteUser(id)
            .then(
                function(stats) {
                    console.log(stats);
                    res.send(200);
                },
                function(error) {
                    res.statusCode(404).send(error);
                }
            );
        // var id = req.params.userId;
        //
        // for(var i in users){
        //     if(users[i]._id === id) {
        //         users.splice(i, 1);
        //         res.send(200);
        //         return;
        //     }
        // }
        // res.send(400);
    }

    function updateUser(req,res){
        var id = req.params.userId;
        var newUser = req.body;

        userModel
            .updateUser(id, newUser)
            .then(
                function(stats) {
                    console.log(stats);
                    res.send(200);
                },
                function(error) {
                    res.statusCode(404).send(error);
                }
            );
    }
    // var id= req.params.userId;
    // var newUser =req.body;
    // for(var i in users){
    //     if(users[i]._id === id){
    //         users[i].firstName = newUser.firstName;
    //         users[i].lastName = newUser.lastName;
    //         res.send(200);
    //         return;
    //         //return true;
    //     }
    // }
    // res.send(400);



    function createUser(req,res){
        var user = req.body;
        console.log ("user.service.server creating"+user);
        //  userModel.createUser(user);
        userModel
            .createUser(user)
            .then(
                function (user) {
                    console.log(user);
                    res.json(user);
                },
                function (error) {
                    res.statusCode(400).send(error);

                }
            );
        // user._id = (new Date()).getTime()+"";
        // console.log(user);
        // users.push(user);
        // console.log(users);
        // res.send(user);

    }

    function getUsers(req, res) {
        var username = req.query['username'];
        var password = req.query['password'];//helps in parsing out

        console.log(username);
        console.log(password);

        if (username && password) {
            findUserByCredentials(username, password, res)
        }

        else if (username) {
            findUserByUsername(username, res)
        }
        else

            res.send(users);
        // return;
    }


    function findUserById(req, res) {
        // req.params["userId"];
        console.log(req.params.userId);


        var id = req.params.userId;

        console.log(req.session.currentUser);
        userModel.findUserById(id)
            .then(
                function(user)
                {
                    res.send(user);
                },
                function (error) {
                    res.statusCode(404).send(error);
                }
            );
        // for (var i in users) {
        //     if (users[i]._id === id) {
        //         res.send(users[i]);
        //         return;
        //     }
        // }
        //  return res.send({});
    }

    function findUserByCredentials(username, password,req, res) {
        userModel
            .findUserByCredentials(username, password)
            .then(
                function (user) {
                    console.log(req.session);
                    req.session.currentUser =user;
                    res.json(user);
                },
                function(err) {
                    res.statusCode(404).send(err);
                }
            )
        // for (var i in users) {
        //
        //     if (users[i].username === username && users[i].password === password) {
        //         res.send(users[i]);
        //         return;
        //     }
        // }
        // res.send({});
    }

    function findUserByUsername(username, res) {


        //     for (var i in users) {
        //     if (users[i].username === username) {
        //         res.send(users[i]);
        //         return;
        //     }
        // }
        // res.send({});

        userModel
            .findUserByUsername(username)
            .then(
                function(user) {
                    res.json(user);
                },
                function(error) {
                    res.statusCode(404).send(error);
                }
            );
    }

    function loggedIn(req,res)
    {
        if(req.isAuthenticated())
        {
            res.json(req.user);
        }
        else{
            res.send('0');
        }
    }

    function logout(req,res) {
        req.logout();
        res.send(200);
    }
    function login(req,res) {
        var user = req.user; //passport sends the user
        res.json(user);

        //U dont need the below the code anymore
        // var username =req.body.username;
        //     var password = req.body.password;
        //     userModel
        //         .findUserByCredentials(username,password)
        //         .then(
        //     function (user) {
        //         console.log(req.session);
        //         req.session.currentUser =user;
        //         res.json(user);
        //     },
        //     function(err) {
        //         res.statusCode(404).send(err);
        //     }
        // )

    }
}