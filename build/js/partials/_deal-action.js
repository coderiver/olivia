// actions on deal status
function chooseAction() {
	var actionBl = $('.js-action:not(".is-disabled")'),
		 actionSiblings;

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