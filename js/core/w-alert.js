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
