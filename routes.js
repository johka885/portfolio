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
  app.get('/about', function (req, res){
    res.render("about.html");
  });
  
  app.get('/contact', function (req, res){
    res.render("contact.html");
  });
  
  app.get('/cv', function (req, res){
    res.render("cv.html");
  });
  
  app.get('/portfolio', function (req, res){
    res.render("portfolio.html");
  });
  
  app.get('/', function (req, res){
    res.render("index.html");
  });
}

exports.routes = routes;