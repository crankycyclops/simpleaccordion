/**
 * Author: James Colannino
 * Email: crankycyclops@gmail.com
 *
 * Simple jQuery Accordion that doesn't reply on the extremely heavy jQuery UI
 * library.
 *
 * Based on code from: http://uniondesign.ca/simple-accordion-without-jquery-ui/
 * 
 * This is free and unencumbered software released into the
 * public domain. See LICENSE for more details.
 */
$.fn.SimpleAccordion = function(options) {

	var that = this;

	// Call this manually if you add items to the accordion after the accordion
	// has been instantiated. If you call this manually, DO NOT pass in an
	// argument. This should only be called with an argument from inside the
	// plugin's constructor. I know, it's a little hacky...
	this.init = function (firstTime) {

		// initialize accordion
		this.find('.accordion-item').data('active', false);

		if (undefined != firstTime) {

			// open the default item (if any)
			this.find('.accordion-item.default').find('.accordion-content').slideToggle('fast');
			this.find('.accordion-item.default').addClass('active');

			// if we have any default items that are active by default, we should call their callbacks
			if (this.find('.accordion-item.default').length > 0) {
				$.each(this.find('.accordion-item.default'), function (i, item) {
					if (undefined != options && 'function' == typeof options.callback) {
						options.callback($(item).get(0), true);
					}
				});
			}
		}

		// Remove any previously bound click handlers.
		this.find('.accordion-toggle').unbind('click');

		this.find('.accordion-toggle').click(function() {

			//Expand or collapse this panel.
			$(this).next().slideToggle('fast');
			if ($(this).parent().hasClass('active')) {
				$(this).parent().removeClass('active');
			} else {
				$(this).parent().addClass('active');
			}

			//Hide the other panels
			that.find('.accordion-content').not($(this).next()).slideUp('fast');
			that.find('.accordion-content').not($(this).next()).parent().removeClass('active');

			// call callback (if one was specified)
			if (undefined != options && 'function' == typeof options.callback) {
				options.callback($(this).parent().get(0), $(this).parent().hasClass('active'));
			}
		});
	}

	this.init(true);
	return this;
}
