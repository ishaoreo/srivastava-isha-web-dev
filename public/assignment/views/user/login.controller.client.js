(function(){
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController);

    function LoginController($location, UserService) {
        var vm = this; //this is a view model

        vm.login = function(username,password) {
            var user = UserService.findUserByUsernameAndPassword(username, password);
            if(user) {
                $location.url("/user/"+user._id);
            } else {
                vm.error = "User Not Found!";
            }
        }
    }
})();


/*
(function () {
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController);
    //html and java script talk to each other via scope
//model is instance of controller

    //given below is my array database kinda

    
    
    function LoginController($location,UserService) {
    var vm= this;
    //$scope.hello= "Hello from login controller"
    // improve
    vm.login=function (username,password){
        var user = UserService.findUserByUserNameAndPassword(username,password);
        if(user)
        {
            $location.url("/profile/"+user._id);
        }
        else 
        {vm.error= "user not found";
        }

    }
}
})();*/
