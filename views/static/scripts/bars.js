/* bars.js
 * github.com/johka885/bars.js
 * Author: Johan Karlsson
 */

$.fn.extend({
  bars: function(options) {
    function generateColor(hue) {
      if (hue == "red") {
        for (var r = 0; r < 180 || r > 245; r = Math.floor(Math.random() * 256));
        for (var g = 0; g < 20 || g > 60; g = Math.floor(Math.random() * 256));
        for (var b = 550; b < 20 || b > 60; b = Math.floor(Math.random() * 256));
      } else if (hue == "green") {
        for (var r = 0; r < 40 || r > 80; r = Math.floor(Math.random() * 256));
        for (var g = 0; g < 140 || g > 245; g = Math.floor(Math.random() * 256));
        for (var b = 550; b < 40 || b > 80; b = Math.floor(Math.random() * 256));
      } else if (hue == "blue") {
        for (var r = 0; r < 20 || r > 60; r = Math.floor(Math.random() * 256));
        for (var g = 0; g < 20 || g > 80; g = Math.floor(Math.random() * 256));
        for (var b = 550; b < 220 || b > 255; b = Math.floor(Math.random() * 256));
      } else if (hue == "pink") {
        for (var r = 0; r < 140 || r > 250; r = Math.floor(Math.random() * 256));
        for (var g = 0; g < 20 || g > 60; g = Math.floor(Math.random() * 256));
        for (var b = 550; b < 140 || b > 250; b = Math.floor(Math.random() * 256));
      } else if (hue == "yellow") {
        for (var r = 0; r < 160 || r > 250; r = Math.floor(Math.random() * 256));
        for (var g = 0; g < 160 || g > 240 || Math.abs(r - g) > 40; g = Math.floor(Math.random() * 256));
        for (var b = 550; b < 20 || b > 40; b = Math.floor(Math.random() * 256));
      } else {
        r = Math.floor(Math.random() * 256);
        g = Math.floor(Math.random() * 256);
        b = Math.floor(Math.random() * 256);
      }

      r = (r < 16 ? "0" : "") + r.toString(16);
      g = (g < 16 ? "0" : "") + g.toString(16);
      b = (b < 16 ? "0" : "") + b.toString(16);

      var color = ("#" + r + g + b);
      return color;
    }

    function displayBars(options, index, $el) {
      $el.html("");
      if (options.bars[index].order == "asc")
        options.bars[index].elements.sort(function(l, r) {
          return l.value - r.value
        });
      else if (options.bars[index].order == "desc")
        options.bars[index].elements.sort(function(l, r) {
          return r.value - l.value
        });

      var length = options.bars[index].elements.length;
      var width = $el.width() / (length + 1);

      options.bars[index].elements.forEach(function(bar, i) {
        $cur = $("<div>");
        var height = 100 * (bar.value / (options.max + 5));
        var margin = (100 - height) / 100 * $el.height();

        $cur.css("height", "100%");
        $cur.css("margin", "0px " + (width / length / 2) + "px 0px 0px");
        $cur.css("transform", "translateY(" + ($el.height()) + "px)");
        $cur.width(width);
        $cur.css("display", "inline-block");
        $cur.css("vertical-align", "top");
        //$cur.css("z-index", "-2");
        $cur.css("background-color", generateColor(options.hue));
        $cur.css("text-align", "initial");
        $cur.css("transition", ".4s");
        $cur.html("<label>" + bar.label + "</label>");
        $cur.css("height", (height) + "%");              

        $el.append($cur);

        //Fixes CSS not rendering correctly on IE after animation
        function IEfixer($el){
          $(this).find("label").css("left", "50%");
          $(this).find("label").css("top", "50%");
          $(this).find("label").css("transform", "translateX(-50%) translateY(-50%)");
          $(this).find("label").css("-ms-transform", "translateX(-50%) translateY(-50%)");
          $(this).find("label").css("-webkit-transform", "translateX(-50%) translateY(-50%)");
        }
                
        (function(element, margin, height, time) {
          var animator = element.velocity || element.animate;
          setTimeout(function() {
            element.css("transform", "translateY(" + (margin - 20) + "px)");
            setTimeout(function(){
              element.css("transform", "translateY(" + (margin) + "px)");
            }, 333);
            /*animator.bind(element)({
              //"marginTop": margin - 20 + "px",
              "transform": "translateY(" + (margin - 20) + "px)",
              "height": (height) + "%"
            }, {
              duration: 400,
              step: IEfixer,
              complete: function() {
                animator.bind(element)({
                  //"marginTop": margin + "px",
                  //"transform": "translateY(" + (margin) + "px)",
                  "height": height + "%"
                }, {
                  duration: 200,
                  complete: function() {
                    if ($(this).is(":last-child")) $(this).trigger("bar-finished");
                  },
                  step: IEfixer,
                });
              },
              easing: "linear"
            });*/
          }, time);
        })($cur, margin, height, i * 400);
      });

      $el.find("label").css("position", "relative");
      $el.find("label").css("display", "inline-block");
      $el.find("label").css("word-break", "break-all");
      $el.find("label").css("word-wrap", "break-word");
      $el.find("label").css("width", "100%");
      $el.find("label").css("left", "50%");
      $el.find("label").css("top", "50%");
      $el.find("label").css("transform", "translateX(-50%) translateY(-50%)");
      $el.find("label").css("-ms-transform", "translateX(-50%) translateY(-50%)");
      $el.find("label").css("-webkit-transform", "translateX(-50%) translateY(-50%)");
      $el.find("label").css("color", "white");
      $el.find("label").css("text-shadow", "1px 1px 0 #000, -1px 1px 0 #000 , 1px -1px 0 #000, -1px -1px 0 #000");
      $el.find("label").css("text-align", "center");
      $el.css("font-size", "20px");
           
      var $title = $("<div class=title>");
      $title.html("<h3>" + options.bars[index].title + "</h3>");
      $title.css("position", "absolute");
      $title.css("top", "15px");
      $title.css("color", "black");
      $title.css("text-shadow", "1px 1px 0 #FFF, -1px 1px 0 #FFF , 1px -1px 0 #FFF, -1px -1px 0 #FFF");
      $title.css("left", "50%");
      $title.css("transform", "translateX(-50%)");
      $el.append($title);    
    }

		$(this).css("position", "relative");
    
    var i = 0;
    displayBars(options, i, $(this));

    if (options.autoswitch) {
      setInterval(function(options, $el) {
        i = (i + 1) % options.bars.length;
        displayBars(options, i, $el);
      }, 5000 + options.bars.length * 3000, options, $(this));
    }

    $(this).on("bar-next", function() {
      i = (i + 1) % options.bars.length;
      displayBars(options, i, $(this));
    });

    $(this).on("bar-prev", function() {
      i--;
      i = i < 0 ? options.bars.length - 1: i;
      displayBars(options, i, $(this));
    });
    return $(this);
  }
});