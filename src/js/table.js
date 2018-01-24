$(document).ready(function() {

	var oliviaTableFactory = function(tablewrapEl) {
		var oliviaTable = {
			dom: function(tablewrapEl) {
				this.tablewrap 	 = tablewrapEl;
				this.scrollTable = this.findScrollTable(this.tablewrap);
				this.filters 	 = this.findFilters(this.tablewrap);
				this.sidebar 	 = this.findSidebar(this.tablewrap);
				this.fakeHead 	 = this.findFakeHead(this.tablewrap);
			},
			init: function() {
				this.dom(tablewrapEl);
				// main
				this.addScrollButtons();
				this.perfectScroll();
				this.toggleDesignElem();
				this.measureSidedropHeight();
				this.measureMoreblock();
				this.columnsToggle();
				this.selectRow();
				this.selectAllRows();
				// sidebar
				this.toggleSidebar();
				this.sidebarScroll();
				this.showActivityInSidebar();
				this.chooseSidebarOption();
				this.toggleSidebarPanels();
				this.sidebarFilter();
				// filters
				this.tableTabs();
				this.toggleFilterSearch();
				// fake header
				this.createFakeHead();
				this.tableHeadFixed();
				this.breakFilters();

				var that = this;
				$(window).resize(function() {
					that.perfectScroll();
					that.toggleDesignElem();
					that.measureSidedropHeight();
					that.measureMoreblock();

					if (!window.matchMedia('(max-width: 1040px)').matches) {
						that.sidebar.css('left', 'auto');
					}
				});

				$(window).scroll(function() {
					that.tableHeadFixed();
				});
			},
			// find functions
			findScrollTable: function(tablewrap) {
				return tablewrap.find('.js-scrollbar');
			},
			findSidebar: function(tablewrap) {
				return tablewrap.find('.js-sidebar');
			},
			findFakeHead: function(tablewrap) {
				return tablewrap.find('.js-fake-head');
			},
			findFilters: function(tablewrap) {
				return tablewrap.find('.js-filters');
			},
			// main functions
			addScrollButtons: function(tablewrap) {
				tablewrap = tablewrap || this.tablewrap;

				var scrollTable = this.findScrollTable(tablewrap),
				fakeHead 	= this.findFakeHead(tablewrap),
				buttonPrev 	 = $('<div />', {'class': 'btn-prev'}),
				buttonNext   = $('<div />', {'class': 'btn-next'}),
				fakeHeadTabl = fakeHead.find('.table');

				buttonPrev.bind('click', function(evt) {
					evt.stopPropagation();
					scrollTable.scrollLeft(scrollTable.scrollLeft() - 20);
				});

				buttonNext.bind('click', function(evt) {
					evt.stopPropagation();
					scrollTable.scrollLeft(scrollTable.scrollLeft() + 20);
				});

				setTimeout(function() {
					buttonPrev.appendTo(scrollTable.find('.ps-scrollbar-x-rail'));
					buttonNext.appendTo(scrollTable.find('.ps-scrollbar-x-rail'));
				}, 0);

				scrollTable.on('scroll', function() {
					fakeHeadTabl.css('left', -$(this).scrollLeft());
				});
			},
			toggleDesignElem: function(scrollTable) {
				scrollTable = scrollTable || this.scrollTable;

				var scrollTableIn = scrollTable.find('.js-scrollbar .table');

				if ( scrollTable.hasClass('ps-active-x') ) {
					scrollTableIn.css('margin-bottom', '13px');
					scrollTable.siblings().addClass('is-scrollbar');
				} else {
					scrollTableIn.css('margin-bottom', '0');
					scrollTable.siblings().removeClass('is-scrollbar');
				}
			},
			perfectScroll: function(scrollTable) {
				scrollTable = scrollTable || this.scrollTable;

				if (scrollTable.length > 0) {
					if (scrollTable.hasClass('ps-container')) {
						scrollTable.perfectScrollbar('update');
					} else {
						scrollTable.perfectScrollbar();
					}
				}
			},
			measureMoreblock: function(scrollTable) {
				scrollTable = scrollTable || this.scrollTable;
				var measure = scrollTable.find('.js-measure');

				setTimeout(function() {
					measure.each(function() {
						// 5 stands for inline-block padding
						var plusBlockWidth = $(this).siblings('.js-plus-more').outerWidth() + 5;

						$(this).css({
							'max-width': 'calc( 100% - ' + plusBlockWidth + 'px)'
						});
					});
				}, 0);
			},
			measureSidedropHeight: function(tablewrap) {
				tablewrap = tablewrap || this.tablewrap;

				var siderow = tablewrap.find('.js-sidedrop .js-row');

				setTimeout(function() {
					siderow.each(function(index) {
						var siderowHeight = tablewrap.find('.js-scrollbar tr:not(".table__head")').eq(index).outerHeight();
						$(this).find('td').css('height', siderowHeight);
					});
				}, 100);
			},
			columnsToggle: function(tablewrap, filters) {
				tablewrap = tablewrap || this.tablewrap;
				scrollTable = this.findScrollTable(tablewrap);
				filters   = filters || this.filters;

				var tableRow = scrollTable.find('tr'),
				input    = filters.find('input[type="checkbox"]');

				input.on('change', function() {
					var data = $(this).parent().data('attr'),
					thead = tablewrap.find('th[data-id="' + data + '"]'),
					theadData = thead.data('id'),
					theadIndex = thead.index(),
					checkedInput = tablewrap.find('.js-filters input:checked'),
					checkedInputNum = checkedInput.length;

					oliviaTable.measureSidedropHeight();

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
			},
			selectRow: function(scrollTable) {
				scrollTable = scrollTable || this.scrollTable;

				var selectRow  = scrollTable.find('.js-select-row'),
				sideAction = scrollTable.siblings('.js-sidedrop');

				selectRow.click(function(evt) {
					evt.stopPropagation();
				});

				selectRow.on('click', 'input[type="checkbox"]', function() {
					var tableRow = $(this).parents('tr'),
					index = $(this).parents('tr').index();

					sideAction.find('tr').eq(index).toggleClass('is-selected');
					tableRow.toggleClass('is-selected');
				});
			},
			selectAllRows: function(scrollTable) {
				scrollTable = scrollTable || this.scrollTable;

				var selectAllInput = scrollTable.find('.js-label-checkbox'),
				selectRow 	   = scrollTable.find('tr:not(".table__head")'),
				sideActionRow  = scrollTable.siblings('.js-sidedrop').find('tr');

				selectAllInput.on('change', 'input[type="checkbox"]', function() {
					if ($(this).prop('checked')) {
						selectRow.addClass('is-selected').find('input[type="checkbox"]').prop('checked', true);
						sideActionRow.addClass('is-selected');
					} else {
						selectRow.removeClass('is-selected').find('input[type="checkbox"]').prop('checked', false);
						sideActionRow.removeClass('is-selected');
					}
				});
			},
			// sidebar functions
			toggleSidebar: function(tablewrap) {
				tablewrap = tablewrap || this.tablewrap;

				var scrollTable = this.findScrollTable(tablewrap),
				fakeHead 	= this.findFakeHead(tablewrap),
				sidebar  	= this.findSidebar(tablewrap),
				toggleSidebarBtn = tablewrap.find('.js-toggle-sidebar');

				toggleSidebarBtn.click(function() {
					$(this).toggleClass('is-opened');
					sidebar.toggleClass('is-active');
					fakeHead.toggleClass('is-sidebar');
					tablewrap.find('.js-scrollbar').toggleClass('is-sidebar');

					setTimeout(function() {
						oliviaTable.perfectScroll();
						oliviaTable.measureSidedropHeight();
						oliviaTable.toggleDesignElem();
					}, 300);
				});
			},
			sidebarScroll: function(sidebar) {
				sidebar  = sidebar || this.sidebar;

				if (sidebar.length > 0) {
					sidebar.find('.js-content').perfectScrollbar();
				}
			},
			showActivityInSidebar: function(tablewrap, sidebar) {
				tablewrap = tablewrap || this.tablewrap;
				sidebar   = sidebar || this.sidebar;

				var sidebarOption 	 = sidebar.find('.js-sidebar-option'),
				toggleSidebarBtn = tablewrap.find('.js-toggle-sidebar');

				if (sidebarOption.hasClass('is-active')) {
					toggleSidebarBtn.addClass('is-active');
				} else {
					toggleSidebarBtn.removeClass('is-active');
				}
			},
			chooseSidebarOption: function(sidebar) {
				sidebar = sidebar || this.sidebar;
				var sidebarOption = sidebar.find('.js-sidebar-option');

				sidebarOption.click(function(evt) {
					evt.preventDefault();
					$(this).parents('.js-content').find('.js-sidebar-option').removeClass('is-active');
					$(this).addClass('is-active');

					oliviaTable.showActivityInSidebar();
				});
			},
			toggleSidebarPanels: function(sidebar) {
				sidebar = sidebar || this.sidebar;

				var sideIn 		  = sidebar.find('.js-sidebar-in'),
				sideBl    	  = sidebar.find('.js-sidebar-bl'),
				sideTitleH	  = sideBl.find('.js-sidebar-ttl').outerHeight(),
				sideTitleNum  = sideBl.find('.js-sidebar-ttl').length - 1,
				allSideTitleH = sideTitleH * sideTitleNum,
				closed		  = {'height': sideTitleH};

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

						if (sideBl.last().hasClass('is-active')){
							sideIn.removeClass('no-bottom-border');
						} else {
							sideIn.addClass('no-bottom-border');
						}
					}
				});
			},
			sidebarFilter: function(sidebar) {
				sidebar = sidebar || this.sidebar;

				var sidebarFilter 		= sidebar.find('.js-sidebar-filter'),
				sidebarFilterRemove = sidebar.find('.js-sidebar-filter-remove');

				sidebarFilter.click(function(evt) {
					evt.stopPropagation();

					if ( $(this).children().length === 1 ) {
						$(this).closest('.js-sidebar-ttl').removeClass('is-two-filter');
					} else if ( $(this).children().length === 0) {
						$(this).remove();
					}
				});

				sidebarFilterRemove.click(function() {
					$(this).parent().remove();
				});
			},
			// filter functions
			tableTabs: function(tablewrap) {
				tablewrap = tablewrap || this.tablewrap;

				var tableTabs = tablewrap.find('.js-tab-el');

				tableTabs.click(function() {
					$(this).siblings().removeClass('is-active');
					$(this).addClass('is-active');
				});
			},
			toggleFilterSearch: function(filters) {
				filters = filters || this.filters;

				var filtersSearch = filters.find('.js-search-table'),
				filtersSearchInput = filters.find('.js-search-table input'),
				filtersSearchCloseBtn = filtersSearch.find('.js-search-clear');

				filtersSearch.click(function(evt) {
					evt.stopPropagation();
					$(this).addClass('search-opened');
				});

				$('body').click(function() {
					if (!filtersSearchInput.val()) {
						filtersSearch.removeClass('search-opened');
						filtersSearchCloseBtn.removeClass('is-active');
					}
				});
			},
			// fake header functions
			createFakeHead: function(scrollTable, fakeHead) {
				scrollTable = scrollTable || this.scrollTable;
				fakeHead 	= fakeHead || this.fakeHead;

				var fakeHeadTable = fakeHead.find('.table thead'),
				cloneHead 	  = scrollTable.find('.js-clone-head');

				cloneHead.clone(true).removeClass('js-clone-head').appendTo(fakeHeadTable);
			},
			tableHeadFixed: function(tablewrap, scrollTable) {
				tablewrap   = tablewrap || this.tablewrap,
				scrollTable = scrollTable || this.scrollTable;

				var fakeHead 	  = this.findFakeHead(tablewrap),
				fakeHeadIn	  = fakeHead.find('.js-fixed'),
				filters  	  = this.findFilters(tablewrap),
				filtersIn     = filters.find('.js-fixed'),
				sidebar 	  = this.findSidebar(tablewrap),
				scrollPos 	  = $(window).scrollTop(),
				scrLeft	  	  = $(window).scrollLeft(),
				wh 			  = $(window).height(),
				filtersHeight = filters.outerHeight(),
				tableWrapTop  = tablewrap.offset().top,
				tableWrapH	  = tableWrapTop + tablewrap.outerHeight(),
				minH		  = 570;


				tablewrap.css('padding-top', filtersHeight);
				
				
				// from starting point to min height at the bottom of table
				if (scrollPos > tableWrapTop && scrollPos < tableWrapH - minH) {

					filters.addClass('is-fixed').css('top', '0');
					fakeHead.addClass('is-fixed').css('top', filtersHeight);

					if (fakeHead.hasClass('is-fixed') || filters.hasClass('is-fixed')){
						filtersIn.css('left', -scrLeft);
						fakeHeadIn.css('left', -scrLeft);
					}

					// when sidebar touches bottom of the table
					if (scrollPos + wh > tableWrapH) {
						sidebar.removeClass('is-fixed js-fixed').css({
							'top': scrollPos - tableWrapTop,
							'left': '0'
						});
					} else {
						sidebar.addClass('is-fixed js-fixed').css('top', filtersHeight);
					}

					// when sidebar in between in fixed position
					if (scrollPos > tableWrapTop && scrollPos + wh < tableWrapH){
						// cases on resize with and without hz scroll
						if (window.matchMedia('(max-width: 1040px)').matches) {
							sidebar.css({
								'top': filtersHeight,
								'left': -scrLeft + 21
							});
						} else {
							sidebar.css({
								'top': filtersHeight,
								'left': 'auto'
							});
						}
					}

				} else if (scrollPos < tableWrapTop) {
					// if scroll position less then starting point
					filters.removeClass('is-fixed').css('top', '0');
					filtersIn.css('left', '0');

					fakeHead.removeClass('is-fixed').css('top','0');
					fakeHeadIn.css('left', '0');

					sidebar.removeClass('is-fixed js-fixed').css({
						'top': '0',
						'left': '0'
					});
				} else if (scrollPos + wh > tableWrapH) {
					// if scroll position is more then bottom of table
					filters.removeClass('is-fixed').css('top', tablewrap.outerHeight() - minH);
					filtersIn.css('left', '0');

					fakeHead.removeClass('is-fixed').css('top', tablewrap.outerHeight() - minH);
					fakeHeadIn.css('left', '0');

					sidebar.removeClass('is-fixed js-fixed').css('top', tablewrap.outerHeight() - minH);
				}
			},
			breakFilters: function() {
				// break line in filters
				var filterChildren = $('.js-width-line').children();

				if (filterChildren.length) {
					var transfer = '<div class="filters__row"></div>',
					filterMaxWidth = 550,
					totalWidth = 0;

					filterChildren.each(function(index, elem) {
						totalWidth += parseInt($(this).width());
					});

					if (totalWidth >= filterMaxWidth) {

						if($('.filters__row').length == 0) {
							filterChildren
							.eq(3)
							.after(transfer);
						}
						// setTimeout(()=> {
						// 	var tablewrap = $('.js-tablewrap');
						// 	var filtersHeight = $('.js-filters').outerHeight();

						// 	tablewrap.css('padding-top', filtersHeight);
						// }, 10);
						function updateFiltersPadding() {
							var tablewrap = $('.js-tablewrap');
							var filtersHeight = $('.js-filters').outerHeight();

							tablewrap.css('padding-top', filtersHeight);
						}
						setTimeout(updateFiltersPadding, 10);
					}
				}
			}
		};

		return oliviaTable;
	};

	$('.js-tablewrap').each(function() {
		oliviaTable = oliviaTableFactory($(this));
		oliviaTable.init();
	});

	window.oliviaTableFactory = oliviaTableFactory;

});