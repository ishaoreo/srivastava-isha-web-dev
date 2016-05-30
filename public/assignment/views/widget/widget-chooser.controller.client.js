(function () {
    angular
        .module("WebAppMaker")
        .controller("NewWidgetController", NewWidgetController);

    function NewWidgetController($location, $routeParams, WidgetService) {
        var vm = this;
        vm.userId = $routeParams.userId;
        vm.websiteId = $routeParams.websiteId;
        vm.pageId = $routeParams.pageId;
        vm.selectedWidget = null;
        vm.createWdiget = createWdiget;

        function createWdiget(widgetName) {
            if (widgetName === 'HEADER') {
                vm.selectedWidget = WidgetService.createNewHeader(vm.pageId);
            } else if (widgetName === 'LABEL') {

            } else if (widgetName === 'HTML') {
                vm.selectedWidget = WidgetService.createNewHTML(vm.pageId);

            } else if (widgetName === 'TEXT-INPUT') {

            } else if (widgetName === 'LINK') {

            } else if (widgetName === 'BUTTON') {

            } else if (widgetName === 'IMG') {
                vm.selectedWidget = WidgetService.createNewIMG(vm.pageId);

            } else if (widgetName === 'YOUTUBE') {
                vm.selectedWidget = WidgetService.createNewYoutube(vm.pageId);

            } else if (widgetName === 'DATA-TABLE') {

            } else if (widgetName === 'REPEAT') {

            } else {

            }
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/" + vm.selectedWidget._id);

        }

    };
})();