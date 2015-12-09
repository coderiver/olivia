$(document).ready(function() {
	(function() {

		var sidebar = $('.js-sidebar'),
			parentWrap = $('.js-tablewrap'),
			row = $('.js-sidedrop .js-row'),
			scrollTable = $('.js-scrollbar'),
			sublist = $('.js-sublist'),
			fakeHead = parentWrap.find('.fake-header');

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
				onUpdate: function(){
					scrollHeaderWidth(this);
				},
				whileScrolling: function() {
					scrollHeaderPos(this);
				}
			}
		});

		function scrollHeaderWidth(el) {
			var scrollHeader = $(el).find('.js-fake-head .table'),
				containerWidth = $(el).find('.mCSB_container').outerWidth();

			if ( scrollHeader.length > 0 ) {
				scrollHeader.css('width', containerWidth);
			}
		}

		function scrollHeaderPos(el) {
			var scrollHeader = $(el).find('.js-fake-head .table');

			if ( scrollHeader.length > 0 ) {
				scrollHeader.css('left', el.mcs.left);
			}
		}

		// scrollTable.perfectScrollbar({
		// 	maxScrollbarLength: 350
		// });

		// measure width of more block
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
			//scrollTable.toggleClass('is-sidebar').perfectScrollbar('update');
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
			$(this).find(sublist).slideToggle();
		});

		// tabs
		$('.js-tab-el').click(function() {
			$(this).siblings().removeClass('is-active');
			$(this).addClass('is-active');
		});

		// fake header
		$('.js-tablewrap .js-clone-head').clone(true).removeClass('js-clone-head').appendTo('.js-fake-head .table');

		function scrollFakeHeader() {
			if ( parentWrap.length > 0 ) {
				var win = $(window),
					scrollPos = win.scrollTop(),
					parentWrapHeight = parentWrap.outerHeight(),
					parentWrapPos = parentWrap.offset().top;

				if ( scrollPos > parentWrapPos && scrollPos < parentWrapHeight ) {
					fakeHead.addClass('is-visible');
				} else if ( scrollPos > parentWrapHeight ) {
					fakeHead.removeClass('is-visible');
				} else{
					fakeHead.removeClass('is-visible');
				}
			}
		}

		$(window).scroll(function() {
			scrollFakeHeader();
		});
	})();

});