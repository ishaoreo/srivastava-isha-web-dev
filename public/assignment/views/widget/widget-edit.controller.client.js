
(function(){
    angular
        .module("WebAppMaker")
        .controller("EditWidgetController",EditWidgetController);

    function EditWidgetController($location, $routeParams, WidgetService) {
        var vm = this;
        vm.userId = $routeParams.userId;
        vm.websiteId = $routeParams.websiteId;
        vm.pageId = $routeParams.pageId;
        vm.widgetId = $routeParams.widgetId;
        vm.deleteWidget = deleteWidget;
        vm.updateWidget = updateWidget;

        function init() {
            vm.widget = WidgetService.findWidgetById(vm.widgetId);
        }
        init();

        function deleteWidget() {
            var result = WidgetService.deleteWidget(vm.widget);
            if(result){
                $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget");
            } else {
                vm.error = "Unable to delete the Widget!"
            }
        };

        function updateWidget() {
            var result = WidgetService.updateWidget(vm.widget);
            if(result){
                $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget");
            } else {
                vm.error = "Unable to update the Widget!"
            }
        }
    }
})();