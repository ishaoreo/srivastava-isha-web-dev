(function () {
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController)
        .controller("ProfileController", ProfileController);
    //html and java script talk to each other via scope

    
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
        var id = $routeParams.id; /// u can also write $routeParams.[id];
        console.log(id);
for(var i in users) {
    if (users[i]._id === id) {
        vm.user = users[i];
    }
}
    }


    function LoginController($location) {
            var vm= this;
       
         //$scope.hello= "Hello from login controller"
         // improve
         vm.login=function (username,password){
         for(var i in users)
         {
         if(users[i].username === username && users[i].password === password)
         { $location.url("/profile/"+users[i]._id);
         console.log("yayieeee");}

         else
         {vm.error = "user not found";}
         //console.log(vm.password)

         }
         }
             }
})();