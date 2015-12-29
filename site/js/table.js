$(document).ready(function() {
	(function() {

		var	parentWrap = $('.js-tablewrap'),
			sidebar = parentWrap.find('.js-sidebar'),
			row = parentWrap.find('.js-sidedrop .js-row'),
			scrollTable = parentWrap.find('.js-scrollbar'),
			sublist = parentWrap.find('.js-sublist');

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

		// scroll table and scroll buttons
		scrollTable.perfectScrollbar();

		function toggleDesignElem() {
			if (scrollTable.hasClass('ps-active-x')) {
				scrollTable.siblings().addClass('is-scrollbar');
			} else {
				scrollTable.siblings().removeClass('is-scrollbar');
			}
		}

		toggleDesignElem();

		$(window).resize(function() {
			scrollTable.perfectScrollbar('update');
			toggleDesignElem();
		});

		function addScrollButtons() {
			scrollTable.each(function() {
				var buttonPrev = $('<div />', {'class': 'btn-prev'}),
					buttonNext = $('<div />', {'class': 'btn-next'});

				buttonPrev.bind('click', function(evt) {
					evt.stopPropagation();
					$(this).closest(scrollTable).scrollLeft($(this).closest(scrollTable).scrollLeft() - 20);
				});

				buttonNext.bind('click', function(evt) {
					evt.stopPropagation();
					$(this).closest(scrollTable).scrollLeft($(this).closest(scrollTable).scrollLeft() + 20);
				});

				buttonPrev.appendTo($(this).find('.ps-scrollbar-x-rail'));
				buttonNext.appendTo($(this).find('.ps-scrollbar-x-rail'));
			});
		}

		addScrollButtons();

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

		// add/remove columns
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

		//sidebar.find('.js-content').perfectScrollbar();

		// toggle sidebar
		$('.js-toggle-sidebar').click(function() {
			$(this).toggleClass('is-active');
			sidebar.toggleClass('is-active');
			scrollTable.toggleClass('is-sidebar').perfectScrollbar('update');
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

		// create and scroll fake header
		parentWrap.each(function() {
			fakeHeadTable = $(this).find('.js-fake-head .table');
			$(this).find('.js-clone-head').clone(true).removeClass('js-clone-head').appendTo(fakeHeadTable);
		});

		function scrollFakeHeader() {
			if ( parentWrap.length > 0 ) {
				$(window).scroll(function() {
					var scrollPos = $(window).scrollTop();

					parentWrap.each(function() {
						var	tableTop = $(this).find('.js-scrollbar').offset().top,
							tableHeight = $(this).find('.js-scrollbar').outerHeight() - 114;

						if ( scrollPos > tableTop ) {
							$(this).find('.js-fake-head').css('top', scrollPos - tableTop);
							if ( scrollPos > tableTop + tableHeight) {
								$(this).find('.js-fake-head').css('top', '0');
							}
						} else {
							$(this).find('.js-fake-head').css('top', '0');
						}
					});
				});
			}
		}

		scrollFakeHeader();

		// tabs for filter
		$('.js-tab-el').click(function() {
			$(this).siblings().removeClass('is-active');
			$(this).addClass('is-active');
		});

	})();

});