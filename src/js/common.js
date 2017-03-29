$(document).ready(function() {




	// partials
	//=include partials/_tooltip.js
	//=include partials/_textarea.js
	//=include partials/_dropdown.js
	//=include partials/_search.js
	//=include partials/_deal-action.js
	//=include partials/_scroll-fixed-elems.js
	//=include partials/_hide-head-tabs.js

	$('.js-vert-scroll').perfectScrollbar();
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


	// setTimeout(breakFilters, 500);
	
	
	
});
function breakFilters() {
	// break line in filters
	var filterChildren = $('.js-width-line').children();

	if (filterChildren.length) { 
		var transfer = '<div class="filters__row"></div>',
			filterMaxWidth = 550;
			totalWidth = 0;

		filterChildren.each(function(index, elem) {
			totalWidth += parseInt($(this).width());
		}); 

		if (totalWidth >= filterMaxWidth) {
			filterChildren
				.eq(3)
				.after(transfer);

			
			setTimeout(()=> {
				var tablewrap = $('.js-tablewrap');
				var filtersHeight = $('.js-filters').outerHeight();

				tablewrap.css('padding-top', filtersHeight);
			}, 10);
		}
	}
} 
