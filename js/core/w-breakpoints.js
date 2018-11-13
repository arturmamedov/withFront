// detect if the width of screen is bootstrap xs, sm, md, lg
var isMobile = window.matchMedia("only screen and (max-width: 768px)");
var isXs = window.matchMedia("(max-width: 768px)");
var isSm = window.matchMedia("(min-width: 768px) and (max-width: 991px)");
var isMd = window.matchMedia("(min-width: 992px) and (max-width: 1199px)");
var isLg = window.matchMedia("(min-width: 1200px)");