/**
 * Replace mobile URL of WhatsApp with Desktop
 * The mobile first strategy is used cause most people decide to not show WhatsApp on Desktop but only on mobile where it is very useful
 *
 * @dependencies [ core/w-ismobile.js ]
 */
if(withOptions.whatsappWeb && !jQuery.browser.mobile && $(".whatsapp-weburl").length > 0){
    var mobile_wa = $(".whatsapp-weburl").attr('href').replace('?text=', '&text');
    mobile_wa = mobile_wa.replace('https://wa.me/', 'https://web.whatsapp.com/send?phone=+39')

    $(".whatsapp-weburl").attr('href', mobile_wa);
}