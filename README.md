# withFront `v1.5.3`
## The Front-end Tools and basic configs that i use for every project [see demo](https://arturmamedov.github.io/withFront/)
 
&nbsp;

[EN] During my development experience i encounter a lot of tools and configs for front-end, and this is one that i used most frequently!

[IT] Durante la mia esperienza di sviluppo, ho incontrato molti tools e configurazioni, front-end, queste qui sono quelle che uso più frequentemente e che consiglio di usare a tutti!

&nbsp;

### Installation

##### NPM
```
npm i withfront --save
```

##### Bower
```
bower install withFront --save
```
*invalid-meta because i want use the camelCase

&nbsp;

### CREDITS
HTML5 Boilerplate - https://github.com/h5bp/html5-boilerplate

Bootstrap - https://github.com/twbs/bootstrap

HEAD - https://github.com/joshbuchea/HEAD

#### Dependency and many Thank to:
jQuery - https://github.com/jquery/jquery

... raty, bootstrap-datepicker, selectize, iCheck, SVG-Loaders, nicescroll, bootstrapSwitch, bootstrap-daterangepicker, js-cookie, see bower.json for complete list

(you can remove the dependencies or not include script and their not will be made nothing cause there are a check before any action)

## Documentation (How to use)

#### Adding to web page
```html
<!-- Inside Tag head -->
<link rel="stylesheet" href="node_modules/bootstrap/css/bootstrap.min.css" type="text/css"/> <!-- bootstrap 3/4-->
<link rel="stylesheet" href="node_modules/withFront/dist/css/w-style.min.css" type="text/css"/> <!-- css tools -->

<!-- Better down in footer after all content and after include jQuery and Bootstrap -->
<script type="text/javascript" src="/node_modules/jquery/dist/jquery.min.js"></script>
<script type="text/javascript" src="/node_modules/bootstrap/dist/js/bootstrap.min.js"></script>

<script>
    // you can Configure wOptions for override withOptions
    var wOptions = {
        debug: true, // enable/disable Debug mode [defaule:false]
        wAppearBottomButton: true, // enable/disable widget/w-appear_btn.js [defaule:false]
        go2top: true, // enable/disable widget/w-go2top.js [defaule:true]
        htmlNicescroll: true, // [defaule:false]
        whatsappWeb: true, // replace WhatsApp mobile with Desktop on Desktop [defaule:true]
    };
</script>
<script type="text/javascript" src="/node_modules/withFront/withplugins.js"></script> <!-- js tools -->

```


##### You can add single file's also

All __scripts__ from `withplugins.js` have a separated file in __js folder__ also it are separated for context 
- core `js/core/`
core thing without it a lot of other script doesn't work properly. If you decide to non include it, be carefoul for dependencies in doc comment of each script.  
  - `w-alert.js` for notifications, if not included make a callback to browser alert how in form/w-ajaxsend.js 
  - `w-cookie.js` for save information in cookies, you can simply override it with your own implementation cause it have a interface behaviour 
  - `w-breakpoint.js` for isXs, isSm, isMd, isLg  functions (trivial but )
  - `w-core.js` here we have withOptions object with configuration and cLog() function for debug mode
  - `w-ismobile.js` detect if it is a mobile device (no like breakpoints that only check the size) `jQuery.browser.mobile` true/false

- bs `js/bs/` 
bootstrap tools
  - `w-hash_nav.js` for save \#hash 
  - `w-wide_modal.js` for auto adjust height of .modalWide on open

- form `js/form/`
tools for work with form's 
  - `w-ajaxsave.js` ajax handler for save form data and get an success or error message
  - `w-ajaxsend.js` handler for send an contact form trough ajax
  - `w-binder.js` bind an input value data to another element or input
  - `w-buffer_unload.js` add an buffer unload behaviour for prevent closing of page if a form input change
  - `w-children_age.js` input's with children age, cloned or removed on change of number of children input
  - `w-cookie.js` save form input values in to cookie
  - `w-filter.js` filter elements by it classes (like isotype but without animations)
  - `w-honey_pot.js` honey pot antispam (with my own workaround)
  - `w-preup_image.js` image upload with preview

