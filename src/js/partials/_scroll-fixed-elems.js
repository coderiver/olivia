function scrollFixedElements() {
	var scrLeft = $(this).scrollLeft(),
	fixed 	= $('.js-fixed'),
	sidebar = $('.js-sidebar');

	if ( fixed.parents('.js-tablewrap').length > 0 && !fixed.parents().hasClass('is-fixed')) {
		if ( fixed.hasClass('js-sidebar') ) {
			sidebar.css('left', 'auto');
		} else {
			fixed.css('left', '0');
		}
	} else {
		if (fixed.hasClass('js-sidebar')) {
			sidebar.css('left', -scrLeft + 21);
		} else {
			fixed.css('left', -scrLeft);
		}
	}
};


function scrollEntrySidebar(currTop){
	let headerHeight = $(".header").height();
	// var entryTwoColTopPos = document.querySelector('.js-entry-two-col').getBoundingClientRect().top;
	let $entrySidebar = $(".js-entry-sidebar");
	$entrySidebar.css('height', `calc(100vh - ${headerHeight}px)`)
	console.log(headerHeight);
};
scrollFixedElements();
scrollEntrySidebar(0);
var winStart = 0;

$(window).scroll(function() {
	var currTop = $(window).scrollTop();
	
	if (winStart == currTop) {
		scrollFixedElements();
	}else{
		scrollEntrySidebar(currTop);
	}
	winStart = currTop;
});