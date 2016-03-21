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

	chooseAction();

	// dropdown
	$('body').on('click', '.js-dropdown', function(evt) {
		// inner dropdown list clickable
		if ($(evt.target).closest('.js-inner').length > 0 ) {
			return;
		} else if ( $(evt.target).parent('.is-disabled').length > 0 ) {
			evt.preventDefault();
		}

		// hide one dropdown if another is opened in the same table
		if ($(this).parents('tr')) {
			$(this).parents('tr').siblings().find('.js-dropdown').removeClass('is-active is-top');
		}

		// show dropdown on top side if the end of the table
		if ($(this).parents('.js-sidedrop').length && !$(this).hasClass('is-disabled') && !$('.tablewrap__in').hasClass('is-visible')) {
			var innerList = $(this).find('.js-inner'),
				table = $(this).parents('.js-tablewrap').find('.js-scrollbar'),
				innerListH = innerList.offset().top + innerList.outerHeight(),
				tableH = table.get(0).scrollHeight;

			console.log(innerListH, tableH)

			if (innerListH > tableH) {
				$(this).addClass('is-top');
			} else {
				$(this).removeClass('is-top');
			}
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

	// fixed header in forms pages
	function scrollFixedElements() {
		var scrLeft = $(this).scrollLeft();
		$('.js-fixed').css({
			left: -scrLeft
		});
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
	}

	$('.js-sysmessage-scroll').perfectScrollbar();

	removeHeaderElem();
	scrollFixedElements();
	search();
	changeDropdownOpt();

	win.scroll(function() {
		scrollFixedElements();
		removeHeaderElem();
	});

});