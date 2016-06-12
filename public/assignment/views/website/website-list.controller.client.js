(function () {
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController);

    function WebsiteListController($routeParams, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams.userId;

        function init() {
            WebsiteService
                .findWebsitesByUserId(vm.userId)
                .then(function (response) {
                    console.log(response);
                    vm.websites = response.data;
                },
            function(response){
                vm.error="Unable to fetch Websites";
            }
                );

    }

    init();
}

})();