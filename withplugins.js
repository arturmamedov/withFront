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
    $("._the_email_confirm_").attr('value', '');

    // detect if the width of screen is bootstrap xs, sm, md, lg
    var isMobile = window.matchMedia("only screen and (max-width: 768px)");
    var isXs = window.matchMedia("(max-width: 768px)");
    // var isSm = window.matchMedia("(min-width: 768px) and (max-width: 991px)");
    // var isMd = window.matchMedia("(min-width: 992px) and (max-width: 1199px)");
    // var isLg = window.matchMedia("(min-width: 1200px)");

    // this is for loader
    if ($(".loader-wrapper").length > 0) {
        $('#mainMenu a:not([target="_blank"]):not([href^=#]), a.animation-link').on("click", function () {
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

        $(window).load(function () {
            $(".loader:not(.demo-loader)").fadeOut(200);
            $(".loader-wrapper:not(.demo-loader)").delay(100).fadeOut(400);
        });
    }

    /**
     * Boxes AutoHeight
     *
     * @param columns
     *
     * data-weh-add="50" add 50px to all
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


    /**
     * childNum counter
     * ex:
     *
     * <form class="... children_age_form"> ...
     * <input type="number" class="form-control child_num_input" min="0" max="5" name="num_children">
     *
     *     and
     *
     *     <div class="col-sm-2 pull-right display-none" id="child_ageClone">
     *           <div class="form-group">
     *               <input type="number" placeholder="0" class="form-control" name="age_children[]" value="1" max="17" min="1" disabled/>
     *
     *           <label>Children <span class="jq_child_num">1</span></label>
     *           </div>
     *        </div>
     *  and
     *  impolode(',', $_POST['age_children']) in PHP
     *
     * max children: 5 @todo: configurabe
     * @todo: keep values of yet insterted children ages
     * @type {any}
     */
    $(".children_age_form").each(function () {
        var form = $(this);
        form.on('keyup change', '.child_num_input', function () {
            // if counter are equal 0 - do nothing
            var _childNum = $('.child_num_input', form).val();
            if (_childNum == 0) {
                childNum = 0;
                $("[id^='child_age_']", form).remove();
                return false;
            }
            // over 5 chlids are invalid
            if (_childNum > 5) {
                $('body').gdivMessage('No more then 5 childs / Non più di 5 bambini', 'warning', {hidetime: 7000});
                $('.child_num_input', form).val(5);
                return false;
            }

            $("[id^='child_age_']", form).remove();
            for (var _cN = 1; _cN <= _childNum; _cN++) {
                var childClone = $('#child_ageClone', form).clone();

                // change params
                childClone.attr('id', 'child_age_' + _cN);
                childClone.find('.jq_child_num').text(_cN);
                // .attr('name', 'Camera_1_EtaBambino_'+_cN)
                childClone.find('input').prop("disabled", false).removeProp('disabled');

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
                for (var _childNum = 1; _childNum <= childNum; _childNum++) {
                    if (_childNum > 5) {
                        $('.child_num_input', form).val(5);
                        return false;
                    }
                    var childClone = $('#child_ageClone', form).clone();

                    // change params
                    childClone.attr('id', 'child_age_' + _childNum);
                    childClone.find('.jq_child_num').text(_childNum);
                    //.attr('name', 'Camera_1_EtaBambino_' + _childNum)
                    childClone.find('input').prop("disabled", false).removeProp('disabled');

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
                    $("body").gdivMessage(json.message, 'success');

					if($(thisForm).data('scallback').length > 0)
					{
						eval($(thisForm).data('scallback'));
					}
                } else {
                    $("body").gdivMessage(json.message, 'danger');

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
                $("body").gdivMessage();

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
    });*/


    /**
     * Google Analytics link click/event tracking
     * /
     $("a").click(function () {
        if (!$(this).hasClass("gadisabled")) {
            var href = $(this).attr('href');

            if (href.indexOf('mailto:') >= 0) {
                ga('send', 'event', 'contatti', 'click', href.replace('mailto:', ''), '5');
            }

            if (href.indexOf('tel:') >= 0) {
                ga('send', 'event', 'contatti', 'click', href.replace('tel:', ''), '5');
            }

            if (href.indexOf('twitter.com') >= 0) {
                ga('send', 'event', 'social', 'click', 'twitter', '2');
            }

            if (href.indexOf('facebook.com') >= 0) {
                ga('send', 'event', 'social', 'click', 'facebook', '2');
            }

            if (href.indexOf('google.com') >= 0) {
                ga('send', 'event', 'social', 'click', 'google', '2');
            }

            if ((href.indexOf('sitename.com') < 0) && (href.indexOf('http') >= 0)) {
                ga('send', 'event', 'outgoing', 'click', href);
            }

            if (href.match('.pdf$') != null) {
                //var pdf_file_name = href.substr(href.lastIndexOf('/') + 1);
                ga('send', 'event', 'download', 'click', 'scheda-tecnica', '2');
            }
        }
    });
     /* Google Analytics - can be disabled and commented */

    /**
     * Google Analytics submit
     * /
     $(".gasubmit").submit(function () {
        ga('send', 'pageview', '/email-form-contatti'); // for booking "/calcola-preventivo"
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
                    //     _gaq.push(['_trackPageview', '/form-contatti']);
                    //     ga('send', 'pageview', '/email-form-contatti');
                    //     ga('send', 'event', 'contatti', 'click', 'newsletter', '5');
                    // }

                    $("body").gdivMessage(json.message, 'success');

                    form.html('<h3>' + json.message + '</h3><h1 class="text-center"><i class="fa fa-check fa-5x text-success"></i></h1>', 1500);
                    $('.on-target').css('background-color', '#00e095');
                    // setTimeout(function(){
                    //   $('.on-target').css('background-color', 'transparent');
                    // }, 8000);
                } else {
                    $("body").gdivMessage(json.message, 'danger');

                    for (err in json.errors) {
                        $(form).find('[name='+err+']').parent()
                            .after('<span class="help-block alert alert-danger">' + json.errors[err] + '</span>')
                            .addClass('has-error');
                    }

                    form.find('.errors').show();
                    form.find('.errors').html('<h4>' + json.message + '</h4>', 1500);
                }
            },
            error: function () {
                submit_btn.text(submit_btn_text).prop('disabled', false);

                $('.errors', form).show();
                $('.errors', form).html('<h4>' + json.message + '</h4>', 1500);
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
     * <div id="period">
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
        if (typeof bsdp_lang_code == 'undefined' || bsdp_lang_code.length == 0) {
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
        });

        $(".period").each(function () {
            var period = $(this), checkin = period.find('.checkin');
            checkin.datepicker()
                .on('changeDate', function (e) {
                    $(".checkout", period).focus();
                });
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

    // #jQuery.plugin - daterangepicker for date select
    if ($().daterangepicker) {
        var dtrp_locales = {
            "it": {
                "format": 'DD/MM/YYYY',
                "separator": " - ",
                "applyLabel": "Applica",
                "cancelLabel": "Annulla",
                "fromLabel": "Dal",
                "toLabel": "Al",
                "customRangeLabel": "Custom",
                "daysOfWeek": [
                    "Do",
                    "Lu",
                    "Ma",
                    "Me",
                    "Gi",
                    "Ve",
                    "Sa"
                ],
                "monthNames": [
                    "Gennaio",
                    "Febbraiio",
                    "Marzo",
                    "Aprile",
                    "Maggio",
                    "Giugno",
                    "Luglio",
                    "Agosto",
                    "Settembre",
                    "Ottobre",
                    "Novembre",
                    "Dicembre"
                ],
                "firstDay": 1
            },
            'fr': {
                "format": 'DD/MM/YYYY',
                "separator": " - ",
                "applyLabel": "Applica",
                "cancelLabel": "Annulla",
                "fromLabel": "Dal",
                "toLabel": "Al",
                "customRangeLabel": "Custom",
                "daysOfWeek": [
                    "Do",
                    "Lu",
                    "Ma",
                    "Me",
                    "Gi",
                    "Ve",
                    "Sa"
                ],
                "monthNames": [
                    "Gennaro",
                    "Febbraro",
                    "Mrco",
                    "April",
                    "Maj",
                    "Giugn",
                    "Lugl",
                    "Agost",
                    "Septembre",
                    "Ottober",
                    "Noveber",
                    "Dicember"
                ],
                "firstDay": 1
            }
        }, lang_code = $("html").attr('lang');
        // datepicker
        $('.withDatepicker').daterangepicker({
            locale: dtrp_locales[lang_code]
        });
    } // END - #jQuery.daterangepicker

    // #jQuery.plugin - Nicescroll
    if ($().niceScroll) {
        var nice = $("html").niceScroll({
            cursorcolor: "#ccc",
            cursorborder: "0px solid #fff",
            railpadding: {top: 0, right: 0, left: 0, bottom: 0},
            cursorwidth: "5px",
            cursorborderradius: "0px",
            cursoropacitymin: 0,
            cursoropacitymax: 0.7,
            boxzoom: true,
            horizrailenabled: false,
            autohidemode: false
        });

        $(".withNicescroll").niceScroll();
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

    /**
     * START: Layout Go2Top
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
    LayoutGo2Top.init();
    /** END: Layout Go2Top */


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

    // bind input data @todo more genaral functionality, by specify options text() html() val() ...
    $('[val-binded]').on('change', function(){
        var value = $(this).val(), selector = $(this).data('binded');

        $(selector).val(value);
    });
});
