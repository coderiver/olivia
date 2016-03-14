$(document).ready(function() {
	(function() {

		var	parentWrap = $('.js-tablewrap'),
			sidebar = parentWrap.find('.js-sidebar'),
			row = parentWrap.find('.js-sidedrop .js-row'),
			scrollTable = parentWrap.find('.js-scrollbar'),
			scrollTableIn = parentWrap.find('.js-scrollbar table'),
			winH = $(window).height(),
			footerH = $('.js-footer').outerHeight(true);

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
			} else if ( targetLink !== undefined && targetLink !== '' ) {
				window.location.href = targetLink;
			}
		});

		// scroll table and scroll buttons
		scrollTable.perfectScrollbar({
			  wheelPropagation: true
		});

		function toggleDesignElem() {
			if (scrollTable.hasClass('ps-active-x')) {
				scrollTableIn.css('margin-bottom', '13px');
				scrollTable.perfectScrollbar('update').siblings().addClass('is-scrollbar');
			} else {
				scrollTableIn.css('margin-bottom', '0');
				scrollTable.perfectScrollbar('update').siblings().removeClass('is-scrollbar');
			}
		}

		function addScrollButtons() {
			scrollTable.each(function() {
				var buttonPrev = $('<div />', {'class': 'btn-prev'}),
					buttonNext = $('<div />', {'class': 'btn-next'}),
					parentTabl = $(this).closest(scrollTable),
					fakeHeader = parentTabl.parents(parentWrap).find('.js-fake-head'),
					sidedrop   = parentTabl.parents(parentWrap).find('.js-sidedrop table');

				buttonPrev.bind('click', function(evt) {
					evt.stopPropagation();
					parentTabl.scrollLeft(parentTabl.scrollLeft() - 20);
				});

				buttonNext.bind('click', function(evt) {
					evt.stopPropagation();
					parentTabl.scrollLeft(parentTabl.scrollLeft() + 20);
				});

				buttonPrev.appendTo($(this).find('.ps-scrollbar-x-rail'));
				buttonNext.appendTo($(this).find('.ps-scrollbar-x-rail'));

				$(this).on('scroll', function() {
					fakeHeader.css('left', -$(this).scrollLeft());
					sidedrop.css('margin-top', -$(this).scrollTop());
				});
			});
		}

		function measureMoreblock() {
			setTimeout(function() {
				$('.js-measure').each(function() {
					var	plusBlockWidth = $(this).siblings('.js-plus-more').outerWidth() + 5; // 5 stands for inline-block padding

					$(this).css({
						'max-width': 'calc( 100% - ' + plusBlockWidth + 'px)'
					});
				});
			}, 0);
		}

		function measureSidedropHeight() {
			setTimeout(function() {
				row.each(function(index) {
					var rowHeight = parentWrap.find('.js-link').eq(index).outerHeight();
					$(this).find('td').css('height', rowHeight);
				});
			}, 100);
		}

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

				measureSidedropHeight();

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

		// sidebar inner scroll
		sidebar.find('.js-content').perfectScrollbar({
			wheelPropagation: true
		});

		function toggleSidebar() {
			$('.js-toggle-sidebar').click(function() {
				var scrollTable = $(this).parents(parentWrap);

				$(this).toggleClass('is-opened');
				scrollTable.find('.js-sidebar').toggleClass('is-active');
				scrollTable.find('.js-scrollbar').toggleClass('is-sidebar');
				scrollTable.find('.js-fake-head').toggleClass('is-sidebar');

				setTimeout(function() {
					scrollTable.perfectScrollbar('update');
					toggleDesignElem();
					measureSidedropHeight();
				}, 300);
			});
		}

		function showActivityInSidebar() {
			if ($('.js-sidebar-option').hasClass('is-active')) {
				$('.js-sidebar-option').closest(parentWrap).find('.js-toggle-sidebar').addClass('is-active');
			} else {
				$('.js-sidebar-option').closest(parentWrap).find('.js-toggle-sidebar').removeClass('is-active');
			}
		}

		function chooseSidebarOption() {
			$('.js-sidebar-option').click(function(evt) {
				evt.preventDefault();
				$(this).parents('.js-content').find('.js-sidebar-option').removeClass('is-active');
				$(this).addClass('is-active');

				showActivityInSidebar();
			});
		}

		// sidebar filter
		function toggleSidebarContent() {
			var sideBl    	  = $('.js-sidebar-bl'),
				sideTitle	  = sideBl.find('.js-sidebar-ttl').outerHeight(),
				sideTitleNum  = sideBl.find('.js-sidebar-ttl').length - 1,
				allSideTitleH = sideTitle * sideTitleNum,
				closed		  = {'height': '38px'},
				border 		  = {'border-bottom': '1px solid #dce0e7'},
				noBorder	  = {'border-bottom': 'none'};

			sideBl.css(closed);
			sideBl.on('click', '.js-sidebar-ttl', function() {
				var closestBl = $(this).closest(sideBl);

				if (!closestBl.hasClass('js-disabled')) {
					// remove active class from siblings
					closestBl.siblings().removeClass('is-active').css(closed);

					// add active class to current
					closestBl.toggleClass('is-active');

					// calc height of current
					if (closestBl.hasClass('is-active')) {
						closestBl.css('height', 'calc(100% - ' + allSideTitleH + 'px)');
					} else {
						closestBl.css(closed);
					}
				}

				// border
				if (sideBl.hasClass('is-active')) {
					sideBl.last().find('.js-sidebar-ttl').css(noBorder);
				} else {
					sideBl.last().find('.js-sidebar-ttl').css(border);
				}
			});
		}

		function sidebarFilter() {
			$('.js-sidebar-filter').click(function(evt) {
				evt.stopPropagation();

				if ( $(this).children().length === 1 ) {
					$(this).closest('.js-sidebar-ttl').removeClass('is-two-filter');
				} else if ( $(this).children().length === 0) {
					$(this).remove();
				}
			});

			$('.js-sidebar-filter-remove').click(function() {
				$(this).parent().remove();
			});
		}

		parentWrap.each(function() {
			var fakeHeadTable = $(this).find('.js-fake-head .table'),
				table = $(this).find('.js-scrollbar'),
				tableStart = table.offset().top,
				wrapperPadding = ($(this).outerHeight(true) - $(this).height()) / 2 + 1, // bottom padding + 1px border of main container
				tableH = winH - tableStart - footerH - wrapperPadding;
			// create and scroll fake header
			$(this).find('.js-clone-head').clone(true).removeClass('js-clone-head').appendTo(fakeHeadTable);
			// measure table height
			table.css('max-height', tableH);
		});

		function filterTabs() {
			$('.js-tab-el').click(function() {
				$(this).siblings().removeClass('is-active');
				$(this).addClass('is-active');
			});
		}

		function selectRow() {
			$('.js-select-row').click(function(evt) {
				evt.stopPropagation();
			});

			$('.js-select-row').on('click', 'input[type="checkbox"]', function() {
				var index = $(this).parents('.js-link').index();

				$(this).parents('.js-scrollbar').siblings('.js-sidedrop').find('tr').eq(index).toggleClass('is-selected');
				$(this).parents('.js-link').toggleClass('is-selected');
			});
		}

		function toggleSearchTable() {
			$('.js-search-table').click(function() {
				$(this).addClass('search-opened');
			});

			$('.js-search-table input').on('blur', function() {
				$(this).parent().removeClass('search-opened');
			});
		}

		// summon them on load!
		toggleDesignElem();
		filterTabs();
		columnsToggle();
		addScrollButtons();
		measureSidedropHeight();
		measureMoreblock();
		toggleSidebar();
		chooseSidebarOption();
		toggleSidebarContent();
		showActivityInSidebar();
		sidebarFilter();
		selectRow();
		toggleSearchTable();

		$(window).resize(function() {
			scrollTable.perfectScrollbar('update');
			toggleDesignElem();
			measureMoreblock();
			measureSidedropHeight();
		});

	})();

});

