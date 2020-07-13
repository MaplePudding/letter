var mongodb = require('./mongodb.js');
const { response } = require('express');
const { mongo } = require('mongoose');

/**
* Detect login information
*/

var infoDetect = function (name, password, response) {
    mongodb.userSchema.find({ name: name, password: password }, { name: 1, password: 1, friends: 1 }, function (err, data) {
        if (data.length == 0) {
            response.send('Login Error')
        }
        else {
            response.send(data);
        }
    });
}

/**
 * Get search list
 */

/**
 * [
 * {
 *  'content':[{msg: '', user: ''}, {}],
 *  'name': 'name'
 * }
 * ]
 * 
 * 
 */

var getSearchList = function (searchData, userName, friendList, response) {
    mongodb.userSchema.find(function (err, data) {
        var arr = []
        for (el in data) {
            if (data[el].name.toLowerCase().indexOf(searchData.toLowerCase()) != -1 && friendList.indexOf(data[el].name) == -1 && data[el].name != userName) {
                arr.push(data[el]);
            }
        }
        response.send(arr);
    });
}

/**
 * Check if the username exists
 */

var checkUsername = function (userName, password, email, response) {
    mongodb.userSchema.find({ name: userName }, function (err, data) {
        if (data.length != 0) {
            response.send('exists');
        }
        else {
            writeUserInfo(userName, password, email, response);
        }
    })
}

/**
 * Write the registration information to the database
 */

var writeUserInfo = function (name, password, email, response) {
    var metaData = {
        name: name,
        password: password,
        email: email,
        friends: []
    }
    mongodb.userSchema.create(metaData, function (error, data) {
        response.send('Registration is complete')
    })
}


/**
 * Add friend
 */

var addFriend = function (name, userName, friendsList, response) {

    friendsList.push({ 'content': [{ 'msg': '', 'user': '' }], 'name': name });

    /**
     * Write user information into friend data
     */

    mongodb.userSchema.find({ name: name }, function (error, data) {
        var OthFriendsList = data[0].friends;
        OthFriendsList.push({ 'content': [{ 'msg': '', 'user': '' }], 'name': userName })
        mongodb.userSchema.update({ name: name }, { friends: OthFriendsList }, function (err, data) {

        })
    });

    /**
     * Write friend information to the user data
     */

    mongodb.userSchema.update({ name: userName }, { friends: friendsList }, function (error, data) {
        mongodb.userSchema.find({ name: userName }, function (error, data) {
            response.send(data[0].friends);
        })
    })
}

/**
 * Write chat information to the database
 */

var writeChatInfoToUser = function(userName, friendName, msgStr){
    mongodb.userSchema.find({name: userName}, function(error, data){
        var msgData = {msg: msgStr, user: userName}
        for(var i = 0; i < data[0].friends.length; ++i){
            if(data[0].friends[i].name == friendName){
                data[0].friends[i].content.push(msgData);
            }
        }

        /**
         * Update chat information
         */

        mongodb.userSchema.update({name: userName}, {friends: data[0].friends}, function(error, data){
            console.log(data);
        })
    })
}

var writeChatInfoToFriend = function(userName, friendName, msgStr){
    mongodb.userSchema.find({name: friendName}, function(error, data){
        var msgData = {msg: msgStr, user: userName}
        for(var i = 0; i < data[0].friends.length; ++i){
            if(data[0].friends[i].name == userName){
                data[0].friends[i].content.push(msgData);
            }
        }

        /**
         * Update chat information
         */

        mongodb.userSchema.update({name: friendName}, {friends: data[0].friends}, function(error, data){
            console.log(data);
        })
    })
}

var getNewList = function(userName, response){
    mongodb.userSchema.find({ name: userName }, { name: 1,  friends: 1 }, function (err, data) {
        response.send(data);
    });
}


mongodb.userSchema.remove(function () {

})




exports.infoDetect = infoDetect;
exports.getSearchList = getSearchList;
exports.checkUsername = checkUsername;
exports.addFriend = addFriend;
exports.writeChatInfoToUser = writeChatInfoToUser;
exports.writeChatInfoToFriend = writeChatInfoToFriend;
exports.getNewList = getNewList;