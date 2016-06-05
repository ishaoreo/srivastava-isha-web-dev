(function(){
    angular
        .module("WebAppMaker")
        .factory("FlickrService", FlickrService);

    var key = "81059d22e8cf81c65640dd518f0ed7fa";
    var secret = "ffadf4059aa08b77";
    var urlBase = "https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=API_KEY&text=TEXT";

    function FlickrService($http) {
        var api = {
            searchPhotos: searchPhotos
        };
        return api;

        function searchPhotos(searchTerm) {
            var url = urlBase
                .replace("API_KEY", key)
                .replace("TEXT", searchTerm);
            return $http.get(url);
        }
    }
})();