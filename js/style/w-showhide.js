/**
 * withBox
 * 
 * div.withBox[.collapsable]
 * > div.showhideBox
 * > > div.shSwitch
 * > div.shBox
 *
 * ex: 
 * <div class="withBox collapsable">
 *       <h2 class="showhideBox text-underline">
 *           Switcher
 *
 *           <span class="pull-right">
 *               <i class="glyphicon glyphicon-chevron-right shSwitch"></i>
 *               <i class="glyphicon glyphicon-chevron-down shSwitch display-none"></i>
 *           </span>
 *       </h2>
 *
 *       <div class="shBox display-none">
 *            Content ...
 *       </div>
 * </div>
 *
 *
 * #showhide https://gist.github.com/arturmamedov/2bdfc3f69828ac37a7a1
 */
$(".withBox").on('click', ".showhideBox", function () {
    var thisBox = $(this), parent = false;
    while (parent == false) {
        thisBox = thisBox.parent();
        if (thisBox.hasClass('withBox')) {
            parent = true;
        }
    }

    $(".shBox", thisBox).toggle(200);
    $(".shSwitch", thisBox).toggle(1, function () {
        if ($(this).hasClass('set'))
            $(this).removeClass('set');
        else
            $(this).addClass('set');
    });
});
// no close on himself click
$(".withBox.collapsable").mouseup(function () {
    return false;
});
// close on document click
$(document).mouseup(function () {
    $(".shBox", $(".withBox.collapsable")).slideUp();
    
    var shSwitch = $(".shSwitch.set", $(".withBox.collapsable"));
    shSwitch.toggle(1, function () {
        $(this).removeClass('set');
    });
});
