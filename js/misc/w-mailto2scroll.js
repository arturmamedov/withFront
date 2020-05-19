$('a[href^="mailto"]').each(function(){
    var href_mailto = this.href.replace('mailto:', '');
    $(this).attr('href', '#w-email').addClass('w-scroll w-email-ga').data('ga', href_mailto).data('topOffset', 110);
});