- plugins `js/plugins/`
installed plugins activator and configurator, with my prefered options for it
  - `w-bootstrap_switch.js` https://github.com/Bttstrp/bootstrap-switch
  - `w-datepicker.js` https://github.com/uxsolutions/bootstrap-datepicker
  - `w-nicescroll.js` https://github.com/inuyaksa/jquery.nicescroll
  - `w-raty.js` https://github.com/wbotelhos/raty
  - `w-selectize.js` https://selectize.github.io/selectize.js/
  - `w-tooltip.js` bootstrap tooltip 


- social `js/social/`
tools for social's
  - `w-whatsapp.js` replace the Mobile version to WhatsApp URL to Desktop one
  + In index.html you can find the code and link for Facebook Messenger implementation

- style `js/style/`
tools for styling web page
  - `w-height.js` equal height for all matched element's (with higher founded height)
  - `w-showhide.js` show hide box on click
  - `w-target.js` \#target animation

- web `js/web/`
  - `w-analytics.js` js universal ga() and old _gaq() analytics events 
  - `w-cookie_choice.js` cookie banner with privacy link and confirm cookie

- widget `js/widget/`
  - `w-appear_btn.js` button that appear after some time
  - `w-go2top.js` go to top button
  - `w-loader.js` loader behaviour that show a loading img.svg during all assets load

All this are concatened and builded into `withplugins.js`, see gruntfile.js and customize it if you want 

---


### Core

#### Breakpoints 

Detect if the width of screen is bootstrap 3 `isXs, isSm, isMd, isLg`

Or in bootstrap 4 style if it is for `is4sm, is4md, is4lg, is4xl` or upper

```javascript
var isXs = window.matchMedia("(max-width: 768px)"),
    isSm = window.matchMedia("(min-width: 768px) and (max-width: 991px)"),
    isMd = window.matchMedia("(min-width: 992px) and (max-width: 1199px)"),
    isLg = window.matchMedia("(min-width: 1200px)"),
    //Bootstrap4 style
    is4sm = window.matchMedia("(min-width: 576px)"),
    is4md = window.matchMedia("(min-width: 768px)"),
    is4lg = window.matchMedia("(min-width: 992px)"),
    is4xl = window.matchMedia("(min-width: 1200px)");
```

### Style

#### Equal Height for all elements (.withEqualHeight, .weh, data-weh-ad)
###### @dependencies [w-breakpoints]

For set all elements to have equal height add the `.withEqualHeight` class to parent DOM element and the class `.weh` to  children elements to equal.

`.withEqualHeight` = for small device and higher (not for xs)

`.withEqualHeightInverse` = for the smallest element instead of tallest

`.withEqualHeightLike` = for equal height element like the element with .wehl class

And to all child add class `.weh` and `.wehl` if you wont a height like specific element

If you want additional height to all elements (ex: for add a button with absolute position etc.)
Add `data-weh-add="50"` to children `.weh` elements (add 50px to all)


```html 
<div class="row withEqualHeight">
    <div class="col-sm-4 weh">element</div>
    <div class="col-sm-4 weh">element</div>
    <div class="col-sm-4 weh">element</div>
    <div class="col-sm-4 weh">element</div>
</div>


<!-- You may need to add some additional height for place a absolute botton or whatever else -->
<!-- with `data-weh-add="??px"` you can do it -->

<div class="row withEqualHeight" data-weh-add="70px">
    <div class="col-sm-4 weh">element</div>
    <div class="col-sm-4 weh">element</div>
    <div class="col-sm-4 weh">element</div>
    <div class="col-sm-4 weh">element</div>
</div>
```

__.withEqualHeight not work for Extra Small device__ `xs` cause often in mobile we have one row only for each element

