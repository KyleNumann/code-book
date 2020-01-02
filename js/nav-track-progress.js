/*
Track Nav Progress for Page Sections
TODO: anonymize this code
*/

// Track scroll location against page sections, and update menu
function trackAnchorTargets(menu){

	var menuLinks = menu.find('a[href^="#"]');
	var prevActive = '';
	// console.log(menuLinks);

	var observer = new IntersectionObserver(function(entries, observer){


		entries.forEach(entry => {

			var entryID = $(entry.target).attr('id');

			if(entry.isIntersecting){
				menu.find('a[href="#'+ entryID +'"]').addClass('track-active');

			} else {
				menu.find('a[href="#'+ entryID +'"]').removeClass('track-active');
				prevActive = entry;
			}


		});
	}, {threshold: 0, rootMargin: '-49% 0% -49% 0%'});

	menuLinks.each(function(i) {
		var linkID = $(menuLinks[i]).attr('href');
		var pageEl = $(linkID);
		// console.log(pageEl);
		observer.observe(pageEl[0]);
	});

}
trackAnchorTargets($('.menu-element'));
