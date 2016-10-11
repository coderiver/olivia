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

