var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://127.0.0.1:27017/user');

var userSchema = mongoose.Schema({
    name: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    friends: { type: Array }
});

var temp = {
    friends: [
        {
            name: "admin2",
            content:[
                {
                    msg: "hello admin2",
                    user: "admin1"
                },
                {
                    msg: "hello admin1",
                    user: "admin2"
                }
            ]
        }
    ]
}


var userSchema = mongoose.model('user', userSchema);
userSchema.update({name: "admin1"}, {friends: temp.friends}, function(err, data){

})







exports.userSchema = userSchema;


