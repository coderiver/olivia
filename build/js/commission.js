function showCommission() {

	$('.js-add-commission').click( function(evt) {
		evt.preventDefault();
		$(this).siblings('.js-commission-fields').first().addClass('is-active');
	});

}

showCommission();