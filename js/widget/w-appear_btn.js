/* Animate the bottom appear button .wap */
var wAppearBottomButton = function () {
    return {
        init: function () {
            setTimeout(function () {
                $('.wabb').stop().animate({bottom: '33px'}, 800);
            }, 1400);

            if (debug) {
                console.info('wAppearBottomButton() enabled');
            }
        }
    };
}();

if (withOptions.wAppearBottomButton) {
    wAppearBottomButton.init(); // with Appear Bottom Button {css: .wabb}
}
