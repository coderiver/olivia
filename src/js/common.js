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

});