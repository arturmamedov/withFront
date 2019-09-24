/**
 * Add target highlight to something
 *
 * data-target          [-]                CSS Selector for select the element on which apply
 * data-auto-close      [8000]             Bool or the ms for close
 * data-taregt-class    [on-target]        The class to add (default have CSS animation but it must be on the #anchor element also)
 */
$("body").on('click', '.targetLink, .w-target', function () {
    var elem = $(this).data('target');

    var autoClose = (typeof $(this).data('autoClose') != 'undefined') ? $(this).data('autoClose') : 8000;
    var targetClass = (typeof $(this).data('targetClass') != 'undefined') ? $(this).data('targetClass') : 'on-target';

    $(elem).addClass(targetClass);

    if (autoClose) {
        if (autoClose === true) {
            autoClose = 8000;
        }

        setTimeout(function () {
            $(elem).removeClass(targetClass);
        }, autoClose);
    }
});