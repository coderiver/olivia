
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