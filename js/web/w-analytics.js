/**
 * Google Analytics link click/event tracking
 * you can add class="gadisabled" for disable
 *
 * //*also with old _gaq commented if u use old google analytics code
 * https://developers.google.com/analytics/devguides/collection/gajs/methods/gaJSApi_gaq#push
 * /
 $(function() {
    $("a").click(function () {
        if (!$(this).hasClass("gadisabled")) {
            var href = $(this).attr('href');

            if (typeof ga !== "undefined" && typeof href !== "undefined") {
                if (href.indexOf('mailto:') >= 0) {
                    ga('send', 'event', 'contatti', 'click', href.replace('mailto:', ''), '5');
                    //* _gaq.push(['_trackEvent', 'contatti', 'click', href.replace('mailto:', ''), 5]);
                }

                if (href.indexOf('tel:') >= 0) {
                    ga('send', 'event', 'contatti', 'click', href.replace('tel:', ''), '5');
                    //* _gaq.push(['_trackEvent', 'contatti', 'click', href.replace('tel:', ''), 5]);
                }

                if (href.indexOf('skype:') >= 0) {
                    ga('send', 'event', 'contatti', 'click', href.replace('skype:', ''), '5');
                    //* _gaq.push(['_trackEvent', 'contatti', 'click', href.replace('skype:', ''), 5]);
                }

                if (href.indexOf('maps') >= 0) {
                    ga('send', 'event', 'contatti', 'click', 'maps', '5');
                    //* _gaq.push(['_trackEvent', 'contatti', 'click', 'maps', 5]);
                }

                if (href.indexOf('instagram.com') >= 0) {
                    ga('send', 'event', 'contatti', 'click', 'instagram', '5');
                    //* _gaq.push(['_trackEvent', 'social', 'click', 'instagram', 2]);
                }

                if (href.indexOf('tripadvisor.it') >= 0) {
                    ga('send', 'event', 'social', 'click', 'tripadvisor', '2');
                    //* _gaq.push(['_trackEvent', 'social', 'click', 'twitter', 2]);
                }

                if (href.indexOf('facebook.com') >= 0) {
                    ga('send', 'event', 'social', 'click', 'facebook', '2');
                    //* _gaq.push(['_trackEvent', 'social', 'click', 'facebook', 2]);
                }

                if (href.indexOf('google.com') >= 0) {
                    ga('send', 'event', 'social', 'click', 'google', '2');
                    //* _gaq.push(['_trackEvent', 'social', 'click', 'google', 2]);
                }

                if (href.indexOf('youtube.com') >= 0) {
                    ga('send', 'event', 'social', 'click', 'youtube', '2');
                    //* _gaq.push(['_trackEvent', 'social', 'click', 'youtube', 2]);
                }

                if ((href.indexOf('sitename.com') < 0) && (href.indexOf('http') >= 0)) {
                    ga('send', 'event', 'outgoing', 'click', href);
                    //* _gaq.push(['_trackEvent', 'outgoing', 'click', href]);
                }

                if (href.match('.pdf$') != null) {
                    //var pdf_file_name = href.substr(href.lastIndexOf('/') + 1);
                    ga('send', 'event', 'download', 'click', 'label-evento', '2');
                    //* _gaq.push(['_trackEvent', 'download', 'click', 'label-evento', '2']);
                }
            }
        }
    });

    /**
     * Google Analytics submit
     * .gasubmit
     * /
     $(".gasubmit").submit(function () {
        if (typeof ga !== "undefined") {
            ga('send', 'pageview', '/email-form-contatti'); // for booking: (`.gabookingsubmit` "/calcola-preventivo");
            //* _gaq.push(['_trackPageview', '/email-form-contatti']);
        }
    });
});
 /* Google Analytics - can be disabled and commented */