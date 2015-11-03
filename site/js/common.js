$(document).ready(function() {

	// popups
	var openedPopup = null;

	var showPopup = function(popup) {
		if ( openedPopup ) {
			hidePopup(openedPopup);
		}
		popup.addClass('is-active');
		openedPopup = popup;
		if ($('.overlay').not('is-active')) {
			$('.overlay').addClass('is-active');
		}
		if (!popup.hasClass('js-avoid-overflow')) {
			$('body').addClass('is-overflow');
		}
	};

	var hidePopup = function(popup) {
		popup.removeClass('is-active');
		openedPopup = null;
		$('body').removeClass('is-overflow');
	};

	$('[data-popup]').each(function(index, el) {
		var el = $(el);
		el.on('click', function(event) {
			event.preventDefault();
			event.stopPropagation();
			var popup = $('#' + el.data('popup'));
			showPopup(popup);
		});
	});

	$('.js-close').on('click touchend', function(e) {
		e.preventDefault();
		var popup = $(this).parents('.js-popup');
		hidePopup(popup);
		$('.overlay').removeClass('is-active');
		$(this).parents('.js-bar').removeClass('is-active');
	});

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
		position: 'right',
		maxWidth: 290,
		interactive: true,
		contentAsHTML: true,
		trigger: 'custom'
	});

	$('.js-tooltip-guide').tooltipster('show');

	$('.js-tooltip-guide').click(function() {
		var data = $(this).data('attr');
		$('.js-tooltip-guide-hide[data-attr="" + data + ""]').parents('.tooltipster-base').toggle();
	});

	$('.js-tooltip-guide-hide').click(function(e) {
		e.preventDefault();
		$(this).parents('.tooltipster-base').hide();
	});

	// dropdown
	$('.js-dropit').click(function(e) {
		e.preventDefault();
		$('.js-to-drop').removeClass('is-visible');
		$(this).parent().find('.js-to-drop').toggleClass('is-visible');
	});

	// close dropdown on click
	$('body').click(function(e) {
		if ( $(e.target).parents('.js-wrap').length > 0 || $(e.target).parents('.js-table-drop').length > 0) {
			e.stopPropagation();
		} else {
			$('.js-to-drop').removeClass('is-visible');
			$('.dropdown').removeClass('is-active');
		}
	});

	// textare autoresize
	$(document).on('input.textarea', '.js-expand', function() {
		var minRows = this.getAttribute('data-min-rows') | 0,
			rows	= this.value.split('\n').length;

		this.rows = rows < minRows ? minRows : rows;
	});

	// bar
	$('.js-bar').addClass('is-active');

	// slide up info block
	$('.js-slide-up').click(function(e) {
		e.preventDefault();
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

});