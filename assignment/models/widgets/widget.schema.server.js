module.exports = function() {
    var mongoose = require("mongoose");

    var WidgetSchema = mongoose.Schema({
        order: Number,
        _page: {type:mongoose.Schema.ObjectId,ref:"Page"},
        widgetType: String,
        name: String,
        text: String,
        description: String,
        placeholder:String,
        url: String,
        width:String,
        height:String,
        rows:Number,
        size:Number,
        class:String,
        icon:String,
        deletable:Boolean,
        formatted:Boolean,
        dateCreated: {type: Date, default: Date.now}
    }, {collection: "assignment.widget"});

    return WidgetSchema;
};