/* * * * * * * * * * * * *
 *        Start          *
 * Window on buffer onload
 * * * * * * * * * * * * */
// Message to be displayed on unload
// var message = $('#jtrnslt #leavemess').text(), submitting = false;
// // On Form submition set submitting to true for not fire onbeforeunload
// $(document).on("submit", "form", function(event){
//     submitting = true;
// });
// // Window onbeforeunload fired when leave page but not if it a form submition or element with .noBeforeUnload class
// window.onbeforeunload = function (e) {
//     e = e || window.event;
//     // Determine if you want to allow unload
//     /* some synchronous operation here*/
//     if (!submitting && !$(e.target.activeElement).hasClass('noBeforeUnload')) {
//         // IE BUG: throws unspecified error on "cancel"
//         // so we temporarily mask all Javascript errors
//         window.onerror = function (msg, url, linenumber) {
//             return -1 < msg.toLowerCase().indexOf('unspecified error');
//         };
//         // After return the (blocking) confirmation window is shown
//         // after which we remove Javascript error handler
//         window.setTimeout(function () {
//             window.onerror = function () {
//                 return false;
//             }
//         }, 100);
//         // -- IE BUG
//
//         // default message if missed
//         if (message.length == 0) {
//             message = 'Are you sure you want leave this page without save? Sei sicuro di volere uscire senza salvare?';
//         }
//
//         // IE expects the confirmation string in the
//         // `returnValue` property of event object
//         if (e) {
//             e.returnValue = message;
//         }
//         // Other browsers expect it returned as a string
//         return message;
//     }
// };
/* * * * * * * * * * * * *
 *          END          *
 * Window on buffer onload
 * * * * * * * * * * * * */

/**
 * Configure enable/disable withPlugins functions
 *
 * @object {{
 *      debug: boolean,
 *      wAppearBottomButton: boolean,
 *      go2top: boolean
 * }}
 */
var withOptions = {
    debug: false,
    wAppearBottomButton: false,
    go2top: true,
};

/**
 * Debug function for console.info() messages only if debug mode is enabled
 * so you don't need to worry about your debug message when in production
 *
 * @param text
 */
function clog(text) {
    if (withOptions.debug) {
        console.info(text);
    }
}

/**
 * wCookies - Cookies() `js-cookie` (https://github.com/js-cookie/js-cookie)
 * .get(name);
 * .set(name, value, attributes);
 * .remove(name, attributes);
 * .getJSON([name]);
 */
if (typeof Cookies != 'undefined') {
    clog('cookie are baked');
    wCookies = function () {
        return {
            get: function (name) {
                clog('cookie-get(name):' + name);
                return Cookies.get(name);
            },
            set: function (name, value, attributes) {
                // var defaults = {
                //     //secure: true, // we yet on secure from server
                //     //expires: 365, // no only one session
                //     //path: '/', domain: '', // yet default
                // };
                // var attributes = $.extend(defaults, options);
                clog('cookie-set(name, value, attributes):' + name + ', ' + value + ', ' + attributes);
                Cookies.set(name, value, attributes);
            },
            remove: function (name, attributes) {
                clog('cookie-remove(name, attributes):' + name + ', ' + attributes);
                Cookies.remove(name, attributes);
            },
            getJSON: function (name) {
                Cookies.getJSON(name);
            },
            getJSON: function () {
                // get all in JSON
                return Cookies.getJSON();
            }
        };
    };
}

/* * * * * * * * * * * * * * * * * *
 * * * * *  gDiv Message * * * * * *
 need Bootstrap alert and some css:
 .withAlert {left: 15%; position: fixed !important; text-align: center; top: 55px; width: 70%; z-index: 5000;}
 * * * * * * * * * * * * * * * * * */
