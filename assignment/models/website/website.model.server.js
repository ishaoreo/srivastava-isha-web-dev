

module.exports = function() {

    var mongoose = require("mongoose");
    var WebsiteSchema = require("./website.schema.server.js")();
    var Website = mongoose.model("Website", WebsiteSchema);

    var api = {
        createWebsite: createWebsite,
        findAllWebsitesForUser: findAllWebsitesForUser,
        findWebsitesByUserId: findWebsitesByUserId, //rechanged 11
        updateWebsite : updateWebsite,
        deleteWebsite : deleteWebsite
    };
    return api;

function deleteWebsite(websiteId)
{

}

    function findWebsitesByUserId(websiteId) { ///rechanged 11
        return Website.findById(websiteId);
    }

    function createWebsite(userId, website) {
        website._user = userId;
        return Website.create(website);
    }

    function findAllWebsitesForUser(userId) {
        return Website.find({"_user": userId});
    }

    function updateWebsite(websiteId, website){
        delete website._id;
        return Website
            .update({_id: websiteId},{
                $set: {
                    name: website.name,
                    description: website.description
                }
            });
    }

    function deleteWebsite(websiteId){
        return Website.remove({_id: websiteId});
    }
}