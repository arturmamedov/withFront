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
                // Google Analytics track (can be disabled and commented)
                if (typeof ga !== "undefined" && typeof form.data('gaSendPageview') != 'undefined') {
                    ga('send', 'pageview', form.data('gaSendPageview'));
                }
                if (typeof ga !== "undefined" && typeof form.data('gaqTrackPageview') != 'undefined') {
                    _gaq.push(['_trackPageview', form.data('gaqTrackPageview')]);
                }

                if (json.message.length) {
                    if (typeof withAlert == 'function') {
                        withAlert(json.message, 'success');
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