(function ($) {
    $.fn.gdivMessage = function (message, type, options) {
        var defaults = {autohide: true, hidetime: 4000};
        var opts = $.extend(defaults, options);
        var zindex = 5001, top = 40, alert_count = 1;
        if (!message) {
            message = 'Errore inaspettato. Scusate per il disagio. (Unexpected Error)';
        }
        if (!type) {
            type = 'warning';
        }

        _alert_count = parseInt($(".withAlert").length);
        if (_alert_count > 0) {
            alert_count = _alert_count;
        }
        zindex = alert_count + 5001;
        top = alert_count * top;
        if (top > 100) {
            top = 100 + (alert_count * 3);
            if (top > 150) {
                top = 150;
            }
        }

        // qui creiamo il codice del alert
        var element = '<div class="withAlert alert alert-' + type + ' alert-dismissible" style="z-index: ' + zindex + '; top: ' + top + 'px;"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button><span class="message">' + message + '</span><div class="clearfix"></div></div>';

        var eobj = $(element).clone();

        $(eobj).appendTo("body");
        if (opts.autohide) {
            setTimeout(function () {
                $(eobj).hide('slow', function () {
                    $(this).remove();
                });
            }, opts.hidetime);
        }
    };
})(jQuery);
$("body").on('click', ".withAlert .close", function () {
    $(this).parent().hide('slow', function () {
        $(this).remove();
    });
});
/* * * * ----- gDiv Message ----- * * */

$(".loader-wrapper-close").show().click(function () {
    $(".loader:not(.demo-loader)").fadeOut(200);
    $(".loader-wrapper:not(.demo-loader)").delay(100).fadeOut(400);
});

/* jQuery plugins and other thing that need to be run after the document is load */
$(document).ready(function () {
    // this is for loader
    if ($(".loader-wrapper").length > 0) {
        $('#mainMenu a:not([target="_blank"]):not([href^="#"]), a.animation-link').on("click", function () {
            // Grab the link's href
            var href = this.href;

            $(".loader").fadeIn(300);
            // Slide up the content you want to slide up
            $(".loader-wrapper").fadeIn(function () {
                // Slide is finished, navigate
                location.href = href;
            });

            // Prevent the default action of the link
            return false;
        });

        $(window).on('load', function () {
            $(".loader:not(.demo-loader)").fadeOut(200);
            $(".loader-wrapper:not(.demo-loader)").delay(100).fadeOut(400);
        });
    }
});

