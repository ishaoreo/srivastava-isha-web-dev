

module.exports = function() {

    var mongoose = require("mongoose");
    var PageSchema = require("./page.schema.server")();
    var Page = mongoose.model("Page", PageSchema);

    var api = {

        createPage: createPage,
        findAllPagesForWebsite : findAllPagesForWebsite,
        findPageById:findPageById,
        updatePage:updatePage,
        deletePage:deletePage

    };
    return api;

    function createPage(websiteId, page) {
        console.log("inside page.model.servert create");
        console.log("inside page.model.servert create"+websiteId);
        console.log("inside page.model.servert create"+page);


        page._website = websiteId;

        console.log(page);
        return Page.create(page);
    }

    function findAllPagesForWebsite(websiteId){
        return Page.find({"_website": websiteId});
    }

    function findPageById(pageId){
        return Page.findById(pageId);
    }

    function updatePage(pageId, page){
        delete page._id;
        return Page
            .update({_id: pageId},{
                $set: {
                    name: page.name,
                    title: page.title,
                    description:page.description
                }
            });
    }

    function deletePage(pageId){
        return Page.remove({_id: pageId});
    }

};
