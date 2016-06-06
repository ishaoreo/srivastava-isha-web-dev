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
            console.log("inside 1st outer" + vm.pageId);
                PageService
                    .findPageById(vm.pageId)
                    .then (function (response){
                        console.log("inside 1st init update func");
                        vm.page=response.data;
                        console.log(vm.page);
        })}

        init();

        function updatePage(page) {

                PageService
                    .updatePage(page)
                    .then(
                        function(response){
                            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
                            // console.log("inside 1st update func")
                            // console.log(response.data)
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
         
                PageService
                    .deletePage(page)
                    .then(
                        function(response){
                            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page"); 
                        },
                        function (error){
                            vm.error = "Unable to delete page!";    
                        }
                    );
            // if (result) {
            //     $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
            // } else {
            //     vm.error = "Unable to delete page!";
            // }
        }
    };

})();