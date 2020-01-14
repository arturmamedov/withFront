/**
 * Animate scroll of #hash anchor and put the window to right place with topOffset
 *
 * data-keep-hash    [false]        If #hash anchor is needed in url set true, otherwise u will not see the #hash in url
 * data-top-offset   [10]          The NEGATIVE offset from top (for not cover things with navbar or other things)
 * data-animation    [1000]         The duration of scroll animation
 *
 */
$("body").on('click', ".w-scroll", function (e) {
    if (this.hash !== "" && $(this.hash).length) {
        e.preventDefault();
        // Store hash
        var hash = this.hash,
            keep_hash = (typeof $(this).data('keepHash') == "undeifned") ? false : $(this).data('keepHash'),
            topOffset = $(this).data('topOffset'),
            animation = (typeof $(this).data('animation') == "undefined") ? 1000 : parseInt($(this).data('animation'));

        // calc topOffset by passed type of data, int or selector
        if (typeof topOffset == "undefined") {
            topOffset = 10; // default
        } else {
            _topOffset = parseInt(topOffset);
            // if it not numeric, we assume that it an element from which take height
            if (isNaN(_topOffset)) {
                if ($(topOffset).length) {
                    topOffset = $(topOffset).height();
                } else {
                    topOffset = 10; // default
                }
            } else {
                topOffset = _topOffset;
            }
        }

        $("html, body").animate({
            scrollTop: $(hash).offset().top - topOffset
        }, animation, function () {
            // Add hash (#) to URL when done scrolling (default click behavior)
            if (keep_hash) {
                window.location.hash = hash;
            }
        });
    } else {
        if(this.hash != "") {
            console.info('Error: Define element with id="'+this.hash+'"');
        } else {
            console.info('Error: You must add an anchor href="#some_id" to your trigger element with class .w-scroll or it won\'t work');
        }
    }
});
