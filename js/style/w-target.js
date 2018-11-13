/**
 * Add target highlight to something
 */
$("body").on('click', '.targetLink', function () {
    var elem = $(this).data('target');
    $(elem).addClass('target');
    if ($(this).data('auto-close') != 'false') {
        var ac = parseInt($(this).data('auto-close'));
        if (ac == 0) {
            ac = 3500;
        }
        setTimeout(function () {
            $(elem).removeClass('target');
        }, ac);
    }
});