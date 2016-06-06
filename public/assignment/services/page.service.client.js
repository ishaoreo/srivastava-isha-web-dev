
(function(){
    angular
        .module("WebAppMaker")
        .factory("PageService",PageService);


    function PageService($http){
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
            //pages.push(newPage);
            //return newPage;
            return $http.post("/api/website/+"+websiteId+"/page" ,newPage);

        };

        function updatePage(page) {
            // for(var i in pages) {
            //     if(pages[i]._id === page._id){
            //         pages[i].name = page.name;
            //         pages[i].title = page.title;
            //         return pages[i];
            //     }
            // }
            // return null;
            var url="/api/page/"+page._id;
            return $http.put(url,page);
        };

        function deletePage(page) {
            // for(var i in pages) {
            //     if(pages[i]._id === page._id){
            //         pages.splice(i,1);
            //         return true;
            //     }
            // }
            // return false;
            console.log("")
            var url= "/api/page/"+page._id;
           return $http.delete(url);
        }

        function findPageById(id) {
            // for(var i in pages){
            //     if(pages[i]._id === id){
            //         return pages[i];
            //     }
            // }
            // return null;
            var url= "/api/page/"+id;
           return $http.get(url);
        };

        function findPagesForWebsiteId(websiteId) {
            // var resultSet = [];
            // for(var i in pages){
            //     if(pages[i].websiteId === websiteId){
            //         resultSet.push(pages[i]);
            //     }
            // }
            // return resultSet;
            var url= "/api/website/"+websiteId+"/page";
           return $http.get(url);
        }
    }

})();