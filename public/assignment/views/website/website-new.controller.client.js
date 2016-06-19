
(function (){
    angular
        .module("WebAppMaker")
        .controller("NewWebsiteController", NewWebsiteController);

    function NewWebsiteController ($location, $routeParams, WebsiteService,$http) {
        var vm = this;
        vm.userId = $routeParams.userId;

        vm.createWebsite = createWebsite;

        // function init()
        // {
        //     WebsiteService
        //         .createWebsite(vm.userId, name, description)
        //         .then(function(response) {
        //             var website=response.data;
        //
        // })}
        // init();

        function createWebsite(name, description) { //ask if there is a need for this
            //console.log("createwebsite controller");
            if (validation(name)) {
                WebsiteService
                    .createWebsite(vm.userId, name, description)
                    .then(
                        function (response) {
                            $location.url("/user/" + vm.userId + "/website");
                            var website = response.data;
                        },
                        function (error) {
                            vm.error = "Unable to create website";
                            $("#name").css({'border-color': 'lightcrimson'});
                        }
                    );
            }
        }

        function validation(name) {
            if (name == null) {
                vm.error = "Name has to be entered!";
                $("#name").css("background-color", "lightcoral");
                return false;
            }
            return true;
        }
    }

})();