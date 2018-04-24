/**
 * START: Layout Go2Top
 * css: .go2top
 * dependencies: bootstrap, font-awesome
 *
 *  <div class="go2top hidden-xs text-center">
 *      <i class="fa fa-chevron-circle-up"></i>
 *      <p class="hidden-sm">Torna su</p>
 *  </div>
 */
var LayoutGo2Top = function () {
    var handle = function () {
        var currentWindowPosition = $(window).scrollTop(); // current vertical position
        if (currentWindowPosition > 300) {
            $(".go2top").show();
        } else {
            $(".go2top").hide();
        }
    };

    return {
        //main function to initiate the module
        init: function () {
            handle(); // call headerFix() when the page was loaded
            if (navigator.userAgent.match(/iPhone|iPad|iPod/i)) {
                $(window).bind("touchend touchcancel touchleave", function (e) {
                    handle();
                });
            } else {
                $(window).scroll(function () {
                    handle();
                });
            }

            $(".go2top").on('click', function (e) {
                e.preventDefault();
                $("html, body").animate({
                    scrollTop: 0
                }, 600);
            });
        }
    };
}();