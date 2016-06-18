/**
 * Created by isha srivastava on 07-Jun-16.
 */

module.exports = function()
{
    /// schemaa
    var mongoose = require('mongoose');
    
    var UserSchema = mongoose.Schema({ //user schema being created here
    username : {type:String, required: true}, //enforcing that it is a required field
        password: String,
        firstName: String,
        lastName: String,
        facebook: {
            id:    String,
            token: String,
            displayName: String
        },
        dob: Date,
        dateCreated:{type:Date, default: Date.now}
    },{collection: "assignment.user"});
    return UserSchema;
}