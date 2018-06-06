
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