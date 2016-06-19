
(function(){
    angular
        .module("WebAppMaker")
        .controller("RegisterController", RegisterController);

    function RegisterController($location, $routeParams,UserService) {
        var vm = this;
        vm.register = register;
        var id = $routeParams.userId;
       // vm.createUser = createUser;
       // vm.error = false;


        function register(username,password,passwordRepeat) {
             if(validation(username,password,passwordRepeat)){

            UserService
                .register(username, password)
                .then(
                    function(response){
                    var user = response.data;
                    if(user){
                        $location.url("/user/"+user._id);
                    }else {
                        vm.error = "Cannot register Now!"
                        $("#username").css("background-color", "lightcoral");
                        $("#username").val("*Username Required");
                    }

                },
                    function (response) {

                            vm.error =response.data;
                        $("#username").css("background-color", "lightcoral");
                        $("#username").val("*Username Exists");
                    }
                );

            }
        }

        function validation(username,password,passwordRepeat){
            if(username==null && password==null)
            {
                vm.error = "username and password is left empty!";
                $("#username").css("background-color", "lightcoral");
                $("#password").css("background-color", "lightcoral");
                $("#passwordRepeat").css("background-color", "lightcoral");
                return false;
            }
            if(username==null && password!=null){
                vm.error = "username or password is left empty!";
                $("#username").css("background-color", "lightcoral");
                $("#username").val("*Username required");
                return false;
            }
            if(password==null && username!=null) {
                vm.error = "password is left empty!";

                $("#password").css("background-color", "lightcoral");
                $("#password").val("*Password required");

                return false;
            }
            if(passwordRepeat==null) {
                vm.error = "Repeat password is left empty!";

                $("#passwordRepeat").css("background-color", "lightcoral");
                $("#passwordRepeat").val("*Password required");

                return false;
            }
            else if(password != passwordRepeat) {
                vm.error = "The two passwords are not the same!";
                $("#password").css("background-color", "pink");
                $("#passwordRepeat").css("background-color", "skyblue");
                return false;
            }
            // } else if(UserService.findUserByUsername(username)) {
            //     vm.error = "The provided username already exists!";
            //     return false;
            // }
            return true;
        };
    }
})();












//
// (function(){
//     angular
//         .module("WebAppMaker")
//         .controller("RegisterController", RegisterController);
//
//     function RegisterController($location, UserService) {
//         var vm = this;
//
//         vm.register = function(username,password,passwordRepeat) {
//             if(validation(username,password,passwordRepeat))
//             {
//                 var newUser = UserService.createUser(username, password);
//                     if(newUser)
//                     {
//                     $location.url("/user/"+newUser._id);
//                     }
//                     else 
//                     {
//                     vm.error = "Cannot register Now!"
//                     }
//                 UserService.
//             }
//         };
//
//         function validation(username,password,passwordRepeat){
//             if(username==null || password==null)
//             {
//                 vm.error = "username or password is left empty!";
//                 return false;
//             } 
//             else if(password != passwordRepeat) 
//             {
//                 vm.error = "The two passwords are not the same!";
//                 return false;
//             } else if(UserService.findUserByUsername(username)) 
//             {
//                 vm.error = "The provided username already exists!";
//                 return false;
//             }
//             return true;
//         };
//     }
// })();