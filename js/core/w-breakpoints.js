// detect if the width of screen is bootstrap xs, sm, md, lg
var isXs = window.matchMedia("(max-width: 768px)"),
    isSm = window.matchMedia("(min-width: 768px) and (max-width: 991px)"),
    isMd = window.matchMedia("(min-width: 992px) and (max-width: 1199px)"),
    isLg = window.matchMedia("(min-width: 1200px)"),
    //Bootstrap4 style
    is4sm = window.matchMedia("(min-width: 576px)"),
    is4md = window.matchMedia("(min-width: 768px)"),
    is4lg = window.matchMedia("(min-width: 992px)"),
    is4xl = window.matchMedia("(min-width: 1200px)");