$(document).ready(function() {

	// popups
	var openedPopup = null;

	$.showPopup = function(popup) {
		if ( openedPopup ) {
			$.hidePopup(openedPopup);
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

	$.hidePopup = function(popup) {
		popup.removeClass('is-active');
		openedPopup = null;
		$('.overlay').removeClass('is-active');
		$('body').removeClass('is-overflow');
	};

	$('[data-popup]').each(function(index, el) {
		var $el = $(el);
		var popup;

		$el.on('click', function(evt) {
			evt.preventDefault();
			evt.stopPropagation();
			popup = $('#' + $el.data('popup'));
			$.showPopup(popup);
		});
	});

	// close popup
	$('.js-close').on('click touchend', function(evt) {
		var popup;
		evt.preventDefault();

		popup = $(this).parents('.js-popup');
		$.hidePopup(popup);
		$(this).parents('.js-bar').removeClass('is-active');
	});

});