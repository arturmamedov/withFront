/**
 * Aggiunge un input che crea altri input in base al valore che ha
 * esempio: numero bambini e un input per l'eta di ogni bambino
 *
 * form.children_age_form
 * input.child_num_input
 * div#child_ageClone
 *
 * --- and ---
 *
 * <form class="... children_age_form"> ...
 * <input type="number" class="form-control child_num_input" min="0" max="5" name="num_children">
 *
 *  --- and ---
 *
 *     <div class="col-sm-2 pull-right display-none" id="child_ageClone">
 *           <div class="form-group">
 *               <input type="number" placeholder="0" class="form-control" name="age_children[]" value="1" max="17" min="0" disabled/>
 *
 *           <label>Children <span class="jq_child_num">1</span></label>
 *           </div>
 *        </div>
 *
 *  --- and ---
 *
 *  $php
 *      $children_number = $_POST['num_children']); // 3
 *      $children_age = implode(', ', $_POST['age_children']); // 3, 6, 7
 *  $endphp
 *
 * max children: default 5 (configurable by max attribute)
 * @todo: keep values of yet insterted children ages
 * @type {any}
 */
$(".children_age_form").each(function () {
    var form = $(this), max_children = parseInt($('.child_num_input', form).attr('max'));

    if (typeof max_children == 'undefined') {max_children = 5;}

    form.on('keyup change', '.child_num_input', function () {
        // if counter are equal 0 - do nothing
        var _childNum = $('.child_num_input', form).val();
        if (_childNum == 0) {
            childNum = 0;
            $("[id^='child_age_']", form).remove();
            return false;
        }
        // over 5 chlids are invalid
        if (_childNum > max_children) {
            $('body').gdivMessage('No more then '+max_children+' childs / Non più di '+max_children+' bambini', 'warning', {hidetime: 7000});
            $('.child_num_input', form).val(max_children);
            return false;
        }

        $("[id^='child_age_']", form).remove();
        for (var _cN = 1; _cN <= _childNum; _cN++) {
            var childClone = $('#child_ageClone', form).clone();

            // change params
            childClone.attr('id', 'child_age_' + _cN);
            childClone.find('.jq_child_num').text(_cN);
            // input //you can also change `name` attribute etc. ex: .attr('name', 'Camera_1_EtaBambino_' + _cN)
            childClone.find('input')
                .prop("disabled", false)
                .removeProp('disabled')
                .attr('data-binded', childClone.find('input').attr('data-binded') + _cN + ' input');

            // attach and show
            $('#child_ageClone', form).after(childClone);
            childClone.show();

            form.css('padding-bottom', '10px');
        }
        childNum = $('.child_num_input', form).val();
    });

    // init childNum counter
    var childNum = $('.child_num_input', form).val();
    if (childNum > 0) {
        function addAges(childNum) {
            for (var _cN = 1; _cN <= childNum; _cN++) {
                if (_cN > max_children) {
                    $('.child_num_input', form).val(max_children);
                    return false;
                }
                var childClone = $('#child_ageClone', form).clone();

                // change params
                childClone.attr('id', 'child_age_' + _cN);
                childClone.find('.jq_child_num').text(_cN);
                // input // you can also change `name` attributeetc. ex: .attr('name', 'Camera_1_EtaBambino_' + _cN)
                childClone.find('input')
                    .prop("disabled", false)
                    .removeProp('disabled')
                    .attr('data-binded', childClone.find('input').attr('data-binded') + _cN + ' input');

                // attach and show
                $('#child_ageClone', form).after(childClone);
                childClone.show();

                form.css('padding-bottom', '10px');
            }
        }

        addAges(childNum);
    }
});