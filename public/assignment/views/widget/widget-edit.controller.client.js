(function(){
    angular
        .module("WebAppMaker")
        .controller("WidgetEditController",WidgetEditController);

    /* you will need $routeParams to extract the page Id when you are implementing it */
    /* the below one just works for hard coded stuff */

    function WidgetEditController($sce,$location, $routeParams, WidgetService) {
        var vm = this;
        /* based on the pageId, you have to retrieve widgets for that pageID */
        vm.userId = $routeParams.userId;
        vm.websiteId = $routeParams.websiteId;
        vm.pageId = $routeParams.pageId;

        vm.widgetId = $routeParams.widgetId;

        vm.updateWidget = updateWidget;
        vm.deleteWidget = deleteWidget;

        function init(){
            WidgetService.findWidgetById(vm.widgetId)
                .then(function (response) {
                    vm.widget= response.data;

                });

        }
        init();

        function updateWidget(widget) {
            WidgetService.updateWidget(vm.widgetId, widget)
                .then (function (response) {
                    var result= response.data;
                    if(result){
                        $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget");
                    }else {
                        vm.error = "Error";
                    }
                });
        }


        function deleteWidget(widget) {
            WidgetService
                .deleteWidget(vm.widgetId)
                .then(function (response) {
                    var result = response.data;
                    if (result){
                        $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget");
                    }else {
                        vm.error = "Error";
                    }
                });
        }

        function getSafeHtml(widget){
            return $sce.trustAsHtml(widget.text);
        }


    }
})();


//
// (function(){
//     angular
//         .module("WebAppMaker")
//         .controller("EditWidgetController",EditWidgetController);
//
//     function EditWidgetController($location, $routeParams, WidgetService) {
//         var vm = this;
//         vm.userId = $routeParams.userId;
//         vm.websiteId = $routeParams.websiteId;
//         vm.pageId = $routeParams.pageId;
//         vm.widgetId = $routeParams.widgetId;
//         vm.deleteWidget = deleteWidget;
//         vm.updateWidget = updateWidget;
//
//         function init() {
//             vm.widget = WidgetService.findWidgetById(vm.widgetId);
//         }
//         init();
//
//         function deleteWidget() {
//             var result = WidgetService.deleteWidget(vm.widget);
//             if(result){
//                 $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget");
//             } else {
//                 vm.error = "Unable to delete the Widget!"
//             }
//         };
//
//         function updateWidget() {
//             var result = WidgetService.updateWidget(vm.widget);
//             if(result){
//                 $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget");
//             } else {
//                 vm.error = "Unable to update the Widget!"
//             }
//         }
//     }
// })();