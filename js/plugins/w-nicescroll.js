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