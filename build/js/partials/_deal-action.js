// actions on deal status
function chooseAction() {
	var actionBl = $('.js-action:not(".is-disabled")'),
		 actionSiblings;

	// // detect active elem on load
	// actionBl.removeClass('is-active');
	// actionBl.each(function() {
	// 	var input = $(this).find('input');
	// 	if ( input.prop('checked') ) {
	// 		$(this).addClass('is-active');
	// 	}
	// });

	actionBl.click(function() {
		actionSiblings = $(this).siblings();

		actionSiblings
			.removeClass('is-active')
			.find('input')
			.removeClass('is-checked');

		$(this).addClass('is-active');
		$(this).find('input').addClass('is-checked');
	});
}

chooseAction();