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
		if(!$('.js-entry-content')[0]) return;
		let windowH = $(window).height();
		let content = $('.js-entry-content');
		let sidebar = $('.js-entry-sidebar');
	
	
		function setHeight(el){
			let $el = $(el);
			let elPosTop = $el.offset().top;
			let elHeight = windowH - elPosTop;
			$el.css('height', `${elHeight}px`)
		};
		
		setHeight(content);
		setHeight(sidebar);
	
	};
	initEntryOneScreen();
	
	$('.js-perfect_scroll-scroll-to').on('click', function(e){
		e.preventDefault();
		let $this = $(this);
		let targetStr = $this.attr('data-target');
		let target = $(`[data-target-elem="${targetStr}"]`);
		let perfectContainer = target.parents('.js-vert-scroll');
	
	console.log(target.position().top);
		perfectContainer.animate({
			scrollTop: target.position().top
		}, '400');
	
	
		// $('.js-top').click(function(evt) {
		// 	evt.preventDefault();
		// 	$( 'html, body' ).animate({
		// 		scrollTop: 0
		// 	}, 'slow');
		// });
	});
	var oliviaEntryFactory = function() {
	        var oliviaEntry = {
	            entryStickySidebar: null,
	            fieldsCount: 0,
	            fieldsFilledCount: 0,
	            isInitiated: false,
	            initSidebar: function() {
	                if (!this.isInitiated){
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
	            isFieldExistInContainer: function(fieldSelector, fieldContainer){
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
	
	                    if (value == ''){
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
	                    countTitle = '<span class="form__steps">(<span class="filled-count">'+fieldsFilledCount+'</span>/<span class="all-fields-count">'+fieldsCount+'</span>)</span>';
	
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
	                    if (!fieldNumber.length){
	                        label.prepend('<span class="field-number"></span>');
	                        fieldNumberText = oliviaEntryObj.fieldsCount + '. '
	                        $('.field-number', $fieldContainer).text(fieldNumberText)
	                    };
	
	                    // check if the field is checkbox
	                    if (oliviaEntryObj.isFieldExistInContainer(checkboxSelector, $fieldContainer)){
	                        // check if checkbox has value. if true we mark container as filled
	                        if (oliviaEntryObj.checkboxFieldHasValue(checkboxSelector, $fieldContainer)){
	                            oliviaEntryObj.fieldsFilledCount++;
	                            oliviaEntryObj.markFieldAsFilled($fieldContainer);
	                        }
	                        // subscribe on checkbox value changes
	                        oliviaEntryObj.updateFieldOnChange($fieldContainer, checkboxSelector);
	                        return;
	                    }
	
	                    // check if the field is radio button
	                    if (oliviaEntryObj.isFieldExistInContainer(radioSelector, $fieldContainer)){
	                        // check if radio button has value. if true we mark container as filled
	                        if (oliviaEntryObj.radioButtonFieldHasValue(radioSelector, $fieldContainer)){
	                            oliviaEntryObj.fieldsFilledCount++;
	                            oliviaEntryObj.markFieldAsFilled($fieldContainer);
	                        }
	                        // subscribe on radio button value changes
	                        oliviaEntryObj.updateFieldOnChange($fieldContainer, radioSelector);
	                        return;
	                    }
	
	                    // check if the field is textarea
	                    if (oliviaEntryObj.isFieldExistInContainer(textareaSelector, $fieldContainer)){
	                        // check if textarea has value. if true we mark container as filled
	                        if (oliviaEntryObj.textareaFieldHasValue(textareaSelector, $fieldContainer)){
	                            oliviaEntryObj.fieldsFilledCount++;
	                            oliviaEntryObj.markFieldAsFilled($fieldContainer);
	                        }
	                        // subscribe on textarea value changes
	                        oliviaEntryObj.updateFieldOnChange($fieldContainer, textareaSelector);
	                        return;
	                    }
	
	                    // check if the field is text input
	                    if (oliviaEntryObj.isFieldExistInContainer(textSelector, $fieldContainer)){
	                        // check if text input has value. if true we mark container as filled
	                        if (oliviaEntryObj.textInputFieldHasValue(textSelector, $fieldContainer)){
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
