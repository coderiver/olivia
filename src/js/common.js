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
	$('.js-action input').change(function() {
		$('.js-action').removeClass('is-active');
		$(this).parents('.js-action').addClass('is-active');
	});

	$('.js-action').click(function() {
		if (!$(this).hasClass('is-disabled')) {
			$(this).siblings().removeClass('is-active');
			$(this).siblings().find('input').prop('checked', false);
			$(this).find('input').prop('checked', true);
			$(this).addClass('is-active');
		}
	});

	// dropdown
	$('.js-dropdown').click(function(evt) {
		$(this).toggleClass('is-active');
		$(this).parents('tr').siblings().find('.js-dropdown').removeClass('is-active');
	});

	// close dropdown on body click
	$('body').click(function(evt) {
		if ( $(evt.target).parents('.js-dropdown').length > 0 || $(evt.target).is('.js-inner').length > 0 ) {
			evt.preventDefault();
		} else {
			$('.js-dropdown').removeClass('is-active');
		}
		console.log($(evt.target));
	});

	// $('.js-inner').click(function(evt) {
	// 	evt.stopPropagation();
	// });

	// fixed header in forms pages
	function scrollFixedElements() {
		var scrLeft = $(this).scrollLeft();
		$('.js-fixed').css({
			left: -scrLeft
		});
	}
	scrollFixedElements();

	function removeHeaderBg() {
		var win = $(window),
			headerFixed = $('.js-fixed');
			headerEl  = headerFixed.find('.js-hide');

		if ( win.scrollTop() === 0 ) {
			headerFixed.removeClass('is-active');
			headerEl.show();
		} else if ( win.scrollTop() > 0 ) {
			headerFixed.addClass('is-active');
			headerEl.hide();
		}
	}

	removeHeaderBg();

	$(window).scroll(function() {
		scrollFixedElements();
		removeHeaderBg();
	});

});