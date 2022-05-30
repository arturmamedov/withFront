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
 * Default conf enable/disable withPlugins functions
 *
 * @object {{
 *      debug: boolean,
 *      wAppearBottomButton: boolean,
 *      go2top: boolean
 * }}
 */
var withOptions = {
    debug: false, // enable/disable Debug mode
    wAppearBottomButton: false, // enable/disable widget/w-appear_btn.js -Bottom
    wAppearTopButton: false, // enable/disable widget/w-appear_btn.js -Top
    go2top: true, // enable/disable widget/w-go2top.js
    htmlNicescroll: false,
    whatsappWeb: true, // replace WhatsApp mobile with Desktop on Desktop
};

if (typeof wOptions != 'undefined') {
    var withOptions = $.extend(withOptions, wOptions);
}

/**
 * Debug function for console.info() messages only if debug mode is enabled
 * so you don't need to worry about your debug message when in production
 *
 * @param text
 */
function clog(text){
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
if(typeof Cookies != 'undefined') {
    clog('cookie are baked');
    wCookies = function() {
        return {
            get: function(name) {
                clog('cookie-get(name):' + name);
                return Cookies.get(name);
            },
            set: function(name, value, attributes) {
                // var defaults = {
                //     //secure: true, // we yet on secure from server
                //     //expires: 365, // no only one session
                //     //path: '/', domain: '', // yet default
                // };
                // var attributes = $.extend(defaults, options);
                clog('cookie-set(name, value, attributes):' + name + ', ' + value + ', ' + attributes);
                Cookies.set(name, value, attributes);
            },
            remove: function(name, attributes) {
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

/**
 * withAlert() [>= v1.4.5]
 * gdivMessage() [< v1.4.5]
 *
 * @dependencies [css: bootstrap(.alert), withstyle(.withAlert), jquery]
 *
 * @param string message
 * @param string type
 * @param object options {autohide:true, hidetime:4000}
 */
(function ($) {
    /**
     * @deprecated use withAlert() instead
     *
     * @param string message
     * @param string type
     * @param object options
     */
    $.fn.gdivMessage = function (message, type, options) {
        var defaults = {autohide: true, hidetime: 6000};
        var opts = $.extend(defaults, options);
        var zindex = 5001, top = 70, alert_count = 1;
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
        $(eobj).addClass('in');
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

/**
 * withAlert() - the new gdivMessage()
 * no $.fn jQuery function so you can call it without an html object
 * and new beautiful name (bootstrap4 also)
 *
 * @param string message
 * @param string type warning|success|danger|primary|secondary|info
 * @param object options {autohide: true/false, hidetime: 6000, placement: top|bottom}
 */
function withAlert(message, type, options) {
    var defaults = {autohide: true, hidetime: 6000, placement: 'top'};
    var opts = $.extend(defaults, options);
    var zindex = 5001, top = 70, alert_count = 1, _alert_count = 0;

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

    // here we create the bootstrap 4 alert code
    var element = '<div class="withAlert alert alert-' + type + ' alert-dismissible fade show" style="z-index: ' + zindex + '; '+ opts.placement +': ' + top + 'px;"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button><span class="message">' + message + '</span><div class="clearfix"></div></div>';

    var eobj = $(element).clone();

    $(eobj).appendTo("body");
    $(eobj).addClass('in');
    if (opts.autohide) {
        setTimeout(function () {
            $(eobj).hide('slow', function () {
                $(this).remove();
            });
        }, opts.hidetime);
    }
}


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
 * Example:
 * CSS: ._the_email_confirm_group { display: none !important; }
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
 * PHP:
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
 * PHP END;
 */
$("._the_email_confirm_").attr('value', '');


    // detect if the width of screen is bootstrap xs, sm, md, lg
var isXs = window.matchMedia("(max-width: 768px)"),
    isSm = window.matchMedia("(min-width: 768px) and (max-width: 991px)"),
    isMd = window.matchMedia("(min-width: 992px) and (max-width: 1199px)"),
    isLg = window.matchMedia("(min-width: 1200px)"),
    //Bootstrap4 style
    is4sm = window.matchMedia("(min-width: 576px)"),
    is4md = window.matchMedia("(min-width: 768px)"),
    is4lg = window.matchMedia("(min-width: 992px)"),
    is4xl = window.matchMedia("(min-width: 1200px)");

    (function (a) {
    (jQuery.browser = jQuery.browser || {}).mobile = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))
})(navigator.userAgent || navigator.vendor || window.opera);

/*==============================
    Is mobile
==============================*/
// var isMobile = {
//     Android: function() {
//         return navigator.userAgent.match(/Android/i);
//     },
//     BlackBerry: function() {
//         return navigator.userAgent.match(/BlackBerry/i);
//     },
//     iOS: function() {
//         return navigator.userAgent.match(/iPhone|iPad|iPod/i);
//     },
//     Opera: function() {
//         return navigator.userAgent.match(/Opera Mini/i);
//     },
//     Windows: function() {
//         return navigator.userAgent.match(/IEMobile/i);
//     },
//     any: function() {
//         return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
//     }
// }

    /**
 * Boxes AutoHeight by default only for desktop devices
 *
 * @dependencies [w-breakpoints]
 * @param columns 'selector for the element to make equal'
 * @param direction [optional] '<', '>', '='
 *
 * Add class to father element
 * `.withEqualHeight` = for small device and higher (not for xs)
 * `.withEqualHeightInverse` = for the smallest element instead of tallest
 * `.withEqualHeightLike` = for equal height element like the element with .wehl class
 * `....All` by adding All at the end ex: `.withEqualHeightAll` = for extra small device and higher
 *
 * And to all child add class `.weh` and `.wehl` if you wont a height like specific element
 *
 * If you want additional height to all elements (ex: for add a button with absolute position etc.)
 * Add `data-weh-add="50"` to children `.weh` elements (add 50px to all)
 *
 * @todo: css relative class for IDE support
 * @todo: i think the best way for data-weh-add is in father element and not in all children
 */
function withEqualHeight(columns, direction) {
    var columnHeight= 0, add = parseInt(columns.first().attr('data-weh-add')), i=0;
    if (isNaN(add)) {
        // check for data-weh-add in parent
        add = parseInt(columns.parents('[class*="withEqualHeight"]').attr('data-weh-add'))
        if (isNaN(add)) {
            add = 0;
        }
    }
    if (typeof direction == 'undefined') {
        direction = '>';
    }

    if (direction == '=') {
        var likeColumn = columns.parents('.withEqualHeightLike').find('.wehl').first();
        likeColumn.css('height', 'auto');
        columnHeight = likeColumn.height();
    } else {
        columns.each(
            function (i) {
                $(this).css('height', 'auto');
                var currentHeight = $(this).height();
                if (direction == '>') {
                    if (currentHeight > columnHeight) {
                        columnHeight = currentHeight;
                    }
                } else if (direction == '<') {
                    if (i == 0) {
                        columnHeight = currentHeight;
                    }
                    if (currentHeight <= columnHeight) {
                        columnHeight = currentHeight;
                    }
                }
                i++;
            }
        );
    }
    columns.height(columnHeight+ add);
}

$(window).on('load resize', function () {
    // .withEqualHeight > .weh for elements, non in `xs` media screen
    if (!isXs.matches) {
        $('.withEqualHeight').each(function () {
            withEqualHeight($(this).find('.weh'));
        });
        // @todo: totest
        $('.withEqualHeightInverse').each(function () {
            withEqualHeight($(this).find('.weh'), '<');
        });
        $('.withEqualHeightLike').each(function () {
            withEqualHeight($(this).find('.weh'), '=');  // search for .wehl element and make all other equal to it
        });
    }
    // .withEqualHeightAll > .weh for all elements
    $('.withEqualHeightAll').each(function () {
        withEqualHeight($(this).find('.weh'));
    });
    // @todo: totest
    $('.withEqualHeightInverseAll').each(function () {
        withEqualHeight($(this).find('.weh'), '<');
    });
    $('.withEqualHeightLikeAll').each(function () {
        withEqualHeight($(this).find('.weh'), '='); // search for .wehl element and make all other equal to it
    });
});


    /** w-filter
 *  Filter items on button click or select change with data-filter=".selector"
 */
$(".w-filters").each(function(){
    var $grid = $(this);
    $grid.on('click change', '.w-filter', function() {
        var filterValue = '';

        if($(this).is('select')) {
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
        $(".w-item"+filterValue, $grid).show();
    });
});

    /**
 * Add event to `.child_num_input` for clone `#child_ageClone` on change
 * to create as many inputs as is the number of children
 *
 * @dependencies [w-alert]
 *
 * @param  form  The form on that it work `.children_age_form`
 * @param  childNum  The number of children, for create it age inputs
 *
 * <form>.children_age_form
 * <input>.child_num_input
 * <div>#child_ageClone
 *
 * --- and ---
 *
 * <form class="children_age_form">
 * <input type="number" class="form-control child_num_input" min="0" max="5" name="num_children">
 *
 * if is select input add class .input_select after .child_num_input
 *
 *  --- and ---
 *
 *     <div class="col-sm-2 pull-right display-none" id="child_ageClone" data-attr-name="if_you_want_change_the_attr_name_dynamically">
 *         <div class="form-group">
 *             <input type="number" placeholder="0" class="form-control" name="age_children[]" value="0" max="17" min="0" disabled/>
 *
 *             <label>Children <span class="jq_child_num">1</span></label>
 *         </div>
 *     </div>
 *
 *  --- and ---
 *
 *  $php
 *      $children_number = $_POST['num_children']); // 3
 *      $children_age = implode(', ', $_POST['age_children']); // 3, 6, 7
 *  $endphp
 *
 * max children: default 5 (configurable by max attribute)
 * @todo: keep values of yet inserted children ages (w-cookie)
 * @type {any}
 */
function addAges(form, childNum) {
    $("[id^='child_age_']", form).remove(); // first remove all
    childNum = parseInt(childNum);

    // if counter are equal 0 - do nothing
    if (childNum == 0) {
        return false;
    }

    // set {max_children}
    var max_children = parseInt($('.child_num_input', form).attr('max'));
    if (typeof max_children == 'undefined') {
        max_children = 5;
    }
    // over {max_children} are invalid
    if (childNum > max_children) {
        if (typeof withAlert == 'function') {
            withAlert('No more then ' + max_children + ' childs / Non più di ' + max_children + ' bambini', 'warning', {hidetime: 7000});
        } else {
            alert('No more then ' + max_children + ' childs / Non più di ' + max_children + ' bambini', 'warning');
        }
        $('.child_num_input', form).val(max_children);

        childNum = max_children;
    }

    for (var _cN = 1; _cN <= childNum; _cN++) {
        if (_cN > max_children) {
            $('.child_num_input', form).val(max_children);
            return false;
        }
        var childClone = $('#child_ageClone', form).clone();

        // change params
        childClone.attr('id', 'child_age_' + _cN);
        childClone.find('.jq_child_num').text(_cN);
        // input
        childClone.find('input')
            .prop("disabled", false)
            .removeProp('disabled')
            .attr('data-binded', childClone.find('input').attr('data-binded') + _cN + ' input');
        // `data-attr-name` you can also change other attributes ex: .attr('placeholder', 'Eta Bambino_' + _cN)
        if (typeof childClone.attr('data-attr-name') != 'undefined' && childClone.attr('data-attr-name').length) {
            childClone.find('input').attr('name', childClone.attr('data-attr-name') + _cN);
        }

        // attach and show
        $('#child_ageClone', form).after(childClone);
        childClone.show();
    }
}
$(".children_age_form").each(function () {
    var form = $(this);
    clog('.children_age_form: Enabled');

    // add event trigger for form
    form.on('keyup change', '.child_num_input', function () {
        clog('.children_age_form: Form input change');
        // loop and add age inputs
        if ($(this).attr('type') == 'checkbox' || $(this).attr('type') == 'radio' || $(this).hasClass('checkbox_input')) {
            clog('.children_age_form: Input checkbox or radio, value= '+$('.child_num_input:checked', form).val());
            addAges(form, $('.child_num_input:checked', form).val());
        } else if ($(this).hasClass('select_input')) {
            clog('.children_age_form: Input .select_input, value= '+$('.child_num_input:selected', form).val());
            addAges(form, $('.child_num_input:selected', form).val());
        } else {
            clog('.children_age_form: Input value= '+$('.child_num_input', form).val());
            addAges(form, $('.child_num_input', form).val());
        }
    });

    // init childNum counter
    $(function(){
        // we need to wait for wCookie set of value in some case
        setTimeout(function() {
            var _cni = $('.child_num_input', form);
            if (_cni.attr('type') == 'checkbox' || _cni.attr('type') == 'radio') {
                addAges(form, $('.child_num_input:checked', form).val());
            } else if (_cni.hasClass('select_input')) {
                addAges(form, $('.child_num_input:selected', form).val());
            } else {
                addAges(form, $('.child_num_input', form).val());
            }
        }, 3000);
    });
});


    /* notInclude('js/form/w-ajaxsave.js') */

    /* notInclude('js/web/w-analytics.js') */

    /**
 * Ajax Form
 * ContactsController()->ajaxsend()
 *
 * .ajaxsend
 * data-ga-send-pageview="/email-form-contatti"
 * data-gaq-track-pageview="/email-form-contatti" // for use the old version of Google Analytics
 *
 *
 * method: same as form method="POST"
 * url: same as form action=""
 * data: all form fields with jQuery.serialize()
 * dataType: json
 *
 * success expect: {
 *      success: true/false,
 *      message: 'string', // for show an alert with this message
 *      errors: array/object, // with index like the name of input that have error
 *      string_error: 'all errors in one string', // for show in <div class="errors"></div>
 * }
 *
 * @dependencies [w-alert(optional), font-awesome, jquery]
 **/
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
                // Google Analytics track
                if (typeof ga !== "undefined" && form.data('gaSendPageview') != 'off') {
                    var gaSend = (typeof form.data('gaSendPageview') != 'undefined') ? form.data('gaSendPageview') : '/email-form-contatti';

                    ga('send', 'pageview', gaSend);

                    clog('ga send pageview: ' + gaSend);
                }

                // #GA4
                if (typeof gtag !== "undefined" && form.data('ga4SendEvent') != 'off') {
                    var ga4SendEvent = (typeof form.data('ga4SendEvent') != 'undefined') ? form.data('ga4SendEvent') : 'form_contatti';

                    gtag('event', ga4SendEvent, {
                        value: 20,
                        currency: 'EUR'
                    });

                    clog('ga4 send pageview: ' + ga4SendEvent);
                }

                // Facebook track (custom of this installation)
                clog('check fbq');
                if (typeof fbq !== "undefined" && form.data('fbqLead') != 'off') {
                    var fbqLead = (typeof form.data('fbqLead') != 'undefined') ? form.data('fbqLead') : 'Lead';
                    fbq('track', fbqLead);

                    clog('fbq track: '+ fbqLead);
                }

                // Old Google analytics _gaq _trackPageview
                // if (typeof _gaq !== "undefined" && typeof form.data('gaqTrackPageview') != 'undefined') {
                //     _gaq.push(['_trackPageview', form.data('gaqTrackPageview')]);
                // }

                if (json.message.length) {
                    if (typeof withAlert == 'function') {
                        withAlert(json.message, 'success', { hidetime: 15000 });
                    } else {
                        alert(json.message);
                    }
                }

                form.html('<h3>' + json.message + '</h3><h1 class="text-center"><i class="fa fa-check fa-5x text-success"></i></h1>', 1500);
                $('.on-target').css('background-color', '#00e095');
                // setTimeout(function(){
                //   $('.on-target').css('background-color', 'transparent');
                // }, 8000);
            } else {
                if (typeof json.message == 'undefined' || json.message.length == 0) {
                    json.message = 'Errori nella form, correggi e riprova! Form errors, correct and try again!';
                }

                if (typeof withAlert == 'function') {
                    withAlert(json.message, 'danger');
                } else {
                    alert(json.message);
                }

                for (err in json.errors) {
                    $(form).find('[name="'+err+'"]').parent()
                        .after('<span class="help-block alert alert-danger">' + json.errors[err] + '</span>')
                        .addClass('has-error');
                }

                form.find('.errors').show();
                form.find('.errors').html('<h4>' + json.message + '</h4><p>' + json.string_errors + '</p>', 1500);
            }
        },
        error: function (e) {
            submit_btn.text(submit_btn_text).prop('disabled', false);

            if (typeof withAlert == 'function') {
                withAlert('Unexpected error! Errore inaspettato! :( ', 'danger');
            } else {
                alert('Unexpected error! Errore inaspettato! :( ');
            }

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
 * <div class="period"> + (data-date-start-date="default:today(0d)" data-date-end-date="default:none") and all other options https://bootstrap-datepicker.readthedocs.io/en/stable/options.html
 *     <div class="form-group">
 *         <input type="text" name="checkin" id="checkin" class="form-control checkin range">
 *     </div>
 *     <div class="form-group">
 *         <input type="text" name="checkout" id="checkout" class="form-control checkout range">
 *     </div>
 * </div>
 */
if ($().datepicker) {
    var bsdp_lang_code = $("#bsdp_lang_code").attr('data-lang');

    if (typeof bsdp_lang_code == 'undefined' || bsdp_lang_code.length == 0) {
        bsdp_lang_code = $("html").attr('lang');
    }
    if (typeof bsdp_lang_code == 'undefined' || bsdp_lang_code.length == 0 || bsdp_lang_code == 'en') {
        bsdp_lang_code = 'en-GB';
    }

    // contact page datepicker
    $('.period').each(function () {
        var period = $(this);
        $("input.range", period).attr('autocomplete', 'off');

        if (period.data('dateStartDate')) {
            startDate = period.data('dateStartDate');
        } else {
            var startDate = '0d';
        }

        period.datepicker({
            startDate: startDate,
            format: 'dd/mm/yyyy',
            inputs: $('input.range', period),
            todayHighlight: true,
            todayBtn: 'linked',
            daysOfWeekHighlighted: "0",
            zIndexOffset: 9999,
            orientation: 'bottom',
            autoclose: true,
            language: bsdp_lang_code
        });

        // focus on checkout when checkin is set
        var checkin = period.find('input.checkin'), checkout = period.find('input.checkout');
        checkin.datepicker()
            .on('changeDate', function (e) {
                $("input.checkout", period).focus();
            });
        // set checkout to next day if dates are the same
        checkout.datepicker().on('changeDate', function (e) {
            var checkin_date = checkin.datepicker('getUTCDate').getTime(),
            checkout_date = checkout.datepicker('getUTCDate').getTime();

            if (checkin_date == checkout_date) {
                var next_day = new Date(checkout_date).getTime() + 86400000;
                checkout.datepicker('update', new Date(next_day));
            }
        });

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


    /**
 * # jQuery.plugin - Nicescroll
 * https://github.com/inuyaksa/jquery.nicescroll
 *
 * @dependencies [nicescroll, w-core]
 *
 * with data-api for set:
 * wns-background, wns-cursorcolor, wns-cursorwidth, wns-cursorborder, wns-railalign, wns-cursorborderradius, wns-boxzoom, wns-horizontalenabeld, wns-autohidemode
 */
if ($().niceScroll) {
    if (typeof withOptions.htmlNicescroll != 'undefined' && withOptions.htmlNicescroll) {
        $("html").niceScroll({
            background: $("html").data('wnsBackground') || "#e2e2e2",
            cursoropacitymin: 1,
            cursorcolor: $("html").data('wnsCursorcolor') || "#141414",
            cursoropacitymax: 0.6,
            cursorwidth: $("html").data('wnsCursorwidth') || 5,
            cursorborder: $("html").data('wnsCursorborder') || '0px solid #fff',
            railalign: $("html").data('wnsRailalign') || "right",
            railpadding: {top: 0, right: 0, left: 0, bottom: 0},
            cursorborderradius: $("html").data('wnsCursorborderradius') || "0px",
            boxzoom: $("html").data('wnsBoxzoom') || false,
            horizrailenabled: $("html").data('wnsHorizrailenabled') || false,
            autohidemode: $("html").data('wnsAutohidemode') || false
        });

        // fix horizontal @todo: when?
        $('html').addClass('no-overflow-y');
    }

    $(".withNicescroll, .w-nicescroll").each(function(){
        var breakpoint = true;
        if ($(this).data('wnsBreakpoint') == 'is4md') {
            breakpoint = is4md.matches;
        }

        if (breakpoint) {
            var wns = $(this), wncOptions = {
                background: wns.data('wnsBackground') || "#e2e2e2",
                cursoropacitymin: 1,
                cursorcolor: wns.data('wnsCursorcolor') || "#141414",
                cursoropacitymax: 0.6,
                cursorwidth: wns.data('wnsCursorwidth') || 5,
                cursorborder: wns.data('wnsCursorborder') || '0px solid #fff',
                railalign: wns.data('wnsRailalign') || "right",
                railpadding: {top: 0, right: 0, left: 0, bottom: 0},
                cursorborderradius: wns.data('wnsCursorborderradius') || "0px",
                boxzoom: wns.data('wnsBoxzoom') || false,
                horizrailenabled: wns.data('wnsHorizrailenabled') || false,
                autohidemode: wns.data('wnsAutohidemode') || false
            }

            wns.niceScroll(wncOptions);
        }
    });
} // END - jQuery.nicescroll

    /**
 * Replace mobile URL of WhatsApp with Desktop
 * The mobile first strategy is used cause most people decide to not show WhatsApp on Desktop but only on mobile where it is very useful
 *
 * @dependencies [ core/w-ismobile.js ]
 */
if(withOptions.whatsappWeb && !jQuery.browser.mobile && $(".whatsapp-weburl").length > 0){
    clog('WhatsApp Enabled and Present');

    $(".whatsapp-weburl").each(function(){
        clog($(this));
        clog($(this).attr('href'));

        var mobile_wa = $(this).attr('href').replace('?text=', '&text=');
        mobile_wa = mobile_wa.replace('https://wa.me/', 'https://web.whatsapp.com/send?phone=+')

        clog(mobile_wa);

        $(this).attr('href', mobile_wa);
    });
}


    /**
 * Add target highlight to something
 *
 * data-target          [-]                CSS Selector for select the element on which apply
 * data-auto-close      [8000]             Bool or the ms for close
 * data-taregt-class    [on-target]        The class to add (default have CSS animation but it must be on the #anchor element also)
 */
$("body").on('click', '.targetLink, .w-target', function () {
    var elem = $(this).data('target');

    var autoClose = (typeof $(this).data('autoClose') != 'undefined') ? $(this).data('autoClose') : 8000;
    var targetClass = (typeof $(this).data('targetClass') != 'undefined') ? $(this).data('targetClass') : 'on-target';

    $(elem).addClass(targetClass);

    if (autoClose) {
        if (autoClose === true) {
            autoClose = 8000;
        }

        setTimeout(function () {
            $(elem).removeClass(targetClass);
        }, autoClose);
    }
});

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


    // bootstrap wide modal - adjust height to fit entire page
$(".modalWide").on("show.bs.modal", function() {
    var height = $(window).height() - 200;
    $(this).find(".modal-body").css("max-height", height);
});
// END - bootstrap wide modal

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


    $(".w-sliding-panel").each(function () {
    var slidingPanel = $(this),
        slidingBtn = $('.w-sliding-btn[data-target="#'+$(this).attr('id')+'"]'),
        noCloseBtn = slidingBtn.data('noCloseBtn');

    // Get the calculated left position
    var slidingPanel_left = slidingPanel.offset().left;
    var slidingPanel_width = $(document).width();
    // Set the left to its calculated position
    slidingPanel.css({left:slidingPanel_left, width:slidingPanel_width});

    // on click slide
    slidingBtn.on('click', function () {
        showGestPanel();
    });
    slidingPanel.on('click', '.close-panel', function () {
        hideGestPanel();
    });
    // on resize
    $(window).on('resize', function () {
        // get new width for hide
        slidingPanel_width = $(document).width();
        hideGestPanel(); // hide panel for resize it and change position

        // Get the calculated left position
        slidingPanel_left = slidingPanel.offset().left;
        // Set the left to its calculated position
        slidingPanel.css({left:slidingPanel_left, width:slidingPanel_width});
    });

    function showGestPanel(){
        slidingPanel.animate({"left":"0px"});
        console.info(noCloseBtn)
        if (!noCloseBtn) {
            console.info('hide')
            slidingBtn.animate({"left":"-999px"});
        }
    }
    function hideGestPanel(){
        slidingPanel.animate({"left":'-'+slidingPanel_width+'px'});
        if (!noCloseBtn) {
            slidingBtn.animate({"left": "0"});
        }
    }

    // close on document click
    $(document).mouseup(function () {
        hideGestPanel();
    });
});
// no close on himself click
$(".w-sliding-panel").mouseup(function () {
    return false;
});


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
 * 
 * div.withBox[.collapsable]
 * > div.showhideBox
 * > > div.shSwitch
 * > div.shBox
 *
 * ex: 
 * <div class="withBox collapsable">
 *       <h2 class="showhideBox text-underline">
 *           Switcher
 *
 *           <span class="pull-right">
 *               <i class="glyphicon glyphicon-chevron-right shSwitch"></i>
 *               <i class="glyphicon glyphicon-chevron-down shSwitch display-none"></i>
 *           </span>
 *       </h2>
 *
 *       <div class="shBox display-none">
 *            Content ...
 *       </div>
 * </div>
 *
 *
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
    
    var shSwitch = $(".shSwitch.set", $(".withBox.collapsable"));
    shSwitch.toggle(1, function () {
        $(this).removeClass('set');
    });
});


    /**
 * Set values of inputs or elements from cookie
 *
 * @param _this HTML input element with data-name="" or name="" that correspond to cookie name, data-cookie-type="val,select,radio,html,text"
 */
function setFromCookie(_this){
    if (typeof wCookies == 'undefined') {
        return;
    }

    var selector = _this.data('binded'),
        type = _this.data('cookie-type');;

    // get name from name="" or data-name=""
    var name = _this.attr('name');
    if(typeof name == 'undefined') {
        name = _this.data('name');
    }

    // get value from cookie
    var value = wCookies().get(name);
    if(typeof value == 'undefined' || value == '') {
        clog('setFromCookie() No value ' + name + ' - ' + value);
        return false;
    }

    // type of element where put data
    if(typeof type == 'undefined') {
        type = 'val';
    }

    switch(type) {
        case 'val':
            _this.val(value);
            break;
        case 'select':
            $('option', _this).removeAttr('selected');
            _this.val(value);
            $('option[value="'+value+'"]', _this).attr('selected', 'selected');
            break;
        case 'theme-select':
            $('option', _this).removeAttr('selected');
            _this.val(value);
            $('option[value="'+value+'"]', _this).attr('selected', 'selected');

            // theme things
            var $span = _this.parent('.select').find('span'),
                textchange = _this.find('option[selected=selected]').text();
            $span.text(textchange);
            // end theme things
            break;
        case 'radio':
            _this.removeAttr('checked');
            _this.prop('checked', false);
            _this.closest('form').find('input[name='+_this.attr('name')+']').filter('[value="'+value+'"]').attr('checked', true).prop('checked', true);
            break;
        case 'html':
            _this.html(value);
            break;
        case 'text':
            _this.text(value);
            break;
    }

    // children_age_form things & datepicker
    if($(selector).attr('name') == 'num_children' || $(selector).hasClass('range')) {
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
    if (typeof wCookies == 'undefined') {
        return;
    }

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

    // stop if no name or value
    if ((typeof name == 'undefined' || name == '' || name == null) || (typeof value == 'undefined' || value == '' || value == null)) {
        return;
    }

    // set into cookie
    wCookies().set(name, value);

    clog('setIntoCookie() ' + name + ' - ' + value);
}
// universal on .w-cookie input/element change
$(document).on('change blur click', '.w-cookie', function() {
    setIntoCookie($(this));
});
// set the .w-cookie values after load of document
$('.w-cookie').each( function(){
    setFromCookie($(this));
});
// w-cookie-form work on all elements in a form
$('.w-cookie-form').on('change blur click', 'input, select, textarea', function() {
    if (! $(this).hasClass('w-no-cookie')) {
        setIntoCookie($(this));
    }
});
// set the .w-cookie-form values after load of document
$('.w-cookie-form input, .w-cookie-form select, .w-cookie-form textarea').each( function(){
    if (! $(this).hasClass('w-no-cookie')) { // there can be another form that want not set from cookie
        setFromCookie($(this));
    }
});


    /**
 * Bind a form input to another input or something else
 * add `.w-setter` for bind on.load
 *
 * @param _this HTML input element with value="", data-binded=".selector", data-binded-type="val,select,radio,html,text"
 */
function wBind(_this){
    var value = _this.val(),
        selector = _this.data('binded'),
        type = _this.data('binded-type');

    // set default type if not specified
    if(typeof type == 'undefined') {
        type = 'val';
    }

    // if radio, get the checked value and not booth
    if(_this.is('input[type=radio]')) {
        value = _this.closest('form').find('input[name="'+_this.attr('name')+'"]:checked').val();
        if(typeof value == 'undefined') {
            value = '';
        }
    }

    // not action if no value
    if (value == '') {
        return;
    }

    switch(type) {
        case 'val':
            $(selector).val(value);
            break;
        case 'select':
            $(selector+' option').removeAttr('selected');
            $(selector).val(value);
            $(selector+' option[value="'+value+'"]').attr('selected', 'selected');
            break;
        case 'radio':
            $(selector).removeAttr('checked');
            $(selector).prop('checked', false);
            $(selector).filter('[value="'+value+'"]').attr('checked', true).prop('checked', true);
            break;
        case 'html':
            $(selector).html(value);
            break;
        case 'text':
            $(selector).text(value);
            break;
    }

    // children_age_form things & datepicker
    if($(selector).attr('name') == 'num_children' || $(selector).hasClass('range')) {
        $(selector).trigger('keyup');
    }

    // range datepicker update dates on bind
    if($(selector).hasClass('range')) {
        $(selector).closest('.period').datepicker('updateDates');
        if($(selector).hasClass('w-cookie') || $(selector).closest('form').hasClass('w-cookie-form')) {
            setIntoCookie($(selector));
        }
    }

    clog('wBind() ' + selector + ' - ' + type + ' - ' + value);
}
// universal on bind change /* todo: i remove keyup, previously added cause it broke functionality by doing an infinite loop on datepicker, need to check and fix! */
$(document).on('change blur click', '.w-binded', function() {
    wBind($(this));
});
// @todo: selector with a -form suffixed for work on all elements in a form
// set the binded value after load of document
$('.w-binded.w-setter').each( function(){
    wBind($(this));
    // setIntoCookie($(this)); combine w-binded and w-cookie
});
});

$(function(){
    if ($().slick) {
        /* Slick activation other settings are made by data-slick="{}" api */
        $(".slick-carousel").slick({
            slidesToShow: 4,
            slidesToScroll: 3,
            autoplay: true,
            dots: true,
            arrows: true,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        dots: true,
                        arrows: true,
                        infinite: true,
                        slidesToShow: 3,
                        slidesToScroll: 2
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        dots: false,
                        arrows: true,
                        infinite: true,
                        slidesToShow: 2,
                        slidesToScroll: 2
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        dots: false,
                        arrows: true,
                        infinite: true,
                        slidesToShow: 2,
                        slidesToScroll: 1
                    }
                }
            ]
        });
    }
});

/*
 Copyright 2014 Google Inc. All rights reserved.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 */

/**
 * Cookie Choice Banner
 * include `js/web/w-cookie_choice.js`, `css/web/w-cookie_choice.css` or if u use build files this are yet included
     <script>
        document.addEventListener('DOMContentLoaded', function (event) {
            cookieChoices.showCookieConsentBar("Questo sito utilizza i cookies per migliorare l'esperienza di navigazione. Utilizzando il sito l'utente accetta tutti i cookies.",
                'OK', 'Privacy Policy', "/privacy-url");
        });
     </script>
 *
 * En: This site uses cookies to improve the browsing experience. By using this site you agree to all cookies
 * Fr: Ce site utilise des cookies pour améliorer l'expérience de navigation. En utilisant ce site, vous acceptez tous les cookies
 * De: Diese Seite benutzt Cookies , um den Browser-Erfahrung zu verbessern. Durch die Nutzung der Website erklären Sie sich mit allen Cookies
 * Es: Este sitio utiliza cookies para mejorar la experiencia de navegación. Al usar este sitio usted acepta todas las cookies
 * Hu: Ez a webhely cookie-kat használ a böngészési élmény javítása érdekében. Az oldal használatával elfogadja az összes cookie-t
 * Nl: Deze site maakt gebruik van cookies om de browser-ervaring te verbeteren. Door deze site te gebruiken, gaat u akkoord met alle cookies
 * Pl: Ta witryna używa plików cookie, aby poprawić doświadczenie przeglądania. Korzystając z tej witryny zgadzasz się na wszystkie pliki cookie
 * Pt: Este site usa cookies para melhorar a experiência de navegação. Ao usar este site você concorda com todos os cookies
 * Ru: Нажимая кнопку или продолжая использовать сайт, вы разрешаете нам собирать информацию посредством использования файлов «cookie»
 *
 */
(function (window) {

    if (!!window.cookieChoices) {
        return window.cookieChoices;
    }

    var document = window.document;
    // IE8 does not support textContent, so we should fallback to innerText.
    var supportsTextContent = 'textContent' in document.body;
//  var supportsTextContent;
    /*
     if( document.body.textContent ) {
     supportsTextContent=true;
     }
     else{
     supportsTextContent=false;
     }
     */

    var cookieChoices = (function () {

        var cookieName = 'displayCookieConsent';
        var cookieConsentId = 'cookieChoiceInfo';
        var dismissLinkId = 'cookieChoiceDismiss';

        function _createHeaderElement(cookieText, dismissText, linkText, linkHref) {
            //var butterBarStyles = 'position:fixed;width:100%;background-color:#eee;' +
            //    'margin:0; left:0; bottom:0;padding:4px;z-index:1000;text-align:center;';

            var cookieConsentElement = document.createElement('div');
            cookieConsentElement.id = cookieConsentId;
            //lo stile lo imposto da css
            //cookieConsentElement.style.cssText = butterBarStyles;
            cookieConsentElement.appendChild(_createConsentText(cookieText));

            if (!!linkText && !!linkHref) {
                cookieConsentElement.appendChild(_createInformationLink(linkText, linkHref));
            }
            cookieConsentElement.appendChild(_createDismissLink(dismissText));
            return cookieConsentElement;
        }

        function _createDialogElement(cookieText, dismissText, linkText, linkHref) {
            var glassStyle = 'position:fixed;width:100%;height:100%;z-index:999;' +
                'top:0;left:0;opacity:0.5;filter:alpha(opacity=50);' +
                'background-color:#ccc;';
            var dialogStyle = 'z-index:1000;position:fixed;left:50%;top:50%';
            var contentStyle = 'position:relative;left:-50%;margin-top:-25%;' +
                'background-color:#fff;padding:20px;box-shadow:4px 4px 25px #888;';

            var cookieConsentElement = document.createElement('div');
            cookieConsentElement.id = cookieConsentId;

            var glassPanel = document.createElement('div');
            glassPanel.style.cssText = glassStyle;

            var content = document.createElement('div');
            content.style.cssText = contentStyle;

            var dialog = document.createElement('div');
            dialog.style.cssText = dialogStyle;

            var dismissLink = _createDismissLink(dismissText);
            dismissLink.style.display = 'block';
            dismissLink.style.textAlign = 'right';
            dismissLink.style.marginTop = '8px';

            content.appendChild(_createConsentText(cookieText));
            if (!!linkText && !!linkHref) {
                content.appendChild(_createInformationLink(linkText, linkHref));
            }
            content.appendChild(dismissLink);
            dialog.appendChild(content);
            cookieConsentElement.appendChild(glassPanel);
            cookieConsentElement.appendChild(dialog);
            return cookieConsentElement;
        }

        function _setElementText(element, text) {
            if (supportsTextContent) {
                element.textContent = text;
            } else {
                element.innerText = text;
            }
        }

        function _createConsentText(cookieText) {
            var consentText = document.createElement('span');
            _setElementText(consentText, cookieText);
            return consentText;
        }

        function _createDismissLink(dismissText) {
            var dismissLink = document.createElement('a');
            _setElementText(dismissLink, dismissText);
            dismissLink.id = dismissLinkId;
            dismissLink.href = '#';
            dismissLink.style.marginLeft = '24px';
            return dismissLink;
        }

        function _createInformationLink(linkText, linkHref) {
            var infoLink = document.createElement('a');
            _setElementText(infoLink, linkText);
            infoLink.href = linkHref;
            infoLink.target = '_blank';
            infoLink.style.marginLeft = '8px';
            return infoLink;
        }

        function _dismissLinkClick() {
            _saveUserPreference();
            _removeCookieConsent();
            return false;
        }

        function _showCookieConsent(cookieText, dismissText, linkText, linkHref, isDialog) {
            if (_shouldDisplayConsent()) {
                _removeCookieConsent();
                var consentElement = (isDialog) ?
                    _createDialogElement(cookieText, dismissText, linkText, linkHref) :
                    _createHeaderElement(cookieText, dismissText, linkText, linkHref);
                var fragment = document.createDocumentFragment();
                fragment.appendChild(consentElement);
                document.body.appendChild(fragment.cloneNode(true));
                document.getElementById(dismissLinkId).onclick = _dismissLinkClick;
            }
        }

        function showCookieConsentBar(cookieText, dismissText, linkText, linkHref) {
            _showCookieConsent(cookieText, dismissText, linkText, linkHref, false);
        }

        function showCookieConsentDialog(cookieText, dismissText, linkText, linkHref) {
            _showCookieConsent(cookieText, dismissText, linkText, linkHref, true);
        }

        function _removeCookieConsent() {
            var cookieChoiceElement = document.getElementById(cookieConsentId);
            if (cookieChoiceElement != null) {
                cookieChoiceElement.parentNode.removeChild(cookieChoiceElement);
            }
        }

        function _saveUserPreference() {
            // Set the cookie expiry to one year after today.
            var expiryDate = new Date();
            expiryDate.setFullYear(expiryDate.getFullYear() + 1);
            document.cookie = cookieName + '=y;' + ' Path=/; SameSite=Strict; expires=' + expiryDate.toGMTString();
        }

        function _shouldDisplayConsent() {
            // Display the header only if the cookie has not been set.
            return !document.cookie.match(new RegExp(cookieName + '=([^;]+)'));
        }

        var exports = {};
        exports.showCookieConsentBar = showCookieConsentBar;
        exports.showCookieConsentDialog = showCookieConsentDialog;
        return exports;
    })();

    window.cookieChoices = cookieChoices;
    return cookieChoices;
})(this);

