module.exports = function (args) {
    var blogController = {};

    //Function for creating blog
    blogController.create = function (req, res, next) {
        try {
            if (!req.body) {
                req.body = [{}];
            }
            else {
                req.body = req.body.request;
            }
            next();
        }
        catch (e) {
            res.send(e);
        }
    }

    //Function for searching blog by attribures
    blogController.search = function (req, res, next) {
        try {
            if (!req.body) {
                req.body = {};
            }
            //For filtering blog based on categorycode
            if (req.query.filterCode) {
                if (req.query.filterCode == global.settings.blogFilterCode_All) {
                    req.body = {};
                }
                else {
                    req.body = {
                        blogCategoryCode: req.query.filterCode
                    };
                }                
            }
            next();
        }
        catch (e) {
            res.send(e);
        }
    }

    //Function to get all blog entries
    blogController.getAll = function (req, res, next) {
        try {
            req.body = {};
            next();
        }
        catch (e) {
            res.send(e);
        }
    }

    //Function to get blog entry by code
    blogController.getByCode = function (req, res, next) {
        try {
            req.body = {
                code: req.params.code
            };
            next();
        }
        catch (e) {
            res.send(e);
        }
    }

    return blogController;
};