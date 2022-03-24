/**
 * Add event to `.child_num_input` for clone `#child_ageClone` on change
 * to create as many inputs as is the number of children
 *
 * @dependencies [w-alert]
 *
 * @param  form  The form on that it work `.children_age_form`
 * @param  childNum  The number of children, for create it age inputs
 *
 * <form>.children_age_form
 * <input>.child_num_input
 * <div>#child_ageClone
 *
 * --- and ---
 *
 * <form class="children_age_form">
 * <input type="number" class="form-control child_num_input" min="0" max="5" name="num_children">
 *
 * if is select input add class .input_select after .child_num_input
 *
 *  --- and ---
 *
 *     <div class="col-sm-2 pull-right display-none" id="child_ageClone" data-attr-name="if_you_want_change_the_attr_name_dynamically">
 *         <div class="form-group">
 *             <input type="number" placeholder="0" class="form-control" name="age_children[]" value="0" max="17" min="0" disabled/>
 *
 *             <label>Children <span class="jq_child_num">1</span></label>
 *         </div>
 *     </div>
 *
 *  --- and ---
 *
 *  $php
 *      $children_number = $_POST['num_children']); // 3
 *      $children_age = implode(', ', $_POST['age_children']); // 3, 6, 7
 *  $endphp
 *
 * max children: default 5 (configurable by max attribute)
 * @todo: keep values of yet inserted children ages (w-cookie)
 * @type {any}
 */
function addAges(form, childNum) {
    $("[id^='child_age_']", form).remove(); // first remove all
    childNum = parseInt(childNum);

    // if counter are equal 0 - do nothing
    if (childNum == 0) {
        return false;
    }

    // set {max_children}
    var max_children = parseInt($('.child_num_input', form).attr('max'));
    if (typeof max_children == 'undefined') {
        max_children = 5;
    }
    // over {max_children} are invalid
    if (childNum > max_children) {
        if (typeof withAlert == 'function') {
            withAlert('No more then ' + max_children + ' childs / Non più di ' + max_children + ' bambini', 'warning', {hidetime: 7000});
        } else {
            alert('No more then ' + max_children + ' childs / Non più di ' + max_children + ' bambini', 'warning');
        }
        $('.child_num_input', form).val(max_children);

        childNum = max_children;
    }

    for (var _cN = 1; _cN <= childNum; _cN++) {
        if (_cN > max_children) {
            $('.child_num_input', form).val(max_children);
            return false;
        }
        var childClone = $('#child_ageClone', form).clone();

        // change params
        childClone.attr('id', 'child_age_' + _cN);
        childClone.find('.jq_child_num').text(_cN);
        // input
        childClone.find('input')
            .prop("disabled", false)
            .removeProp('disabled')
            .attr('data-binded', childClone.find('input').attr('data-binded') + _cN + ' input');
        // `data-attr-name` you can also change other attributes ex: .attr('placeholder', 'Eta Bambino_' + _cN)
        if (typeof childClone.attr('data-attr-name') != 'undefined' && childClone.attr('data-attr-name').length) {
            childClone.find('input').attr('name', childClone.attr('data-attr-name') + _cN);
        }

        // attach and show
        $('#child_ageClone', form).after(childClone);
        childClone.show();
    }
}
$(".children_age_form").each(function () {
    var form = $(this);
    clog('.children_age_form: Enabled');

    // add event trigger for form
    form.on('keyup change', '.child_num_input', function () {
        clog('.children_age_form: Form input change');
        // loop and add age inputs
        if ($(this).attr('type') == 'checkbox' || $(this).attr('type') == 'radio' || $(this).hasClass('checkbox_input')) {
            clog('.children_age_form: Input checkbox or radio, value= '+$('.child_num_input:checked', form).val());
            addAges(form, $('.child_num_input:checked', form).val());
        } else if ($(this).hasClass('select_input')) {
            clog('.children_age_form: Input .select_input, value= '+$('.child_num_input:selected', form).val());
            addAges(form, $('.child_num_input:selected', form).val());
        } else {
            clog('.children_age_form: Input value= '+$('.child_num_input', form).val());
            addAges(form, $('.child_num_input', form).val());
        }
    });

    // init childNum counter
    $(function(){
        // we need to wait for wCookie set of value in some case
        setTimeout(function() {
            var _cni = $('.child_num_input', form);
            if (_cni.attr('type') == 'checkbox' || _cni.attr('type') == 'radio') {
                addAges(form, $('.child_num_input:checked', form).val());
            } else if (_cni.hasClass('select_input')) {
                addAges(form, $('.child_num_input:selected', form).val());
            } else {
                addAges(form, $('.child_num_input', form).val());
            }
        }, 3000);
    });
});
