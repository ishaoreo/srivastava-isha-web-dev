(function () {
    angular
        .module("WebAppMaker")
        .controller("EditPageController", EditPageController);

    function EditPageController($location, $routeParams, PageService) {
        var vm = this;
        vm.userId = $routeParams.userId;
        vm.websiteId = $routeParams.websiteId;
        vm.pageId = $routeParams.pageId;
        vm.deletePage = deletePage;
        vm.updatePage = updatePage;

        function init() {
            
                PageService
                    .findPageById(vm.pageId)
                    .then (function (response){
                        vm.page=reponse.data;
        })}

        init();

        function updatePage(page) {
                PageService
                    .updatePage(page)
                    .then(
                        function(response){
                            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
                        },
                    function(error){
                        vm.error = "Unable to update page";
                    }
                    );
            // if (result) {
            //     $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
            // } else {
            //     vm.error = "Unable to update page";
            // }
        }

        function deletePage(page) {
            var result =
                PageService
                    .deletePage(page)
                    .then(
                        function(){
                            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page"); 
                        },
                        function (){
                            vm.error = "Unable to delete page!";    
                        }
                    );
            // if (result) {
            //     $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
            // } else {
            //     vm.error = "Unable to delete page!";
            // }
        };
    };

})();