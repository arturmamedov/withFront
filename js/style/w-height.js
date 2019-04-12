/**
 * Boxes AutoHeight
 *
 * @dependencies [w-breakpoints]
 * @param columns 'selector for the element to make equal'
 * @param direction [optional] '<', '>', '='
 *
 * Add class to father element
 * `.withEqualHeight` = for small device and higher (not for xs)
 * `.withEqualHeightInverse` = for the smallest element instead of tallest
 * `.withEqualHeightLike` = for equal height element like the element with .wehl class
 * by adding All at the end ex: `.withEqualHeightAll` = for extra small device and higher
 *
 * And to all child add class `.weh` and `.wehl` if you wont a height like specific element
 *
 * If you want additional height to all elements (ex: for add a button with absolute position etc.)
 * Add `data-weh-add="50"` to children `.weh` elements (add 50px to all)
 *
 * @todo: css relative class for IDE support
 */
function withEqualHeight(columns, direction) {
    var columnHeight= 0, add = parseInt(columns.first().attr('data-weh-add')), i=0;
    if (isNaN(add)) {
        // check for data-weh-add in parent
        add = parseInt(columns.parents('[class*="withEqualHeight"]').attr('data-weh-add'))
        if (isNaN(add)) {
            add = 0;
        }
    }
    if (typeof direction == 'undefined') {
        direction = '>';
    }

    if (direction == '=') {
        var likeColumn = columns.parents('.withEqualHeightLike').find('.wehl').first();
        likeColumn.css('height', 'auto');
        columnHeight = likeColumn.height();
    } else {
        columns.each(
            function (i) {
                $(this).css('height', 'auto');
                var currentHeight = $(this).height();
                if (direction == '>') {
                    if (currentHeight > columnHeight) {
                        columnHeight = currentHeight;
                    }
                } else if (direction == '<') {
                    if (i == 0) {
                        columnHeight = currentHeight;
                    }
                    if (currentHeight <= columnHeight) {
                        columnHeight = currentHeight;
                    }
                }
                i++;
            }
        );
    }
    columns.height(columnHeight+ add);
}

$(window).on('load resize', function () {
    // .withEqualHeight > .weh for elements, non in `xs` media screen
    if (!isXs.matches) {
        $('.withEqualHeight').each(function () {
            withEqualHeight($(this).find('.weh'));
        });
        // @todo: totest
        $('.withEqualHeightInverse').each(function () {
            withEqualHeight($(this).find('.weh'), '<');
        });
        $('.withEqualHeightLike').each(function () {
            withEqualHeight($(this).find('.weh'), '=');  // search for .wehl element and make all other equal to it
        });
    }
    // .withEqualHeightAll > .weh for all elements
    $('.withEqualHeightAll').each(function () {
        withEqualHeight($(this).find('.weh'));
    });
    // @todo: totest
    $('.withEqualHeightInverseAll').each(function () {
        withEqualHeight($(this).find('.weh'), '<');
    });
    $('.withEqualHeightLikeAll').each(function () {
        withEqualHeight($(this).find('.weh'), '='); // search for .wehl element and make all other equal to it
    });
});
