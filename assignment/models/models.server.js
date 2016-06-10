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
    
    var models={
        userModel:require("./user/user.model.server.js") ()
    //too add all other models,websitemodel,pagemodel and widgetmodel
    }
    return models;
};