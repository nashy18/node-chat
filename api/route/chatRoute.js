const path = require("path"); 
module.exports = function (app) {

	console.log("---------------------------");
	console.log("Inside Chat Route ");
	console.log("---------------------------");

    //Inheriting blogController
	const chatController = require('../controller/chatController')();
    //Inheriting blogService
	const chatService = require('../service/chatService')();

    //Webpage route for reterving blog page
	app.get("/", (req,res,next)=>{
		res.sendFile(path.join(app.get('views') + '/chat.html'));
	});
};