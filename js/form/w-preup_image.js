/*
<?php
    $input_id = (isset($input_id) && $input_id) ?: 'by_poster';
    ?>

<div class="{{ ($errors->has("picture")) ? ' has-error' : '' }}">
    @if($entity->picture)
    <?php
    $data_content = '<img src="'.$entity->picture.'" class="img-responsive" style="width:250px; height:200px;"/>';
$clear_class = '';
    ?>
<p class="text-center"><a id="{{ $input_id }}_gallery" href="{{ $entity->picture }}" data-gallery="poster" class="text-black-a"><i class="fa fa-image"></i> {{ trans('core::core.open') }}</a></p>
    @else
<?php
    $data_content = 'no image';
$clear_class = 'display-none';
    ?>
<p class="text-center"><a id="{{ $input_id }}_gallery" href="" data-gallery="poster" class="text-black-a display-none"><i class="fa fa-image"></i> {{ trans('core::core.open') }}</a></p>
    @endif

<div id="{{ $input_id }}_preview"
class="input-group image-preview"
data-title="{{ trans('media::media.preview') }} <button type='button' id='close-preview' class='close pull-right'>x</button>"
data-content="{{ $data_content }}">

    <input id="{{ $input_id }}_input" type="text" class="form-control image-preview-filename" value="{{ old('picture', $entity->picture) }}" name="picture">

    <span class="input-group-btn">
    <!-- image-preview-clear button -->
<button type="button" class="btn btn-default image-preview-clear {{ $clear_class }}">
    <span class="glyphicon glyphicon-remove"></span> {{ trans('media::media.clear') }}
    </button>

    <!-- image-preview-input -->
    <div class="btn btn-default image-preview-input" data-inputid="{{ $input_id }}" onclick="return openElFinder(event, '{{ $input_id }}');">
    <span class="glyphicon glyphicon-folder-open"></span>
    <span class="image-preview-input-title">{{ trans('media::media.Browse') }}</span>
</div>
</span>
</div>

{!! $errors->first('picture', '<span class="help-block">:message</span>') !!}
</div>
*/

// FILE UPLOAD PREVIEW #################################
// https://bootsnipp.com/snippets/featured/input-file-popover-preview-image
$(document).on('click', '#close-preview', function () {
    $('.image-preview').popover('hide');
    // click for open/close the preview
    $('.image-preview').mouseenter(function () {
        $('.image-preview').popover('show');
    });
});
$(function () {
    // Set the popover default content
    $('.image-preview').popover({
        trigger: 'manual',
        placement: 'bottom',
        html: true
    }).popover('show');
    // Clear event
    $('.image-preview-clear').click(function () {
        $('.image-preview').attr("data-content", "").popover('hide');
        $('.image-preview-filename').val("");
        $('.image-preview-clear').hide();
        $('.image-preview-input input:file').val("");
        $(".image-preview-input-title").text("Browse");
    });
    // Create the preview image
    $(".image-preview-input input:file").change(function () {
        var img = $('<img/>', {
            id: 'dynamic',
            width: 250,
            height: 200
        });
        var file = this.files[0];
        var reader = new FileReader();
        // Set preview image into the popover data-content
        reader.onload = function (e) {
            $(".image-preview-input-title").text("Change");
            $(".image-preview-clear").show();
            $(".image-preview-filename").val(file.name);
            img.attr('src', e.target.result);
            $(".image-preview").attr("data-content", $(img)[0].outerHTML).popover("show");
        }
        reader.readAsDataURL(file);
    });
});
// FILE UPLOAD PREVIEW ######################################## END #######################################
