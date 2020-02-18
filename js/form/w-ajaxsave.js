/**
 * Form that need be send with Ajax and with CakePHP 3.x
 *
 * @dependencies [w-alert]
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
                    if (typeof withAlert == 'function') {
                        withAlert(json.message, 'success');
                    } else {
                        alert(json.message);
                    }

                    if($(thisForm).data('scallback').length > 0)
                    {
                        eval($(thisForm).data('scallback'));
                    }
                } else {
                    if (typeof withAlert == 'function') {
                        withAlert(json.message, 'danger');
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
                if (typeof withAlert == 'function') {
                    withAlert('Unexpected error! Errore inaspettato!');
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