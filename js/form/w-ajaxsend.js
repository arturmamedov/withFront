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
                    $(form).find('[name='+err+']').parent()
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