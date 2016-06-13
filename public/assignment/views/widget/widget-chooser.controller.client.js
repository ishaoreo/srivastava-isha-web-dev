(function(){
    angular
        .module("WebAppMaker")
        .controller("WidgetChooseController",WidgetChooseController);
    function WidgetChooseController($location,$sce,$routeParams,WidgetService){

        var vm = this;
        vm.userId = $routeParams.userId;
        vm.websiteId = $routeParams.websiteId;
        vm.pageId = $routeParams.pageId;
        vm.getSafeHtml = getSafeHtml;
        vm.getSafeUrl = getSafeUrl;
        vm.createWidget = createWidget;

        vm.widgetTypes = [
            {text: "HEADER"},
            {text: "LABEL"},
            {text: "HTML"},
            {text: "TEXT INPUT"},
            {text: "LINK"},
            {text: "BUTTON"},
            {text: "IMAGE"},
            {text: "YOUTUBE"},
            {text: "DATA TABLE"},
            {text: "REPEATER"}
        ];
        vm.error = false;

        // function init(){
        //     WidgetService
        //         .findWidgetsByPageId(vm.pageId)
        //         .then(
        //             function(response){
        //                 vm.widgets = response.data;
        //             },
        //             function(response){
        //                 vm.error = "Unable to fetch Widgets";
        //             });
        // }
        // init();

        function createWidget(type){
            var widget = {
                widgetType:type
            };

            WidgetService
                .createWidget(vm.pageId,widget)
                .then(
                    function(response){
                        vm.widget = response.data;
                        if(vm.widget._id)
                            $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget/"+vm.widget._id);
                        else
                            vm.error = "Unable to create a Widget";
                    });
        }

        function getSafeHtml(widget){
            return $sce.trustAsHtml(widget.text);
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
//         .controller("WidgetChooseController",WidgetChooseController);
//
//     /* you will need $routeParams to extract the page Id when you are implementing it */
//     /* the below one just works for hard coded stuff */
//
//     function WidgetChooseController($sce, $location, $routeParams, WidgetService) {
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
//         vm.createHeaderWidget= createHeaderWidget;
//         vm.createImageWidget= createImageWidget;
//         vm.createYouTubeWidget= createYouTubeWidget;
//
//         function createHeaderWidget(pageId){
//             var widget = {
//                 _id : (new Date()).getTime()+"",
//                 widgetType: "HEADER",
//                 pageId : pageId
//             };
//
//
//             WidgetService
//                 .createWidget(pageId, widget)
//                 .then(function (response) {
//                     var result = response.data;
//                     if (result){
//                         $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget/"+widget._id);
//                     }else{
//                         vm.error = "error in creating Header page";
//                     }
//                 });
//
//
//         }
//
//
//         function createImageWidget(pageId){
//             var widget = {
//                 _id : (new Date()).getTime()+"",
//                 widgetType: "IMAGE",
//                 pageId : pageId
//             };
//
//             WidgetService.createWidget(pageId, widget)
//                 .then (function (response) {
//                     var result = response.data;
//                     if (result){
//                         $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget/"+widget._id);
//                     }else{
//                         vm.error = "error in creating Image page";
//                     }
//                 });
//
//         }
//
//
//         function createYouTubeWidget(pageId){
//             var widget = {
//                 _id : (new Date()).getTime()+"",
//                 widgetType: "YOUTUBE",
//                 pageId : pageId
//             };
//
//             WidgetService.createWidget(pageId, widget)
//                 .then (function (response) {
//                     var result = response.data;
//                     if (result){
//                         $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget/"+widget._id);
//                     }else{
//                         vm.error = "error in creating Youtube Page ";
//                     }
//                 });
//
//         }
//
//
//         function getSafeUrl(widget) {
//             var urlParts = widget.url.split("/");
//             var id = urlParts[urlParts.length - 1];
//             var url = "https://www.youtube.com/embed/" + id;
//             return $sce.trustAsResourceUrl(url);
//         }
//
//         function getSafeHtml(widget){
//             return $sce.trustAsHtml(widget.text);
//         }
//
//
//     }
// })();
//
