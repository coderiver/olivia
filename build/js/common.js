$(document).ready(function() {




	// partials
	function initTooltip(elem) {
		var elem = $(elem);
	
		if ( elem.is($('.js-tooltip')) ) {
			elem.tooltipster({
				position: 'right',
				maxWidth: 290
			});
		} else if (elem.is($('.js-tooltip-hover'))) {
			elem.tooltipster({
				maxWidth: 250,
				interactive: true,
				contentAsHTML: true,
				position: 'bottom',
				// trigger: 'click',
				functionReady: function(origin, tooltip) {
					tooltip.find('a').on('click', function(evt) {
						evt.preventDefault();
						origin.tooltipster('hide').removeClass('is-visible');
					});
				}
			});
		} else {
			// TO FIX POSITION ON LOAD
			elem.tooltipster({
				maxWidth: 290,
				interactive: true,
				contentAsHTML: true,
				trigger: 'click',
				functionReady: function(origin, tooltip) {
					origin.tooltipster('option', 'position', origin.data('tooltip-position'));
					tooltip.find('a').on('click', function(evt) {
						evt.preventDefault();
						origin.tooltipster('hide').removeClass('is-visible');
					});
				}
			});
	
			elem.click(function(evt) {
				evt.preventDefault();
			});
	
			elem.tooltipster('show');
		}
	}
	
	initTooltip('.js-tooltip');
	initTooltip('.js-tooltip-guide');
	initTooltip('.js-tooltip-hover');
	
	// textarea autoresize
	$(document).on('input.textarea', '.js-expand', function() {
			var minRows = this.getAttribute('data-min-rows') | 0,
				rows	= this.value.split('\n').length;
	
			this.rows = rows < minRows ? minRows : rows;
		});
	
	// expand area
	$('.js-expand-area').on({
		'focus': function() {
			$(this).addClass('is-expanded');
		},
		'blur': function() {
			$(this).removeClass('is-expanded');
		}
	});
	// dropdown
	$('body').on('click', '.js-dropdown', function(evt) {
		// inner dropdown list clickable
		if ($(evt.target).closest('.js-inner').length > 0 ) {
			return;
		} else if ($(evt.target).parent('.is-disabled').length > 0) {
			evt.preventDefault();
		}
	
		// hide one dropdown if another is opened in the same table
		if ($(this).parents('tr').length) {
			$(this).parents('tr').siblings().find('.js-dropdown').removeClass('is-active');
		}
	
		// unclickable when disabled
		if ($(this).hasClass('is-disabled')) {
			return;
		}
	
		$(this).toggleClass('is-active');
	
		// hide one dropdown if another is opened, and they both have common parent
		$(this).siblings('.js-dropdown').removeClass('is-active');
	});
	
	// change dropdown options
	// function changeDropdownOpt(el) {
	// 	el.on('click', '.js-inner a', function(evt) {
	// 		evt.preventDefault();
	// 		var text = $(this).html();
	
	// 		$(this).parents('.js-dropdown').removeClass('is-active').find('.dropdown__item').text(text);
	// 	});
	// }
	
	// changeDropdownOpt($('.js-dropdown.is-form'));
	// changeDropdownOpt($('.js-dropdown.js-todrop'));
	
	// hide dropdown on body click
	$('body').on('click', function(evt) {
		if ( !$(evt.target).parents('.js-dropdown').length ) {
			$('.js-dropdown').removeClass('is-active is-top');
		}
	});
	function search() {
		var searchInput   = $('.js-search input'),
				searchResults = $('.js-search-results');
	
		searchInput.on('focus', function() {
			$(this).parent().addClass('is-active');
		}).on('blur', function() {
			$(this).parent().removeClass('is-active');
		});
	
		searchInput.on('keydown', function() {
			if (!searchResults.hasClass('is-active')) {
				searchResults.addClass('is-active');
			}
		});
	
		$('input[type="search"]').on('keydown', function() {
			var clearSearchBtn = $(this).parent().find('.js-search-clear');
	
			clearSearchBtn.addClass('is-active');
		});
	}
	
	search();
	
	$('body').on('click', function(evt) {
		$('.js-search-results').removeClass('is-active');
	});
	
	function clearSearch() {
		$('.js-search-clear').click(function() {
			$(this).siblings('input').val('').focus();
		});
	}
	
	clearSearch();
	// actions on deal status
	function chooseAction() {
		var actionBl = $('.js-action:not(".is-disabled")'),
			 actionSiblings;
	
		actionBl.click(function() {
			actionSiblings = $(this).siblings();
	
			actionSiblings
				.removeClass('is-active')
				.find('input')
				.removeClass('is-checked');
	
			$(this).addClass('is-active');
			$(this).find('input').addClass('is-checked');
		});
	}
	
	chooseAction();
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
		var globalSidebarPos;
		// var minSidebarTopOffset = document.querySelector(".js-entry-sidebar").getBoundingClientRect().top;
		// var temp = minSidebarTopOffset;
		// var defaultBottomOffset = Math.abs(document.querySelector(".js-entry-content").getBoundingClientRect().bottom - $(document).height());
	
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
		let sidebarPos = entrySidebar.getBoundingClientRect();
		let contentPos = entryContent.getBoundingClientRect();
		let $entrySidebar = $(entrySidebar);
	
	
		// console.log(`pos from parent ${$entrySidebar.position().top }`);
	
	
		// if (minSidebarTopOffset < sidebarTopPos) {
		// 	minSidebarTopOffset = sidebarTopPos;
		// };
		// let minusTopOffset = -minSidebarTopOffset;
	
	
	
	
	
		// if(sidebarHeight < entryContentHeight && sidebarHeight < availableContentHeight ){
			if( sidebarHeight < availableContentHeight ){
				$entrySidebar.css('position', 'fixed');
			}else{
				if(scrollProps.prevScrollDirection === 'toBottom'){
					toBottomScroll()
				}else if(scrollProps.prevScrollDirection === 'toTop') {
					toTopScroll();
				}else{
	
				};
			};
	
			
			function toBottomScroll(){
					// $entrySidebar.addClass('to-bottom').removeClass('to-top');
					// let bottomOffset = Math.abs(contentBottomPos - $(document).height());
					// let minBottomOffset =  bottomOffset  < defaultBottomOffset ? bottomOffset : defaultBottomOffset;
	
					// if(sidebarTopPos + minBottomOffset <= minusTopOffset){
	
	
	
						// if($entrySidebar.hasClass('is-fixed') ) {
	
						// }else{
	
						// };
						if($entrySidebar.hasClass('is-fixed') && $entrySidebar.hasClass('is-translated')){
							console.log(1);
							let translate = currTop + availableContentHeight + sidebarHeight;
							$entrySidebar.css({'position': 'relative', 'bottom': `auto`, 'transform': `translateY(${translate}px)`});
							$entrySidebar.removeClass('is-fixed');
						};
						if(sidebarPos.bottom - $(window).height() <= 0){
							// $entrySidebar.css({'position': 'fixed', 'bottom': `${minBottomOffset}px`});
							$entrySidebar.css({'position': 'fixed', 'bottom': `0px`});
							$entrySidebar.addClass('is-fixed js-control').removeClass('is-translated');
							console.log(2);
						};
	
	
	
	
						if(contentPos.bottom <= sidebarPos.bottom){
							let	translateValue = contentHeight - sidebarHeight;
	
							$entrySidebar.css({'position': 'relative', 'bottom': `auto`, 'transform': `translateY(${translateValue}px)`});
							$entrySidebar.removeClass('is-fixed').addClass('is-translated');
							console.log(3);
						};
	
	
					};
					function toTopScroll(){
	
	
						if(!$entrySidebar.hasClass('js-control')) return;
						// $entrySidebar.addClass('to-top');
						if(sidebarTopPos - headerHeight  >= 0 ){
							// console.log(`first`);
							$entrySidebar.css({'position': 'fixed', 'bottom': `auto`, 'transform': `translateY(0px)`});
							$entrySidebar.addClass('is-fixed');
							// sidebarAtBottom = false;
							if(currTop == 0){
								$entrySidebar.css({'position': 'relative', 'bottom': `auto`, 'transform': `translateY(0px)`});
								$entrySidebar.removeClass('is-fixed js-control is-translated');
								// return;
							}
						};
						if($entrySidebar.hasClass('is-translated')) return;
						if($entrySidebar.hasClass('is-fixed') ) {
							// console.log(`second`);
							let translate = currTop + availableContentHeight - sidebarHeight;
							$entrySidebar.css({'position': 'relative', 'bottom': `auto`, 'transform': `translateY(${translate}px)`});
							$entrySidebar.removeClass('is-fixed').addClass('is-translated');
						};
	
	
					};
					globalSidebarPos = currTop + availableContentHeight - sidebarHeight;
	
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
	// function hideFormHeaderTab() {
	// 	var headerFixed = $('.header.js-fixed'),
	// 		headerEl  = headerFixed.find('.js-hide');
	
	// 	if ( $(window).scrollTop() === 0 ) {
	// 		headerEl.show();
	// 	} else if ( $(window).scrollTop() > 0 ) {
	// 		headerEl.hide();
	// 	}
	//
	
	// hideFormHeaderTab();
	
	// $(window).scroll(function() {
	// 	hideFormHeaderTab();
	// })
	$('.js-accordion-btn').on('click', function() {
	    var $this = $(this),
	    	parent = $this.closest('.js-accordion'),
	    	content = $this.parent().next();
	    
	    if (parent.hasClass('is-active')) {
	        parent.removeClass('is-active');
	        content.slideUp(350);
	    } else {
	        parent.find('js-accordion').removeClass('is-active');
	        parent.find('js-accordion').slideUp(350);
	        parent.toggleClass('is-active'); 
	        content.slideToggle(350);
	    }
	});

	$('.js-vert-scroll').perfectScrollbar();   
	$('.js-popup-inner').perfectScrollbar();   
	$('.js-bar').addClass('is-active');

	// animate back to top
	$('.js-top').click(function(evt) {
		evt.preventDefault();
		$( 'html, body' ).animate({
			scrollTop: 0
		}, 'slow');
	});

	$('.js-slide-up').click(function(evt) {
		evt.preventDefault();
		$(this).parents('.js-slide-parent').slideUp();
	});


	$('.js-td-open').on('click', function(){
		var td = $(this).closest('.is-table-in'),
			tr = td.closest('tr');

		td.toggleClass('is-open');
		tr.toggleClass('is-vertical');
	});

});
