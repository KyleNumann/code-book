/* Color Fade ------------*/
var colorFadeOnScroll = function(){

  colorFadeWrap = $('.color-change-sections'); // parent element of your color sections
  colorFadeGutter = 0.45; // percent of element that should exclude color fade (higher number means quicker fades)

  var colorElements = [];

  var getVars = function(){
	screenHeight = $(window).height();
	$('.color-change-section').each(function(idx,obj){
	  // $(obj).css('height', screenHeight);
	  // build array of elements and some key values
	  colorElements.push({
		height: $(obj).outerHeight(),
		offsetTop: $(obj).offset().top,
		center: $(obj).offset().top + ($(obj).outerHeight() / 2),
		bgColor: $(obj).attr('data-bgcolor')
	  });
	});
	lastElement = colorElements.length - 1;
	colorFadeStart = colorFadeWrap.offset().top;
	colorFadeEnd = colorFadeStart + colorFadeWrap.outerHeight();
	startColor = $('.color-change-section').first().attr('data-bgcolor');
	endColor = $('.color-change-section').last().attr('data-bgcolor');
  };

  var colorCalc = function(beginning_color, ending_color, percentScrolled){
	// from http://jsfiddle.net/cgspicer/V4qh9/
	newRed = beginning_color.red() + ( ( ending_color.red() - beginning_color.red() ) * percentScrolled );
	newGreen = beginning_color.green() + ( ( ending_color.green() - beginning_color.green() ) * percentScrolled );
	newBlue = beginning_color.blue() + ( ( ending_color.blue() - beginning_color.blue() ) * percentScrolled );
	return new $.Color( newRed, newGreen, newBlue );
  };

  var colorFade = function(){
	var scroll_pos = $(window).scrollTop();
	// console.log('scroll: ' + scroll_pos);

	if((scroll_pos + screenHeight) >= colorFadeStart && (scroll_pos + screenHeight) <= colorFadeEnd ) {
	  // if we are inside the color fade element
	  percentScrolled = 0;
	  color1 = startColor;
	  color2 = startColor;

	  for ( var i = 0; i < colorElements.length; i++ ) {
		// console.log(colorElements[i].attr('data-bgcolor'));
		if ( (scroll_pos + (screenHeight * 0.5)) > colorElements[i].center && scroll_pos + (screenHeight * 0.5) < colorElements[lastElement].center){
		  color1 = colorElements[i].bgColor;
		  if(i != colorElements.length - 1){
			color2 = colorElements[(i + 1)].bgColor;
		  } else {
			color2 = endColor;
		  }

		  percentMeasure1 = ((scroll_pos + (screenHeight * 0.5)) - (colorElements[i].center + (colorElements[i].height * colorFadeGutter) )) + colorElements[i].height * 0.25;
		  percentMeasure2 = ((colorElements[i + 1].center - (colorElements[i + 1].height * colorFadeGutter)) - (colorElements[i].center));
		  percentScrolled = percentMeasure1 / percentMeasure2;

		  if(percentScrolled < 0){
			percentScrolled = 0;
		  } else if (percentScrolled > 1){
			percentScrolled = 1;
		  }
		} else if (scroll_pos + (screenHeight * 0.5) > colorElements[lastElement].center) {
		  color1 = endColor;
		  color2 = endColor;
		}
	  }
	  //we want to calculate the relevant transitional rgb value
	  newColor1 = new $.Color(color1);
	  newColor2 = new $.Color(color2);
	  var newColor = colorCalc(newColor1, newColor2, percentScrolled);

	  $('.color-change-sections').animate({ backgroundColor: newColor }, 0);
	} else if ( (scroll_pos + (screenHeight * 0.5)) < colorElements[0].center ) {
	  $('.color-change-sections').animate({ backgroundColor: startColor }, 0);
	} else {
	  $('.color-change-sections').animate({ backgroundColor: endColor }, 0);
	}
  };


	getVars();
	colorFade();
	$(window).on("resize", function(){
	  getVars();
	});
	$(window).on("resize scroll", function(){
	  colorFade();
	});

};

if ( $('.color-change-section').length ) {
  colorFadeOnScroll();
}
