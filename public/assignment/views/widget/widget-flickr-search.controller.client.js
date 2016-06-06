(function () {
    angular
        .module("WebAppMaker")
        .controller("FlickrImageSearchController",FlickrImageSearchController);

    function FlickrImageSearchController(FlickrService, WidgetService, $location, $routeParams) {
        var vm = this;
        vm.userId = $routeParams.userId;
        vm.websiteId = $routeParams.websiteId;
        var websiteId = vm.websiteId;
        vm.pageId = $routeParams.pageId;
        var pageId = vm.pageId;
        vm.widgetId = $routeParams.widgetId;
        var widgetId = vm.widgetId;

        vm.selectPhoto = selectPhoto;
        vm.searchPhotos = searchPhotos;

        function selectPhoto(photo) {
            var url = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server;
            url += "/" + photo.id + "_" + photo.secret + "_b.jpg";

            var widget = {
                websiteId : websiteId,
                pageId : pageId,
                url: url
            };

            WidgetService
                .updateWidget(widgetId, widget)
                .then(function (response) {
                    var result = response.data;
                    if(result){
                        $location.url("/user/"+vm.userId+"/website/"+websiteId+"/page/"+pageId+"/widget/"+widgetId);
                    }else{
                        vm.error = "failed!";
                    }
                });
        }

        function searchPhotos(searchText) {
            FlickrService
                .searchPhotos(searchText)
                .then(function (response) {
                    data = response.data.replace("jsonFlickrApi(","");
                    data = data.substring(0,data.length - 1);
                    data = JSON.parse(data);
                    vm.photos = data.photos;
                });
        }
    }
})();

