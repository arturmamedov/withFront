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
