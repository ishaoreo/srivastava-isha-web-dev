/**
 * Created by isha srivastava on 05-Jun-16.
 */

module.exports = function (app) {
var pages = [
    { "_id": "678", "name": "Post 1", "websiteId": "456" },
    { "_id": "432", "name": "scrooge", "websiteId": "456" },
    { "_id": "543", "name": "ariel", "websiteId": "456" },
    { "_id": "321", "name": "pumba", "websiteId": "789" },
    { "_id": "876", "name": "timon", "websiteId": "789" },
    { "_id": "786", "name": "hercules", "websiteId": "789" }
];
app.post("/api/website/:websiteId/page",createPage);
    app.get("/api/website/:websiteId/page",findAllPagesForWebsite);
    app.get("/api/page/:pageId",findPageById);
  app.put("/api/page/:pageId",updatePage);
 app.delete("/api/page/:pageId",deletePage);


    function createPage(req, res) {
    var newPage = req.body;
    newPage._id = (new Date()).getTime() + "";
    console.log(newPage);
    pages.push(newPage);
    console.log(newPage);
    res.send(pages);
}
    function findAllPagesForWebsite(req, res) {
        var websiteId = req.params.websiteId;
        var resultSet = [];
        for (var i in pages) {
            if (pages[i].websiteId === websiteId) {
                resultSet.push(pages[i]);
            }
        }
        res.json(resultSet);
    }

    function findPageById(req,res) {
        var pageId = req.params.pageId;
        
        for (var i in pages) {
            if (pages[i]._id === pageId) {
                res.send(pages[i]);
                return;
            }
        }
        res.send({});
    }

    function updatePage(req,res){
        var pageId=req.params.pageId;
        var page =req.body;

        for(var i in pages) {
            if(pages[i]._id === pageId){
                pages[i].name = page.name;
                pages[i].title = page.title;
                res.send(200);
                return
            }
        }
        res.send(400);
    }

    function deletePage(req,res)
    {
        var pageId=req.params.pageId;


        for(var i in pages) {
            if(pages[i]._id === pageId){
                pages.splice(i,1);
                res.send(200);
                return;
            }
        }
        res.send(400);
    }
}

