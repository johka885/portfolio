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

exports.CollectionDriver = CollectionDriver;



