/** w-filter
 *  Filter items on button click or select change with data-filter=".selector"
 */
$(".w-filters").each(function(){
    var $grid = $(this);
    $grid.on('click change', '.w-filter', function() {
        var filterValue = '';

        if($(this).is('select')) {
            filterValue = $(this).val();
        } else if ($(this).is('radio')) {
            // @todo
            // console.info('radio');
            // console.info($(this).val());
        } else {
            // remove and add active state
            $grid.find('.w-filter').removeClass('active');
            $(this).addClass('active');

            // filter items
            filterValue = $(this).attr('data-filter');
        }

        // hide all elements
        $(".w-item", $grid).hide();
        // show filtered
        $(".w-item"+filterValue, $grid).show();
    });
});