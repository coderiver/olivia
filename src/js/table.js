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

				if (scrollTable.hasClass('ps-active-x')) {
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
						var	plusBlockWidth = $(this).siblings('.js-plus-more').outerWidth() + 5;

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

				var selectAllInput = scrollTable.find('th.label-checkbox'),
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
					sidebar.find('.js-content').perfectScrollbar({
						wheelPropagation: true
					});
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

				var sideBl    	  = sidebar.find('.js-sidebar-bl'),
					sideTitleH	  = sideBl.find('.js-sidebar-ttl').outerHeight(),
					sideTitleNum  = sideBl.find('.js-sidebar-ttl').length - 1,
					allSideTitleH = sideTitleH * sideTitleNum,
					closed		  = {'height': sideTitleH},
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

				var fakeHeadTable = fakeHead.find('.table'),
					cloneHead 	  = scrollTable.find('.js-clone-head');

				cloneHead.clone(true).removeClass('js-clone-head').appendTo(fakeHeadTable);
			},
			tableHeadFixed: function(tablewrap) {
				tablewrap = tablewrap || this.tablewrap;

				var fakeHead 	  = this.findFakeHead(tablewrap),
					filters  	  = this.findFilters(tablewrap),
					scrollPos 	  = $(window).scrollTop(),
					filtersHeight = filters.outerHeight(),
					tableWrapTop  = tablewrap.offset().top,
					tableWrapH 	  = tableWrapTop + tablewrap.outerHeight() - (filtersHeight + fakeHead.outerHeight());

				tablewrap.css('padding-top', filtersHeight);

				if (scrollPos > tableWrapTop && scrollPos < tableWrapH) {
					filters.addClass('is-fixed');
					fakeHead.addClass('is-fixed').css('top', filtersHeight);
				} else {
					filters.removeClass('is-fixed');
					fakeHead.removeClass('is-fixed').css('top', '0');
				}
			}
		};

		oliviaTable.dom(tablewrapEl);
		// main
		oliviaTable.addScrollButtons();
		oliviaTable.toggleDesignElem();
		oliviaTable.perfectScroll();
		oliviaTable.measureSidedropHeight();
		oliviaTable.measureMoreblock();
		oliviaTable.columnsToggle();
		oliviaTable.selectRow();
		oliviaTable.selectAllRows();
		// sidebar
		oliviaTable.toggleSidebar();
		oliviaTable.sidebarScroll();
		oliviaTable.showActivityInSidebar();
		oliviaTable.chooseSidebarOption();
		oliviaTable.toggleSidebarPanels();
		oliviaTable.sidebarFilter();
		// filters
		oliviaTable.tableTabs();
		oliviaTable.toggleFilterSearch();
		// fake header
		oliviaTable.createFakeHead();
		oliviaTable.tableHeadFixed();

		$(window).resize(function() {
			oliviaTable.toggleDesignElem();
			oliviaTable.perfectScroll();
			oliviaTable.measureSidedropHeight();
			oliviaTable.measureMoreblock();
		});

		$(window).scroll(function() {
			oliviaTable.tableHeadFixed();
		});

		return oliviaTable;
	};

	$('.js-tablewrap').each(function() {
		oliviaTableFactory($(this));
	});

	window.oliviaTableFactory = oliviaTableFactory;

	// (function() {

		// var	parentWrap = $('.js-tablewrap'),
		// 	sidebar = parentWrap.find('.js-sidebar'),
		// 	row = parentWrap.find('.js-sidedrop .js-row'),
		// 	scrollTable = parentWrap.find('.js-scrollbar'),
		// 	scrollTableIn = parentWrap.find('.js-scrollbar table'),
		// 	win = $(window),
		// 	scrollPos = win.scrollTop();


		// scroll table and scroll buttons
		// function perfectScroll() {
		// 	scrollTable.perfectScrollbar();
		// }


		// function toggleDesignElem() {
		// 	if (scrollTable.hasClass('ps-active-x')) {
		// 		scrollTableIn.css('margin-bottom', '13px');
		// 		scrollTable.siblings().addClass('is-scrollbar');
		// 	} else {
		// 		scrollTableIn.css('margin-bottom', '0');
		// 		scrollTable.siblings().removeClass('is-scrollbar');
		// 	}
		// }

		// function addScrollButtons() {
		// 	scrollTable.each(function() {
		// 		var buttonPrev = $('<div />', {'class': 'btn-prev'}),
		// 			buttonNext = $('<div />', {'class': 'btn-next'}),
		// 			parentTabl = $(this).closest(scrollTable),
		// 			fakeHeader = parentTabl.parents(parentWrap).find('.js-fake-head .table'),
		// 			sidedrop   = parentTabl.parents(parentWrap).find('.js-sidedrop .table');

		// 		buttonPrev.bind('click', function(evt) {
		// 			evt.stopPropagation();
		// 			parentTabl.scrollLeft(parentTabl.scrollLeft() - 20);
		// 		});

		// 		buttonNext.bind('click', function(evt) {
		// 			evt.stopPropagation();
		// 			parentTabl.scrollLeft(parentTabl.scrollLeft() + 20);
		// 		});

		// 		buttonPrev.appendTo($(this).find('.ps-scrollbar-x-rail'));
		// 		buttonNext.appendTo($(this).find('.ps-scrollbar-x-rail'));

		// 		$(this).on('scroll', function() {
		// 			fakeHeader.css('left', -$(this).scrollLeft());
		// 			sidedrop.css('margin-top', -$(this).scrollTop());
		// 		});
		// 	});
		// }

		// function measureMoreblock() {
		// 	setTimeout(function() {
		// 		$('.js-measure').each(function() {
		// 			var	plusBlockWidth = $(this).siblings('.js-plus-more').outerWidth() + 5; // 5 stands for inline-block padding

		// 			$(this).css({
		// 				'max-width': 'calc( 100% - ' + plusBlockWidth + 'px)'
		// 			});
		// 		});
		// 	}, 0);
		// }

		// function measureSidedropHeight() {
		// 	setTimeout(function() {
		// 		row.each(function(index) {
		// 			var rowHeight = parentWrap.find('.js-scrollbar tr:not(".table__head")').eq(index).outerHeight();
		// 			$(this).find('td').css('height', rowHeight);
		// 		});
		// 	}, 100);
		// }

		// function columnsToggle() {
		// 	var input = $('.js-inner input'),
		// 		tableRow = $('.js-tablewrap tr');

		// 	input.on('change', function() {
		// 		var data = $(this).parent().data('attr'),
		// 			thead = $('.js-tablewrap th[data-id="' + data + '"]'),
		// 			theadData = thead.data('id'),
		// 			theadIndex = thead.index(),
		// 			checkedInput = $('.js-inner input:checked'),
		// 			checkedInputNum = checkedInput.length;

		// 		measureSidedropHeight();

		// 		// check if th with input id exists
		// 		if ( theadData ) {
		// 			if ( $(this).is(':checked') ) {
		// 				thead.show();

		// 				tableRow.each(function() {
		// 					$(this).find('td').eq(theadIndex).show();
		// 				});
		// 			} else {
		// 				thead.hide();

		// 				tableRow.each(function() {
		// 					$(this).find('td').eq(theadIndex).hide();
		// 				});
		// 			}
		// 		}

		// 		// at least one column in table
		// 		if ( checkedInputNum < 3 ) {
		// 			checkedInput.prop('disabled', true);
		// 		} else {
		// 			checkedInput.prop('disabled', false);
		// 		}
		// 	});
		// }

		// sidebar inner scroll
		// function sidebarScroll() {
		// 	sidebar.find('.js-content').perfectScrollbar({
		// 		wheelPropagation: true
		// 	});
		// }

		// function toggleSidebar() {
		// 	$('.js-toggle-sidebar').click(function() {
		// 		var parentWrap = $(this).parents(parentWrap),
		// 			scrollTable = parentWrap.find('.js-scrollbar');

		// 		$(this).toggleClass('is-opened');
		// 		parentWrap.find('.js-sidebar').toggleClass('is-active');
		// 		parentWrap.find('.js-scrollbar').toggleClass('is-sidebar');
		// 		parentWrap.find('.js-fake-head').toggleClass('is-sidebar');

		// 		setTimeout(function() {
		// 			scrollTable.perfectScrollbar('update');
		// 			measureSidedropHeight();
		// 			toggleDesignElem();
		// 		}, 300);
		// 	});
		// }

		// function showActivityInSidebar() {
		// 	if ($('.js-sidebar-option').hasClass('is-active')) {
		// 		$('.js-sidebar-option').closest(parentWrap).find('.js-toggle-sidebar').addClass('is-active');
		// 	} else {
		// 		$('.js-sidebar-option').closest(parentWrap).find('.js-toggle-sidebar').removeClass('is-active');
		// 	}
		// }

		// function chooseSidebarOption() {
		// 	$('.js-sidebar-option').click(function(evt) {
		// 		evt.preventDefault();
		// 		$(this).parents('.js-content').find('.js-sidebar-option').removeClass('is-active');
		// 		$(this).addClass('is-active');

		// 		//showActivityInSidebar();
		// 	});
		// }

		// sidebar filter
		// function toggleSidebarContent() {
		// 	var sideBl    	  = $('.js-sidebar-bl'),
		// 		sideTitle	  = sideBl.find('.js-sidebar-ttl').outerHeight(),
		// 		sideTitleNum  = sideBl.find('.js-sidebar-ttl').length - 1,
		// 		allSideTitleH = sideTitle * sideTitleNum,
		// 		closed		  = {'height': '38px'},
		// 		border 		  = {'border-bottom': '1px solid #dce0e7'},
		// 		noBorder	  = {'border-bottom': 'none'};

		// 	sideBl.css(closed);
		// 	sideBl.on('click', '.js-sidebar-ttl', function() {
		// 		var closestBl = $(this).closest(sideBl);

		// 		if (!closestBl.hasClass('js-disabled')) {
		// 			// remove active class from siblings
		// 			closestBl.siblings().removeClass('is-active').css(closed);

		// 			// add active class to current
		// 			closestBl.toggleClass('is-active');

		// 			// calc height of current
		// 			if (closestBl.hasClass('is-active')) {
		// 				closestBl.css('height', 'calc(100% - ' + allSideTitleH + 'px)');
		// 			} else {
		// 				closestBl.css(closed);
		// 			}
		// 		}

		// 		// border
		// 		if (sideBl.hasClass('is-active')) {
		// 			sideBl.last().find('.js-sidebar-ttl').css(noBorder);
		// 		} else {
		// 			sideBl.last().find('.js-sidebar-ttl').css(border);
		// 		}
		// 	});
		// }

		// function sidebarFilter() {
		// 	$('.js-sidebar-filter').click(function(evt) {
		// 		evt.stopPropagation();

		// 		if ( $(this).children().length === 1 ) {
		// 			$(this).closest('.js-sidebar-ttl').removeClass('is-two-filter');
		// 		} else if ( $(this).children().length === 0) {
		// 			$(this).remove();
		// 		}
		// 	});

		// 	$('.js-sidebar-filter-remove').click(function() {
		// 		$(this).parent().remove();
		// 	});
		// }

		// function filterTabs() {
		// 	$('.js-tab-el').click(function() {
		// 		$(this).siblings().removeClass('is-active');
		// 		$(this).addClass('is-active');
		// 	});
		// }

		// function selectRow() {
		// 	$('.js-select-row').click(function(evt) {
		// 		evt.stopPropagation();
		// 	});

		// 	$('.js-select-row').on('click', 'input[type="checkbox"]', function() {
		// 		var row = $(this).parents('tr'),
		// 			index = $(this).parents('tr').index();

		// 		$(this).parents('.js-scrollbar').siblings('.js-sidedrop').find('tr').eq(index).toggleClass('is-selected');
		// 		row.toggleClass('is-selected');
		// 	});
		// }

		// function selectAllRows() {
		// 	$('.label-checkbox').on('change', 'input[type="checkbox"]', function() {
		// 		if ($(this).prop('checked')) {
		// 			$(this).parents('.js-tablewrap').find('.js-scrollbar tr')
		// 										    .addClass('is-selected')
		// 											.find('input[type="checkbox"]').prop('checked', true);
		// 			$(this).parents('.js-tablewrap').find('.js-sidedrop tr').addClass('is-selected');
		// 		} else {
		// 			$(this).parents('.js-tablewrap').find('.js-scrollbar tr')
		// 										    .removeClass('is-selected')
		// 											.find('input[type="checkbox"]').prop('checked', false);
		// 			$(this).parents('.js-tablewrap').find('.js-sidedrop tr').removeClass('is-selected');
		// 		}
		// 	});
		// }

		// function toggleSearchTable() {
		// 	$('.js-search-table').click(function(evt) {
		// 		evt.stopPropagation();
		// 		$(this).addClass('search-opened');
		// 	});

		// 	$('body').click(function() {
		// 		if (!$('.js-search-table input').val()) {
		// 			$('.js-search-table').removeClass('search-opened');
		// 		}
		// 	});
		// }

		// function addFakeHeader() {
		// 	parentWrap.each(function() {
		// 		var fakeHeadTable = $(this).find('.js-fake-head .table');

		// 		$(this).find('.js-clone-head').clone(true).removeClass('js-clone-head').appendTo(fakeHeadTable);
		// 	});
		// }

		// function tableHeadFixed() {
		// 	scrollPos = win.scrollTop();
		// 	if ($('.js-filters').length && $('.js-clone-head').length) {
		// 		var fakeHeader = $('.js-fake-head'),
		// 			filters = $('.js-filters'),
		// 			filtersTop = $('.js-tablewrap').offset().top,
		// 			filtersHeight = filters.outerHeight(),
		// 			cloneHead  = $('.js-clone-head').offset().top;

		// 		if (scrollPos > filtersTop)	{
		// 			filters.addClass('is-fixed');
		// 			fakeHeader.addClass('is-fixed').css('top', filtersHeight);
		// 		} else if ( scrollPos <= cloneHead ) {
		// 			filters.removeClass('is-fixed');
		// 			fakeHeader.removeClass('is-fixed').css('top', '0');
		// 		}
		// 	}
		// }

		// summon them on load!


		//addScrollButtons();
		//tableHeadFixed();
		//addFakeHeader();
		//toggleDesignElem();
		//perfectScroll();
		//measureMoreblock();
		//measureSidedropHeight();
		//columnsToggle();
		//toggleSidebar();
		//showActivityInSidebar();
		//chooseSidebarOption();
		//toggleSidebarContent();
		//sidebarFilter();
		//filterTabs();
		//selectRow();
		//selectAllRows();
		//toggleSearchTable();

		// $(window).resize(function() {
		// 	scrollTable.perfectScrollbar('update');
		// 	toggleDesignElem();
		// 	measureMoreblock();
		// 	measureSidedropHeight();
		// });

		// $(window).scroll(function() {
		// 	tableHeadFixed();
		// });

	//})();

});
