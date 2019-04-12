/**
 * Animate the bottom appear button .wabb .left .right
 *
 *  <a type="button" href="javascript:;" class="wabb right btn btn-primary" data-bottom="60" data-delay="1440">
 *      Bottom Button <i class="fa fa-check"></i>
 *  </a>
 *
 *  data-bottom: the position from bottom(60 default)
 *  data-right: with .right the position from bottom(CSS 105px default, 75px on mobile)
 *  data-left: with .left the position from bottom(CSS 105px default, 75px on mobile)
 *  data-delay: after how many ms the button appear(1440 default)
 *
 **/
var wAppearBottomButton = function () {
    return {
        init: function () {
            var wabb = $('.wabb'),
                bottom_pos = wabb.data('bottom') || 20,
                right_pos = parseInt(wabb.data('right')),
                left_pos = parseInt(wabb.data('left')),
                delay = wabb.data('delay') || 1440;

            if(!wabb.hasClass('right') && !wabb.hasClass('left')){
                wabb.addClass('right');
            }
            if (right_pos > 0) {
                wabb.css('right', right_pos+'px');
            }
            if (left_pos > 0) {
                wabb.css('left', left_pos+'px');
            }

            setTimeout(function () {
                wabb.stop().animate({bottom: bottom_pos+'px'}, 800);
            }, delay);

            if (withOptions.debug) {
                console.info('wAppearBottomButton() enabled');
            }
        }
    };
}();

if (withOptions.wAppearBottomButton) {
    wAppearBottomButton.init(); // with Appear Bottom Button {css: .wabb}
}
