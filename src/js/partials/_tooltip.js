function initTooltip(elem) {
	var elem = $(elem);

	if ( elem.is($('.js-tooltip')) ) {
		elem.tooltipster({
			position: 'right',
			maxWidth: 290
		});
	} else if (elem.is($('.js-tooltip-hover'))) {
		elem.tooltipster({
			maxWidth: 250,
			interactive: true,
			contentAsHTML: true,
			position: 'bottom',
			functionReady: function(origin, tooltip) {
				tooltip.find('a').on('click', function(evt) {
					evt.preventDefault();
					origin.tooltipster('hide').removeClass('is-visible');
				});
			}
		});
	} else {
		// TO FIX POSITION ON LOAD
		elem.tooltipster({
			maxWidth: 290,
			interactive: true,
			contentAsHTML: true,
			trigger: 'click',
			functionReady: function(origin, tooltip) {
				origin.tooltipster('option', 'position', origin.data('tooltip-position'));
				tooltip.find('a').on('click', function(evt) {
					evt.preventDefault();
					origin.tooltipster('hide').removeClass('is-visible');
				});
			}
		});

		elem.click(function(evt) {
			evt.preventDefault();
		});

		elem.tooltipster('show');
	}
}

initTooltip('.js-tooltip');
initTooltip('.js-tooltip-guide');
initTooltip('.js-tooltip-hover');