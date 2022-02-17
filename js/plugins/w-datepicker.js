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
