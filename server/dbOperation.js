var mongodb = require('./mongodb.js');
const { response } = require('express');

/**
* Detect login information
*/

var infoDetect = function (name, password, response) {
    mongodb.userSchema.find({ name: name, password: password }, { name: 1, password: 1, friends: 1}, function (err, data) {
        if (data.length == 0) {
            response.send('Login Error')
        }
        else{
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

var getSearchList = function(searchData, userName, friendList, response){
    mongodb.userSchema.find(function(err, data){
        var arr = []
        for(el in data){
            if(data[el].name.toLowerCase().indexOf(searchData.toLowerCase()) != -1 && friendList.indexOf(data[el].name) == -1 && data[el].name != userName){
                arr.push(data[el]);
            }
        }
        response.send(arr);
    });
}

/**
 * Check if the username exists
 */

var checkUsername = function(userName, password, email, response){
    mongodb.userSchema.find({name: userName}, function(err, data){
        if(data.length != 0){
            response.send('exists');
        }
        else{
            writeUserInfo(userName, password, email, response);
        }
    })
}

/**
 * Write the registration information to the database
 */

var writeUserInfo = function(name, password, email, response){
    var metaData = {
        name: name,
        password: password,
        email: email
    }
    mongodb.userSchema.create(metaData, function(error, data){
        response.send('Registration is complete')
    })
}





exports.infoDetect = infoDetect;
exports.getSearchList = getSearchList;
exports.checkUsername = checkUsername;