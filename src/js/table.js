$(document).ready(function() {
	(function() {

		var	parentWrap = $('.js-tablewrap'),
			sidebar = parentWrap.find('.js-sidebar'),
			row = parentWrap.find('.js-sidedrop .js-row'),
			scrollTable = parentWrap.find('.js-scrollbar'),
			sublist = parentWrap.find('.js-sublist'),
			fakeHead = parentWrap.find('.js-fake-head');

		// tablehead filter
		$('.table th').click(function() {
			$(this).siblings().removeClass('is-active');
			$(this).addClass('is-active');
		});

		// detect click on table row
		$('body').on('click', '.js-link', function(evt) {
			var targetLink = $(this).data('href');

			if ( $(evt.target).parents('.js-dropdown').length > 0 ) {
				if ( !$(evt.target).parents('.dropdown__list').length > 0 ) {
					evt.preventDefault();
				}
			} else {
				window.location.href = targetLink;
			}
		});

		// scroll table
		scrollTable.mCustomScrollbar({
			axis: 'x',
			scrollButtons: {enable: true},
			scrollInertia: 300,
			callbacks: {
				onInit: function() {
					scrollHeaderWidth(this);
				},
				onUpdate: function() {
					scrollHeaderWidth(this);
				},
				whileScrolling: function() {
					scrollHeaderPos(this);
				}
			}
		});

		function scrollHeaderWidth(el) {
			var scrollHeader = $(el).closest(parentWrap).find('.js-fake-head .table'),
				containerWidth = $(el).find('.mCSB_container').outerWidth();

			if ( scrollHeader.length > 0 ) {
				scrollHeader.css('width', containerWidth);
			}
		}

		function scrollHeaderPos(el) {
			var scrollHeader = $(el).closest(parentWrap).find('.js-fake-head .table');

			if ( scrollHeader.length > 0 ) {
				scrollHeader.css('left', el.mcs.left);
			}
		}


		// measure width of more block TODO MEASURE IN PERCENTAGE
		function measureMoreblock() {
			setTimeout(function() {
				$('.js-plus-more span:first-child').each(function() {
					var plusBlockWidth = $(this).siblings('.table__more').outerWidth();
					$(this).css({
						'width': 'calc(100% - ' + plusBlockWidth + 'px)'
					});
					$(this).parent().addClass('is-measured');
				});
			}, 0);
		}

		measureMoreblock();

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

		function columnsToggle() {
			var input = $('.js-check input'),
				tableRow = $('.js-tablewrap .js-link');

			input.on('change', function() {
				var data = $(this).parent().data('attr'),
					thead = $('.js-tablewrap th[data-id="' + data + '"]'),
					theadData = thead.data('id'),
					theadIndex = thead.index(),
					checkedInput = $('.js-check input:checked'),
					checkedInputNum = checkedInput.length;

				// check if th with input id exists
				if ( theadData ) {
					if ( $(this).is(':checked') ) {
						thead.show();

						tableRow.each(function() {
							$(this).find('td').eq(theadIndex).show();
						});
					} else {
						thead.hide();

						tableRow.each(function() {
							$(this).find('td').eq(theadIndex).hide();
						});
					}
				}

				// at least one column in table
				if ( checkedInputNum < 3 ) {
					checkedInput.prop('disabled', true);
				} else {
					checkedInput.prop('disabled', false);
				}
			});
		}

		columnsToggle();

		// sidebar inner scroll
		sidebar.find('.js-content').mCustomScrollbar({
			theme: 'minimal-dark'
		});

		// toggle sidebar
		$('.js-toggle-sidebar').click(function() {
			$(this).toggleClass('is-active');
			sidebar.toggleClass('is-active');
			scrollTable.toggleClass('is-sidebar').mCustomScrollbar('update');
			// scrollTable.toggleClass('is-sidebar').perfectScrollbar('update');
			fakeHead.toggleClass('is-sidebar');
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
			$(this).find(sublist).slideDown();
		});

		// fake header
		parentWrap.each(function() {
			fakeHeadTable = $(this).find('.js-fake-head .table');
			$(this).find('.js-clone-head').clone(true).removeClass('js-clone-head').appendTo(fakeHeadTable);
		});

		// function scrollFakeHeader() {
		// 	if ( el.length > 0 ) {
		// 		var win = $(window),
		// 			scrollPos = win.scrollTop(),
		// 			parentWrapHeight = el.outerHeight(),
		// 			tableTop = el.find('.js-scrollbar').offset().top;

		// 		if ( scrollPos > tableTop && scrollPos < parentWrapHeight ) {
		// 			el.find('.js-fake-head').addClass('is-visible');
		// 		} else if ( scrollPos > parentWrapHeight ) {
		// 			el.find('.js-fake-head').removeClass('is-visible');
		// 		} else {
		// 			el.find('.js-fake-head').removeClass('is-visible');
		// 		}
		// 	}
		// }

		// $(window).scroll(function() {
		// 	scrollFakeHeader();
		// });

		// TODO FAKEHEADER LEFT - 0, TABLE - LEFT 0
		// $(window).resize(function() {

		// });

		// tabs for filter
		$('.js-tab-el').click(function() {
			$(this).siblings().removeClass('is-active');
			$(this).addClass('is-active');
		});

	})();

});

