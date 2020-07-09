var mongodb = require('./mongodb.js');

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


exports.infoDetect = infoDetect;
exports.getSearchList = getSearchList;