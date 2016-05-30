

(function (){
    angular
        .module("WebAppMaker")
        .factory("WebsiteService", WebsiteService);

    var websites = [
        { "_id": "123", "name": "Facebook",    "developerId": "456" },
        { "_id": "234", "name": "Fantasyland",     "developerId": "456" },
        { "_id": "456", "name": "Castle",     "developerId": "456" },
        { "_id": "567", "name": "Taylor Swift", "developerId": "123" },
        { "_id": "678", "name": "Wonder Woman",    "developerId": "123" },
        { "_id": "789", "name": "Powerpuff girls",       "developerId": "234" }
    ];

    function WebsiteService (){
        var api = {
            findWebsitesForUserId : findWebsitesForUserId,
            findWebsiteById : findWebsiteById,
            createWebsite : createWebsite,
            updateWebsite : updateWebsite,
            deleteWebsite : deleteWebsite
        };
        return api;
        function createWebsite(developerId, name, description) {
            var newWebsite = {
                _id : (new Date()).getTime()+"",
                name : name,
                description : description,
                developerId : developerId
            };
            websites.push(newWebsite);
            return newWebsite;
        }

        function updateWebsite(website) {
            for(var i in websites) {
                if(websites[i]._id === website._id){
                    websites[i].name = website.name;
                    websites[i].description = website.description;
                    return websites[i];
                }
            }
            return null;
        }

        function deleteWebsite (websiteId) {
            for(var i in websites) {
                if(websites[i]._id === websiteId){
                    websites.splice(i,1);
                    return true;
                }
            }
            return false;
        }

        function findWebsiteById(websiteId) {
            for (var i in websites){
                if(websites[i]._id === websiteId){
                    return websites[i];
                }
            }
            return null;
        }

        function findWebsitesForUserId(userId) {
            var resultSet = [];
            for (var i in websites){
                if(websites[i].developerId === userId){
                    resultSet.push(websites[i]);
                }
            }
            return resultSet;
        }
    }
})();