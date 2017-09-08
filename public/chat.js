$(function () {
	//Connect socket io
	const socket = io("http://10.30.30.88:9999");
	let response = {};
	let username = null;
	let notificationSound = $("#newMessage")[0];
	function getUsername() {
		let name = prompt("Enter your name : ", "your name here");
		return name;
	}

	function emitJoinedGroupMsg(socket) {
		response = {};
		response.message = username + " joined";
		response.username = username;
		response.time = new Date().toTimeString();
		setTimeout(() => {
			socket.emit('userConnected_server', response);
		}, 100);
	}

	function userHistory(users) {
		$('#userHistory').empty();
		$('#userHistorycount').text(users.length);
		users.forEach(function (item) {
			$('#userHistory').append($('<li class="list-group-item">').text(item.username + ' : Joined at ' + item.timeJoined));
			if (item.timeLeft) {
				$('#userHistory').append($('<li class="list-group-item">').text(item.username + ' : Left at ' + item.timeLeft));
			}
		}, this);
	}

	function userOnline(users) {
		$('#userOnline').empty();
		$('#onlineUserCount').text(users.length);
		users.forEach(function (item) {
			$('#userOnline').append($('<li class="list-group-item">').text(item.username + ' : Since ' + item.timeJoined));
		}, this);
	}


	function connectSocket() {
		username = getUsername();
		//console.log(username);
		if (username) {
			emitJoinedGroupMsg(socket);
		}
		else {
			connectSocket();
		}

		$('form').submit(function () {
			response = {};
			response.message = $('#txtMessage').val();
			if (!response.message) return false;
			response.username = username;
			response.time = new Date().toTimeString();
			socket.emit('sendChatMessage', response);
			$('#txtMessage').val('');
			return false;
		});

		socket.on('receiveChatMessage', function (res) {
			notificationSound.play();
			$('#messages').append('<li class="list-group-item">' + res.username + ' : ' + res.message + '<span class="pull-right">' + ' at ' + res.time + '</span></li>');
			if (res.totalUsers) {
				//History
				userHistory(res.totalUsers);
			}
			if (res.onlineUsers) {
				//Available
				userOnline(res.onlineUsers);
			}
		});

		socket.on('userConnected_web', function (res) {
			$('#title').text(res.message);
			if (res.totalUsers) {
				//History
				userHistory(res.totalUsers);
			}
			if (res.onlineUsers) {
				//Available
				userOnline(res.onlineUsers);
			}
		});

		socket.on('userDisConnected', function (res) {
			notificationSound.play();
			//History
			userHistory(res.totalUsers);
			//Available
			userOnline(res.onlineUsers);
			$('#messages').append('<li class="list-group-item">' + res.disconnected_UserInfo.username + ' : Left the conversation at ' + res.disconnected_UserInfo.timeLeft + '</span></li>');
		});
	}

	connectSocket();

});