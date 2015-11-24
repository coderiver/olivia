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
		var $el = $(el);
		var popup;

		$el.on('click', function(event) {
			event.preventDefault();
			event.stopPropagation();
			popup = $('#' + $el.data('popup'));
			showPopup(popup);
		});
	});

	// close popup
	$('.js-close').on('click touchend', function(e) {
		var popup;

		e.preventDefault();
		popup = $(this).parents('.js-popup');
		hidePopup(popup);
		$('.overlay').removeClass('is-active');
		$(this).parents('.js-bar').removeClass('is-active');
	});

});