/**
 * Animate the bottom appear button .wabb
 *
 *  <a type="button" href="javascript:;" class="wabb btn btn-primary">
 *      Bottom Button <i class="fa fa-check"></i>
 *  </a>
 *
 **/
var wAppearBottomButton = function () {
    return {
        init: function () {
            setTimeout(function () {
                $('.wabb').stop().animate({bottom: '33px'}, 800);
            }, 1400);

            if (withOptions.debug) {
                console.info('wAppearBottomButton() enabled');
            }
        }
    };
}();

if (withOptions.wAppearBottomButton) {
    wAppearBottomButton.init(); // with Appear Bottom Button {css: .wabb}
}
