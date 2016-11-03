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