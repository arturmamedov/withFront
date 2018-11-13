/**
 * Bind a form input to another input or something else
 * add `.w-setter` for bind on.load
 *
 * @param _this HTML input element with value="", data-binded=".selector", data-binded-type="val,select,radio,html,text"
 */
function wBind(_this){
    var value = _this.val(),
        selector = _this.data('binded'),
        type = _this.data('binded-type');

    // set default type if not specified
    if(typeof type == 'undefined') {
        type = 'val';
    }

    // if radio, get the checked value and not booth
    if(_this.is('input[type=radio]')) {
        value = _this.closest('form').find('input[name="'+_this.attr('name')+'"]:checked').val();
        if(typeof value == 'undefined') {
            value = '';
        }
    }

    // not action if no value
    if (value == '') {
        return;
    }

    switch(type) {
        case 'val':
            $(selector).val(value);
            break;
        case 'select':
            $(selector+' option').removeAttr('selected');
            $(selector).val(value);
            $(selector+' option[value="'+value+'"]').attr('selected', 'selected');
            break;
        case 'radio':
            $(selector).removeAttr('checked');
            $(selector).prop('checked', false);
            $(selector).filter('[value="'+value+'"]').attr('checked', true).prop('checked', true);
            break;
        case 'html':
            $(selector).html(value);
            break;
        case 'text':
            $(selector).text(value);
            break;
    }

    // children_age_form things & datepicker
    if($(selector).attr('name') == 'num_children' || $(selector).hasClass('range')) {
        $(selector).trigger('keyup');
    }

    // range datepicker update dates on bind
    if($(selector).hasClass('range')) {
        $(selector).closest('.period').datepicker('updateDates');
    }

    clog('wBind() ' + selector + ' - ' + type + ' - ' + value);
}
// universal on bind change
$(document).on('change blur click', '.w-binded', function() {
    wBind($(this));
});
// @todo: selector with a -form suffixed for work on all elements in a form
// set the binded value after load of document
$('.w-binded.w-setter').each( function(){
    wBind($(this));
    // setIntoCookie($(this)); combine w-binded and w-cookie
});