/**
 * Set values of inputs or elements from cookie
 *
 * @param _this HTML input element with data-name="" or name="" that correspond to cookie name, data-cookie-type="val,select,radio,html,text"
 */
function setFromCookie(_this){
    var selector = _this.data('binded'),
        type = _this.data('cookie-type');;

    // get name from name="" or data-name=""
    var name = _this.attr('name');
    if(typeof name == 'undefined') {
        name = _this.data('name');
    }

    // get value from cookie
    var value = wCookies().get(name);
    if(typeof value == 'undefined' || value == '') {
        // if ($debug) {
        //     console.info('setFromCookie() No value ' + name + ' - ' + value);
        // }
        return false;
    }

    // type of element where put data
    if(typeof type == 'undefined') {
        type = 'val';
    }

    switch(type) {
        case 'val':
            _this.val(value);
            break;
        case 'select':
            $('option', _this).removeAttr('selected');
            _this.val(value);
            $('option[value='+value+']', _this).attr('selected', 'selected');
            break;
        case 'theme-select':
            $('option', _this).removeAttr('selected');
            _this.val(value);
            $('option[value='+value+']', _this).attr('selected', 'selected');

            // theme things
            var $span = _this.parent('.select').find('span'),
                textchange = _this.find('option[selected=selected]').text();
            $span.text(textchange);
            // end theme things
            break;
        case 'radio':
            _this.removeAttr('checked');
            _this.prop('checked', false);
            _this.closest('form').find('input[name='+_this.attr('name')+']').filter('[value="'+value+'"]').attr('checked', true).prop('checked', true);
            break;
        case 'html':
            _this.html(value);
            break;
        case 'text':
            _this.text(value);
            break;
    }

    // children_age_form things & datepicker
    if($(selector).attr('name') == 'num_children' || $(selector).hasClass('range')) {
        $(selector).trigger('keyup');
    }

    // if ($debug) {
    //     console.info('setFromCookie() ' + name + ' - ' + type + ' - ' + value);
    // }
}
/**
 * Set values of inputs or elements into cookie `.w-cookie`
 *
 * @param _this HTML input element with data-name="" or name="" that correspond to cookie name, data-value="" or value=""
 */
function setIntoCookie(_this) {
    // get name from name="" or data-name=""
    var name = _this.attr('name');
    if (typeof name == 'undefined') {
        name = _this.data('name');
    }

    // get value from input value="" or data-value="" of element
    var value = _this.val();
    if (typeof value == 'undefined') {
        value = _this.data('value');
    }

    // not action if no value
    if (value == '') {
        return;
    }

    // set into cookie
    wCookies().set(name, value);

    // if ($debug) {
    //     console.info('setIntoCookie() ' + name + ' - ' + value);
    // }
}
// universal on .w-cookie input/element change
$(document).on('change blur click', '.w-cookie', function() {
    setIntoCookie($(this));
});
// set the .w-cookie values after load of document
$('.w-cookie').each( function(){
    setFromCookie($(this));
});