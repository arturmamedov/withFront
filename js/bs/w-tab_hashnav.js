/** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** **
 # # # # # # # hash-navigation # for bootstrap tabs # # # # # # # # #
 ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** **/
var hash = window.location.hash;
if (hash.length > 0 && $('.hash-navigation').length > 0) {
    $('a[href=' + hash + ']').tab('show');
}
// # look for changes in navigation and add it to url
$('.hash-navigation a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
    return location.hash = $(e.target).attr('href').substr(1);
});
/** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** **
 # # # # # # # # # # # hash-navigation # END # # # # # # # # # # # # #
 ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** **/