/**
 * Boxes AutoHeight
 *
 * @dependencies [w-breakpoints]
 * @param columns
 *
 * data-weh-add="50" add 50px to all
 *
 * @todo: css relative class for IDE support
 */
function withEqualHeight(columns) {
    var tallestcolumn = 0, add = parseInt(columns.first().attr('data-weh-add'));
    if (isNaN(add)) {
        add = 0;
    }
    columns.each(
        function () {
            $(this).css('height', 'auto');
            var currentHeight = $(this).height();
            if (currentHeight > tallestcolumn) {
                tallestcolumn = currentHeight;
            }
        }
    );
    columns.height(tallestcolumn + add);
}

$(window).on('load resize', function () {
    // .withAutoHeight > .weh for elements, non in `xs` media screen
    if (!isXs.matches) {
        $('.withEqualHeight').each(function () {
            withEqualHeight($(this).find('.weh'));
        });
    }
    // .withAutoHeightAll > .weh for all elements
    $('.withEqualHeightAll').each(function () {
        withEqualHeight($(this).find('.weh'));
    });
});