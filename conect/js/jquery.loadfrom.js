/*
 * Attach a
 *  data-loadfrom="path-to/asset.html"
 * to any div to load content dynamically
 * This is useful for repetative static content linke footers and contact forms.
 */



(function($) {

    $.fn.loadfrom = function(options) {

        // Extend our default options with those provided.
        // Note that the first argument to extend is an empty
        // object – this is to keep from overriding our "defaults" object.
        var opts = $.extend( {}, $.fn.loadfrom.defaults, options );


        return this.each(function() {
            $("div[data-loadfrom]").each(function() {

                var element = $(this);
                element.load(opts.prefixURL + element.data('loadfrom'));
            });
        });

    };

    // Plugin defaults – added as a property on our plugin function.
    $.fn.loadfrom.defaults = {
        prefixURL: ""
    };

}(jQuery));

