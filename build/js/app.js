// df=include lib/jquery.js
// df=include lib/tooltipster.min.js
// df=include lib/perfect-scrollbar.jquery.min.js
// df=include lib/sticky-sidebar.min.js

$(document).ready(function() {





	// partials

	function initTooltip(elem) {

		var elem = $(elem);

	

		if ( elem.is($('.js-tooltip')) ) {

			elem.tooltipster({

				position: 'right',

				maxWidth: 290

			});

		} else if (elem.is($('.js-tooltip-hover'))) {

			elem.tooltipster({

				maxWidth: 250,

				interactive: true,

				contentAsHTML: true,

				position: 'bottom',

				// trigger: 'click',

				functionReady: function(origin, tooltip) {

					tooltip.find('a').on('click', function(evt) {

						evt.preventDefault();

						origin.tooltipster('hide').removeClass('is-visible');

					});

				}

			});

		} else {

			// TO FIX POSITION ON LOAD

			elem.tooltipster({

				maxWidth: 290,

				interactive: true,

				contentAsHTML: true,

				trigger: 'click',

				functionReady: function(origin, tooltip) {

					origin.tooltipster('option', 'position', origin.data('tooltip-position'));

					tooltip.find('a').on('click', function(evt) {

						evt.preventDefault();

						origin.tooltipster('hide').removeClass('is-visible');

					});

				}

			});

	

			elem.click(function(evt) {

				evt.preventDefault();

			});

	

			elem.tooltipster('show');

		}

	}

	

	initTooltip('.js-tooltip');

	initTooltip('.js-tooltip-guide');

	initTooltip('.js-tooltip-hover');

	

	// textarea autoresize

	$(document).on('input.textarea', '.js-expand', function() {

			var minRows = this.getAttribute('data-min-rows') | 0,

				rows	= this.value.split('\n').length;

	

			this.rows = rows < minRows ? minRows : rows;

		});

	

	// expand area

	$('.js-expand-area').on({

		'focus': function() {

			$(this).addClass('is-expanded');

		},

		'blur': function() {

			$(this).removeClass('is-expanded');

		}

	});

	// dropdown

	$('body').on('click', '.js-dropdown', function(evt) {

		// inner dropdown list clickable

		if ($(evt.target).closest('.js-inner').length > 0 ) {

			return;

		} else if ($(evt.target).parent('.is-disabled').length > 0) {

			evt.preventDefault();

		}

	

		// hide one dropdown if another is opened in the same table

		if ($(this).parents('tr').length) {

			$(this).parents('tr').siblings().find('.js-dropdown').removeClass('is-active');

		}

	

		// unclickable when disabled

		if ($(this).hasClass('is-disabled')) {

			return;

		}

	

		$(this).toggleClass('is-active');

	

		// hide one dropdown if another is opened, and they both have common parent

		$(this).siblings('.js-dropdown').removeClass('is-active');

	});

	

	// change dropdown options

	// function changeDropdownOpt(el) {

	// 	el.on('click', '.js-inner a', function(evt) {

	// 		evt.preventDefault();

	// 		var text = $(this).html();

	

	// 		$(this).parents('.js-dropdown').removeClass('is-active').find('.dropdown__item').text(text);

	// 	});

	// }

	

	// changeDropdownOpt($('.js-dropdown.is-form'));

	// changeDropdownOpt($('.js-dropdown.js-todrop'));

	

	// hide dropdown on body click

	$('body').on('click', function(evt) {

		if ( !$(evt.target).parents('.js-dropdown').length ) {

			$('.js-dropdown').removeClass('is-active is-top');

		}

	});

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

	// actions on deal status

	function chooseAction() {

		var actionBl = $('.js-action:not(".is-disabled")'),

			 actionSiblings;

	

		actionBl.click(function() {

			actionSiblings = $(this).siblings();

	

			actionSiblings

				.removeClass('is-active')

				.find('input')

				.removeClass('is-checked');

	

			$(this).addClass('is-active');

			$(this).find('input').addClass('is-checked');

		});

	}

	

	chooseAction();

	function scrollFixedElements() {

		var scrLeft = $(this).scrollLeft(),

		fixed 	= $('.js-fixed'),

		sidebar = $('.js-sidebar');

	

		if ( fixed.parents('.js-tablewrap').length > 0 && !fixed.parents().hasClass('is-fixed')) {

			if ( fixed.hasClass('js-sidebar') ) {

				sidebar.css('left', 'auto');

			} else {

				fixed.css('left', '0');

			}

		} else {

			if (fixed.hasClass('js-sidebar')) {

				sidebar.css('left', -scrLeft + 21);

			} else {

				fixed.css('left', -scrLeft);

			}

		}

	};

	

	

	

	

	

	scrollFixedElements();

	var winStart = 0;

	let scrollProps = {

		prevScrollDirection: 0,

		prevCurrTop: 0

	};

	

	

	

	

	

	

	$(window).scroll(function() {

		var currTop = $(window).scrollTop();

	

		if(currTop > scrollProps.prevCurrTop ){

			scrollProps.prevScrollDirection = 'toBottom'

		}else{

			scrollProps.prevScrollDirection = 'toTop'

		};

		scrollProps.prevCurrTop = currTop;

		if (winStart == currTop) {

			scrollFixedElements();

		}

	

		winStart = currTop;

	});

	

	

	

	

	

	

	

	// var oliviaEntryFactory = function() {

	// 	var oliviaEntry = {

	// 		entrySidebar: null,

	// 		initSidebar: function(){

	// 			entrySidebar = new StickySidebar('.js-entry-sidebar', {

	// 				containerSelector: '.js-entry-two-col',

	// 				innerWrapperSelector: '.js-entry-sidebar-inner',

	// 				topSpacing: $('.js-entry-content').offset().top,

	// 				bottomSpacing: 20

	// 			});

	// 		},

	// 		destroySidebar: function(){

	// 			entrySidebar.destroy();

	// 		}

	// 	}

	// 	return oliviaEntry;

	// };

	

	// window.oliviaEntryFactory = oliviaEntryFactory;

	

	

	// function hideFormHeaderTab() {

	// 	var headerFixed = $('.header.js-fixed'),

	// 		headerEl  = headerFixed.find('.js-hide');

	

	// 	if ( $(window).scrollTop() === 0 ) {

	// 		headerEl.show();

	// 	} else if ( $(window).scrollTop() > 0 ) {

	// 		headerEl.hide();

	// 	}

	//

	

	// hideFormHeaderTab();

	

	// $(window).scroll(function() {

	// 	hideFormHeaderTab();

	// })

	$('.js-accordion-btn').on('click', function() {

	    var $this = $(this),

	    	parent = $this.closest('.js-accordion'),

	    	content = $this.parent().next();

	    

	    if (parent.hasClass('is-active')) {

	        parent.removeClass('is-active');

	        content.slideUp(350);

	    } else {

	        parent.find('js-accordion').removeClass('is-active');

	        parent.find('js-accordion').slideUp(350);

	        parent.toggleClass('is-active'); 

	        content.slideToggle(350);

	    }

	});

	function initEntryOneScreen(){

		let windowH = $(window).height();

		let content = $('.js-entry-content');

		let sidebar = $('.js-entry-sidebar');

	

		function setHeight(el){

			let $el = $(el);

			if(!$el[0]) return;

			let elPosTop = $el.offset().top;

			let elHeight = windowH - elPosTop;

			$el.css('height', `${elHeight}px`)

		};

		

		setHeight(content);

		setHeight(sidebar);

	

		$(window).on('resize', function() {

			windowH = $(window).height();

	

			setHeight(content);

			setHeight(sidebar);

	

		})

	};

	initEntryOneScreen();

	

	$('.js-perfect_scroll-scroll-to').on('click', function(e){

		e.preventDefault();

		let $this = $(this);

		let targetStr = $this.attr('data-target');

		let target = $(`[data-target-elem="${targetStr}"]`);

		let perfectContainer = target.parents('.js-vert-scroll');

	

		perfectContainer.animate({

			scrollTop: target.position().top

		}, '400');

	

	});

	var oliviaEntryFactory = function() {

	    var oliviaEntry = {

	        entryStickySidebar: null,

	        fieldsCount: 0,

	        fieldsFilledCount: 0,

	        isInitiated: false,

	        initSidebar: function() {

	            if (!this.isInitiated) {

	                this.initSidebarCounter();

	                this.isInitiated = true;

	            }

	        },

	        isRadioButtonField: function(field) {

	            return field.is(':radio');

	        },

	        isCheckboxField: function(field) {

	            return field.is(':checkbox');

	        },

	        checkboxFieldHasValue: function(checkboxSelector, fieldContainer) {

	            return $(checkboxSelector, fieldContainer).is(':checked');

	        },

	        radioButtonFieldHasValue: function(radioSelector, fieldContainer) {

	            return $(radioSelector, fieldContainer).is(':checked');

	        },

	        textareaFieldHasValue: function(textareaSelector, fieldContainer) {

	            return $(textareaSelector, fieldContainer).val() != '';

	        },

	        textInputFieldHasValue: function(textSelector, fieldContainer) {

	            return $(textSelector, fieldContainer).val() != '';

	        },

	        isFieldFilled: function(fieldContainer) {

	            // check if field is filled.

	            // filled field highlighted with gray background.

	            return fieldContainer.hasClass('field-is-filled');

	        },

	        isDisplayOnlyField: function(fieldContainer) {

	            return fieldContainer.hasClass('display-only-field');

	        },

	        isFieldExistInContainer: function(fieldSelector, fieldContainer) {

	            // field exist in form_bl container

	            return $(fieldSelector, fieldContainer).length != 0

	        },

	        markFieldAsFilled: function(fieldContainer) {

	            // add gray background to field container

	            fieldContainer.addClass('field-is-filled');

	            return true

	        },

	        markFieldAsUnFilled: function(fieldContainer) {

	            // remove gray background from field container

	            fieldContainer.removeClass('field-is-filled');

	            return true

	        },

	        getFilledFieldsCount: function() {

	            // get count of filled fields

	            return parseInt($('.filled-count').data('filledCount'));

	        },

	        getAllFieldsCount: function() {

	            // get count of all fields

	            return parseInt($('.all-fields-count').data('allFieldsCount'));

	        },

	        incrementFilledCounter: function() {

	            // increment counter when field was filled

	            var filledCount = this.getFilledFieldsCount();

	            var allFieldsCount = this.getAllFieldsCount();

	            this.updateSidebarTitleCount(filledCount + 1, allFieldsCount);

	            return true

	        },

	        decrementFilledCounter: function() {

	            // decrement counter when field was unfilled

	            var filledCount = this.getFilledFieldsCount();

	            var allFieldsCount = this.getAllFieldsCount();

	            this.updateSidebarTitleCount(filledCount - 1, allFieldsCount);

	            return true

	        },

	        updateFieldOnChange: function(fieldContainer, fieldSelector) {

	            var oliviaEntryObj = this

	

	            $(fieldSelector, fieldContainer).change(function() {

	                var field = $(this),

	                    value = field.val();

	

	                // check if checkbox field does not have checked values

	                if (oliviaEntryObj.isCheckboxField(field) && !oliviaEntryObj.checkboxFieldHasValue(fieldSelector, fieldContainer) && oliviaEntryObj.isFieldFilled(fieldContainer)) {

	                    oliviaEntryObj.markFieldAsUnFilled($(this).parents('.form__bl'));

	                    oliviaEntryObj.decrementFilledCounter();

	                    return

	                };

	

	                if (value == '') {

	                    oliviaEntryObj.markFieldAsUnFilled($(this).parents('.form__bl'));

	                    oliviaEntryObj.decrementFilledCounter();

	                    return

	                };

	

	                // do not increment counter if "onchange" event has been triggered but field already filled

	                if (value != '' && !oliviaEntryObj.isFieldFilled(fieldContainer)) {

	                    oliviaEntryObj.markFieldAsFilled($(this).parents('.form__bl'));

	                    oliviaEntryObj.incrementFilledCounter();

	                    return

	                };

	            });

	        },

	        updateSidebarTitleCount: function(fieldsFilledCount, fieldsCount) {

	            // update counters in sidebar title on filled/unfilled events

	

	            var sidebarTitle = $('.form__steps'),

	                // prepare sidebar counters

	                countTitle = '<span class="form__steps">(<span class="filled-count">' + fieldsFilledCount + '</span>/<span class="all-fields-count">' + fieldsCount + '</span>)</span>';

	

	            // write sidebar title with updated fields counters

	            sidebarTitle.replaceWith(countTitle);

	            // set data attribute to filled counter element

	            $('.filled-count').data('filledCount', fieldsFilledCount);

	            // set data attribute to all fields counter element

	            $('.all-fields-count').data('allFieldsCount', fieldsCount);

	        },

	        initSidebarCounter: function() {

	            var oliviaEntryObj = this,

	                checkboxSelector = 'input[type="checkbox"]',

	                radioSelector = 'input[type="radio"]',

	                textSelector = 'input[type="text"]',

	                textareaSelector = 'textarea';

	

	            $('.js-entry-sidebar .form__bl').each(function() {

	                var $fieldContainer = $(this),

	                    label = $('.form__subttl', $fieldContainer),

	                    fieldNumber = $('.field-number', $fieldContainer);

	

	                // skip display only fields

	                if (oliviaEntryObj.isDisplayOnlyField($fieldContainer)) {

	                    return;

	                }

	

	                oliviaEntryObj.fieldsCount++;

	

	                // update field label text

	                if (!fieldNumber.length) {

	                    label.prepend('<span class="field-number"></span>');

	                    fieldNumberText = oliviaEntryObj.fieldsCount + '. '

	                    $('.field-number', $fieldContainer).text(fieldNumberText)

	                };

	

	                // check if the field is checkbox

	                if (oliviaEntryObj.isFieldExistInContainer(checkboxSelector, $fieldContainer)) {

	                    // check if checkbox has value. if true we mark container as filled

	                    if (oliviaEntryObj.checkboxFieldHasValue(checkboxSelector, $fieldContainer)) {

	                        oliviaEntryObj.fieldsFilledCount++;

	                        oliviaEntryObj.markFieldAsFilled($fieldContainer);

	                    }

	                    // subscribe on checkbox value changes

	                    oliviaEntryObj.updateFieldOnChange($fieldContainer, checkboxSelector);

	                    return;

	                }

	

	                // check if the field is radio button

	                if (oliviaEntryObj.isFieldExistInContainer(radioSelector, $fieldContainer)) {

	                    // check if radio button has value. if true we mark container as filled

	                    if (oliviaEntryObj.radioButtonFieldHasValue(radioSelector, $fieldContainer)) {

	                        oliviaEntryObj.fieldsFilledCount++;

	                        oliviaEntryObj.markFieldAsFilled($fieldContainer);

	                    }

	                    // subscribe on radio button value changes

	                    oliviaEntryObj.updateFieldOnChange($fieldContainer, radioSelector);

	                    return;

	                }

	

	                // check if the field is textarea

	                if (oliviaEntryObj.isFieldExistInContainer(textareaSelector, $fieldContainer)) {

	                    // check if textarea has value. if true we mark container as filled

	                    if (oliviaEntryObj.textareaFieldHasValue(textareaSelector, $fieldContainer)) {

	                        oliviaEntryObj.fieldsFilledCount++;

	                        oliviaEntryObj.markFieldAsFilled($fieldContainer);

	                    }

	                    // subscribe on textarea value changes

	                    oliviaEntryObj.updateFieldOnChange($fieldContainer, textareaSelector);

	                    return;

	                }

	

	                // check if the field is text input

	                if (oliviaEntryObj.isFieldExistInContainer(textSelector, $fieldContainer)) {

	                    // check if text input has value. if true we mark container as filled

	                    if (oliviaEntryObj.textInputFieldHasValue(textSelector, $fieldContainer)) {

	                        oliviaEntryObj.fieldsFilledCount++;

	                        oliviaEntryObj.markFieldAsFilled($fieldContainer);

	                    }

	                    // subscribe on text input value changes

	                    oliviaEntryObj.updateFieldOnChange($fieldContainer, textSelector);

	                    return;

	                }

	

	            });

	            oliviaEntryObj.updateSidebarTitleCount(oliviaEntryObj.fieldsFilledCount, oliviaEntryObj.fieldsCount);

	        },

	    }

	    return oliviaEntry;

	};

	

	window.oliviaEntryFactory = oliviaEntryFactory;

	

	$('.js-vert-scroll').perfectScrollbar();   

	$('.js-popup-inner').perfectScrollbar();   

	$('.js-bar').addClass('is-active');



	// animate back to top

	$('.js-top').click(function(evt) {

		evt.preventDefault();

		$( 'html, body' ).animate({

			scrollTop: 0

		}, 'slow');

	});



	$('.js-slide-up').click(function(evt) {

		evt.preventDefault();

		$(this).parents('.js-slide-parent').slideUp();

	});





	$('.js-td-open').on('click', function(){

		var td = $(this).closest('.is-table-in'),

			tr = td.closest('tr');



		td.toggleClass('is-open');

		tr.toggleClass('is-vertical');

	});



































});


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

					// var sideInH = sidebar.height();
					// var tempH = sideInH - allSideTitleH - 1;

					// console.log(`sideInH ${sideInH}`);
					// console.log(`tempH ${tempH}`);


					if (!closestBl.hasClass('js-disabled')) {
						// remove active class from siblings
						closestBl.siblings().removeClass('is-active').css(closed);

						// add active class to current
						closestBl.toggleClass('is-active');

						// calc height of current
						if (closestBl.hasClass('is-active')) {
							closestBl.css({'height': 'calc(100% - ' + allSideTitleH + 'px)'});

							// closestBl.css({'height': '' + tempH + 'px'});

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
$(document).ready(function() {
// comments
(function() {
	function commentBl(element) {
		var input = $(element).find('input'),
			commentBtn = $(element).find('.btn[type="submit"]'),
			cancelBtn = $(element).find('.btn[type="button"]'),
			btnGroup = $(element).find('.btn-group');

		input.on( 'keyup', function() {
			if ( input.val().length > 0 ) {
				commentBtn.removeAttr('disabled');
			} else if (input.val().length === 0 ) {
				commentBtn.prop('disabled', true);
			}
		}).on('focus', function() {
			btnGroup.addClass('is-visible');
		});

		cancelBtn.on('click', function() {
			input.val('');
			commentBtn.prop('disabled', true);
		});
	}

	$('.js-newpost').each(function(index, element) {
		commentBl(element);
	});

	$('.js-comment').on('click', function(evt) {
		console.log('bla');
		evt.preventDefault();
		var commentParent = $(this).parent(),
			wrapper,
			inner;

		if ( commentParent.children('.js-newpost').length === 0 ) {
			wrapper = $('<div />', {'class': 'newpost js-newpost'}).appendTo(commentParent);
			inner = $(
				'<div class="newpost__in">'
					+ '<div class="form__el"><label><input type="text" placeholder="Type your comment/question"></label></div>'
					+ '<div class="btn-group is-visible">'
						+ '<button class="btn btn-no m-pad" type="button">Cancel</button>'
						+ '<button class="btn btn-ok m-pad" type="submit" disabled>Comment</button>'
					+ '</div>'
				+ '</div>').appendTo(wrapper);
			commentParent.children('.js-newpost').find('input').focus();
			commentBl(wrapper);
		}
	});

	// mark problem as resolved
	$('.js-resolved').click(function(evt) {
		evt.preventDefault();
		$(this).closest('.js-newpost').remove();
	});
}());

});
$(document).ready(function() {

	// popups
	var openedPopup = null;

	$.showPopup = function(popup) {
		if ( openedPopup ) {
			$.hidePopup(openedPopup);
		}
		popup.addClass('is-active');
		openedPopup = popup;
		if ( $('.overlay').not('is-active') ) {
			$('.overlay').addClass('is-active');
		}
		if ( !popup.hasClass('js-avoid-overflow') ) {
			$('body').addClass('is-overflow');
		}
		if ( popup.find('.js-tooltip').length > 0 || popup.hasClass('js-tooltip-popup') ) {
			$('.overlay').addClass('low-index');
		}
		if ( $('.js-search-results').hasClass('is-active') ) {
			$('.js-search-results').removeClass('is-active');
		}
	};

	$.hidePopup = function(popup) {
		popup.removeClass('is-active');
		openedPopup = null;
		$('.overlay').removeClass('is-active low-index');
		$('body').removeClass('is-overflow');
	};

	$('[data-popup]').each(function(index, el) {
		var $el = $(el);
		var $popup = $('#' + $el.data('popup'));
		if (!$popup.parents('.overlay').length && !$popup.hasClass('js-avoid-overflow')) {
			$popup.appendTo('.overlay');
		}
		$el.on('click', function(evt) {
			evt.preventDefault();
			evt.stopPropagation();
			$.showPopup($popup);
		});
	});

	// close popup
	$('.js-close').on('click touchend', function(evt) {
		var popup;
		evt.preventDefault();

		popup = $(this).parents('.js-popup');
		$.hidePopup(popup);
		$(this).parents('.js-bar').removeClass('is-active');
	});

	// close popup on body click
	// $('.overlay').on('click touchend', function(evt) {
	// 	var popup;
	// 	popup = $('.js-popup');

	// 	if (popup.hasClass('is-active') && !$(evt.target).parents('.js-popup').length > 0) {
	// 		$.hidePopup(popup);
	// 	}
	// });

	// popup scroll
	function popupScrollBar() {
		var popupScrollBl = $('.js-popup-scroll'),

			buttons = $('.js-popup-btn'),
			buttonsHeight = 0;

		popupScrollBl.each(function() {
			var that = $(this),
				list = that.find('.js-popup-list'),
				input = that.find('.js-popup-search'),
				checkbox = that.find('input[type="checkbox"]');

			that.perfectScrollbar();

			if ( list.hasClass('is-hidden') ) {
				that.css('height', 'auto');
			}

			input.on('keydown', function() {
				if ( list.hasClass('is-hidden') && input.val() ) {
					list.removeClass('is-hidden');
				}

				that.css('height', '435px').perfectScrollbar('update');
			});

			checkbox.on('change', function() {
				if ( checkbox.is(':checked') ) {
					buttons.removeClass('is-hidden');
					if ( buttonsHeight === 0 ) {
						buttonsHeight = buttons.outerHeight();
					}
					that.css('margin-bottom', buttonsHeight + 'px').perfectScrollbar('update');
				} else {
					buttons.addClass('is-hidden');
					that.css('margin-bottom', '0').perfectScrollbar('update');
				}
			});
		});

	}

	popupScrollBar();

	// news popups
	function showNews() {
		var newsTarget = $('.js-news-target'),
			newsContent = $('.js-news-content'),
			newsRemove = $('.js-news-remove');

		newsTarget.click(function(){
			$(this).parent().find(newsContent).slideToggle('fast');
		});

	}

	showNews();

	// commission payment popup
	function showCurrency() {
		var username = $('.js-username'),
				currency = $('.js-deal-currency');

		username.click(function(e) {
			e.preventDefault();
			if (!$(this).hasClass('is-active')) {
				username.removeClass('is-active');
				$(this).addClass('is-active');
			}
			currency.show();
		});
	}

	showCurrency();

});