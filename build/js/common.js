$(document).ready(function() {




	// partials
	function initTooltip(elem) {
		var elem = $(elem);
	
		if ( elem.is($('.js-tooltip')) ) {
			elem.tooltipster({
				position: 'right',
				maxWidth: 290
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

	$('.js-vert-scroll').perfectScrollbar();
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

	
});

