$(".w-sliding-panel").each(function () {
    var slidingPanel = $(this),
        slidingBtn = $('.w-sliding-btn[data-target="#'+$(this).attr('id')+'"]'),
        noCloseBtn = slidingBtn.data('noCloseBtn');

    // Get the calculated left position
    var slidingPanel_left = slidingPanel.offset().left;
    var slidingPanel_width = $(document).width();
    // Set the left to its calculated position
    slidingPanel.css({left:slidingPanel_left, width:slidingPanel_width});

    // on click slide
    slidingBtn.on('click', function () {
        showGestPanel();
    });
    slidingPanel.on('click', '.close-panel', function () {
        hideGestPanel();
    });
    // on resize
    $(window).on('resize', function () {
        // get new width for hide
        slidingPanel_width = $(document).width();
        hideGestPanel(); // hide panel for resize it and change position

        // Get the calculated left position
        slidingPanel_left = slidingPanel.offset().left;
        // Set the left to its calculated position
        slidingPanel.css({left:slidingPanel_left, width:slidingPanel_width});
    });

    function showGestPanel(){
        slidingPanel.animate({"left":"0px"});
        console.info(noCloseBtn)
        if (!noCloseBtn) {
            console.info('hide')
            slidingBtn.animate({"left":"-999px"});
        }
    }
    function hideGestPanel(){
        slidingPanel.animate({"left":'-'+slidingPanel_width+'px'});
        if (!noCloseBtn) {
            slidingBtn.animate({"left": "0"});
        }
    }

    // close on document click
    $(document).mouseup(function () {
        hideGestPanel();
    });
});
// no close on himself click
$(".w-sliding-panel").mouseup(function () {
    return false;
});
