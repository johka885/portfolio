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
  function loadPage(page){
    $.ajax({
      url: page,
      success: function(res){
        clearTimeout(timeout);
        nextPage = res;
        slider();
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
  function slider(){
      if( loading ) { 
        timeout = setTimeout(slider, 100); 
        return;
      }    
      loading = true;
      
      $("body").css("overflow-y", "hidden");

      var body = $('<div id="body-mock">' + nextPage.replace(/^[\s\S]*<body.*?>|<\/body>[\s\S]*$/ig, '') + '</div>');
      var mainContent = $("body > .main-content").css("top", 0);
      mainContent.addClass("slide-out");
      var tempContent = $("<div>");
      $("body").append(tempContent);
      tempContent.html($(body).find(".main-content").html()).addClass("pre-slide-in");
      
      var offset = tempContent.offset();
      offset.top = mainContent.offset().top;
      tempContent.offset(offset);
      
      tempContent.addClass("slide-in");

      tempContent.addClass("main-content");
      setTimeout(function(){ 
        tempContent.removeClass("pre-slide-in slide-in").css("top", 0); 
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
    $(this).parent().addClass("active").siblings().removeClass("active");    
    loadPage(this.href);
  });
  
  //TODO: onSubmit contactform
  
  /*******************************
   * code to be run on DOMReady  *
   *******************************/ 
  
   $(".navbar-nav li").addClass( function(){
     var a = $(this).children()[0];
     return (a.href == window.location) ? "active" : "";
   });
});



