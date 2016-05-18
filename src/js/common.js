$(document).ready(function() {
	var win = $(window),
		searchInput   = $('.js-search input'),
		searchResults = $('.js-search-results');

	// animate back to top
	$('.js-top').click(function(evt) {
		evt.preventDefault();
		$( 'html, body' ).animate({
			scrollTop: 0
		}, 'slow');
	});

	// tooltips
	$('.js-tooltip').tooltipster({
		position: 'right',
		maxWidth: 290
	});

	$('.js-tooltip-guide').tooltipster({
		maxWidth: 290,
		interactive: true,
		contentAsHTML: true,
		trigger: 'custom',
		functionReady: function(origin, tooltip) {
			origin.tooltipster('option', 'position', origin.data('tooltip-position'));
			tooltip.find('a').on('click', function(evt) {
				evt.preventDefault();
				origin.tooltipster('hide').removeClass('is-visible');
			});
		}
	});

	$('.js-tooltip-guide').tooltipster('show');
	$('.js-tooltip-guide').click(function(evt) {
		evt.preventDefault();
	});

	// textarea autoresize
	$(document).on('input.textarea', '.js-expand', function() {
		var minRows = this.getAttribute('data-min-rows') | 0,
			rows	= this.value.split('\n').length;

		this.rows = rows < minRows ? minRows : rows;
	});

	// bar
	$('.js-bar').addClass('is-active');

	// slide up info block
	$('.js-slide-up').click(function(evt) {
		evt.preventDefault();
		$(this).parents('.js-slide-parent').slideUp();
	});

	// actions on deal settings
	function chooseAction() {
		var actionBl = $('.js-action:not(".is-disabled")'),
			actionSiblings = null;

		actionBl.click(function() {
			actionSiblings = $(this).siblings();

			actionSiblings.removeClass('is-active')
						  .find('input').prop('checked', false);
			$(this).addClass('is-active');
			$(this).find('input').prop('checked', true);
		});
	}

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
	function changeDropdownOpt() {
		$('.js-dropdown.is-form').on('click', '.js-inner a', function(e) {
			e.preventDefault();
			var text = $(this).html();

			$(this).parents('.js-dropdown').removeClass('is-active').find('.dropdown__item').text(text);
		});
	}

	// hide elements on click
	$('body').on('click', function(evt) {
		if ( $(evt.target).parents('.js-dropdown').length === 0 ) {
			$('.js-dropdown').removeClass('is-active is-top');
		}

		searchResults.removeClass('is-active');
	});

	function scrollFixedElements() {
		var scrLeft = $(this).scrollLeft(),
			fixed 	= $('.js-fixed'),
			sidebar = $('.js-sidebar');

		if (fixed.parents('.js-tablewrap').length > 0 && !fixed.parents().hasClass('is-fixed')) {

			if (fixed.hasClass('js-sidebar')) {
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

	function removeHeaderElem() {
		var headerFixed = $('.header.js-fixed'),
			headerEl  = headerFixed.find('.js-hide');

		if ( win.scrollTop() === 0 ) {
			headerEl.show();
		} else if ( win.scrollTop() > 0 ) {
			headerEl.hide();
		}
	}

	// search
	function search() {
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

	function clearSearch() {
		$('.js-search-clear').click(function() {
			$(this).siblings('input').val('').focus();
		});
	}

	$('.js-vert-scroll').perfectScrollbar();

	removeHeaderElem();
	search();
	changeDropdownOpt();
	chooseAction();
	scrollFixedElements();
	clearSearch();

	var winStart = 0;
	win.scroll(function() {
		var currTop = $(window).scrollTop();

		removeHeaderElem();

		if (winStart == currTop) {
			scrollFixedElements();
		}
		winStart = currTop;
	});

});