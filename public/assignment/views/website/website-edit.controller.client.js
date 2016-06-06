

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
                        vm.website=reponse.data;
                    });
        }
        init();

        function updateWebsite(website){
            var result = 
                WebsiteService
                    .updateWebsite(website)
                    .then(
                        function (response) {
                        vm.success = 'updated successfully';
                    },
                        function (error)
                        {
                            vm.error="unable to update website";
                        }
        )}
        



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