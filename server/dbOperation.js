var mongodb = require('./mongodb.js');

/**
* Detect login information
*/

var infoDetect = function (name, password, response) {
    mongodb.userSchema.find({ name: name, password: password }, { name: 1, password: 1 }, function (err, data) {
        if (data.length == 0) {
            response.send('Login Error')
        }
        else{
            response.send("success");
        }
    });
}

exports.infoDetect = infoDetect;