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
	};

	$.hidePopup = function(popup) {
		popup.removeClass('is-active');
		openedPopup = null;
		$('.overlay').removeClass('is-active');
	};

	$('[data-popup]').each(function(index, el) {
		var $el = $(el);
		var $popup = $('#' + $el.data('popup'));
		if (!$popup.parents('.overlay').length && !$popup.hasClass('js-avoid-overflow')) {
			$popup.appendTo('.overlay');
		}
		$el.on('click', function(evt) {
			evt.preventDefault();
			evt.stopPropagation();
			$.showPopup($popup);
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