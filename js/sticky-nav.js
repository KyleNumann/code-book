/*
Sticky SubNav on Scroll
TODO: anonymize this code
*/
var subNav, subNavY, navHeight, subNavClone, featuresList, featuresBtm;
function stickySubnavInit(){
		subNav = $('.sticky-subnav');
		subNavClone = subNav.clone().addClass('subnav-fixed').appendTo('body');
		featuresList = $('.features-list');
		stickySubnavCalc();
		stickySubnav();
		trackAnchorTargets(subNavClone);
}
function stickySubnav() {

		if((doc.scrollTop() + navHeight) > subNavY && doc.scrollTop() < featuresBtm){
				subNavClone.addClass('active');
		} else {
				subNavClone.removeClass('active');
		}
}
function stickySubnavCalc(){
		subNavY = subNav.offset().top;
		navHeight = nav.outerHeight();
		featuresBtm = featuresList.outerHeight() + featuresList.offset().top;
		subNavClone.css('top', navHeight);
}
if($('.sticky-subnav').length){
		stickySubnavInit();
		$(window).on({ scroll: stickySubnav });
		$(window).on({ resize: stickySubnavCalc });
		$(window).on({ load: stickySubnavCalc });
}
// End Sticky SubNav on Scroll
