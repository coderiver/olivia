$(document).ready(function() {
	(function() {
		var sidebar = $('.js-sidebar'),
			parentWrap = $('.js-tablewrap'),
			row = $('.js-sidedrop .js-row'),
			scrollTable = $('.js-scrollbar'),
			sublist = $('.js-sublist');

		// tablehead filter
		$('.table th').click(function() {
			$(this).siblings().removeClass('is-active');
			$(this).addClass('is-active');
		});

		// detect click on table row
		$('.js-link').click(function(e) {
			var targetLink = $(this).data('href');
			if ($(e.target).parents('.js-dropdown-wrap').length > 0) {
				if (!$(e.target).parents('.dropdown__list').length > 0) {
					e.preventDefault();
				}
			} else {
				window.location.href = targetLink;
			}
		});

		// scroll table
		scrollTable.mCustomScrollbar({
			axis: 'x',
			scrollButtons: {enable: true}
		});

		// height of td in sidedrop
		function sidedropRowHeight() {
			setTimeout(function() {
				row.each(function(index) {
					var rowHeight = parentWrap.find('.js-link').eq(index).height();
					$(this).find('td').css('height', rowHeight);
				});
			}, 0);
		}

		sidedropRowHeight();

		// sidebar inner scroll
		sidebar.find('.js-content').mCustomScrollbar({
			theme: 'minimal-dark'
		});

		// toggle sidebar
		$('.js-toggle-sidebar').click(function() {
			$(this).toggleClass('is-active');
			sidebar.toggleClass('is-active');
			scrollTable.toggleClass('is-sidebar').mCustomScrollbar('update');
		});

		// hide sidebar
		$('.js-hide-sidebar').click(function() {
			$(this).parents(sidebar).removeClass('is-active');
			$(this).closest(parentWrap).find(scrollTable).removeClass('is-sidebar');
			$('.js-toggle-sidebar').removeClass('is-active');
		});

		// sidebar submenu show/hide
		$('.js-sidebar-option').click(function() {
			$(this).siblings().removeClass('is-active');
			$(this).siblings().find(sublist).slideUp();

			$(this).addClass('is-active');
			$(this).find(sublist).slideToggle();
		});

		// tabs
		$('.js-tab-el').click(function() {
			$(this).siblings().removeClass('is-active');
			$(this).addClass('is-active');
		});

	})();

});