
(function(){
    angular
        .module("WebAppMaker")
        .factory("UserService", UserService);

    

    function UserService($http) {
        var api = {
            createUser : createUser,
            findUserByUsernameAndPassword : findUserByUsernameAndPassword,
            findUserByUsername : findUserByUsername,
            findUserById : findUserById,
            updateUser : updateUser,
            deleteUser : deleteUser
        };
        return api;

        function createUser(username, password) {
            var user = {
                username: username,
                password: password
            };
            return $http.post("/api/user", user);
        }

            // if(!findUserByUsername(username)) {
            //     var newUser = {
            //         _id: (new Date()).getTime() + "",
            //         username: username,
            //         password: password
            //     }
            //     users.push(newUser);
            //     return newUser;
            // }
            // return null;


        function deleteUser(userId) {}
        function updateUser(id, newUser) {
            for(var i in users){
                if(users[i]._id === id){
                    users[i].firstName = newUser.firstName;
                    users[i].lastName = newUser.lastName;
                    return true;
                }
            }
            return false;
        }
        function findUserById(id) {
            // for(var i in users){
            //     if(users[i]._id === id){
            //         return users[i];
            //     }
            // }
            // return null;
            var url = "/api/user/" + id;
            return $http.get(url);
        }

        function findUserByUsername(username) {
            for(var i in users){
                if(users[i].username === username){
                    return users[i];
                }
            }
            return null;
        }

        function findUserByUsernameAndPassword(username, password){
            var url = "/api/user?username="+username+"&password" +password;
           return $http.get(url);


            // for( var i in users) {
            //     if(users[i].username === username && users[i].password === password){
            //         return users[i];
            //     }
            // }
            return null;
        }
    }
})();


/*(function(){
angular
    .module("WebAppMaker")
    .factory("UserService",UserService);

    var users =
        [
            {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
            {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
            {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
            {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
        ];

    function UserService()
    {
        var api = {
            findUserByUserNameAndPassword: findUserByUserNameAndPassword,
            findUserById: findUserById,
            updateUser :updateUser
        };
        return api;
        
        function findUserByUserNameAndPassword (username, password)
        {
            for(var i in users)
            {
                if(users[i].username === username && users[i].password === password)
                {
                    //return users[i];
                   // $location.url("/profile/"+users[i]._id);
                    return users[i]; }
                    
                   // console.log("yayieeee");
                   // break; }
                //console.log(vm.password)
            }

                return null;
                //vm.error = "user not found";
            }
        
        function findUserById (id)
        {
            //var id = $routeParams.id; /// u can also write $routeParams.[id];
            console.log(id);

           // var index = -1

            for (var i in users) {
                if (users[i]._id === id)
                    {
                        return users[i];
                      //  index = i;
                    }


        }  return null;
        }

        function updateUser (id, newUser) {


            console.log(newUser,newUser.firstName);
            console.log(id);
            console.log(users);

            for (var i in users) {
                if (users[i]._id === id)
                // console.log(newUser);
                {
                    users[i].firstName = newUser.firstName;
                    users[i].lastName = newUser.lastName;
                    return true;
                }

            }// end of for 
            return false;

        }
    
    }

})();*/

/*
createUser(user) - adds the user parameter instance to the local users array
findUserById(userId) - returns the user in local users array whose _id matches the userId parameter
findUserByUsername(username) - returns the user in local users array whose username matches the parameter username
findUserByCredentials(username, password) - returns the user whose username and password match the username and password parameters
updateUser(userId, user) - updates the user in local users array whose _id matches the userId parameter
deleteUser(userId) - removes the user whose _id matches the userId parameter

*/
