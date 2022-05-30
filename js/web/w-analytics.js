/**
 * Google Analytics link click/event tracking
 * you can add class="gadisabled" for disable
 *
 * //*also with old _gaq commented if u use old google analytics code
 * https://developers.google.com/analytics/devguides/collection/gajs/methods/gaJSApi_gaq#push
 * /
$(function () {
    $("a").click(function () {
        if (!$(this).hasClass("gadisabled")) {
            var a_tag = $(this), href = $(this).attr('href'), ok = false;

            if (typeof href !== "undefined") {
                if (a_tag.hasClass('w-email-ga') || a_tag.data('ga')) {
                    if (typeof ga !== "undefined") {
                        ga('send', 'event', 'contatti', 'click', a_tag.data('ga'), '5');
                    }

                    // #GA4
                    if (typeof gtag !== "undefined") {
                        gtag('event', 'contatti_click', {
                            data: a_tag.data('ga'),
                            value: 10,
                            currency: 'EUR'
                        });
                    }

                    ok = true;
                }

                if (href.indexOf('mailto:') >= 0) {
                    if (typeof ga !== "undefined") {
                        ga('send', 'event', 'contatti', 'click', href.replace('mailto:', ''), '5');
                    }

                    // #GA4
                    if (typeof gtag !== "undefined") {
                        gtag('event', 'contatti_click', {
                            data: href.replace('mailto:', ''),
                            value: 10,
                            currency: 'EUR'
                        });
                    }

                    //* _gaq.push(['_trackEvent', 'contatti', 'click', href.replace('mailto:', ''), 5]);
                    ok = true;
                }

                if (href.indexOf('tel:') >= 0) {
                    if (typeof ga !== "undefined") {
                        ga('send', 'event', 'contatti', 'click', href.replace('tel:', ''), '5');
                    }

                    // #GA4
                    if (typeof gtag !== "undefined") {
                        gtag('event', 'contatti_click', {
                            data: href.replace('tel:', ''),
                            value: 10,
                            currency: 'EUR'
                        });
                    }

                    //* _gaq.push(['_trackEvent', 'contatti', 'click', href.replace('tel:', ''), 5]);
                    ok = true;
                }

                if (href.indexOf('skype:') >= 0) {
                    if (typeof ga !== "undefined") {
                        ga('send', 'event', 'contatti', 'click', href.replace('skype:', ''), '5');
                    }
// #GA4
                    if (typeof gtag !== "undefined") {
                        gtag('event', 'contatti_click', {
                            data: href.replace('skype:', ''),
                            value: 3,
                            currency: 'EUR'
                        });
                    }

                    //* _gaq.push(['_trackEvent', 'contatti', 'click', href.replace('skype:', ''), 5]);
                    ok = true;
                }

                if (href.indexOf('maps') >= 0) {
                    if (typeof ga !== "undefined") {
                        ga('send', 'event', 'contatti', 'click', 'maps', '5');
                    }

                    // #GA4
                    if (typeof gtag !== "undefined") {
                        gtag('event', 'contatti_click', {
                            data: 'maps',
                            value: 5,
                            currency: 'EUR'
                        });
                    }

                    //* _gaq.push(['_trackEvent', 'contatti', 'click', 'maps', 5]);
                    ok = true;
                }

                // Whatsapp mobile, desktop (the <a> tag need class="whatsapp-message")
                // https://wa.me/393498299161 ....
                // https://web.whatsapp.com/send?phone=+393498299161 ....
                if (a_tag.hasClass('whatsapp-message')) {
                    if (typeof ga !== "undefined") {
                        ga('send', 'event', 'social', 'chat', 'whatsapp', '5');
                    }

                    // #GA4
                    if (typeof gtag !== "undefined") {
                        gtag('event', 'contatti_click', {
                            data: 'whatsapp',
                            value: 5,
                            currency: 'EUR'
                        });
                    }

                    //* _gaq.push(['_trackEvent', 'social', 'chat', 'whatsapp', 5]);
                    ok = true;
                }

                if (href.indexOf('instagram.com') >= 0) {
                    if (typeof ga !== "undefined") {
                        ga('send', 'event', 'social', 'click', 'instagram', '5');
                    }

                    // #GA4
                    if (typeof gtag !== "undefined") {
                        gtag('event', 'social_click', {
                            data: 'instagram',
                            value: 3,
                            currency: 'EUR'
                        });
                    }

                    //* _gaq.push(['_trackEvent', 'social', 'click', 'instagram', 5]);
                    ok = true;
                }

                if (href.indexOf('tripadvisor.it') >= 0) {
                    if (typeof ga !== "undefined") {
                        ga('send', 'event', 'social', 'click', 'tripadvisor', '2');
                    }

                    // #GA4
                    if (typeof gtag !== "undefined") {
                        gtag('event', 'social_click', {
                            data: 'tripadvisor',
                            value: 3,
                            currency: 'EUR'
                        });
                    }

                    //* _gaq.push(['_trackEvent', 'social', 'click', 'twitter', 2]);
                    ok = true;
                }

                if (href.indexOf('facebook.com') >= 0) {
                    if (typeof ga !== "undefined") {
                        ga('send', 'event', 'social', 'click', 'facebook', '2');
                    }

                    // #GA4
                    if (typeof gtag !== "undefined") {
                        gtag('event', 'social_click', {
                            data: 'facebook',
                            value: 3,
                            currency: 'EUR'
                        });
                    }

                    //* _gaq.push(['_trackEvent', 'social', 'click', 'facebook', 2]);
                    ok = true;
                }

                if (href.indexOf('flickr.com') >= 0) {
                    if (typeof ga !== "undefined") {
                        ga('send', 'event', 'social', 'click', 'flickr', '2');
                    }

                    // #GA4
                    if (typeof gtag !== "undefined") {
                        gtag('event', 'social_click', {
                            data: 'flickr',
                            value: 3,
                            currency: 'EUR'
                        });
                    }

                    //* _gaq.push(['_trackEvent', 'social', 'click', 'google', 2]);
                    ok = true;
                }

                if (href.indexOf('youtube.com') >= 0) {
                    if (typeof ga !== "undefined") {
                        ga('send', 'event', 'social', 'click', 'youtube', '2');
                    }

                    // #GA4
                    if (typeof gtag !== "undefined") {
                        gtag('event', 'social_click', {
                            data: 'youtube',
                            value: 3,
                            currency: 'EUR'
                        });
                    }

                    //* _gaq.push(['_trackEvent', 'social', 'click', 'youtube', 2]);
                    ok = true;
                }

                if (!ok && href.indexOf('iperbooking.net') > 0) {
                    if (typeof ga !== "undefined") {
                        ga('send', 'pageview', '/calcola-preventivo');
                    }

                    // #GA4
                    if (typeof gtag !== "undefined") {
                        gtag('event', 'calcola_preventivo', {
                            value: 5,
                            currency: 'EUR'
                        });
                    }

                    ok = true;
                }

                if (!ok && (href.indexOf('hotelcityrimini.com') < 0) && (href.indexOf('http') >= 0)) {
                    if (typeof ga !== "undefined") {
                        ga('send', 'event', 'outgoing', 'click', href);
                    }

                    // #GA4 - yet track it automatically
                    // gtag('event', 'outgoing_click', {
                    //   data: href,
                    //   value: 2,
                    //   currency: 'EUR'
                    // });
                    //* _gaq.push(['_trackEvent', 'outgoing', 'click', href]);
                    ok = true;
                }

                // if (href.match('.pdf$') != null) {
                //     //var pdf_file_name = href.substr(href.lastIndexOf('/') + 1);
                //     ga('send', 'event', 'download', 'click', 'label-evento', '2');
                //     //* _gaq.push(['_trackEvent', 'download', 'click', 'label-evento', '2']);
                //    ok = true;
                // }
            }
        }
    });

    /**
     * Google Analytics submit
     * .gasubmit
     * /
    // $(".booking-form").submit(function () {
    //     if (typeof ga !== "undefined") {
    //         ga('send', 'pageview', '/calcola-preventivo');
    //     }
    //
    //     // #GA4
    //     if (typeof gtag !== "undefined") {
    //         gtag('event', 'calcola_preventivo', {
    //             value: 5,
    //             currency: 'EUR'
    //         });
    //     }
    // });
});
*/
