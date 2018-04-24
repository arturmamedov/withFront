// #jQuery.plugin - raty for a star rating view
if ($().raty) {
    /**
     * Raty - https://github.com/wbotelhos/raty
     * with data API initialization from https://github.com/wbotelhos/raty/pull/168
     * get only the star type or set my prefered icon type and all others from data-api:
     * <span class="getraty" data-score="5" data-star-on="fa fa-star" data-star-off="" data-read-only="true"></span>
     *
     */
    $('.getraty').each(function () {
        // startype = i
        var startype = $(this).data('startype');
        if (typeof startype == 'undefined' || startype.length == 0)
            startype = 'i';

        // readonly = true
        var readonly = $(this).data('readonly');
        if (typeof readonly == 'undefined' || readonly.length == 0)
            readonly = true;

        // score = 5
        var score = $(this).data('score');
        if (typeof score == 'undefined' || score.length == 0)
            score = 5;

        $(this).raty({starType: startype, readOnly: readonly, score: score});
    });
} // END - #jQuery.raty