/**
 * Created by isha srivastava on 07-Jun-16.
 */
////data accessobjecte...helps to provide high level api that allows us to communicate with low leve database
 // this module gives high level appi to interact with datbase

///only data access shud stay here..no business logic... nothing dats not object shud not reside here
/// for each datatype dp this..only crud dtabase operations



module.exports = function() {

    var mongoose = require("mongoose")
    var UserSchema = require("./user.schema.server")();
    var User = mongoose.model("User", UserSchema);

    var api = {
        findFacebookUser: findFacebookUser,
        createUser: createUser,
        findUserById: findUserById,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials,
        updateUser: updateUser,
        deleteUser: deleteUser
    };
    return api;

    function findFacebookUser(id) {
        return User.findOne({"facebook.id": id});
    }

    function updateUser(userId, user) {
        delete user._id;
        return User
            .update({_id: userId},{
                $set: {
                    firstName: user.firstName,
                    lastName: user.lastName
                }
            });
    }

    function deleteUser(userId) {
        return User.remove({_id: userId});
    }

    function findUserByCredentials(username, password) {
        return User.findOne({username: username, password: password});
    }

    function findUserById(userId) {
      // return User.find({_id:userId});
        return User.findById(userId);
    }

    function createUser(user) {
        console.log("user.model.server.createUser()");
        console.log(user);
        return User.create(user);
    }

    function findUserByUsername(username) {
        return User.findOne({username: username});
    }
};