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