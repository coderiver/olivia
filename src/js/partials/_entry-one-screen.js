function initEntryOneScreen(){
	if(!$('.js-entry-content')[0]) return;
let content = $('.js-entry-content');
let sidebar = $('.js-entry-sidebar');
let entryWrapper = $('.js-entry-two-col');
let wrapperPos = entryWrapper.offset().top;
let windowH = $(window).height();
let height = windowH - wrapperPos;
sidebar.css('height', `${height}px`)
content.css('height', `${height}px`)
};
initEntryOneScreen();