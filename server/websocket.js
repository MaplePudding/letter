var webSocketServer = require('ws').Server;
var wss = new webSocketServer({ port: 4000 });
var dbOperation = require('./dbOperation.js')
var sockets = {};
var clients = {};

var init = function(){
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
}

exports.init = init;