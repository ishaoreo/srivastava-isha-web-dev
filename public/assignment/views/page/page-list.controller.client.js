(function(){
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController);

    function PageListController($routeParams, PageService) 
    {
        var vm = this;
        vm.userId = $routeParams.userId;
        vm.websiteId = $routeParams.websiteId;

        function init() {
            PageService
                .findPagesForWebsiteId(vm.websiteId)
                .then(function (response) {
                    console.log(response);
                    vm.pages = response.data;
                });
        }
        init();
        }

})();