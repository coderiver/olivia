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
};
initEntryOneScreen();