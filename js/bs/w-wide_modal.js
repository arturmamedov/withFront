// bootstrap wide modal - adjust height to fit entire page
$(".modalWide").on("show.bs.modal", function() {
    var height = $(window).height() - 200;
    $(this).find(".modal-body").css("max-height", height);
});
// END - bootstrap wide modal