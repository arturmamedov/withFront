# withFront
## The Front-end Tools and basic configs that i use for every project

 
&nbsp;

[EN] During my development experience i encounter a lot of tools and configs for front-end, and this is one that i used most frequently!

[IT] Durante la mia esperienza di sviluppo, ho incontrato molti tools e configurazioni, front-end, queste qui sono quelle che uso più frequentemente e che consiglio di usare a tutti!

&nbsp;

### Installation

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

... raty, datepicker, selectize, iCheck, SVG-Loaders, nicescroll, bootstrapSwitch, bootstrap-daterangepicker, wArtur

(you can remove the dependencies or not include script and their not will be made nothing cause there are a check before any action)

## Documentation (How to use)

#### Adding to web page
```html
<!-- Inside Tag head -->
<link rel="stylesheet" href="bower_components/withFront/withstyle.css" type="text/css"/>

<!-- Better down in footer after all content and after include jQuery and Bootstrap -->
<script type="text/javascript" src="/bower_components/jquery/dist/jquery.min.js"></script>
<script type="text/javascript" src="/bower_components/withFront/withplugins.js"></script>

```

#### Equal Height for all elements (.withEqualHeight, .weh, data-weh-ad)

For set all elements to have equal height add the `.withEqualHeight` class to parent DOM element and the class `.weh` to  children elements to equal.

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


#### Paddings & Margins (p-X, p-t-X, p-b-X ... m-X, m-l-X, m-r-X ...)

For add `padding` or `margin` to an element use the helper classes:

```css
/* this mean margin on all directions of 5px */
.m-5 { margin: 5px !important; }

/* this mean margin on TOP of 5px */
.m-t-5 { margin-top: 5px !important; }

/* this mean margin RIGHT of 5px */
.m-r-5 { margin-right: 5px !important; }

/* And rispectively BOTTOM-b, LEFT-l */
.m-b-5 { margin-bottom: 5px  !important; }
.m-l-5 { margin-left: 5px  !important; }

/* And there are another two things VERTICAL-v for margin right and left */
.m-v-5 { margin-top: 5px  !important; margin-bottom: 5px  !important;}

/* and HORIZONTAL-h for top and bottom */
.m-h-5 { margin-left: 5px  !important; margin-right: 5px  !important; }


```

The same thing for add `padding` change the `m` that stand for marrgin to `p` padding and you done!
##### You can use this values with this classes m-/p-[t,r,b,l,v,h]-`0,5,10,15,20,25,30,35,40,50,60,70,80,90,100,150,200`



#### Loader
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


### JS - Form

#### Datepicker ([bootstrap-datepicker](https://uxsolutions.github.io/bootstrap-datepicker/))
For add a single linked datepicker with visual range to your forms use this:

```html
<div id="period">
    <div class="form-group">
        <input type="text" name="checkin" id="checkin" class="form-control checkin range">
    </div>
     <div class="form-group">
         <input type="text" name="checkout" id="checkout" class="form-control checkout range">
     </div>
</div>
```

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
