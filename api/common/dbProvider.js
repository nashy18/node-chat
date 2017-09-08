module.exports = function (tableName) {
    var dbProvider = {};
    //http://mongodb.github.io/node-mongodb-native/2.2/tutorials/crud/
    //Inherting mongodb client service
    var mongoClient = require('mongodb').MongoClient;
    //var assert = require('assert');
    //Getting mongo db connection string
    var uri = global.settings.mongoDb_ConnectionString;
    //Assiging the table name to a global variable
    var _tableName = tableName;

    //Function to create multiple records at once
    dbProvider.create = function (req, res, next) {
        mongoClient.connect(uri, function (err, db) {
            try {
                // Get the documents collection by passing table name
                var collection = db.collection(_tableName);
                //do insert operation
                //req.body should be an array of objects
                collection.insertMany(req.body, function (err, result) {
                    //Assiging database response
                    res.result = result;
                    //Close db connection
                    db.close();
                    //Trigger next callback function
                    next();
                });
            } catch (e) {
                //Assiging error response
                res.result = e;
                //Close db connection
                db.close();
                //Trigger next callback function
                next();
            }
        });
    };

    //Function to update any one record
    dbProvider.update = function (req, res, next) {
        mongoClient.connect(uri, function (err, db) {
            try {
                // Get the documents collection by passing table name
                var collection = db.collection(_tableName);
                //do update operation
                collection.updateOne({ code: req.params.code }, { $set: req.body }, function (err, result) {
                    //Assiging database response
                    res.result = result;
                    //Close db connection
                    db.close();
                    //Trigger next callback function
                    next();
                });
            } catch (e) {
                //Assiging error response
                res.result = e;
                //Close db connection
                db.close();
                //Trigger next callback function
                next();
            }
        });
    };

    //Function to search any record by attributes
    dbProvider.search = function (req, res, next) {
        mongoClient.connect(uri, function (err, db) {
            try {
                // Get the documents collection by passing table name
                var collection = db.collection(_tableName);
                // find documents that match the query
                //req.body should be an object containing multiple properties or can be empty
                collection.find(req.body).toArray(function (err, docs) {
                    //Assiging database response
                    res.result = docs;
                    //Close db connection
                    db.close();
                    //Trigger next callback function
                    next();
                });
            } catch (e) {
                //Assiging error response
                res.result = e;
                //Close db connection
                db.close();
                //Trigger next callback function
                next();
            }          
        });
    }

    //Function to delete any record
    dbProvider.remove = function (req, res, next) {
        mongoClient.connect(uri, function (err, db) {
            try {
                // Get the documents collection by passing table name
                var collection = db.collection(_tableName);
                // find documents that match the query
                //req.body should be an object containing multiple properties or can be empty
                collection.deleteOne({ code: req.params.code }, function (err, docs) {
                    //Assiging database response
                    res.result = docs;
                    //Close db connection
                    db.close();
                    //Trigger next callback function
                    next();
                });
            } catch (e) {
                //Assiging error response
                res.result = e;
                //Close db connection
                db.close();
                //Trigger next callback function
                next();
            }
        });
    }

    return dbProvider;
}