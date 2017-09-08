module.exports = function (appConfig) {
	console.log("---------------------------");
	console.log("Inside Utils");
	console.log("---------------------------");   

	var utils = {};
    //https://github.com/scotch-io/node-token-authentication/blob/master/server.js
	utils.jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens

	utils.moment = require('moment');

    //Cryptographic functions - Starts
    //Usage : http://lollyrock.com/articles/nodejs-encryption/
    //Encrypted Password
    //console.log(encrypt("Power@1234"));
    //Decrypted Password
    //console.log(decrypt(encrypt("Power@1234")));
	var crypto = require('crypto'),
    algorithm = appConfig.cryptoAlgorithim,
	key = appConfig.cryptoSecurityKey;

	utils.encrypt = function (text) {
	    var cipher = crypto.createCipher(algorithm, key)
	    var crypted = cipher.update(text, 'utf8', 'hex')
	    crypted += cipher.final('hex');
	    return crypted;
	}

	utils.decrypt = function (text) {
	    var decipher = crypto.createDecipher(algorithm, key)
	    var dec = decipher.update(text, 'hex', 'utf8')
	    dec += decipher.final('utf8');
	    return dec;
	}
    //Cryptographic functions - Ends

    //Function to create random string of length 4 charcters
	function s4() {
	    return Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1);
	}

    //Function to create guid
	utils.guid = function() {	        
	    return s4() + s4() + '-' + s4() + s4() + '-' + s4() + s4() + '-' +
               s4() + s4()  + '-' + s4() + s4()
	}

    //Function to create guid
	utils.getRandomAlphaNumeric = function (length) {
	    var randomAlphaNumeric = '';
	    for (var i = 0; i < parseInt(length / 4) ; i++) {
	        randomAlphaNumeric = randomAlphaNumeric + s4();
	    }
	    return randomAlphaNumeric;
	}

    //Function to add common fields for table while Save/Update
	utils.attachCommonFields = function (inputRequest, requestType) {
	    var response = {};
	    response = inputRequest;
	    if (requestType == "POST") {	        
	        response["Code"] = utils.getRandomAlphaNumeric(8).toUpperCase();
	        response["CreatedBy"] = inputRequest.UserId;
	        response["DateCreated"] = utils.moment().toISOString();
	        response["UpdateCount"] =  1;
        }
        else {
	        response["ModifiedBy"] = inputRequest.UserId;
	        response["DateModified"] = utils.moment().toISOString();
	        response["UpdateCount"] = inputRequest.updatecount + 1;
	    }
	    delete response.UserId;
	    console.log(JSON.stringify(response));
        return response;
	}

	return utils;
}