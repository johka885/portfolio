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
      loading = true;
      var inverted = direction == "left" ? "right" : "left";
      
      var scrollBarVisible = $("nav").outerHeight() + $(".main-content").outerHeight() > window.innerHeight;       
      if(!scrollBarVisible) $("body").css("overflow-y", "hidden");

      var body = $('<div id="body-mock">' + nextPage.replace(/^.*<body.*?>|<\/body>.*$/ig, '') + '</div>');
      var mainContent = $("body > .main-content").css("top", 0);
      mainContent.addClass("slide-out-" + direction);
      var tempContent = $("<div>");
      $("body").append(tempContent);
      tempContent.html($(body).find(".main-content").html()).addClass("pre-slide-in-" + inverted);
      
      var offset = tempContent.offset();
      offset.top = mainContent.offset().top;
      tempContent.offset(offset);
      
      tempContent.addClass("slide-in");

      tempContent.addClass("main-content");
      setTimeout(function(){ 
        tempContent.removeClass("pre-slide-in-" + inverted + " slide-in").css("top", 0); 
        mainContent.remove();
        $("body").css("overflow-y", "auto");
        loading = false;
      }, 2050);
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
    var direction = parent.siblings(".active").index() < parent.index() ? "left" : "right";
    parent.addClass("active").siblings().removeClass("active"); 
    loadPage(this.href, direction);
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



