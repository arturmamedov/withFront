/**
 * Animate scroll of #hash anchor and put the window to right place with topOffset
 *
 * data-keep-hash    [false]        If #hash anchor is needed in url set true, otherwise u will not see the #hash in url
 * data-top-offset   [10]          The NEGATIVE offset from top (for not cover things with navbar or other things)
 * data-animation    [1000]         The duration of scroll anitmation
 *
 */
$("body").on('click', ".w-scroll", function (e) {
    if (this.hash !== "") {
        e.preventDefault();
        // Store hash
        var hash = this.hash,
            keep_hash = (typeof $(this).data('keepHash') == "undeifned") ? false : $(this).data('keepHash'),
            topOffset = (typeof $(this).data('topOffset') == "undefined") ? 10 : parseInt($(this).data('topOffset')),
            animation = (typeof $(this).data('animation') == "undefined") ? 1000 : parseInt($(this).data('animation'));

        $("html, body").animate({
            scrollTop: $(hash).offset().top - topOffset
        }, animation, function () {
            // Add hash (#) to URL when done scrolling (default click behavior)
            if (keep_hash) {
                window.location.hash = hash;
            }
        });
    }
});
