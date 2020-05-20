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


/**
 * Animate the top appear button .watb .left .right
 *
 *  <a type="button" href="javascript:;" class="watb right btn btn-primary" data-top="60" data-delay="1440">
 *      Top Button <i class="fa fa-check"></i>
 *  </a>
 *
 *  data-top: the position from top(20 default)
 *  data-right: with .right the position from bottom(CSS 105px default, 75px on mobile)
 *  data-left: with .left the position from bottom(CSS 105px default, 75px on mobile)
 *  data-delay: after how many ms the button appear(1440 default)
 *
 **/
var wAppearTopButton = function () {
    return {
        init: function () {
            var watb = $('.watb'),
                top_pos = parseInt(watb.data('top')) || 20,
                right_pos = parseInt(watb.data('right')),
                left_pos = parseInt(watb.data('left')),
                delay = watb.data('delay') || 1440;

            if(!watb.hasClass('right') && !watb.hasClass('left')){
                watb.addClass('right');
            }
            if (right_pos > 0) {
                watb.css('right', right_pos+'px');
            }
            if (left_pos > 0) {
                watb.css('left', left_pos+'px');
            }

            setTimeout(function () {
                watb.stop().animate({top: top_pos+'px'}, 800);
            }, delay);

            if (withOptions.debug) {
                console.info('wAppearTopButton() enabled');
            }
        }
    };
}();

if (withOptions.wAppearTopButton) {
    wAppearTopButton.init(); // with Appear Bottom Button {css: .watb}
}
