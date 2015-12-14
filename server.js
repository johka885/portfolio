/*
 * Author: Johan Karlsson
 *
 * Portfolio project
 *
 * server.js
 * Set ups the database and start listening for incoming connections
 *
 * */

var http = require('http'),
    express = require('express'),
    path = require('path');
    MongoClient = require('mongodb').MongoClient,
	  Server = require('mongodb').Server,
	  CollectionDriver = require('./collectionDriver').CollectionDriver,
   	routes = require('./routes'),
  	bodyparser = require('body-parser');
	
var app = express();

app.engine('.html', require('ejs').renderFile);

var mongoHost = "localhost";
var mongoPort = 27017;
var collectionDriver;


app.use(bodyparser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/views/static/'));


function setupDB(callback){
var mongoClient = new MongoClient(new Server(mongoHost, mongoPort));
mongoClient.open(function (err, mongoClient) {
    if (!mongoClient) {
        console.error("Error! Exiting... Must start MongoDB first");
        process.exit(1);
    }
    var db = mongoClient.db("portfolio");
    collectionDriver = new CollectionDriver(db);
	  callback();
});
}

function run(callback){
		setupDB(function(){
		routes.routes(app, collectionDriver);
		var port = process.env.PORT || 3000;
		app.listen(port);
		console.log('Express server listening on port ' + port);
		callback();
		});
}

exports.run = run;
