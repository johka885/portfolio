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
  
  
    /* Temporary while testing,
       will be requested from DB */
    var options = {};

    options.bars = [];
    options.max = 50;
    options.hue = "red";
    options.autoswitch = false;

    options.bars.push({
      title: "<span data-string='languages'>Languages</span>",
      elements: [],
      order: "asc"
    });
    options.bars[0].elements.push({
      label: "JavaScript",
      value: 46
    });
    options.bars[0].elements.push({
      label: "C++",
      value: 32
    });
    options.bars[0].elements.push({
      label: "CSS + LESS",
      value: 38
    });
    options.bars[0].elements.push({
      label: "PHP",
      value: 26
    });
    options.bars[0].elements.push({
      label: "Java",
      value: 29
    });

    options.bars[0].elements.push({
      label: "SQL",
      value: 24
    });
    options.bars[0].elements.push({
      label: "C#",
      value: 30
    });
    options.bars[0].elements.push({
      label: "Python",
      value: 22
    });
    
    
    options.bars.push({
      title: "<span data-string='frameworks-libraries'>Frameworks & Libraries</span>",
      elements: [],
      order: "asc"
    });
    options.bars[1].elements.push({
      label: "Bootstrap",
      value: 39
    });
    options.bars[1].elements.push({
      label: "jQuery",
      value: 44
    });
    options.bars[1].elements.push({
      label: "Django",
      value: 24
    });
    options.bars[1].elements.push({
      label: "Laravel",
      value: 12
    });
    options.bars[1].elements.push({
      label: "Mocha",
      value: 22
    });
    options.bars[1].elements.push({
      label: "Angular",
      value: 29
    });
    options.bars[1].elements.push({
      label: "Node.js",
      value: 34
    });
    
    options.bars.push({
      title: "<span data-string='methodologies'>Methodologies</span>",
      elements: [],
      order: "asc"
    });
    options.bars[2].elements.push({
      label: "Pair Programming",
      value: 18
    });
    options.bars[2].elements.push({
      label: "Agile",
      value: 32
    });
    options.bars[2].elements.push({
      label: "REST",
      value: 34
    });
    options.bars[2].elements.push({
      label: "DRY",
      value: 38
    });
    options.bars[2].elements.push({
      label: "AJAX",
      value: 36
    });
    options.bars[2].elements.push({
      label: "TDD",
      value: 24
    });
    options.bars[2].elements.push({
      label: "Lean",
      value: 26
    });
    options.bars[2].elements.push({
      label: "SOAP",
      value: 28
    });
    
    options.bars.push({
      title: "<span data-string='tools'>Tools</span>",
      elements: [],
      order: "asc"
    });
    options.bars[3].elements.push({
      label: "Visual Studio",
      value: 33
    });
    options.bars[3].elements.push({
      label: "Android Studio",
      value: 27
    });
    options.bars[3].elements.push({
      label: "GIT",
      value: 25
    });
    options.bars[3].elements.push({
      label: "SVN",
      value: 11
    });
    options.bars[3].elements.push({
      label: "Photoshop",
      value: 17
    });
    options.bars[3].elements.push({
      label: "Selenium",
      value: 20
    });
    
    //end temporary
    
    
    
    res.render("about.html", {options: JSON.stringify(options)});
  });
  
  app.get('/contact', function (req, res){
    res.render("contact.html");
  });
  
  app.get('/cv', function (req, res){
    res.render("cv.html");
  });
  
  app.get('/portfolio', function (req, res){
    var projects = [];

    projects.push({
      title: "Portfolio",
      link: "https://github.com/johka885/portfolio",
      description: "This website",
      image: "/images/projects/portfolio.png"
    });
    
    projects.push({
      title: "Fruit Popper",
      link: "https://github.com/johka885/fruitpopper",
      description: "JavaScript game",
      image: "/images/projects/fruitpopper.png"
    });
    
    projects.push({
      title: "Rimforsa FK",
      link: "https://github.com/johka885/rfk-webpage",
      description: "Webpage for a local organization",
      image: "/images/projects/rfk-webpage.png"   
    });
    
    projects.push({
      title: "Stop gambling",
      link: "https://github.com/johka885/stop-gambling-android",
      description: "Android app to help you quit your gambling addiction",
      image: "/images/projects/stop-gambling-android.png"      
    });
    
    projects.push({
      title: "Sleep Pal",
      link: "https://github.com/johka885/sleep-pal",
      description: "Android alarm clock based on your schedule",
      image: "/images/projects/sleep-pal.png"           
    });
    
    res.render("portfolio.html", {projects: JSON.stringify(projects)});
  });
  
  app.get('/fruitpopper', function (req, res){
    res.render("static/fruitpopper/index.html");
  });
  
  app.get('/', function (req, res){
    res.render("index.html");
  });
}

exports.routes = routes;