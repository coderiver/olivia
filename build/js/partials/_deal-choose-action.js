// actions on deal settings
function chooseAction() {
	var actionBl = $('.js-action:not(".is-disabled")'),
		actionSiblings = null;

	actionBl.click(function() {
		actionSiblings = $(this).siblings();

		actionSiblings.removeClass('is-active')
					  .find('input').prop('checked', false);
		$(this).addClass('is-active');
		$(this).find('input').prop('checked', true);
	});
}

chooseAction();