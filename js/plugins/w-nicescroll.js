/**
 * # jQuery.plugin - Nicescroll
 * https://github.com/inuyaksa/jquery.nicescroll
 *
 * @dependencies [nicescroll, w-core]
 *
 * with data-api for set:
 * wns-background, wns-cursorcolor, wns-cursorwidth, wns-cursorborder, wns-railalign, wns-cursorborderradius, wns-boxzoom, wns-horizontalenabeld, wns-autohidemode
 */
if ($().niceScroll) {
    if (typeof withOptions.htmlNicescroll != 'undefined' && withOptions.htmlNicescroll) {
        $("html").niceScroll({
            background: $("html").data('wnsBackground') || "#e2e2e2",
            cursoropacitymin: 1,
            cursorcolor: $("html").data('wnsCursorcolor') || "#141414",
            cursoropacitymax: 0.6,
            cursorwidth: $("html").data('wnsCursorwidth') || 5,
            cursorborder: $("html").data('wnsCursorborder') || '0px solid #fff',
            railalign: $("html").data('wnsRailalign') || "right",
            railpadding: {top: 0, right: 0, left: 0, bottom: 0},
            cursorborderradius: $("html").data('wnsCursorborderradius') || "0px",
            boxzoom: $("html").data('wnsBoxzoom') || false,
            horizrailenabled: $("html").data('wnsHorizrailenabled') || false,
            autohidemode: $("html").data('wnsAutohidemode') || false
        });

        // fix horizontal @todo: when?
        $('html').addClass('no-overflow-y');
    }

    $(".withNicescroll, .w-nicescroll").each(function(){
        var breakpoint = true;
        if ($(this).data('wnsBreakpoint') == 'is4md') {
            breakpoint = is4md.matches;
        }

        if (breakpoint) {
            var wns = $(this), wncOptions = {
                background: wns.data('wnsBackground') || "#e2e2e2",
                cursoropacitymin: 1,
                cursorcolor: wns.data('wnsCursorcolor') || "#141414",
                cursoropacitymax: 0.6,
                cursorwidth: wns.data('wnsCursorwidth') || 5,
                cursorborder: wns.data('wnsCursorborder') || '0px solid #fff',
                railalign: wns.data('wnsRailalign') || "right",
                railpadding: {top: 0, right: 0, left: 0, bottom: 0},
                cursorborderradius: wns.data('wnsCursorborderradius') || "0px",
                boxzoom: wns.data('wnsBoxzoom') || false,
                horizrailenabled: wns.data('wnsHorizrailenabled') || false,
                autohidemode: wns.data('wnsAutohidemode') || false
            }

            wns.niceScroll(wncOptions);
        }
    });
} // END - jQuery.nicescroll