use `.withEqualHeightAll` for add equal height also in mobile `xs`


#### Paddings & Margins

For add `padding` or `margin` to an element use the helper classes:

From `v1.4.0` also with __Bootstrap 4__ style: 
`(.mp-{x}, .mt-{x}, .mb-{x}, .ml-{x}, .mr-{x}, .my-{x}, .mx-{x})`

http://getbootstrap.com/docs/4.1/utilities/spacing/

The difference is that withFront use static spacing with pixel's: 


```css
/* this mean margin on all directions of 5px */
.m-5 { margin: 5px !important; }
/* same for padding */
.p-5 { padding: 5px !important; }

/* this mean margin on t = TOP of 5px */
.mt-5 { margin-top: 5px !important; } /* Bs4 */
.m-t-5 { margin-top: 5px !important; }
/* same for padding */
.pt-5 { padding-top: 5px !important; } /* Bs4 */
.p-t-5 { padding-top: 5px !important; }

/* this mean margin r = RIGHT of 5px */
.mr-5 { margin-right: 5px !important; } /* Bs4 */
.m-r-5 { margin-right: 5px !important; }
/* same for padding */
.pr-5 { padding-right: 5px !important; } /* Bs4 */
.p-r-5 { padding-right: 5px !important; }

/* And rispectively b = BOTTOM, l = LEFT */
.mb-5 { margin-bottom: 5px  !important; } /* Bs4 */
.ml-5 { margin-left: 5px  !important; } /* Bs4 */
.m-b-5 { margin-bottom: 5px  !important; }
.m-l-5 { margin-left: 5px  !important; }
/* same for padding */
.pb-5 { padding-bottom: 5px  !important; } /* Bs4 */
.pl-5 { padding-left: 5px  !important; } /* Bs4 */
.p-b-5 { padding-bottom: 5px  !important; }
.p-l-5 { padding-left: 5px  !important; }

/* And there are another two things v = VERTICAL 
 * for margin top & bottom- Bs4: y = VERTICAL 
 */
.my-5 { margin-top: 5px  !important; margin-bottom: 5px  !important;} /* Bs4 */
.m-v-5 { margin-top: 5px  !important; margin-bottom: 5px  !important;}
/* same for padding */
.py-5 { padding-top: 5px  !important; padding-bottom: 5px  !important;} /* Bs4 */
.p-v-5 { padding-top: 5px  !important; padding-bottom: 5px  !important;}

/* And h = HORIZONTAL 
 * Bs4: x = HORIZONTAL for margin right & left 
 */
.mx-5 { margin-left: 5px  !important; margin-right: 5px  !important;} /* Bs4 */
.m-h-5 { margin-left: 5px  !important; margin-right: 5px  !important;}
/* same for padding */
.px-5 { padding-left: 5px  !important; padding-right: 5px  !important;} /* Bs4 */
.p-h-5 { padding-left: 5px  !important; padding-right: 5px  !important;}
```

The same thing for add `padding` change the `m` that stand for marrgin to `p` padding and you done!
##### You can use this values with this classes m-/p-[t,r,b,l,v,h]-`0,5,10,15,20,25,30,35,40,50,60,70,80,90,100,150,200`



### Web tools

