/**
 * Boxes AutoHeight
 *
 * @dependencies [w-breakpoints]
 * @param columns
 *
 * Add class to father element
 * `.withEqualHeight` = for small device and higher (not for xs)
 * `.withEqualHeightAll` = for extra small device and higher
 *
 * And to all child add class `.weh`
 *
 * If you want additional height to all elements (ex: for add a button with absolute position etc.)
 * Add `data-weh-add="50"` to children `.weh` elements (add 50px to all)
 *
 * @todo: css relative class for IDE support
 * @todo: i think the best way for data-weh-add is in father element and not in all children
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
    // .withEqualHeight > .weh for elements, non in `xs` media screen
    if (!isXs.matches) {
        $('.withEqualHeight').each(function () {
            withEqualHeight($(this).find('.weh'));
        });
    }
    // .withEqualHeightAll > .weh for all elements
    $('.withEqualHeightAll').each(function () {
        withEqualHeight($(this).find('.weh'));
    });
});