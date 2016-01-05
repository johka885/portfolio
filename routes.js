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
  
    var options = {};

    options.bars = [];
    options.max = 50;
    options.hue = "red";
    options.autoswitch = false;

    options.bars.push({
      title: "Languages",
      elements: [],
      order: "asc"
    });
    options.bars[0].elements.push({
      label: "JavaScript",
      value: 45
    });
    options.bars[0].elements.push({
      label: "C++",
      value: 27
    });
    options.bars[0].elements.push({
      label: "CSS",
      value: 36
    });
    options.bars[0].elements.push({
      label: "PHP",
      value: 31
    });
    options.bars[0].elements.push({
      label: "C#",
      value: 39
});
    
    res.render("about.html", {options: JSON.stringify(options)});
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