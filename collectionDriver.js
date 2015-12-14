/*
 * Author: Johan Karlsson
 *
 * Portfolio project
 *
 * collectionDriver.js
 * Handles the db queries
 *
 * */

var ObjectID = require('mongodb').ObjectID;

CollectionDriver = function (db) {
    this.db = db;
};

CollectionDriver.prototype.getCollection = function (collectionName, callback) {
    this.db.collection(collectionName, function (error, the_collection) {
        if (error) callback(error);
        else callback(null, the_collection);
    });
};

CollectionDriver.prototype.findAll = function (collectionName, callback) {
    this.getCollection(collectionName, function (error, the_collection) {
        if (error) callback(error);
        else {
            the_collection.find().toArray(callback);
        }
    });
};

CollectionDriver.prototype.getToken = function (collectionName, username, callback) {
    this.getCollection(collectionName, function (error, the_collection) {
        if (error) callback(error);
        else {
			the_collection.findOne({user: username}, callback);
        }
    });
}

CollectionDriver.prototype.add = function (collectionName, user, pass, fname, lname, email, phone, work, token, callback) {
    this.getCollection(collectionName, function (error, the_collection) {
        if (error){ callback(error);}
        else {
			the_collection.findOne({user: user}, function(err, obj){
				if(obj != null) callback("user exists");
				else{
					the_collection.insert({
						user: user,
						pass: pass,
						fname: fname,
						lname: lname,
						email: email,
						phone: phone,
						work: work,
						friends: [],
						messages: [],
						token: token
					}, callback);
				}
        });
		}
    });
};

CollectionDriver.prototype.getUser = function (collectionName, username, callback) {
    this.getCollection(collectionName, function (error, the_collection) {
        if (error) callback(error);
        else {
			the_collection.findOne({user: username}, callback);
        }
    });
}

CollectionDriver.prototype.updateToken = function (collectionName, user, token, callback) {
    this.getCollection(collectionName, function (error, the_collection) {
        if (error) callback(error);
        else {
			the_collection.update({user: user}, {$set: { token: token }}, callback);
		}
        
    });
}

CollectionDriver.prototype.addMessage = function (collectionName, user, message, poster, date, callback) {
    this.getCollection(collectionName, function (error, the_collection) {
        if (error){ callback(error);}
        else {
			the_collection.update({user: user}, {$push: { messages: {message: message, poster: poster, date: date} }}, callback);
		}
    });
}

CollectionDriver.prototype.addFriend = function (collectionName, user, friend, callback) {
    this.getCollection(collectionName, function (error, the_collection) {
        if (error){ callback(error);}
        else {
			the_collection.update({user: user}, {$push: { friends: {friend: friend}}}, callback);
		}
    });
}

exports.CollectionDriver = CollectionDriver;



