module.exports = function () {

    //Inheriting dbProvider with context to blog
    var blogService = require('../common/dbProvider')("blog");

    var response = {};

    //function to manipulate the database response 
    blogService.response = function (req, res, next) {
        response = {};
        try {
            response.viewModels = res.result;
            response.Success = true;
            res.send(response);
        } 
        catch (e) {           
            response.Success = false;
            response.Error = e;
            res.send(response);
        };
	}    
   
    return blogService;
}