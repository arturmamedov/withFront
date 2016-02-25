/* * * * * * * * * * * * * * * * * * 
 * * * * *  gDiv Message * * * * * *
need Bootstrap alert and some css:
.withAlert {left: 15%; position: fixed !important; text-align: center; top: 55px; width: 70%; z-index: 5000;}
* * * * * * * * * * * * * * * * * */
(function($){
    $.fn.gdivMessage = function(message, type, options){
        var defaults = {autohide: true, hidetime: 4000};
        var opts = $.extend(defaults, options);
        var zindex = 5001, top = 40, alert_count = 1;
        if(!message){
            message = 'Errore inaspettato. Scusate per il disagio. (Unexpected Error)';
        } if(!type) {
            type = 'warning';
        }

        alert_count = parseInt($(".withAlert").length);
        zindex = alert_count + 5001;
        top =  alert_count * top;
        if(top > 100){
            top = 100 + (alert_count * 3);
            if(top > 150){
                top = 150;
            }
        }

        // qui creiamo il codice del alert
        var element = '<div class="withAlert alert alert-'+type+' alert-dismissible" style="z-index: '+ zindex +'; top: '+ top +'px;"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button><span class="message">'+message+'</span><div class="clearfix"></div></div>';

        var eobj = $(element).clone();

        $(eobj).appendTo("body");
        if(opts.autohide){
            setTimeout(function(){$(eobj).hide('slow', function(){$(this).remove();});}, opts.hidetime);
        }
    };
})(jQuery);
$("body").on('click', ".withAlert .close", function(){
    $(this).parent().hide('slow', function(){$(this).remove();});
});
/* * * * ----- gDiv Message ----- * * */

/* jQuery plugins and other thing that need to be run after the document is load */	
$(document).ready(function () {
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
	 * init nicescroll 
	 */
	$("html, .withNicescroll").niceScroll();
	
	/**
	 * Add target highlight to something
	 */
	$("body").on('click', '.targetLink', function(){
        var elem = $(this).data('target');
        $(elem).addClass('target');
		if($(this).data('auto-close') != 'false'){
			var ac = parseInt($(this).data('auto-close'));
			if(ac == 0){
				ac = 3500;
			}
			setTimeout(function(){$(elem).removeClass('target');}, ac);
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
	
	/**
	 * Raty - https://github.com/wbotelhos/raty
     * with data API initialization from https://github.com/wbotelhos/raty/pull/168
     * get only the star type or set my prefered icon type and all others from data-api:
     * <span class="getraty" data-score="5" data-star-on="fa fa-star" data-star-off="" data-read-only="true"></span>
     */
    $('.getraty').each(function(){
        var startype = $(this).data('startype');
        if(typeof startype == 'undefined' || startype.length == 0)
            startype = 'i';
        $(this).raty({starType: startype});
    });
	
	/**
	 * withBox
	 * #showhide https://gist.github.com/arturmamedov/2bdfc3f69828ac37a7a1
	 */
    $(".withBox").on('click', ".showhideBox", function(){
        var thisBox = $(this), parent = false;
        while(parent == false){
            thisBox = thisBox.parent();
            if(thisBox.hasClass('withBox')){
                parent = true;
            }
        }
        
        $(".shBox", thisBox).toggle(200);
        $(".shSwitch", thisBox).toggle(1, function(){
            if($(this).hasClass('set'))
                $(this).removeClass('set');
            else
                $(this).addClass('set');
        });
    });
    // no close on himself click
    $(".withBox.collapsable").mouseup(function(){ return false; });
    // close on document click
    $(document).mouseup(function(){
        $(".shBox", $(".withBox.collapsable")).slideUp();
        var shSwitch = $(".shSwitch",  $(".withBox.collapsable"));
        if(shSwitch.hasClass('set'))
            shSwitch.toggle(1, function(){
                if($(this).hasClass('set'))
                    $(this).removeClass('set');
                else
                    $(this).addClass('set');
            });
    });
});
