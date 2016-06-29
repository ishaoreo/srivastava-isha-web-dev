/**
 * Created by isha srivastava on 07-Jun-16.
 */
///ntry point into database collection... like a middletier..
//just like a dedicated service for all user types...thus we will have one model per collection
//for each datatype/...module will colect all the models

///puts everything all models in a singlel place..so dat any1 who wants to access data can come thru this

module.exports = function()
{
    var mongoose = require('mongoose');
    mongoose.connect('mongodb://localhost/cs5610summer1');

    // var connectionString = 'mongodb://127.0.0.1:27017/test';
var connectionString = 'mongodb://localhost/cs5610summer1';

if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
    connectionString = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
        process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
        process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
        process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
        process.env.OPENSHIFT_APP_NAME;
}


mongoose.connect(connectionString);


    var models={
        userModel:require("./user/user.model.server.js")(),
        websiteModel: require("./website/website.model.server")(),
        pageModel: require("./page/page.model.server")(),
        widgetModel: require("./widgets/widget.model.server")()
    //too add all other models,websitemodel,pagemodel and widgetmodel
    }
    return models;
};