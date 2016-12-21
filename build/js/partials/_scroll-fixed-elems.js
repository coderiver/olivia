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
}

scrollFixedElements();

var winStart = 0;

$(window).scroll(function() {
	var currTop = $(window).scrollTop();
	if (winStart == currTop) {
		scrollFixedElements();
	}
	winStart = currTop;
});