var express = require('express')
var router = express.Router();
var mongodb = require('./mongodb.js');
var dbOperation = require('./dbOperation.js');
var webSocket = require('./websocket.js');
const init = require('./websocket.js');

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

/**
 * Handling registration requests
 */

router.post('/signup', function (request, response) {
    dbOperation.checkUsername(request.body.name, request.body.password, request.body.email, response);
})

/**
 * Handle requests to add friends
 */

router.get('/addFriend', function (request, response) {
    var name = request.query.name;
    var userName = request.query.userName;
    var text = request.query.text;
    var friendList = JSON.parse(request.query.friendList).friends;
    dbOperation.addFriend(name, userName, friendList, response);
})

router.get('/newList', function(request, response){
    dbOperation.getNewList(request.query.userName, response);
})

/**
 * Establish websocket communication
 */



var webSocketServer = require('ws').Server;
var wss = new webSocketServer({ port: 4000 });
var sockets = {};
var clients = {};

wss.on('connection', function (ws, request) {
    var index = request.url.indexOf("=");
    var str = request.url.substr(index + 1);
    sockets[str] = ws;
    ws.on('message', function (message) {
        var obj = JSON.parse(message);
        clients[obj.friendName] = { data: obj.msg, sender: obj.user }

        var msgObj = { msg: obj.msg, user: obj.user }
        var msgStr = JSON.stringify(msgObj);
        var receiver = obj.friendName;
        if (sockets[receiver]) {
            sockets[receiver].send(msgStr);
            dbOperation.writeChatInfoToUser(obj.user, obj.friendName, obj.msg);
            dbOperation.writeChatInfoToFriend(obj.user, obj.friendName, obj.msg);
        } else {
            dbOperation.writeChatInfoToUser(obj.user, obj.friendName, obj.msg);
            dbOperation.writeChatInfoToFriend(obj.user, obj.friendName, obj.msg);
        }
    })
});


module.exports = router;