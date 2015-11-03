$(document).ready(function() {
	// tablehead filter
	$('.table th').click(function() {
		$(this).siblings().removeClass('is-active');
		$(this).addClass('is-active');
	});

	// detect click on table row
	$('.js-link').click(function(e) {
		var targetLink = $(this).data('href');
		if ($(e.target).parents('.js-table-drop').length > 0) {
			if (!$(e.target).parents('.dropdown__list').length > 0) {
				e.preventDefault();
			}
		} else {
			window.location.href = targetLink;
		}
	});

	// table dropdown..
	$('.js-table-drop').click(function(e) {
		$(this).closest('.js-link').siblings().find('.dropdown').removeClass('is-active');
		$(this).find('.dropdown').toggleClass('is-active');
	});

	// ..and in the sidedrop
	$('.sidedrop .js-table-drop').click(function(e) {
		$(this).parent().siblings().find('.dropdown').removeClass('is-active');
	});

	// scroll table
	$('.js-scrollbar').mCustomScrollbar({
		axis: 'x',
		scrollButtons: {enable: true}
	});

	function sidedropRowHeight() {
		var row = $('.js-sidedrop .js-row');
		var parent = $('.js-sidedrop .js-row').closest('.js-tablewrap');
		var thead = $('.js-sidedrop .js-row-head');
		var theadHeight = parent.find('.js-row-head').outerHeight();

		thead.css('height', theadHeight);

		row.each(function(index) {
			var rowHeight = parent.find('.js-link').eq(index).outerHeight();
			$(this).find('td').css('height', rowHeight);
		});
	}

	sidedropRowHeight();

	// measure sidebar height
	function sidebarHeight() {
		var parent = $('.js-tablewrap');
		var parentHeight = parent.outerHeight();

		$('.js-sidebar').css('height', parentHeight);
	}

	sidebarHeight();

	// toggle sidebar
	$('.js-toggle-sidebar').click(function() {
		$(this).toggleClass('is-active');
		$('.js-sidebar').toggleClass('is-active');
		$('.js-scrollbar').toggleClass('is-sidebar').mCustomScrollbar('update');
	});

});