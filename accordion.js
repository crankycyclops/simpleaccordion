/**
 * Simple jQuery Accordion that doesn't reply on the extremely heavy jQuery UI
 * library.
 *
 * Based on code from: http://uniondesign.ca/simple-accordion-without-jquery-ui/
 */
$.fn.SimpleAccordion = function(options) {

	// open the default item (if any)
	this.find('.accordion-item.default').find('.accordion-content').slideToggle('fast');

	this.find('.accordion-toggle').click(function() {

		//Expand or collapse this panel
		$(this).next().slideToggle('fast');

		//Hide the other panels
		$('.accordion-content').not($(this).next()).slideUp('fast');

		// call callback (if one was specified)
		if ('function' == typeof options.callback) {
			options.callback($(this).parent().get(0));
		}
	});
}
