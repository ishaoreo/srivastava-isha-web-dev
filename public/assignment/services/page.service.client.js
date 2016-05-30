
(function(){
    angular
        .module("WebAppMaker")
        .factory("PageService",PageService);
    var pages = [
        { "_id": "678", "name": "Post 1", "websiteId": "456" },
        { "_id": "432", "name": "scrooge", "websiteId": "456" },
        { "_id": "543", "name": "ariel", "websiteId": "456" },
        { "_id": "321", "name": "pumba", "websiteId": "789" },
        { "_id": "876", "name": "timon", "websiteId": "789" },
        { "_id": "786", "name": "hercules", "websiteId": "789" },
    ];

    function PageService(){
        var api = {
            findPagesForWebsiteId : findPagesForWebsiteId,
            findPageById : findPageById,
            createPage : createPage,
            updatePage : updatePage,
            deletePage : deletePage
        };
        return api;

        function createPage(websiteId, name, title) {
            var newPage = {
                _id : (new Date()).getTime()+"",
                name : name,
                title : title,
                websiteId : websiteId
            };
            pages.push(newPage);
            return newPage;
        };

        function updatePage(page) {
            for(var i in pages) {
                if(pages[i]._id === page._id){
                    pages[i].name = page.name;
                    pages[i].title = page.title;
                    return pages[i];
                }
            }
            return null;
        };

        function deletePage(page) {
            for(var i in pages) {
                if(pages[i]._id === page._id){
                    pages.splice(i,1);
                    return true;
                }
            }
            return false;
        }

        function findPageById(id) {
            for(var i in pages){
                if(pages[i]._id === id){
                    return pages[i];
                }
            }
            return null;
        };

        function findPagesForWebsiteId(websiteId) {
            var resultSet = [];
            for(var i in pages){
                if(pages[i].websiteId === websiteId){
                    resultSet.push(pages[i]);
                }
            }
            return resultSet;
        };
    };

})();