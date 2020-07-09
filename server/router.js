var express = require('express')
var router = express.Router();
var mongodb = require('./mongodb.js');
var dbOperation = require('./dbOperation.js');

/**
 * Handling login requests
 */

router.post('/login', function (request, response) {
    var name = request.body.loginMsg.name;
    var password = request.body.loginMsg.password;
    dbOperation.infoDetect(name, password, response);
})

/**
 * Returns an array of users who can add friends
 */

router.get('/search', function (request, response) {
    var searchData = request.query.text;
    var userName = request.query.name;
    var friendList = JSON.parse(request.query.friendList).friendList;
    dbOperation.getSearchList(searchData, userName, friendList, response);
})

router.get('/', function () {

})

router.get('/', function () {

})

router.post('/', function () {

})


module.exports = router;