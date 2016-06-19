

(function (){
    angular
        .module("WebAppMaker")
        .controller("EditWebsiteController", EditWebsiteController);

    function EditWebsiteController ($location, $routeParams, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams.userId;
        vm.websiteId = $routeParams.websiteId;
        vm.deleteWebsite = deleteWebsite;
        vm.updateWebsite = updateWebsite;

        function init() {
            //vm.website =
                WebsiteService
                    .findWebsiteById(vm.websiteId)
                    .then (function (response){
                        vm.website=response.data;
                    });
        }
        init();

        function updateWebsite(website){
           // commented on 19june var result =

            if (validation(website.name)) {
                WebsiteService
                    .updateWebsite(website)
                    .then(
                        function (response) {
                        vm.success = 'updated successfully';
                            $location.url("/user/"+vm.userId+"/website");
                    },
                        function (error)
                        {
                            vm.error="unable to update website";
                        }
        )} }

        function validation(name) {
            if (name == null) {
                vm.error = "Name has to be entered!";
                $("#website-name").css("background-color", "lightcoral");
                return false;
            }
            return true;
        }



        //     if(result)
        //     {
        //         $location.url("/user/"+vm.userId+"/website");
        //     } 
        //     else 
        //     {
        //         vm.error = "Unable to update website";
        //     }
        // }

        function deleteWebsite(websiteId) {
            var result =
                WebsiteService
                    .deleteWebsite(websiteId)
                    .then (
                        function () {
                        $location.url("/user/" + vm.userId + "/website");
                    },
                        function () {
                            vm.error = "Unable to delete website";
                    });
            // if(result)
            // {
            //     $location.url("/user/"+vm.userId+"/website");
            // }
            // else 
            // {
            //     vm.error = "Unable to delete website";
            // }
        }
    }

})();