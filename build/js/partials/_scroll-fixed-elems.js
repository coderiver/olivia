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

	var sidebarAtBottom = false;
	var sidebarAtTop;
	var minSidebarTopOffset = document.querySelector(".js-entry-sidebar").getBoundingClientRect().top;
	var temp = minSidebarTopOffset;
	var defaultBottomOffset = Math.abs(document.querySelector(".js-entry-content").getBoundingClientRect().bottom - $(document).height());

};

function scrollEntrySidebar(scrollProps){
	let entrySidebar = document.querySelector(".js-entry-sidebar");
	let entryContent = document.querySelector(".js-entry-content");
	let currTop = window.pageYOffset;

	
	let headerHeight = document.querySelector(".header").clientHeight;
	let contentHeight = entryContent.clientHeight;
	let sidebarHeight = entrySidebar.clientHeight;
	let availableContentHeight = $(window).height() - headerHeight;

	let contentBottomPos = entryContent.getBoundingClientRect().bottom;
	let contentTopPos = entryContent.getBoundingClientRect().top;
	let sidebarTopPos = entrySidebar.getBoundingClientRect().top;

	let $entrySidebar = $(entrySidebar);





	if (minSidebarTopOffset < sidebarTopPos) {
		minSidebarTopOffset = sidebarTopPos;
	};
	let minusTopOffset = -minSidebarTopOffset;





	// if(sidebarHeight < entryContentHeight && sidebarHeight < availableContentHeight ){
		if( sidebarHeight < availableContentHeight ){
			$entrySidebar.css('position', 'fixed');

		}else{


			if(scrollProps.prevScrollDirection === 'toBottom'){
				// $entrySidebar.addClass('to-bottom').removeClass('to-top');
				let bottomOffset = Math.abs(contentBottomPos - $(document).height());
				let minBottomOffset =  bottomOffset  < defaultBottomOffset ? bottomOffset : defaultBottomOffset;

				if(sidebarTopPos + minBottomOffset <= minusTopOffset){
					$entrySidebar.css({'position': 'fixed', 'bottom': `${minBottomOffset}px`});
					$entrySidebar.addClass('to-bottom js-control');
				};

				if(entryContent.getBoundingClientRect().bottom == entrySidebar.getBoundingClientRect().bottom){
					sidebarAtBottom = true;
				};


			}else if(scrollProps.prevScrollDirection === 'toTop') {



				
				if($entrySidebar.hasClass('to-bottom')){

					$entrySidebar.removeClass('to-bottom').addClass("is-translated");

					$entrySidebar.css({'position': 'relative', 'bottom': `auto`, 'transform': `translateY(${temp + currTop}px)`});
					return;
				}

				if($entrySidebar.hasClass('js-control')){
					$entrySidebar.addClass('to-top');
					if(sidebarTopPos >= temp){

						$entrySidebar.css({'position': 'fixed', 'bottom': `auto`, 'transform': `translateY(0px)`});
						$entrySidebar.removeClass('is-translated');
						if(currTop == 0){
							$entrySidebar.css({'position': 'relative', 'bottom': `auto`, 'transform': `translateY(0px)`});
							$entrySidebar.removeClass('is-translated js-control to-top');
							return;
						}
					};

					if($entrySidebar.hasClass('is-translated')) return;
					if(sidebarAtBottom == true){
						let	translateValue = contentHeight - sidebarHeight;

						$entrySidebar.css({'position': 'relative', 'bottom': `auto`, 'transform': `translateY(${translateValue}px)`});
						$entrySidebar.addClass('is-translated');
						sidebarAtBottom = false;
					}

				};



				

			}else{

			};
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