#### Cookie Choice Banner
Include alone `js/web/w-cookie_choice.js`, `css/web/w-cookie_choice.css` or if u use build files this are yet included in `withplugins.js` and `withstle.css`
 
 ```html
     <script>
        document.addEventListener('DOMContentLoaded', function (event) {
            cookieChoices.showCookieConsentBar("Questo sito utilizza i cookies per migliorare l'esperienza di navigazione. Utilizzando il sito l'utente accetta tutti i cookies.",
                'OK', 'Privacy Policy', "/privacy-url");
        });
     </script>
 ```
 
 * En: This site uses cookies to improve the browsing experience. By using this site you agree to all cookies
 * Fr: Ce site utilise des cookies pour améliorer l'expérience de navigation. En utilisant ce site, vous acceptez tous les cookies
 * De: Diese Seite benutzt Cookies , um den Browser-Erfahrung zu verbessern. Durch die Nutzung der Website erklären Sie sich mit allen Cookies
 * Es: Este sitio utiliza cookies para mejorar la experiencia de navegación. Al usar este sitio usted acepta todas las cookies
 * Hu: Ez a webhely cookie-kat használ a böngészési élmény javítása érdekében. Az oldal használatával elfogadja az összes cookie-t
 * Nl: Deze site maakt gebruik van cookies om de browser-ervaring te verbeteren. Door deze site te gebruiken, gaat u akkoord met alle cookies
 * Pl: Ta witryna używa plików cookie, aby poprawić doświadczenie przeglądania. Korzystając z tej witryny zgadzasz się na wszystkie pliki cookie
 * Pt: Este site usa cookies para melhorar a experiência de navegação. Ao usar este site você concorda com todos os cookies
 * Ru: Нажимая кнопку или продолжая использовать сайт, вы разрешаете нам собирать информацию посредством использования файлов «cookie»




### JS - Form

#### Datepicker ([bootstrap-datepicker](https://uxsolutions.github.io/bootstrap-datepicker/))

```html
<!-- Bs Date Picker -->
<link rel="stylesheet" href="/node_modules/bootstrap-datepicker/dist/css/bootstrap-datepicker3.min.css"/>

<!-- Bs Date Picker -->
<script src="/node_modules/bootstrap-datepicker/dist/js/bootstrap-datepicker.min.js"></script>
<script src="/node_modules/bootstrap-datepicker/dist/locales/bootstrap-datepicker.it.min.js" data-lang="it" id="bsdp_lang_code"></script>
```

For add a single linked datepicker with visual range to your forms use this:

```html
<div class="period">
    <div class="form-group">
        <input type="text" name="checkin" id="checkin" class="form-control checkin range">
    </div>
     <div class="form-group">
         <input type="text" name="checkout" id="checkout" class="form-control checkout range">
     </div>
</div>
```
in the div .period we can set options with data-attribute 

Example: `data-date-start-date="10/01/2019" default:0d - today` 

`data-date-end-date="25/12/2019" default:none - infinite` 

Al available options: https://bootstrap-datepicker.readthedocs.io/en/stable/options.html

#### Children Age to Form
You can add a children number input that show the fields for each children age:

```html
<!-- 1 add class `children_age_form` to form -->     
<form class="children_age_form">

<!-- 2 create input with `child_num_input` class and min/max attr optionaly -->
<input type="number" class="form-control child_num_input" min="0" max="5" name="num_children">
     
<!-- 3 add hidden `child_ageClone` input inside form -->
<div class="col-sm-2 pull-right display-none" id="child_ageClone">
    <div class="form-group">
        <input type="number" placeholder="0" class="form-control" name="age_children[]" value="1" max="17" min="0" disabled/>
    
        <label>Children <span class="jq_child_num">1</span></label>
    </div>
</div>


<?php
    // and in PHP or whatever you use get the data
    $children_number = $_POST['num_children']); // 3
    $children_age = impolode(', ', $_POST['age_children']); // 3, 6, 7
?>    
```


#### Filter HTML elements 
(like isotype but without effects) So you made a list of elements with `filters in the class` attribute and after filter it on click on the `data-filter="filter"`

```html
<!-- main container `w-filters` -->
<div class="w-filters">
    <ul>
        <!-- `w-filter` for all elements leave empty data-filter -->
        <li class="w-filter" data-filter=""></li>
        <!-- `w-filter `elements with .filter in data-filter -->
        <li class="w-filter" data-filter=".vegetable"></li>
        <li class="w-filter" data-filter=".fruit"></li>
        <li class="w-filter" data-filter=".drink"></li>
    </ul>
    
    <!-- items to filter `.w-item` and `.filter`-->
    <div class="w-item vegetable col-sm-3">
        Patatos
    </div>
    <div class="w-item vegetable col-sm-3">
        Carot
    </div>
    <div class="w-item fruit col-sm-3">
        Orange
    </div>
    <div class="w-item fruit col-sm-3">
        Apple
    </div>
    <div class="w-item drink col-sm-3">
        CocaCola
    </div>
</div>
``` 








