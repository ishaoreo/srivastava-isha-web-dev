/**
 * Created by Rashmi_Dwaraka on 5/26/2016.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("FlickrImageSearchController",FlickrImageSearchController);

    function FlickrImageSearchController($location,$routeParams,FlickrService,WidgetService) {
        var vm = this;
        vm.userId=$routeParams.userId;
        vm.websiteId=$routeParams.websiteId;
        vm.pageId=$routeParams.pageId;
        vm.widgetId=$routeParams.widgetId;
        vm.searchPhotos = searchPhotos;
        vm.selectPhoto = selectPhoto;

        function searchPhotos(searchText) {
            FlickrService
                .searchPhotos(searchText)
                .then(
                    function(response){
                        data = response.data.replace("jsonFlickrApi(","");
                        data = data.substring(0,data.length - 1);
                        data = JSON.parse(data);
                        vm.photos = data.photos;
                    },
                    function(response){
                        vm.error="Unable to search Flickr";
                    });
        }

        function selectPhoto(photo) {
            var url = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server;
            url += "/" + photo.id + "_" + photo.secret + "_b.jpg";

            var widget = {
                websiteId : vm.websiteId,
                pageId : vm.pageId,
                widgetId : vm.widgetId,
                widgetType : 'IMAGE',
                url : url,
                userId : vm.userId
            };

            WidgetService
                .updateWidget(vm.widgetId,widget)
                .then(function(response){
                        var url = "/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget/"+vm.widgetId;
                        $location.url(url);
                        // $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget"+vm.widgetId);
                    },
                    function(response){
                        vm.error = "Unable to select the picture";
                    });
        }

    }
})();


// (function () {
//     angular
//         .module("WebAppMaker")
//         .controller("FlickrImageSearchController",FlickrImageSearchController);
//
//     function FlickrImageSearchController(FlickrService, WidgetService, $location, $routeParams) {
//         var vm = this;
//         vm.userId = $routeParams.userId;
//         vm.websiteId = $routeParams.websiteId;
//         var websiteId = vm.websiteId;
//         vm.pageId = $routeParams.pageId;
//         var pageId = vm.pageId;
//         vm.widgetId = $routeParams.widgetId;
//         var widgetId = vm.widgetId;
//
//         vm.selectPhoto = selectPhoto;
//         vm.searchPhotos = searchPhotos;
//
//         function selectPhoto(photo) {
//             var url = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server;
//             url += "/" + photo.id + "_" + photo.secret + "_b.jpg";
//
//             var widget = {
//                 websiteId : websiteId,
//                 pageId : pageId,
//                 url: url
//             };
//
//             WidgetService
//                 .updateWidget(widgetId, widget)
//                 .then(function (response) {
//                     var result = response.data;
//                     if(result){
//                         $location.url("/user/"+vm.userId+"/website/"+websiteId+"/page/"+pageId+"/widget/"+widgetId);
//                     }else{
//                         vm.error = "failed!";
//                     }
//                 });
//         }
//
//         function searchPhotos(searchText) {
//             FlickrService
//                 .searchPhotos(searchText)
//                 .then(function (response) {
//                     data = response.data.replace("jsonFlickrApi(","");
//                     data = data.substring(0,data.length - 1);
//                     data = JSON.parse(data);
//                     vm.photos = data.photos;
//                 });
//         }
//     }
// })();
//
