/*
  Simpllax - Simple Parallax Plugin
  ---
  Call simpllax() on wrapping element selector for basic usage:
  $( ".wrapping element" ).simpllax();

  Pass in options to customize:
  $( ".wrapping element" ).simpllax({
    'item': '.your-parallax-item',
    'amount': 0.9
  });

  item: selector of your parallax item inside parent
  amount: amount of parallax movement

*/
(function( $ ) {

    $.fn.simpllax = function(options) {

      // Establish our default settings
      var settings = $.extend({
          item         : '.parallax-item',
          amount        : 0.5
      }, options);

      // loop through each item
      return this.each(function(){

        var wrapEl = $(this);

        // Get options or use defaults
        var itemEl = wrapEl.find($(settings.item)),
            amountVal = settings.amount;

        // Get Measurements
        var docEl = $(document),
            scrollTop = docEl.scrollTop(),
            screenHeight = $(window).innerHeight(),
            wrapElTop = wrapEl.offset().top,
            wrapElHeight = wrapEl.height()
            ;
        $(window).on("resize", function(){
          screenHeight = $(window).innerHeight();
          wrapElTop = wrapEl.offset().top;
          wrapElHeight = wrapEl.height();

          setValues(); // make changes after re-calculating
        });

        function setValues(){
          scrollTop = docEl.scrollTop();
          if(((scrollTop + screenHeight) > wrapElTop) && scrollTop < (wrapElTop + wrapElHeight)){
            // if the parallax wrap is within viewport

            midWrapHeight = wrapElTop + (wrapElHeight * 0.5);
            transAmount = ((scrollTop + (screenHeight * 0.5)) - midWrapHeight) * amountVal;
            itemEl.css({
              "transform": "translateY("+ transAmount +"px)"
            });
          }
        }
        setValues();
        $(window).on("scroll", function(){ // need to throttle this
          setValues();
        });

      });
    };

}( jQuery ));
