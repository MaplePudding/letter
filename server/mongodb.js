var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://127.0.0.1:27017/user');

var userSchema = mongoose.Schema({
    name: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    friends: { type: Array }
});

var userSchema = mongoose.model('user', userSchema);

exports.userSchema = userSchema;


