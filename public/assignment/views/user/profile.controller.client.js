(function () {
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController);
    //html and java script talk to each other via scope
//model is instance of controller

    //given below is my array database kinda
    var users =
        [
            {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
            {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
            {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
            {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
        ];


    function ProfileController($routeParams) {
        var vm = this;
        vm.updateUser = updateUser;

        var id = $routeParams.id; /// u can also write $routeParams.[id];
        console.log(id);

        var index = -1

        for (var i in users) {
            if (users[i]._id === id) {
                {
                    vm.user = users[i];
                    index = i;
                }
            }
        }

        function updateUser(newUser) {
            console.log(newUser);
            users[index].firstName = newUser.firstName;
            users[index].lastName = newUser.lastName;
        }
    }
    })();
  