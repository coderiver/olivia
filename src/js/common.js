$(document).ready(function() {
	// animate back to top
	$('.js-top').click(function(e) {
		e.preventDefault();
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
		if ( $(evt.target).closest('.js-inner').length > 0 ) {
			return;
		} else if ( $(evt.target).parent('.is-disabled').length > 0 ) {
			evt.preventDefault();
		}

		// hide one dropdown if another is opened in the same table
		if ( $(this).parents('tr') ) {
			$(this).parents('tr').siblings().find('.js-dropdown').removeClass('is-active');
		}
		$(this).toggleClass('is-active');

		// hide one dropdown if another is opened, and they both have common parent
		$(this).siblings('.js-dropdown').removeClass('is-active');
	});

	$('body').on('click', function(evt) {
		// hide dropdown
		if ( $(evt.target).parents('.js-dropdown').length === 0 ) {
			$('.js-dropdown').removeClass('is-active');
		}

		// hide search results
		if ( $(evt.target).closest('.js-search-results').length > 0 || $(evt.target).closest('.js-search').length) {
			return;
		} else {
			$('.js-search-results').removeClass('is-active');
		}
	});

	// fixed header in forms pages
	function scrollFixedElements() {
		var scrLeft = $(this).scrollLeft();
		$('.js-fixed').css({
			left: -scrLeft
		});
	}
	scrollFixedElements();

	function removeHeaderElem() {
		var win = $(window),
			headerFixed = $('.header.js-fixed');
			headerEl  = headerFixed.find('.js-hide');

		if ( win.scrollTop() === 0 ) {
			headerEl.show();
		} else if ( win.scrollTop() > 0 ) {
			headerEl.hide();
		}
	}

	removeHeaderElem();

	$(window).scroll(function() {
		scrollFixedElements();
		removeHeaderElem();
	});

	// search
	$('.js-search input').on('focus', function(){
		$(this).parent().addClass('is-active');
	}).on('blur', function(){
		$(this).parent().removeClass('is-active');
	});

	// search results
	$( '.js-search input' ).on( 'keydown' , function() {
		if (!$('.js-search-results').hasClass('is-active')) {
			$('.js-search-results').addClass('is-active');
		};
	});

});