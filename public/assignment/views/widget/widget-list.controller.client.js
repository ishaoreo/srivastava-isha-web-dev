(function(){
    angular
        .module("WebAppMaker")
        .controller("WidgetListController",WidgetListController);

    function WidgetListController($sce,$routeParams,WidgetService){

        var vm = this;
        vm.userId = $routeParams.userId;
        vm.websiteId = $routeParams.websiteId; ///changed on 18june
        vm.pageId = $routeParams.pageId;
        vm.getSafeHtml = getSafeHtml;
        vm.getSafeUrl = getSafeUrl;
        vm.reorderWidget = reorderWidget;
        vm.error = false;

        function init(){
            WidgetService
                .findWidgetsByPageId(vm.pageId)
                .then(
                    function(response){
                        vm.widgets = response.data;
                    },
                    function(response){
                        vm.error = "Unable to fetch the widgets";
                    });
            // $(".container").sortable({axis:"y"});
        }
        init();

        function reorderWidget(start,end){
            console.log(start+" "+end);
            WidgetService
                .reorderWidget(vm.pageId,start,end)
                .then(
                    function(response){
                        // vm.widgets = response.data;
                        init();
                    },
                    function(response){
                        vm.error = "Unable to reorder widgets";
                    });
        }

        function getSafeHtml(widget){
            return $sce.trustAsHtml(widget.text)
        }

        function getSafeUrl(widget){
            var urlParts = widget.url.split("/");
            var id = urlParts[urlParts.length - 1];
            var url = "https://www.youtube.com/embed/"+id;
            return $sce.trustAsResourceUrl(url);
        }

    }
})();


// (function(){
//     angular
//         .module("WebAppMaker")
//         .controller("WidgetListController",WidgetListController);
//
//     /* you will need $routeParams to extract the page Id when you are implementing it */
//     /* the below one just works for hard coded stuff */
//
//     function WidgetListController($sce, $routeParams, WidgetService) {
//         var vm = this;
//         /* based on the pageId, you have to retrieve widgets for that pageID */
//
//         vm.pageId= $routeParams.pageId;
//         vm.userId = $routeParams.userId;
//         vm.websiteId = $routeParams.websiteId;
//
//
//         var pageId = $routeParams.pageId;
//
//         vm.getSafeHtml = getSafeHtml;
//         vm.getSafeUrl = getSafeUrl;
//
//         function getSafeUrl(widget) {
//             var urlParts = widget.url.split("/");
//             var id = urlParts[urlParts.length - 1];
//             var url = "https://www.youtube.com/embed/" + id;
//             return $sce.trustAsResourceUrl(url);
//         }
//         function getSafeHtml(widget){
//             return $sce.trustAsHtml(widget.text);
//         }
//
//         function init(){
//             WidgetService.findWidgetsByPageId(pageId)
//                 .then(function (response) {
//                     vm.widgets = response.data;
//                     $(".container")
//                         .sortable({
//                             axis: 'y'
//                         });
//
//                 });
//             //    vm.widgets = WidgetService.findWidgetsByPageId(pageId);
//         }
//         init();
//     }
// })();
//
// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// //
// // (function (){
// //     angular
// //         .module("WebAppMaker")
// //         .controller("WidgetListController", WidgetListController);
// //
// //     function WidgetListController ($sce, $routeParams, WidgetService) {
// //         var vm = this;
// //         vm.userId = $routeParams.userId;
// //         vm.websiteId = $routeParams.websiteId;
// //         vm.pageId = $routeParams.pageId;
// //         vm.getSafeHtml = getSafeHtml;
// //         vm.getSafeUrl = getSafeUrl;
// //
// //         function init(){
// //             vm.widgets = WidgetService.findWidgetsForPageId(vm.pageId);
// //         }
// //         init();
// //
// //         function getSafeHtml(widget) {
// //             return $sce.trustAsHtml(widget.text);
// //         }
// //
// //         function getSafeUrl(widget) {
// //             var urlParts = widget.url.split("/");
// //             var id = urlParts[urlParts.length-1];
// //             var url = "http://www.youtube.com/embed/"+id;
// //             return $sce.trustAsResourceUrl(url);
// //         }
// //     }
// //
// // })();