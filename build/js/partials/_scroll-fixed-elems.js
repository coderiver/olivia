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





scrollFixedElements();
var winStart = 0;
let scrollProps = {
	prevScrollDirection: 0,
	prevCurrTop: 0
};






$(window).scroll(function() {
	var currTop = $(window).scrollTop();

	if(currTop > scrollProps.prevCurrTop ){
		scrollProps.prevScrollDirection = 'toBottom'
	}else{
		scrollProps.prevScrollDirection = 'toTop'
	};
	scrollProps.prevCurrTop = currTop;
	if (winStart == currTop) {
		scrollFixedElements();
	}

	winStart = currTop;
});







// var oliviaEntryFactory = function() {
// 	var oliviaEntry = {
// 		entrySidebar: null,
// 		initSidebar: function(){
// 			entrySidebar = new StickySidebar('.js-entry-sidebar', {
// 				containerSelector: '.js-entry-two-col',
// 				innerWrapperSelector: '.js-entry-sidebar-inner',
// 				topSpacing: $('.js-entry-content').offset().top,
// 				bottomSpacing: 20
// 			});
// 		},
// 		destroySidebar: function(){
// 			entrySidebar.destroy();
// 		}
// 	}
// 	return oliviaEntry;
// };

// window.oliviaEntryFactory = oliviaEntryFactory;