### Widget

#### Bottom Buttons w-bottom_btns.css
Div `.bottom-buttons` with grouped bottom buttons `.b-btn`, `.b-btn_circle`, `b-btn_whatsapp` 

Also in `.bottom-buttons.horizontal` or `.bottom-buttons.vertical` style 


```html
<!-- Bottom Buttons -->
<div class="bottom-buttons vertical">
    <!-- Anchor to Email form -->
    <a href="#ajaxsend" class="text-center b-btn b-btn_circle bg-dark">
        <i class="fa fa-envelope fa-2x text-white-a"></i>
    </a>

    <!-- Admin helper -->
    <div class="text-center b-btn b-btn_circle bg-info">
        <i class="fa fa-cog fa-2x"></i>
    </div>

    <!-- WhatsApp Button https://faq.whatsapp.com/en/android/26000030/ -->
    <a href="https://wa.me/1234567890?text=Salve,%20desidero%20ricevere%20informazioni%20per%20un%20soggiorno%20presso%20il%20vostro%20Hotel.%20Grazie!" class="b-btn b-btn_circle b-btn_whatsapp" target="_blank">
        <i class="fab fa-whatsapp"></i>
    </a>

    <!-- Facebook Messenger Button https://developers.facebook.com/docs/messenger-platform/discovery/customer-chat-plugin/ -->
    <div id="fb-root" class="b-btn"></div>

    <!-- Go2Top {css: .go2top, js: LayoutGo2Top} -->
    <div class="go2top hidden-xs text-center b-btn">
        <i class="fa fa-chevron-up"></i>
        <p class="hidden-sm m-0">Torna su</p>
    </div>
</div>
```




#### Go to top button 
Button fixed on bottom of the document that appear on scroll down and on click go to the top of document

```html
<!-- Add this to your layout -->
<div class="go2top hidden-xs text-center">
    <i class="fa fa-chevron-circle-up"></i>
    <p class="hidden-sm">Torna su</p>
</div>
```

And `.go2top` in css handle the positioning and style of button. The js `LayoutGo2Top` show the button on scroll down and hide when we are on top of document and scroll up document on click.  






#### With Appear Bottom Button w-bottom_btn.js/css 
Button fixed on bottom that appear after 5 seconds by default

`data-delay` 5000 - number of ms after that the button will be displayed from bottom

`data-left` 105 - The position from left (with media queries it change in mobile to 75px)

`data-right` 105 - The position from right (with media queries it change in mobile to 75px)

`data-bottom` 105 - The position from bottom (with media queries it change in mobile to 20px)

If you change the position remember the @mediaqueries also

```html
<a type="button" href="javascript:;" class="wabb right btn btn-primary" data-bottom="20" data-delay="2000">
    Bottom Button .wabb <i class="fa fa-check"></i>
</a> 
```

You can enable or disable it with `wOptions = { wAppearBottomButton: false }`

And `.go2top` in css handle the positioning and style of button. The js `LayoutGo2Top` show the button on scroll down and hide when we are on top of document and scroll up document on click.  






