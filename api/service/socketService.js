const _ = require('lodash');
module.exports = function (io) {
    try {
        let userHistory = [];
        let onlineUsers = [];
        let usersOnline = 0;
        io.on('connection', function (socket) {
            //console.log('a user connected');
            usersOnline++;
            setTimeout(() => {
                let response = {};
                response.onlineUsers = onlineUsers;
                response.message = "Welcome to Group Chat";
                response.totalUsers = userHistory;
                io.emit('userConnected_web', response);
            }, 200);

            //When user is sending any messages
            socket.on('sendChatMessage', function (res) {
                res.totalUsers = userHistory;
                res.onlineUsers = onlineUsers;
                io.emit('receiveChatMessage', res);
            });

            //when user is getting disconnected
            socket.on('disconnect', function (res) {
                console.log(JSON.stringify(res));
                if (usersOnline !== 0)--usersOnline;
                let response = {};
                //loop & filter data from user array by using socket id        
                onlineUsers.forEach(function (element) {
                    if (element.id === socket.id) {
                        element.timeLeft = new Date().toTimeString();
                        response.disconnected_UserInfo = element;
                        return;
                    }
                }, this);
                userHistory.forEach(function (element) {
                    if (element.id === socket.id) {
                        element.timeLeft = new Date().toTimeString();
                        return;
                    }
                }, this);
                _.remove(onlineUsers, {
                    id: socket.id
                });
                response.onlineUsers = onlineUsers;
                response.totalUsers = userHistory;
                io.emit('userDisConnected', response);
            });

            //When user is connecting first time
            socket.on('userConnected_server', function (res) {
                let userInfo = {};
                userInfo.id = socket.id;
                userInfo.username = res.username;
                userInfo.ip = socket.client.conn.remoteAddress;
                userInfo.timeJoined = res.time;
                userHistory.push(userInfo);
                onlineUsers.push(userInfo);
                res.totalUsers = userHistory;
                res.onlineUsers = onlineUsers;
                socket.broadcast.emit('receiveChatMessage', res);
            });
        });
    } catch (error) {
        console.log("Error=>" + error);
    }
}