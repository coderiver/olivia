function search() {
	var searchInput   = $('.js-search input'),
			searchResults = $('.js-search-results');

	searchInput.on('focus', function() {
		$(this).parent().addClass('is-active');
	}).on('blur', function() {
		$(this).parent().removeClass('is-active');
	});

	searchInput.on('keydown', function() {
		if (!searchResults.hasClass('is-active')) {
			searchResults.addClass('is-active');
		}
	});

	$('input[type="search"]').on('keydown', function() {
		var clearSearchBtn = $(this).parent().find('.js-search-clear');

		clearSearchBtn.addClass('is-active');
	});
}

search();

$('body').on('click', function(evt) {
	$('.js-search-results').removeClass('is-active');
});

function clearSearch() {
	$('.js-search-clear').click(function() {
		$(this).siblings('input').val('').focus();
	});
}

clearSearch();