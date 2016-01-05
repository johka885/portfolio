jQuery(document).ready( function($){
  /*************
   * Functions *
   *************/
   
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
      
      var tempContent = $("<div>");
      $("body").append(tempContent);
      tempContent.addClass("main-content");
      tempContent.html($(body).find(".main-content").html())
      
      if(direction == "top"){
        mainContent.css("transition", "1.5s");
        mainContent.css("margin-top", -mainContent.height() - $("#navbar").height() + "px");
        mainContent.css("position", "absolute");
        
        tempContent.css("margin-top", tempContent.height() + $("#navbar").height() + "px");
        tempContent.css("position", "absolute");        
        setTimeout(function(){tempContent.css("transition", "1.5s"); tempContent.css("margin-top", "0px");},50);
        
      } else {
        mainContent.css("transition", "1.5s");
        mainContent.css("margin-top", mainContent.height() + $("#navbar").height() + "px");
        mainContent.css("position", "absolute");     
        
        tempContent.css("margin-top", -tempContent.height() - $("#navbar").height() + "px");
        tempContent.css("position", "absolute");        
        setTimeout(function(){tempContent.css("transition", "1.5s"); tempContent.css("margin-top", "0px");},50);
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
      }, 1500);
  }
  
  /************
   *  Events  *
   ************/ 
   
  /*
    Loads a new page when a menu item is clicked
  */
  $(".navbar-nav").on("click", "a", function(event){
    event.preventDefault();
    var parent = $(this).parent();
    var direction = parent.siblings(".active").index() < parent.index() ? "top" : "bottom";
    parent.addClass("active").siblings().removeClass("active"); 
    loadPage(this.href, direction);
  });
  
  $("body").on("click", "#left-arrow", function(){
      $("#skill-chart").trigger("bar-prev");
  });
  
  $("body").on("click", "#right-arrow", function(){
      $("#skill-chart").trigger("bar-next");    
  });
  
  //TODO: onSubmit contactform
  
  /*******************************
   * code to be run on DOMReady  *
   *******************************/ 
  
   $(".navbar-nav li").addClass( function(){
     var a = $(this).children()[0];
     return (a.href == window.location) ? "active" : "";
   });
   
   
   /****************
    * For teh lulz *
    ****************/
   console.log("%cGreetings fellow developer ☻", "color:white; background:#222; padding: 5px; font-size: 16pt;");
   
   /* Much fun. Very dancy. Wow. */
   FUN_MODE = false; 
   if( FUN_MODE )
   (function pulse(object){
    var intensity = 2 + parseInt(Math.random()*5);
    $(object).animate({
        top: "-=" + intensity,
        left: "-=" + intensity,
        width: "+=" + intensity*2,
        height: "+=" + intensity*2
    },200).animate({
            top: "+=" + intensity,
            left: "+=" + intensity,
            width: "-=" + intensity*2,
            height: "-=" + intensity*2
        }, 200,function(){pulse(object)});

   })("nav");
});



