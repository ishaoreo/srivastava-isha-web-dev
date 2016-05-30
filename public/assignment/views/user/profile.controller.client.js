(function(){
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController);


    function ProfileController($routeParams, $location, UserService) {
        var vm = this; //this is a view model

        vm.updateUser = updateUser;

        var index = -1;

        //var id = $routeParams['id'];
        var id = $routeParams.userId;
        
        function init()
        {
            vm.user = UserService.findUserById(id);
        }
        init();


        function updateUser(newUser)
        {
            var result = UserService.updateUser(id, newUser);
            if(result){
                vm.message = "Your profile has been updated successfully!"
            } else {
                vm.error = "The profile cannot be updated!"
            }
        }
    }
})();


/*
(function () {
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController);
    //html and java script talk to each other via scope
//model is instance of controller

    //given below is my array database kinda
  /!*  var users =
        [
            {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
            {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
            {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
            {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
        ];*!/


    function ProfileController($routeParams, UserService) {
        var vm = this;
        vm.updateUser = updateUser;

        var id = $routeParams.id;
        vm.user = UserService.findUserById(id);

        function init() {
            vm.user = UserService.findUserById(id);
        }

        init();


         function updateUser(newUser) {
           UserService.updateUser(id, newUser);

         }
    }

    })();
  */
