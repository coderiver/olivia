$(document).ready(function() {
	// animate back to top
	$('.js-top').click(function(e) {
		e.preventDefault();
		$( 'html, body' ).animate({
			scrollTop: 0
		}, 'slow');
	});

	// tooltips
	$('.js-tooltip').tooltipster({
		position: 'right',
		maxWidth: 290
	});

	$('.js-tooltip-guide').tooltipster({
		maxWidth: 290,
		position: 'right',
		interactive: true,
		contentAsHTML: true,
		trigger: 'custom',
		functionReady: function(origin, tooltip) {
			origin.tooltipster('option', 'position', origin.data('tooltip-position'));

			tooltip.find('a').on('click', function(evt) {
				evt.preventDefault();
				origin.tooltipster('hide').removeClass('is-visible');
			});
		}
	});

	$('.js-tooltip-guide').tooltipster('show');
	$('.js-tooltip-guide').click(function(evt) {
		evt.preventDefault();
	});

	// comments
	$('.js-comment').on('click', function(evt) {
		evt.preventDefault();
		var newComment,
			commentParent = $(this).parent();

		if ( commentParent.children('.newpost').length === 0 ) {
			newComment = document.createElement('div');
			newComment.innerHTML = '<label><input type="text" placeholder="Type your comment/question"></label><div class="btn-group"><button class="btn btn-no s-pad" type="button">Cancel</button><button class="btn btn-ok s-pad" type="submit">Comment</button></div>';
			newComment.classList.add('newpost');
			commentParent.append(newComment);
		}
	});

	// dropit
	$('.js-dropit').click(function(e) {
		e.preventDefault();
		$('.js-to-drop').removeClass('is-visible');
		$(this).parent().find('.js-to-drop').toggleClass('is-visible');
	});

	// close dropdown on body click
	$('body').click(function(e) {
		if ( $(e.target).parents('.js-wrap').length > 0 || $(e.target).parents('.js-dropdown-wrap').length > 0) {
			e.stopPropagation();
		} else {
			$('.js-to-drop').removeClass('is-visible');
			$('.js-dropdown').removeClass('is-active');
		}
	});

	// textarea autoresize
	$(document).on('input.textarea', '.js-expand', function() {
		var minRows = this.getAttribute('data-min-rows') | 0,
			rows	= this.value.split('\n').length;

		this.rows = rows < minRows ? minRows : rows;
	});

	// bar
	$('.js-bar').addClass('is-active');

	// slide up info block
	$('.js-slide-up').click(function(e) {
		e.preventDefault();
		$(this).parents('.js-slide-parent').slideUp();
	});

	// actions on deal settings
	$('.js-action input').change(function() {
		$('.js-action').removeClass('is-active');
		$(this).parents('.js-action').addClass('is-active');
	});

	$('.js-action').click(function() {
		if (!$(this).hasClass('is-disabled')) {
			$(this).siblings().removeClass('is-active');
			$(this).siblings().find('input').prop('checked', false);
			$(this).find('input').prop('checked', true);
			$(this).addClass('is-active');
		}
	});

	// dropdown
	$('.js-dropdown').click(function(e) {
		e.stopPropagation();

		if ( $(e.target).parents('.js-inner').length === 0 ) {
			$(this).toggleClass('is-active');
		}

		$(this).parents('tr').siblings().find('.js-dropdown').removeClass('is-active');
	});

	// fixed header
	function scrollFixedElements() {
		var scrLeft = $(this).scrollLeft();
		$('.js-fixed').css({
			left: -scrLeft
		});
	}
	scrollFixedElements();

	function removeHeaderBg() {
		var win = $(window),
			headerFixed = $('.js-fixed');
			headerEl  = headerFixed.find('.js-hide');

		if ( win.scrollTop() === 0 ) {
			headerFixed.removeClass('is-active');
			headerEl.show();
		} else if ( win.scrollTop() > 0 ) {
			headerFixed.addClass('is-active');
			headerEl.hide();
		}
	}

	removeHeaderBg();

	$(window).scroll(function() {
		scrollFixedElements();
		removeHeaderBg();
	});

});