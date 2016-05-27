(function() {

    angular
        .module("WebAppMaker")
        .config(Config);
    
    function Config($routeProvider) {
        // ROuteprovider is a well known object...the function is parsed by angular..and angular can read whatever u r passing 
        //also callled dependency injection
        
        //aangular is gonna use the above thingy to listen,whenevr login etc r pressed.
        //then it will navigate to that particular place html

        $routeProvider

            .when("/", {
                templateUrl: "views/widget/home.html"
            })



            .when("/login", {
                templateUrl: "views/user/login.view.client.html",
                controller: "LoginController",
                controllerAs: "model"
                //the dollar sign of the scope helps to control everything in this html
            })

            .when("/register", {
                templateUrl: "views/user/register.view.client.html"
            })


            .when("/profile/:id", {
                templateUrl: "views/user/profile.view.client.html",
               controller: "ProfileController",
                controllerAs: "model"
            })


            .otherwise({
                redirectTo: "/login"
            })

    }
})();