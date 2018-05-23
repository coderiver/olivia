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







var oliviaEntryFactory = function() {
	var oliviaEntry = {
		sidebarElem: document.querySelector('.js-entry-sidebar'),
		initSidebar: function(){
			sidebarElem = new StickySidebar('.js-entry-sidebar', {
				containerSelector: '.js-entry-two-col',
				innerWrapperSelector: '.js-entry-sidebar-inner',
				topSpacing: $('.js-entry-content').offset().top,
				bottomSpacing: 20
			});
		},
		destroySidebar: function(){
			sidebarElem.destroy();
		}
	}
	return oliviaEntry;
};



// var oliviaEntryFactory = function() {
// 	var oliviaEntry = {
// 		initSidebar: function(){

// 			var sidebar = new StickySidebar('.js-entry-sidebar', {
// 				containerSelector: '.js-entry-two-col',
// 				innerWrapperSelector: '.js-entry-sidebar-inner',
// 				topSpacing: $('.js-entry-content').offset().top,
// 				bottomSpacing: 20
// 			});
// 		},
// 		destroySidebar: function(){
// 				sidebar.destroy();
// 		}
// 	}
// 	return oliviaEntry;

// };


window.oliviaEntryFactory = oliviaEntryFactory;

// window.oliviaEntryFactory().initSidebar();
// $('.entry-wrapper__toggle-btn').on("click", (e) =>{
// 	e.preventDefault();
// 	$('.entry-wrapper').removeClass('closed-sidebar');
// 	setTimeout(() => {
// 		window.oliviaEntryFactory().initSidebar();

// 	},50)

// });
// $('.entry-sidebar__close-btn').on("click", function(e){
// 	e.preventDefault();
// 	$('.entry-wrapper').addClass('closed-sidebar')
// 	window.oliviaEntryFactory().destroySidebar();
// });