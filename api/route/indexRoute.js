
module.exports = function (app) {
	console.log("---------------------------");
	console.log("Inside Index Route ");
    console.log("---------------------------");

    //Initiallising api
    let api = {};

    api.blog = require('./chatRoute')(app);

    //Index Route; the home page route
    //app.get('/', redirectToBlogPage);

    //Default Route
    app.all('*', function (req, res) {
        res.status(404).send({ "Success": false, "Message": "API URL not found", "Status": 404 });
    });

	return api;
};

//Function to redirect user from home page to blog page
function redirectToBlogPage(req,res) {
    res.redirect('/chat');
}