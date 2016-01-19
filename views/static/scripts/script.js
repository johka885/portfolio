jQuery(document).ready( function($){
  /*************
   * Functions *
   *************/
   
  var keys = {37: 1, 38: 1, 39: 1, 40: 1};

  function preventDefault(e) {
    e = e || window.event;
    if (e.preventDefault)
        e.preventDefault();
    e.returnValue = false;  
  }

  function preventDefaultForScrollKeys(e) {
      if (keys[e.keyCode]) {
          preventDefault(e);
          return false;
      }
  }

  function disableScroll() {
    if (window.addEventListener) // older FF
        window.addEventListener('DOMMouseScroll', preventDefault, false);
    window.onwheel = preventDefault; // modern standard
    window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
    window.ontouchmove  = preventDefault; // mobile
    document.onkeydown  = preventDefaultForScrollKeys;
  }

  function enableScroll() {
      if (window.removeEventListener)
          window.removeEventListener('DOMMouseScroll', preventDefault, false);
      window.onmousewheel = document.onmousewheel = null; 
      window.onwheel = null; 
      window.ontouchmove = null;  
      document.onkeydown = null;  
  }

  /*
    Loads a page over AJAX and slides in its contents into view.
    Clears previous calls that has yet not loaded and then 
    slides in the final page clicked as soon as the previous 
    page has finished sliding in.
  */
  
  function loadPage(page,direction){
    $.ajax({
      url: page,
      success: function(res){
        clearTimeout(timeout);
        nextPage = res;
        slider(direction);
      }
    });
  }

  var nextPage = "",
      loading = false,
      timeout;

  /*
    Slides out the contents of the previous page
    and then slides in the contents of the new page
  */
  function slider(direction){
      if( loading ) { 
        timeout = setTimeout(slider, 100, direction); 
        return;
      }    
      loading = 2;
      var inverted = direction == "top" ? "bottom" : "top";
      
      //Make loaded page parseable by jQuery
      var body = $('<div id="body-mock">' + nextPage.replace(/^.*<body.*?>|<\/body>.*$/ig, '') + '</div>');
      
      var mainContent = $("body > .main-content");
      
      disableScroll();
      
      var tempContent = $("<div>");
      $("body").append(tempContent);
      tempContent.addClass("main-content");
      tempContent.html($(body).find(".main-content").html());
      
      translate();
      
      if(direction == "top"){
        var pixels = Math.max(Math.abs((-mainContent.height() - $("#navbar").height())), 0);
        mainContent.css("transition", "1s ease-out");
        mainContent.css("transform", "translateY(" + (-pixels) + "px)");
        mainContent.css("position", "absolute");
        
        tempContent.css("transform", "translateY(" + pixels + "px)");
        tempContent.css("position", "absolute");        
        setTimeout(function(){tempContent.css("transition", "1s ease-out"); tempContent.css("transform", "translateY(0px)");},50);
        
      } else {
        var pixels = Math.max(Math.abs((-tempContent.height() - $("#navbar").height())), 0);
        mainContent.css("transition", "1s ease-out");
        mainContent.css("transform", "translateY(" + (100 + pixels) + "px)");
        mainContent.css("position", "absolute");     
        
        tempContent.css("transform", "translateY(" + (-pixels) + "px)");
        tempContent.css("position", "absolute");        
        setTimeout(function(){tempContent.css("transition", "1s ease-out"); tempContent.css("transform", "translateY(0px)");},50);
      }
      
      //TODO Set loading true on transition-end instead of timeout
      /*
      tempContent.on("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend", function(){
        tempContent.removeClass("pre-slide-in-" + inverted + " slide-in").css("top", 0); 
        $("body").css("overflow-y", "auto");
        loading--;
      });
      
      mainContent.on("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend", function(){
        loading--;        
        mainContent.remove();
      });*/
      
      setTimeout(function(){ 
        tempContent.removeClass("pre-slide-in-" + inverted + " slide-in"); 
        mainContent.remove();
        loading = false;
        enableScroll();
      }, 1000);
  }
  
  function getDirection(href){
      var next = $(".nav").find("a[href=\"" + href + "\"]");
      var current = $(".nav .active a");
      next.parent().addClass("active").siblings().removeClass("active"); 
      return current.parent().index() <= next.parent().index() ? "top" : "bottom";
  }
  /************
   *  Events  *
   ************/ 
   
  /*
    Loads a new page when a menu item is clicked
  */
  $("body").on("click", "a", function(event){
    if(this.hostname == window.location.hostname && !this.href.match(/cv-johan-karlsson/)){
      event.preventDefault();
      var direction = getDirection(this.pathname);
      loadPage(this.href, direction);
      
      history.pushState(null, document.title, this.href);
    }
  });
  
  $(window).on("popstate", function(e){
    loadPage(window.location.pathname, getDirection(window.location.pathname));
  });
  
  $("body").on("click", "#left-arrow", function(){
      $("#skill-chart").trigger("bar-prev");
      translate();
  });
  
  $("body").on("click", "#right-arrow", function(){
      $("#skill-chart").trigger("bar-next");   
      translate(); 
  });
  
  //TODO: onSubmit contactform
  
  var loadingPercentage = 0;
  var sent;
  var response;
  
  $("body").on("submit", "form", function(e){
    e.preventDefault();
    var formData = $(this).serialize();
    $.ajax({
      url: "/sendmail",
      data: formData,
      type: "post",
      success: function(res){
        response = res;
      }
    });    
    waitToSend();
  });
  
  function waitToSend(){
    if( !sent ){    
      var $progress = $("<div class='progress'></div>");
      var $progressBar = $("<div class='progress-bar'></div>");
      var msg = "Skickar";
      
      $progressBar.css("width", loadingPercentage + "%");
      $progress.html( $progressBar );
      $(".status-bar").html( $progress );
      
      loadingPercentage += 0.4 + Math.random()/4 ;
      
      var timeout = Math.floor(Math.random()*40) + 10;
      setTimeout( waitToSend, timeout );
      
      if( loadingPercentage >= 100 ) {
        sent = true;
      }
    } else {
      setTimeout( setStatusText, 300 );
    }
  }

  function setStatusText(){
    console.log(response);
    if( response == "OK" ){
      $(".status-bar").append( "<p>Success! <br>I'll reply as soon as possible.</p>" );
      $(".status-bar p").addClass("has-success");
    } else {
      $(".status-bar").append( "<p>Something went wrong, try again!</p>" );  
      $(".status-bar p").addClass("has-error");    
    }
  }
  /*******************************
   * code to be run on DOMReady  *
   *******************************/ 
  
   $(".navbar-nav li").addClass( function(){
     var a = $(this).children()[0];
     return (a.href == window.location) ? "active" : "";
   });   
   
   $.get("http://ipinfo.io", function(response) {
    translate(response.country);
   }, "json").fail(function(){
    translate("en");
   });

});