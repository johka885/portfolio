/*
 * Author: Johan Karlsson
 *
 * Portfolio project
 *
 * server.js
 * Handles incoming connections
 *
 * */

function routes(app, collectionDriver){
  app.get('/', function (req, res){
    res.render("index.html");
  });
}

exports.routes = routes;