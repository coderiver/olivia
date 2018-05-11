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

let isEntryPage = document.querySelector(".js-entry-sidebar") ? true: false;
if(isEntryPage === true){
	// при position fixed ширина немного меняется
	let sidebarWidth = $(".js-entry-sidebar").width();
	$(".js-entry-sidebar").css('width', `${sidebarWidth}px`);


	var minSidebarTopOffset = document.querySelector(".js-entry-sidebar").getBoundingClientRect().top;
	var defaultBottomOffset = Math.abs(document.querySelector(".js-entry-content").getBoundingClientRect().bottom - $(document).height());
	console.log(`def ${minSidebarTopOffset}`);
};

function scrollEntrySidebar(scrollProps){
	let entrySidebar = document.querySelector(".js-entry-sidebar");
	let entryContent = document.querySelector(".js-entry-content");
	let currTop = window.pageYOffset;

	
	let headerHeight = $(".header").height();



	// let entryContentHeight = entryContent.clientHeight; може знадобитись


	// let docHeight = $(document).height();
	let contentBottomPos = entryContent.getBoundingClientRect().bottom;
	let $entrySidebar = $(entrySidebar);
	let sidebarTopPos = entrySidebar.getBoundingClientRect().top;
	let sidebarHeight = entrySidebar.clientHeight;
	let availableContentHeight = $(window).height() - headerHeight;


	console.log(`sidebarTopPos ${sidebarTopPos}`);
	// console.log(`pageYOffset ${entryContent.pageYOffset}`);

	// console.log(availableContentHeight);
	// console.log(`curTop ${currTop}`);}



//  на случай если динамически изменится позиция пересчитать значение 
if (minSidebarTopOffset < sidebarTopPos) {
	minSidebarTopOffset = sidebarTopPos;
};
let minusTopOffset = -minSidebarTopOffset;



let translateValue = availableContentHeight + currTop - minSidebarTopOffset   - sidebarHeight ;



	// if(sidebarHeight < entryContentHeight && sidebarHeight < availableContentHeight ){
		if( sidebarHeight < availableContentHeight ){
			$entrySidebar.css('position', 'fixed');

		}else{
			if(scrollProps.prevScrollDirection === 'toBottom'){


// на случай если изменится динамически
let bottomOffset = Math.abs(contentBottomPos - $(document).height());
let minBottomOffset =  bottomOffset  < defaultBottomOffset ? bottomOffset : defaultBottomOffset;


// фиксация после полной прокрутки сайдбара
if(sidebarTopPos + minBottomOffset <= minusTopOffset){
	$entrySidebar.css({'position': 'fixed', 'bottom': `${minBottomOffset}px`});
	console.log(`fixed`);
				// console.log(availableContentHeight, entrySidebar.getBoundingClientRect().bottom);

			};

		}else if(scrollProps.prevScrollDirection === 'toTop') {

			if($entrySidebar.hasClass('is-translated')) return;
			$entrySidebar.css({'position': 'relative', 'bottom': `auto`, 'transform': `translateY(${translateValue}px)`}); 

			$entrySidebar.addClass('is-translated');
		}
	};


// end function
};


scrollFixedElements();
// scrollEntrySidebar(0);
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
	}else{
		if(isEntryPage === true){
			scrollEntrySidebar(scrollProps);
		}
		
	}
	winStart = currTop;
});