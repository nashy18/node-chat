//Initiallising node modules
const express = require("express"),
      bodyParser = require("body-parser"),
      app = express(),
      http = require('http').Server(app),
      io = require('socket.io')(http);

//Setting Global Variables --Starts

//Getting Application Configuration
global.settings = require('./config/appSettings.json');

//Getting Common Utilty Functions
global.utility = require('./api/common/utils')(global.settings);

//Setting Global Variables --Ends

//setting up body parser to json
//app.use(bodyParser.json());

//setting up CORS Middleware
// app.use(function (req, res, next) {
//     //http://enable-cors.org/server_expressjs.html
//     //Enabling CORS -Starts
//     // res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization");
//     //Enabling CORS -Ends
//     if(req.method.toLowerCase()==="options"){
//         return res.send("OK");
//     }
//     next();
// });

app.use("/public", express.static(__dirname + "/public"));
app.set('views', __dirname + '/public');

const socket_io = require('./api/service/socketService')(io);

const routes = require('./api/route/indexRoute')(app);

//Unhandled system exception
process.on('uncaughtException', error => {
   console.log("System Error Occured at " + new Date().toString());
});

//Initiallising API Routes
//const routes = require('./api/route/indexRoute')(app);

//Setting up server
http.listen(process.env.PORT || global.settings.nodeServerPortNo, ()=>{
  console.log('listening on :' + global.settings.nodeServerPortNo);
});