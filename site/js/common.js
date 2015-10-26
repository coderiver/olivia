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
		if (!popup.hasClass('suggest')) {
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
			var popup = $('#' + el.data('popup'));
			showPopup(popup);
		});
	});

	$('.js-close').on('click touchend', function() {
		var popup = $(this).parents('.js-popup');
		hidePopup(popup);
		$('.overlay').removeClass('is-active');
	});

	// animate back to top
	$('.js-top').click(function(e) {
		e.preventDefault();
		$( 'html, body' ).animate({
			scrollTop: 0
		}, 'slow');
	});

	// detect link on click
	$('.js-link').click(function(e) {
		var targetLink = $(this).data('href');

		if ($(e.target).parents('.js-table-drop').length > 0) {
			e.preventDefault;
		} else {
			e.preventDefault;
			window.location.href = targetLink;
		}
	});

	// tooltip
	$('.js-tooltip').tooltipster({
		position: 'right',
		maxWidth: 290
	});

	// dropdown
	$('.js-dropit').click(function(e) {
		e.preventDefault();
		$(this).parent().find('.js-to-drop').toggleClass('is-visible');
	});

	$('body').click(function(e) {
		if ( $(e.target).parents('.js-wrap').length > 0 ) {
			e.stopPropagation();
		} else {
			$('.js-to-drop').removeClass('is-visible');
		}
	});

	// tablehead filter
	$('.table th').click(function() {
		$(this).siblings().removeClass('is-active');
		$(this).addClass('is-active');
	});

	$('.js-slide-up').click(function(e) {
		e.preventDefault();
		$(this).parents('.js-slide-parent').slideUp();
	});

});