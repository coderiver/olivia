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
	var minSidebarTopOffset = document.querySelector(".js-entry-sidebar").getBoundingClientRect().top;
	var defaultBottomOffset = Math.abs(document.querySelector(".js-entry-content").getBoundingClientRect().bottom - $(document).height());
};
console.log(minSidebarTopOffset);
function scrollEntrySidebar(currTop, defaultBottomOffset, scrollProps){
	let entrySidebar = document.querySelector(".js-entry-sidebar");

	
	let headerHeight = $(".header").height();
	let entryContent = document.querySelector(".js-entry-content");
	let entryContentHeight = entryContent.clientHeight;
	let contentBottomPos = entryContent.getBoundingClientRect().bottom;
	let $entrySidebar = $(entrySidebar);
	let sidebarTopPos = entrySidebar.getBoundingClientRect().top;
	let sidebarHeight = entrySidebar.clientHeight;
	let availableContentHeight = $(window).height() - headerHeight;
console.log(`window ${$(window).height()}`);
console.log(availableContentHeight);
// console.log(`curTop ${currTop}`);

if (minSidebarTopOffset < sidebarTopPos) {
	minSidebarTopOffset = sidebarTopPos;
};

let minusTopOffset = -minSidebarTopOffset;
	let temp =  window.pageYOffset - sidebarHeight - minSidebarTopOffset;
	// console.log(temp);
	// let translateValue = currTop + sidebarTopPos;
	// let translateValue = sidebarTopPos + sidebarHeight - minSidebarTopOffset ;
	let translateValue = $(window).height() + currTop - minSidebarTopOffset   - sidebarHeight ;
	// let translateValue = temp;
	// console.log(currTop + sidebarTopPos);

	if(sidebarHeight < entryContentHeight && sidebarHeight < availableContentHeight ){
		$entrySidebar.css('position', 'fixed');
		// console.log(`sidebar is smaller than content or window`);

	}else{
		if(scrollProps.prevScrollDirection === 'toBottom'){


			let bottomOffset = Math.abs(contentBottomPos - $(document).height());
			let minBottomOffset =  bottomOffset  < defaultBottomOffset ? bottomOffset: defaultBottomOffset;
// console.log(bottomOffset);
if(sidebarTopPos + minBottomOffset <= minusTopOffset){
	$entrySidebar.css({'position': 'fixed', 'bottom': `${minBottomOffset}px`});
	console.log(`fixed`);

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
	// console.log(currTop);

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
			scrollEntrySidebar(currTop, defaultBottomOffset, scrollProps);
		}
		
	}
	winStart = currTop;
});