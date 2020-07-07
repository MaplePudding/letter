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

    /**
    * Detect login information
    */

    dbOperation.infoDetect(name, password, response);
})

router.get('/', function () {

})

router.get('/', function () {

})

router.get('/', function () {

})

router.post('/', function () {

})


module.exports = router;