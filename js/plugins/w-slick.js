$(function(){
    /* Slick activation other settings are made by data-slick="{}" api */
    $(".slick-carousel").slick({
        slidesToShow: 4,
        slidesToScroll: 3,
        autoplay: true,
        dots: true,
        arrows: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    dots: true,
                    arrows: true,
                    infinite: true,
                    slidesToShow: 3,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 600,
                settings: {
                    dots: false,
                    arrows: true,
                    infinite: true,
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    dots: false,
                    arrows: true,
                    infinite: true,
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            }
        ]
    });
});