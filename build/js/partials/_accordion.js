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