/* jQuery plugins and other thing that need to be run after the document is load */
$(document).ready(function () {
    /**
     * withHoneyPot Spam Checker
     *
     * HTML:
     <div class="_the_email_confirm_group">
     <div class="form-group">
     <label class="upper" for="name">Email confirm</label>
     <input type="text" class="_the_email_confirm_" name="_the_email_confirm_" value="confirmed" />
     </div>
     </div>
     * HTML END;
     *
     * Example of check in PHP:
     $captcha_error = false;
     $maybe_js_error = false;
     if (isset($_POST['_the_email_confirm_']) && strlen($_POST['_the_email_confirm_']) > 0) {
             if ($_POST['_the_email_confirm_'] == 'confirmed') {
                 $maybe_js_error = true;
             } else {
                 $captcha_error = true;
                 $errors[] = 'Codice di sicurezza "CAPTCHA" non valido';
             }
         }
     if ( ! $captcha_error && ! $errors) {
             if ($maybe_js_error) {
                 // if error maybe spam
                 $email_to = 'buonemailrn@gmail.com';
             } else {
                 // send to owner
                 $email_to = $to;
             }
         }
     * PHP example END;
     *
     */
    $("._the_email_confirm_").attr('value', '');


    // detect if the width of screen is bootstrap xs, sm, md, lg
    var isMobile = window.matchMedia("only screen and (max-width: 768px)");
    var isXs = window.matchMedia("(max-width: 768px)");
    var isSm = window.matchMedia("(min-width: 768px) and (max-width: 991px)");
    var isMd = window.matchMedia("(min-width: 992px) and (max-width: 1199px)");
    var isLg = window.matchMedia("(min-width: 1200px)");

    /**
     * Boxes AutoHeight
     *
     * @dependencies [w-breakpoints]
     * @param columns
     *
     * data-weh-add="50" add 50px to all
     *
     * @todo: css relative class for IDE support
     */
    function withEqualHeight(columns) {
        var tallestcolumn = 0, add = parseInt(columns.first().attr('data-weh-add'));
        if (isNaN(add)) {
            add = 0;
        }
        columns.each(
            function () {
                $(this).css('height', 'auto');
                var currentHeight = $(this).height();
                if (currentHeight > tallestcolumn) {
                    tallestcolumn = currentHeight;
                }
            }
        );
        columns.height(tallestcolumn + add);
    }

    $(window).on('load resize', function () {
        // .withAutoHeight > .weh for elements, non in `xs` media screen
        if (!isXs.matches) {
            $('.withEqualHeight').each(function () {
                withEqualHeight($(this).find('.weh'));
            });
        }
        // .withAutoHeightAll > .weh for all elements
        $('.withEqualHeightAll').each(function () {
            withEqualHeight($(this).find('.weh'));
        });
    });

    /** w-filter
     *  Filter items on button click or select change with data-filter=".selector"
     */
    $(".w-filters").each(function () {
        var $grid = $(this);
        $grid.on('click change', '.w-filter', function () {
            var filterValue = '';

            if ($(this).is('select')) {
                filterValue = $(this).val();
            } else if ($(this).is('radio')) {
                // @todo
                // console.info('radio');
                // console.info($(this).val());
            } else {
                // remove and add active state
                $grid.find('.w-filter').removeClass('active');
                $(this).addClass('active');

                // filter items
                filterValue = $(this).attr('data-filter');
            }

            // hide all elements
            $(".w-item", $grid).hide();
            // show filtered
            $(".w-item" + filterValue, $grid).show();
        });
    });

    /**
     * Aggiunge un input che crea altri input in base al valore che ha
     * esempio: numero bambini e un input per l'eta di ogni bambino
     *
     * @dependencies [w-alert]
     *
     * form.children_age_form
     * input.child_num_input
     * div#child_ageClone
     *
     * --- and ---
     *
     * <form class="... children_age_form"> ...
     * <input type="number" class="form-control child_num_input" min="0" max="5" name="num_children">
     *
     *  --- and ---
     *
     *     <div class="col-sm-2 pull-right display-none" id="child_ageClone">
     *           <div class="form-group">
     *               <input type="number" placeholder="0" class="form-control" name="age_children[]" value="1" max="17" min="0" disabled/>
     *
     *           <label>Children <span class="jq_child_num">1</span></label>
     *           </div>
     *        </div>
     *
     *  --- and ---
     *
     *  $php
     *      $children_number = $_POST['num_children']); // 3
     *      $children_age = implode(', ', $_POST['age_children']); // 3, 6, 7
     *  $endphp
     *
     * max children: default 5 (configurable by max attribute)
     * @todo: keep values of yet insterted children ages (w-cookie)
     * @type {any}
     */
    $(".children_age_form").each(function () {
        var form = $(this), max_children = parseInt($('.child_num_input', form).attr('max'));

        if (typeof max_children == 'undefined') {
            max_children = 5;
        }

        form.on('keyup change', '.child_num_input', function () {
            // if counter are equal 0 - do nothing
            var _childNum = $('.child_num_input', form).val();
            if (_childNum == 0) {
                childNum = 0;
                $("[id^='child_age_']", form).remove();
                return false;
            }
            // over 5 chlids are invalid
            if (_childNum > max_children) {
                if ($().gdivMessage) {
                    $('body').gdivMessage('No more then ' + max_children + ' childs / Non più di ' + max_children + ' bambini', 'warning', {hidetime: 7000});
                } else {
                    alert('No more then ' + max_children + ' childs / Non più di ' + max_children + ' bambini', 'warning');
                }
                $('.child_num_input', form).val(max_children);
                return false;
            }

            $("[id^='child_age_']", form).remove();
            for (var _cN = 1; _cN <= _childNum; _cN++) {
                var childClone = $('#child_ageClone', form).clone();

                // change params
                childClone.attr('id', 'child_age_' + _cN);
                childClone.find('.jq_child_num').text(_cN);
                // input //you can also change `name` attribute etc. ex: .attr('name', 'Camera_1_EtaBambino_' + _cN)
                childClone.find('input')
                    .prop("disabled", false)
                    .removeProp('disabled')
                    .attr('data-binded', childClone.find('input').attr('data-binded') + _cN + ' input');

                // attach and show
                $('#child_ageClone', form).after(childClone);
                childClone.show();

                form.css('padding-bottom', '10px');
            }
            childNum = $('.child_num_input', form).val();
        });

        // init childNum counter
        var childNum = $('.child_num_input', form).val();
        if (childNum > 0) {
            function addAges(childNum) {
                for (var _cN = 1; _cN <= childNum; _cN++) {
                    if (_cN > max_children) {
                        $('.child_num_input', form).val(max_children);
                        return false;
                    }
                    var childClone = $('#child_ageClone', form).clone();

                    // change params
                    childClone.attr('id', 'child_age_' + _cN);
                    childClone.find('.jq_child_num').text(_cN);
                    // input // you can also change `name` attributeetc. ex: .attr('name', 'Camera_1_EtaBambino_' + _cN)
                    childClone.find('input')
                        .prop("disabled", false)
                        .removeProp('disabled')
                        .attr('data-binded', childClone.find('input').attr('data-binded') + _cN + ' input');

                    // attach and show
                    $('#child_ageClone', form).after(childClone);
                    childClone.show();

                    form.css('padding-bottom', '10px');
                }
            }

            addAges(childNum);
        }
    });

    /**
     * Form that need be send with Ajax and with CakePHP 3.x
     * /
     $(".ajaxform").on('submit', function(e){
        e.preventDefault();
        var area_code = $(this).data('areacode'), thisForm = $(this);

        $('input, select, textarea').parent().removeClass('has-error').find('.help-block').remove();

        $.ajax({
            url: $(this).attr('action'),
            method: 'POST',
            dataType: 'json',
            data: $(this).serialize(),
            success: function(json){
                if(json.success)
                {
                    if ($().gdivMessage) {
                        $("body").gdivMessage(json.message, 'success');
                    } else {
                        alert(json.message);
                    }

                    if($(thisForm).data('scallback').length > 0)
                    {
                        eval($(thisForm).data('scallback'));
                    }
                } else {
                    if ($().gdivMessage) {
                        $("body").gdivMessage(json.message, 'danger');
                    } else {
                        alert(json.message);
                    }

                    for(err in json.errors){
                        $('.form-'+err, $('#tab_'+area_code))
                            .after('<span class="help-block alert alert-danger">'+ json.errors[err] +'</span>')
                            .parent().addClass('has-error');
                    }

                    if($(thisForm).data('ecallback').length > 0)
                    {
                        eval($(thisForm).data('ecallback'));
                    }
                }
            },
            error: function(){
                if ($().gdivMessage) {
                    $("body").gdivMessage('Unexpected error! Errore inaspettato!');
                } else {
                    alert('Unexpected error! Errore inaspettato!');
                }

                if($(thisForm).data('fcallback').length > 0)
                {
                    eval($(thisForm).data('fcallback'));
                }
            }
        });

        //if($(thisForm).data('callback').length > 0)
        //{
        //	eval($(thisForm).data('callback'));
        //}

        return false;
    }); */

    /**
     * Google Analytics link click/event tracking
     * //*also with old _gaq commented if u use old google analytics code https://developers.google.com/analytics/devguides/collection/gajs/methods/gaJSApi_gaq#push
     * /
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

            if (href.indexOf('tripadvisor.com') >= 0) {
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
     /* Google Analytics - can be disabled and commented */

    /**
     * Google Analytics submit
     * /
     $("#booking-form-widget").submit(function () {
    if (typeof ga !== "undefined") {
        ga('send', 'pageview', '/email-form-contatti'); // for booking: (`.gabookingsubmit` "/calcola-preventivo");
        //* _gaq.push(['_trackPageview', '/email-form-contatti']);
    }
});
     /* Google Analytics - can be disabled and commented */

    /* * * * * Ajax Form - ContactsController()->ajaxsend() * * * */
    $(".ajaxsend").submit(function (e) {
        e.preventDefault();
        var form = $(this);

        // loader
        var submit_btn = $(this).find('[type=submit]');
        var submit_btn_text = submit_btn.text();
        submit_btn.html(submit_btn_text + ' &nbsp; <i class="fa fa-spinner fa-pulse"></i>').prop('disabled', true);
        // errors
        $('input, select, textarea').parent().removeClass('has-error').find('.help-block').remove();
        form.find('.errors').hide();

        $.ajax({
            method: form.attr('method'),
            url: form.attr('action'),
            data: form.serialize(),
            dataType: "json",
            success: function (json) {
                // loader
                submit_btn.text(submit_btn_text).prop('disabled', false);

                if (json.success) {
                    // Google Analytics track (can be disabled and commented)
                    // if (typeof ga !== "undefined") {
                    //     ga('send', 'pageview', '/email-form-contatti');
                    //     _gaq.push(['_trackPageview', '/email-form-contatti']);
                    //     ga('send', 'event', 'contatti', 'click', 'newsletter', '5');
                    // }

                    if ($().gdivMessage) {
                        $("body").gdivMessage(json.message, 'success');
                    } else {
                        alert(json.message);
                    }

                    form.html('<h3>' + json.message + '</h3><h1 class="text-center"><i class="fa fa-check fa-5x text-success"></i></h1>', 1500);
                    $('.on-target').css('background-color', '#00e095');
                    // setTimeout(function(){
                    //   $('.on-target').css('background-color', 'transparent');
                    // }, 8000);
                } else {
                    if ($().gdivMessage) {
                        $("body").gdivMessage(json.message, 'danger');
                    } else {
                        alert(json.message);
                    }

                    for (err in json.errors) {
                        $(form).find('[name="' + err + '"]').parent()
                            .after('<span class="help-block alert alert-danger">' + json.errors[err] + '</span>')
                            .addClass('has-error');
                    }

                    form.find('.errors').show();
                    form.find('.errors').html('<h4>' + json.message + '</h4><p>' + json.string_errors + '</p>', 1500);
                }
            },
            error: function () {
                submit_btn.text(submit_btn_text).prop('disabled', false);

                $('.errors', form).show();
                $('.errors', form).html('<h4>Unexpected error! Errore inaspettato! :( </h4>', 1500);
            }
        });

        return false;
    });

    /** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** **
     # # # # # # # hash-navigation # for bootstrap tabs # # # # # # # # #
     ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** **/
    var hash = window.location.hash;
    if (hash.length > 0 && $('.hash-navigation').length > 0) {
        $('a[href=' + hash + ']').tab('show');
    }
// # look for changes in navigation and add it to url
    $('.hash-navigation a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
        return location.hash = $(e.target).attr('href').substr(1);
    });
    /** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** **
     # # # # # # # # # # # hash-navigation # END # # # # # # # # # # # # #
     ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** **/

    /**
     * #jQuery.plugin - bootstrap date picker
     *
     * @dependencies [uxsolution/bootstrap-datepicker]
     *
     * <div class="period">
     *     <div class="form-group">
     *         <input type="text" name="checkin" id="checkin" class="form-control checkin range">
     *     </div>
     *     <div class="form-group">
     *         <input type="text" name="checkout" id="checkout" class="form-control checkout range">
     *     </div>
     * </div>
     */
    if ($().datepicker) {
        var date = new Date(),
            bsdp_lang_code = $("#bsdp_lang_code").attr('data-lang');

        if (typeof bsdp_lang_code == 'undefined' || bsdp_lang_code.length == 0) {
            bsdp_lang_code = $("html").attr('lang');
        }
        if (typeof bsdp_lang_code == 'undefined' || bsdp_lang_code.length == 0 || bsdp_lang_code == 'en') {
            bsdp_lang_code = 'en-GB';
        }

        // contact page datepicker
        $('.period').each(function () {
            var period = $(this);
            period.datepicker({
                startDate: date.toString(),
                //endDate: date.setDate(date.getDate() + 400).toString(),
                format: 'dd/mm/yyyy',
                inputs: $('.range', period),
                todayHighlight: true,
                todayBtn: 'linked',
                daysOfWeekHighlighted: "0",
                zIndexOffset: 9999,
                orientation: 'bottom',
                autoclose: true,
                language: bsdp_lang_code
            });

            var checkin = period.find('.checkin'); // , checkout = period.find('.checkout');
            checkin.datepicker()
                .on('changeDate', function (e) {
                    $(".checkout", period).focus();
                });

            // .on('changeDate', function (e) {
            //     next = $(".checkout input", period);
            //     if (next.length == 0) {
            //         next = $(".checkout", period);
            //     }
            //     next.focus();
            // });

            // checkout.datepicker() // you can continue to focus input of user
            //     .on('changeDate', function (e) {
            //         $("..next input selector..", period.parent()).focus();
            //     });
        });
    } // END - #jQuery.bootstrap date picker

    // #jQuery.plugin - bootstrap tooltips
    if ($().tooltip) {
        $('[data-toggle=tooltip]').tooltip();
    } // END - #jQuery.tooltip


    // #jQuery.plugin - selectize for list options
    if ($().selectize) {
        $('.selectize').selectize();
    } // END - #jQuery.selectize


    // #jQuery.plugin - bootstrap switch for radio button
    if ($().bootstrapSwitch) {
        $(".bootstrapSwitch").bootstrapSwitch();
    } // END - #jQuery.bootstrapSwitch


    // #jQuery.plugin - Nicescroll
    if ($().niceScroll) {
        $("html").niceScroll({
            touchbehavior: false,
            background: "#e2e2e2",
            cursoropacitymin: 1,
            cursorcolor: "#141414",
            cursoropacitymax: 0.6,
            cursorwidth: 5,
            cursorborder: '0px solid #fff',
            railalign: "right",
            railpadding: {top: 0, right: 0, left: 0, bottom: 0},
            cursorborderradius: "0px",
            boxzoom: true,
            horizrailenabled: false,
            autohidemode: false
        });

        $(".withNicescroll").niceScroll({
            touchbehavior: false,
            background: "#e2e2e2",
            cursoropacitymin: 1,
            cursorcolor: "#141414",
            cursoropacitymax: 0.6,
            cursorwidth: 5,
            cursorborder: '0px solid #fff',
            railalign: "right",
            railpadding: {top: 0, right: 0, left: 0, bottom: 0},
            cursorborderradius: "0px",
            boxzoom: true,
            horizrailenabled: false,
            autohidemode: false
        });

        // fix horizontal
        $('html').addClass('no-overflow-y');
    } // END - jQuery.nicescroll

    /**
     * Add target highlight to something
     */
    $("body").on('click', '.targetLink', function () {
        var elem = $(this).data('target');
        $(elem).addClass('target');
        if ($(this).data('auto-close') != 'false') {
            var ac = parseInt($(this).data('auto-close'));
            if (ac == 0) {
                ac = 3500;
            }
            setTimeout(function () {
                $(elem).removeClass('target');
            }, ac);
        }
    });

    // bootstrap wide modal - adjust height to fit entire page
    $(".modalWide").on("show.bs.modal", function () {
        var height = $(window).height() - 200;
        $(this).find(".modal-body").css("max-height", height);
    });
// END - bootstrap wide modal

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

    if (withOptions.go2top) {
        LayoutGo2Top.init(); // go2top button {css: .go2top}
    }


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


    // #jQuery.plugin - raty for a star rating view
    if ($().raty) {
        /**
         * Raty - https://github.com/wbotelhos/raty
         * with data API initialization from https://github.com/wbotelhos/raty/pull/168
         * get only the star type or set my prefered icon type and all others from data-api:
         * <span class="getraty" data-score="5" data-star-on="fa fa-star" data-star-off="" data-read-only="true"></span>
         *
         */
        $('.getraty').each(function () {
            // startype = i
            var startype = $(this).data('startype');
            if (typeof startype == 'undefined' || startype.length == 0)
                startype = 'i';

            // readonly = true
            var readonly = $(this).data('readonly');
            if (typeof readonly == 'undefined' || readonly.length == 0)
                readonly = true;

            // score = 5
            var score = $(this).data('score');
            if (typeof score == 'undefined' || score.length == 0)
                score = 5;

            $(this).raty({starType: startype, readOnly: readonly, score: score});
        });
    } // END - #jQuery.raty

    /**
     * withBox
     * #showhide https://gist.github.com/arturmamedov/2bdfc3f69828ac37a7a1
     */
    $(".withBox").on('click', ".showhideBox", function () {
        var thisBox = $(this), parent = false;
        while (parent == false) {
            thisBox = thisBox.parent();
            if (thisBox.hasClass('withBox')) {
                parent = true;
            }
        }

        $(".shBox", thisBox).toggle(200);
        $(".shSwitch", thisBox).toggle(1, function () {
            if ($(this).hasClass('set'))
                $(this).removeClass('set');
            else
                $(this).addClass('set');
        });
    });
// no close on himself click
    $(".withBox.collapsable").mouseup(function () {
        return false;
    });
// close on document click
    $(document).mouseup(function () {
        $(".shBox", $(".withBox.collapsable")).slideUp();
        var shSwitch = $(".shSwitch", $(".withBox.collapsable"));
        if (shSwitch.hasClass('set'))
            shSwitch.toggle(1, function () {
                if ($(this).hasClass('set'))
                    $(this).removeClass('set');
                else
                    $(this).addClass('set');
            });
    });

    /**
     * Set values of inputs or elements from cookie
     *
     * @param _this HTML input element with data-name="" or name="" that correspond to cookie name, data-cookie-type="val,select,radio,html,text"
     */
    function setFromCookie(_this) {
        var selector = _this.data('binded'),
            type = _this.data('cookie-type');
        ;

        // get name from name="" or data-name=""
        var name = _this.attr('name');
        if (typeof name == 'undefined') {
            name = _this.data('name');
        }

        // get value from cookie
        var value = wCookies().get(name);
        if (typeof value == 'undefined' || value == '') {
            clog('setFromCookie() No value ' + name + ' - ' + value);
            return false;
        }

        // type of element where put data
        if (typeof type == 'undefined') {
            type = 'val';
        }

        switch (type) {
            case 'val':
                _this.val(value);
                break;
            case 'select':
                $('option', _this).removeAttr('selected');
                _this.val(value);
                $('option[value="' + value + '"]', _this).attr('selected', 'selected');
                break;
            case 'theme-select':
                $('option', _this).removeAttr('selected');
                _this.val(value);
                $('option[value="' + value + '"]', _this).attr('selected', 'selected');

                // theme things
                var $span = _this.parent('.select').find('span'),
                    textchange = _this.find('option[selected=selected]').text();
                $span.text(textchange);
                // end theme things
                break;
            case 'radio':
                _this.removeAttr('checked');
                _this.prop('checked', false);
                _this.closest('form').find('input[name=' + _this.attr('name') + ']').filter('[value="' + value + '"]').attr('checked', true).prop('checked', true);
                break;
            case 'html':
                _this.html(value);
                break;
            case 'text':
                _this.text(value);
                break;
        }

        // children_age_form things & datepicker
        if ($(selector).attr('name') == 'num_children' || $(selector).hasClass('range')) {
            $(selector).trigger('keyup');
        }

        clog('setFromCookie() ' + name + ' - ' + type + ' - ' + value);
    }

    /**
     * Set values of inputs or elements into cookie `.w-cookie`
     *
     * @param _this HTML input element with data-name="" or name="" that correspond to cookie name, data-value="" or value=""
     */
    function setIntoCookie(_this) {
        // get name from name="" or data-name=""
        var name = _this.attr('name');
        if (typeof name == 'undefined') {
            name = _this.data('name');
        }

        // get value from input value="" or data-value="" of element
        var value = _this.val();
        if (typeof value == 'undefined') {
            value = _this.data('value');
        }

        // not action if no value
        if (value == '') {
            return;
        }

        // set into cookie
        wCookies().set(name, value);

        clog('setIntoCookie() ' + name + ' - ' + value);
    }

// universal on .w-cookie input/element change
    $(document).on('change blur click', '.w-cookie', function () {
        setIntoCookie($(this));
    });
// @todo: selector with a -form suffixed for work on all elements in a form
// set the .w-cookie values after load of document
    $('.w-cookie').each(function () {
        setFromCookie($(this));
    });

    /**
     * Bind a form input to another input or something else
     * add `.w-setter` for bind on.load
     *
     * @param _this HTML input element with value="", data-binded=".selector", data-binded-type="val,select,radio,html,text"
     */
    function wBind(_this) {
        var value = _this.val(),
            selector = _this.data('binded'),
            type = _this.data('binded-type');

        // set default type if not specified
        if (typeof type == 'undefined') {
            type = 'val';
        }

        // if radio, get the checked value and not booth
        if (_this.is('input[type=radio]')) {
            value = _this.closest('form').find('input[name="' + _this.attr('name') + '"]:checked').val();
            if (typeof value == 'undefined') {
                value = '';
            }
        }

        // not action if no value
        if (value == '') {
            return;
        }

        switch (type) {
            case 'val':
                $(selector).val(value);
                break;
            case 'select':
                $(selector + ' option').removeAttr('selected');
                $(selector).val(value);
                $(selector + ' option[value="' + value + '"]').attr('selected', 'selected');
                break;
            case 'radio':
                $(selector).removeAttr('checked');
                $(selector).prop('checked', false);
                $(selector).filter('[value="' + value + '"]').attr('checked', true).prop('checked', true);
                break;
            case 'html':
                $(selector).html(value);
                break;
            case 'text':
                $(selector).text(value);
                break;
        }

        // children_age_form things & datepicker
        if ($(selector).attr('name') == 'num_children' || $(selector).hasClass('range')) {
            $(selector).trigger('keyup');
        }

        // range datepicker update dates on bind
        if ($(selector).hasClass('range')) {
            $(selector).closest('.period').datepicker('updateDates');
        }

        clog('wBind() ' + selector + ' - ' + type + ' - ' + value);
    }

// universal on bind change
    $(document).on('change blur click', '.w-binded', function () {
        wBind($(this));
    });
// @todo: selector with a -form suffixed for work on all elements in a form
// set the binded value after load of document
    $('.w-binded.w-setter').each(function () {
        wBind($(this));
        // setIntoCookie($(this)); combine w-binded and w-cookie
    });
});
