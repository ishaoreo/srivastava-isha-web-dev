
(function(){
    angular
        .module("WebAppMaker")
        .controller("RegisterController", RegisterController);

    function RegisterController($location, UserService) {
        var vm = this;
        vm.register = register;

        function register(username,password,passwordRepeat) {
            // if(validation(username,password,passwordRepeat)){
            //var newUser = UserService.createUser(username, password);
            UserService
                .createUser(username, password)
                .then(function(response){
                    var user = response.data;
                    if(user){
                        $location.url("/user/"+user._id);
                    } else {
                        vm.error = "Cannot register Now!"
                    }
                })

            // }
        };

        function validation(username,password,passwordRepeat){
            if(username==null || password==null){
                vm.error = "username or password is left empty!";
                return false;
            } else if(password != passwordRepeat) {
                vm.error = "The two passwords are not the same!";
                return false;
            } else if(UserService.findUserByUsername(username)) {
                vm.error = "The provided username already exists!";
                return false;
            }
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