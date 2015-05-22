/**
 * Simple jQuery Accordion that doesn't reply on the extremely heavy jQuery UI
 * library.
 *
 * Based on code from: http://uniondesign.ca/simple-accordion-without-jquery-ui/
 */
$.fn.SimpleAccordion = function(options) {

	// initialize accordion
	this.find('.accordion-item').data('active', false);

	// open the default item (if any)
	this.find('.accordion-item.default').find('.accordion-content').slideToggle('fast');
	this.find('.accordion-item.default').data('active', true);

	// if we have any default items that are active by default, we should call their callbacks
	if (this.find('.accordion-item.default').length > 0) {
		$.each(this.find('.accordion-item.default'), function (i, item) {
			options.callback($(item).get(0), true);
		});
	}

	this.find('.accordion-toggle').click(function() {

		//Expand or collapse this panel
		$(this).next().slideToggle('fast');
		$(this).parent().data('active', $(this).parent().data('active') ? false : true);

		//Hide the other panels
		$('.accordion-content').not($(this).next()).slideUp('fast');
		$('.accordion-content').not($(this).next()).parent().data('active', false);

		// call callback (if one was specified)
		if ('function' == typeof options.callback) {
			options.callback($(this).parent().get(0), $(this).parent().data('active'));
		}
	});
}
