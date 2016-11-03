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
// function changeDropdownOpt(el) {
// 	el.on('click', '.js-inner a', function(evt) {
// 		evt.preventDefault();
// 		var text = $(this).html();

// 		$(this).parents('.js-dropdown').removeClass('is-active').find('.dropdown__item').text(text);
// 	});
// }

// changeDropdownOpt($('.js-dropdown.is-form'));
// changeDropdownOpt($('.js-dropdown.js-todrop'));

// hide dropdown on body click
$('body').on('click', function(evt) {
	if ( !$(evt.target).parents('.js-dropdown').length ) {
		$('.js-dropdown').removeClass('is-active is-top');
	}
});