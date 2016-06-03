/**
 * Created by isha srivastava on 31-May-16.
 */

module.exports = function (app) { // u need sum1 to call u


    var users = [
        {_id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder"},
        {_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley"},
        {_id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia"},
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi"}
    ];

    //app.get("/api/user/:username",findUserById);
    app.get("/api/user", getUsers);
    //app.get("/api/user?username=:username",findUserByUsername);
    app.get("/api/user/:userId", findUserById);

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

        res.send(users);
    }


    function findUserById(req, res) {
        // req.params["userId"];
        console.log(req.params.userId);
        var id = req.params.userId;
        for (var i in users)
            if (users[i]._id === id) {
                res.send(users[i]);
                return;
            }
        return res.send({});
    }

    function findUserByCredentials(username, password, res) {
        for (var i in users) {

            if (users[i].username === username && users[i].password === password) {
                res.send(users[i]);
                return;
            }
        }
        res.send({});
    }

    function findUserByUsername(username, res) {
        for (var i in users) {
            if (users[i].username === username) {
                res.send(users[i]);
                return;
            }
        }
        res.send({});
    }


};