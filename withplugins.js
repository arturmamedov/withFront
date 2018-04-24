// form/w-buffer_unload.js

// core/w-cookie.js

/* enable/disable console.info messages for debug */
var debug = false;

// core/w-alert.js

// widget/w-loader.js

/* jQuery plugins and other thing that need to be run after the document is load */
$(document).ready(function () {
    $("._the_email_confirm_").attr('value', '');

    // core/w-breackpoints.js

    // style/w-height.js

    // form/w-filter.js

    // form/w-children_age.js

    // form/w-ajaxsave.js

    // form/w-analytics.js

    // form/w-ajaxsend.js

    // bs/w-ajaxsend.js

    // fnc/w-datepicker.js

    // #jQuery.plugin - bootstrap tooltips
    if ($().tooltip) {
        $('[data-toggle=tooltip]').tooltip();
    } // END - #jQuery.tooltip

    // #jQuery.plugin - selectize for list options
    if ($().selectize) {
        $('.selectize').selectize();
    } // END - #jQuery.selectize

    // #jQuery.plugin - bootstrap switch for radio button
    if ($().bootstrapSwitch) {
        $(".bootstrapSwitch").bootstrapSwitch();
    } // END - #jQuery.bootstrapSwitch

    // #jQuery.plugin - Nicescroll
    if ($().niceScroll) {
        $("html").niceScroll({
            touchbehavior:false,
            background:"#e2e2e2",
            cursoropacitymin:1,
            cursorcolor:"#141414",
            cursoropacitymax:0.6,
            cursorwidth:5,
            cursorborder:'0px solid #fff',
            railalign:"right",
            railpadding: {top: 0, right: 0, left: 0, bottom: 0},
            cursorborderradius: "0px",
            boxzoom: true,
            horizrailenabled: false,
            autohidemode: false
        });

        $(".withNicescroll").niceScroll({
            touchbehavior:false,
            background:"#e2e2e2",
            cursoropacitymin:1,
            cursorcolor:"#141414",
            cursoropacitymax:0.6,
            cursorwidth:5,
            cursorborder:'0px solid #fff',
            railalign:"right",
            railpadding: {top: 0, right: 0, left: 0, bottom: 0},
            cursorborderradius: "0px",
            boxzoom: true,
            horizrailenabled: false,
            autohidemode: false
        });

        // fix horizontal
        $('html').addClass('no-overflow-y');
    } // END - jQuery.nicescroll

    // style/w-target.js

    // bs/w-wide_modal.js (asjust height to fit page max-height)

    // widget/w-go2top.js

    // widget/w-appear_btn.js

    // jquery/w-raty.js

    // fnc/w-showhide.js

    // form/w-cookie.js

    // form/w-binder.js

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
     * * * * * * * * * * * * * * * * * * * enable/disable functions  * * * * * * * * * * * * * * *
     * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
    LayoutGo2Top.init(); // go2top button {css: .go2top}

    wAppearBottomButton.init(); // with Appear Bottom Button {css: .wabb}
});
