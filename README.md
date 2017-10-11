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

&nbsp;

### Dependency
jQuery - https://github.com/jquery/jquery

... raty, datepicker, selectize, iCheck


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

The same thing for add `padding` change the `m` that stand for marrgin to `p` and you done!
##### You can use this values with this classes m-/p-[t,r,b,l,v,h]-`0,5,10,15,20,25,30,35,40,50,60,70,80,90,100,150,200`