#### Loader (for entire document or only inside some element)
Thanks to [SamHerbert/SVG-Loaders](http://samherbert.net/svg-loaders/)

For add a loader to your site, that appears and automatically closes when all content is load:
```html
<div class="loader-wrapper">
    <i class="fa fa-close fa-3x pull-right p-20 cursor-pointer loader-wrapper-close display-none"></i>
    <div class="loader">
        <img width="40" src="/bower_components/SVG-Loaders/circles.svg" alt="">

        <span class="loader-title">Caricamento contenuti, attendere qualche secondo...</span>
    </div>
</div>
```

You can also add `inner-loader-wrapper` class to `loader-wrapper` for include loader in a div and not over all content of document.

```html
<div class="loader-wrapper inner-loader-wrapper">
    <i class="fa fa-close fa-3x pull-right p-20 cursor-pointer loader-wrapper-close display-none"></i>
    <div class="loader">
        <img width="40" src="/bower_components/SVG-Loaders/svg-loaders/spinning-circles.svg" alt="">

        <span class="loader-title">Caricamento contenuti, attendere qualche secondo...</span>
    </div>
</div>
```

Example: [loader-wrapper](https://insuperadmin.buonsito.net/assets/media/loader.png), [inner-loader-wrapper](https://insuperadmin.buonsito.net/assets/media/inner-loader.png)






#### Sliding Panel `.w-sliding-panel`, `.w-sliding-btn`
Button and bottom panel that slide out from left to right

1 - Btn with class `w-sliding-btn` and `data-target` #id of the panel to open (for standard style add `sliding-btn` class and `right/left` class for position)

2 - Panel with class `w-sliding-panel`, `sliding-panel` and the right #id (also the close icon `.close-panel` the panel is closed automatically on document click) 

```html
<!-- Button for open panel -->
<div class="w-sliding-btn text-center b-btn b-btn_circle bg-info"
    data-target="#adminHelper"
    data-no-close-btn="true"
>
    <i class="fa fa-cog fa-2x"></i>
</div>

<div id="adminHelper" class="w-sliding-panel sliding-panel text-center bg-info">
    <i class="close-panel fa fa-close fas fa-times fa-3x cursor-pointer abspos"></i>

    <div class="container">
        ...
    </div>
</div>
```

If you want to costumize the panel position and style remove class `sliding-panel` and add your own, remember to hide panel with negative position

```css
.w-sliding-panel.sliding-panel {
    position: fixed;
    left: -2000px;
    bottom: 0px;
}

.w-sliding-panel.sliding-panel .close-panel {
    top: -25px;
    left: 0px;
}
```


#### Animate scroll of #hash anchor and put the window to right place with topOffset
* data-keep-hash    [false]        If #hash anchor is needed in url set true, otherwise u will not see the #hash in url<br>
* data-top-offset   [10]          The NEGATIVE offset from top (for not cover things with navbar or other things)<br>
* data-animation    [1000]         The duration of scroll animation

```html
    <a type="button" href="#target-block" class="btn btn-primary w-scroll">
        Bottom Button
    </a>
```


 #### Add target highlight to something
 * data-target          [-]                CSS Selector for select the element on which apply
 * data-auto-close      [8000]             Bool or the ms for close
 * data-taregt-class    [on-target]        The class to add (default have CSS animation but it must be on the #anchor element also)

```html
    <a type="button" href="#target-block" class="btn btn-primary w-target" data-target="#target-block">
        Bottom Button
    </a>
```









    

### Social

#### WhatsApp url Mobile and Desktop 
WhatsApp Button https://faq.whatsapp.com/en/android/26000030/

- Replace 1234567890 with your desired phone number
- text=`The message must be url_encoded` use https://www.urlencoder.org/ for get text=`The%20message%20must%20be%20url_encoded`

```html
<a href="https://wa.me/1234567890?text=Salve,%20desidero%20ricevere%20informazioni%20per%20un%20soggiorno%20presso%20il%20vostro%20Hotel.%20Grazie!" class="b-btn b-btn_circle b-btn_whatsapp whatsapp-weburl" target="_blank">
    <i class="fab fa-whatsapp"></i>
</a>
```
File `js/social/w-whatsapp.js` This is the MOBILE URL and it will be replaced to DESKTOP version (not worry :D)

###### The mobile first strategy is used cause most people decide to not show WhatsApp on Desktop but only on mobile where it is very useful
