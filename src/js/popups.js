$(document).ready(function() {

	// popups
	var openedPopup = null;

	$.showPopup = function(popup) {
		if ( openedPopup ) {
			$.hidePopup(openedPopup);
		}
		popup.addClass('is-active');
		openedPopup = popup;
		if ( $('.overlay').not('is-active') ) {
			$('.overlay').addClass('is-active');
		}
		if ( !popup.hasClass('js-avoid-overflow') ) {
			$('body').addClass('is-overflow');
		}
		if ( popup.find('.js-tooltip').length > 0 ) {
			$('.overlay').addClass('low-index');
		}
		if ( $('.js-search-results').hasClass('is-active') ) {
			$('.js-search-results').removeClass('is-active');
		}
	};

	$.hidePopup = function(popup) {
		popup.removeClass('is-active');
		openedPopup = null;
		$('.overlay').removeClass('is-active low-index');
		$('body').removeClass('is-overflow');
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

	// close popup on body click
	$('.overlay').on('click touchend', function(evt) {
		var popup;
		popup = $('.js-popup');

		if (popup.hasClass('is-active') && !$(evt.target).parents('.js-popup').length > 0) {
			$.hidePopup(popup);
		}
	});

	// popup scroll
	function popupScrollBar() {
		var popupScrollBl = $('.js-popup-scroll'),
			list = popupScrollBl.find('.js-popup-list'),
			input = popupScrollBl.find('.js-popup-search'),
			checkbox = popupScrollBl.find('input[type="checkbox"]'),
			buttons = $('.js-popup-btn'),
			buttonsHeight = 0;

		popupScrollBl.each(function() {
			$(this).perfectScrollbar();

			if ( $(this).find('.js-popup-list').hasClass('is-hidden') ) {
				$(this).css('height', 'auto');
			}
		});

		input.on('keydown', function() {
			if ( list.hasClass('is-hidden') && input.val() ) {
				list.removeClass('is-hidden');
			}

			popupScrollBl.css('height', '430px').perfectScrollbar('update');
		});

		checkbox.on('change', function() {
			if ( checkbox.is(':checked') ) {
				buttons.removeClass('is-hidden');
				if ( buttonsHeight === 0 ) {
					buttonsHeight = buttons.outerHeight();
				}
				popupScrollBl.css('padding-bottom', buttonsHeight + 'px').perfectScrollbar('update');
			} else {
				buttons.addClass('is-hidden');
				popupScrollBl.css('padding-bottom', '0').perfectScrollbar('update');
			}
		});
	}

	popupScrollBar();

});