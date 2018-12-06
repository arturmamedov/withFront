module.exports = function (grunt) {
    /**
     * withInclude() - embeds a file content within another. Meant to be
     * used from the copy task as a 'processContent' function. The following
     * tokens can be used in files: <br>
     *
     *  -   BUILD_INCLUDE('file')
     *  -   /* BUILD_INCLUDE('file') *\x47
     *  -   &lt;!-- BUILD_INCLUDE("file") --&gt;
     *
     * In addition, options can be added to the token above that further
     * process the file being included:
     *
     *  -   BUILD_INCLUDE('file')[option1,option2,option3]
     *
     * Supported options:
     *
     *  -   asJsString : Escapes all double-quotes and new line characters
     *                   in the file
     *
     * @param {String} fileContent
     * @param {String} filePath
     *
     * @return {String} fileContent
     *
     * @see https://gist.github.com/purtuga/85ee689f0d3d90484ce3
     *
     * @example
     *
     *  ...
     *  copy: {
     *      options: {
     *          expand: true,
     *          process: withInclude
     *      }
     *  }
     *  ...
     *
     */
    function withInclude(fileContent, filePath) {

        if (fileContent.indexOf("withInclude") > -1) {

            grunt.log.write("withInclude(): [" + filePath + "] has withInclude: ");

            // Match:
            //      // withInclude('file')
            //      /* withInclude('file') */
            //      <!-- withInclude("file") -->
            //
            //  Token OPtions:
            //      // withInclude('file')[options,here,as,array]
            //
            //      asJsString
            //
            var re = /(?:(?:\/\/)|(?:<\!\-\-)|(?:\/\*)) {0,}withInclude\(['"](.*)['"]\)(?:\[(.*)\])?(?: {0,}(?:\-\-\>)| {0,}(?:\*\/))/i,
                match, file, fileIncludeOptions;

            while ((match = re.exec(fileContent)) !== null) {

                grunt.log.write(".");
                grunt.verbose.writeln("    Match array: " + match);

                file = grunt.template.process(match[1]);

                grunt.verbose.writeln("    File to embed: " + file);

                file = grunt.file.read(file);

                // If options were set, then parse them
                if (match[2]) {

                    fileIncludeOptions = match[2].split(',');

                    // If option: asJsString
                    if (
                        fileIncludeOptions.some(function (option) {
                            return String(option).toLowerCase() === "asjsstring";
                        })
                    ) {

                        file = file
                            .replace(/\"/g, '\\x22')
                            .replace(/\'/g, '\\x27')
                            .replace(/\r\n|\n/g, "\\n");

                    }


                }

                fileContent = fileContent.replace(match[0], function () {
                    return file;
                });

            }
            grunt.log.writeln("");
            return fileContent;

        }

        return fileContent;

    } //end: withInclude()


    // Build configuration.
    grunt.initConfig({
        // not used at the moment, use copy that replace in template file
        concat: {
            options: {
                separator: '\n\n\n',
            },
            // myne build
            js: {
                src: [
                    // core
                    'js/core/w-core.js', // withOptions +debug
                    'js/core/w-breakpoints.js', // isMobile, isXs, isSm, isMd, isLg
                    'js/core/w-alert.js',  // .withAlert notifications
                    'js/core/w-cookie.js', // Cookie Wrapper
                    // bs
                    'js/bs/w-tab_hashnav.js', // save navigation of tabs with a #hash in url
                    // (disabled for me) 'js/bs/w-wide_modal.js', // adjust height to fit entire page
                    // form
                    // (disabled for me) 'js/form/w-buffer_unload.js', // buffer unload message for not leave without save of form
                    // (disabled for me) 'js/form/w-ajaxsave.js', // save a form with ajax (CakePHP3.x)
                    'js/form/w-ajaxsend.js', // send an email trough ajax (CakeFront2.x)
                    'js/form/w-children_age.js', // if num of children change add or remove input with age
                    'js/form/w-binder.js', // bind form inputs with others inputs or elements
                    'js/form/w-cookie.js', // save input values in cookies [by simply add .w-cookie class]
                    'js/form/w-filter.js', // filter any elements with a class css selector
                    // (disabled for me) 'js/form/w-preup_image.js', // upload and preview images
                    // style
                    'js/style/w-height.js', // equal height to any elements [with the bigger element height]
                    'js/style/w-target.js', // bind an input value to another element (w-binder replace this functionality)
                    // (disabled for me) 'js/style/w-showhide.js', // toggle show hide element
                    // plugins
                    'js/plugins/w-datepicker.js', // uxsolution/bootstrap-datepicker wrapper
                    // (disabled for me) 'js/plugins/w-raty.js', // raty wrapper
                    // web
                    'js/web/w-analytics.js', // google analytics events tracker
                    // (disabled for me) 'js/web/w-cookie_choice.js', // cookie consent banner
                    // widget
                    'js/widget/w-loader.js', // loader for hide content before all assets are loaded
                    'js/widget/w-go2top.js', // go to top arrow
                    'js/widget/w-appear_btn.js', // button that appear after page load
                ],
                dest: 'dist/withplugins.js',
                nonull: true,
            },
            // All JavaScripts
            jsfull: {
                src: [
                    // core
                    'js/core/w-core.js', // withOptions +debug
                    'js/core/w-breakpoints.js', // isMobile, isXs, isSm, isMd, isLg
                    'js/core/w-alert.js',  // .withAlert notifications
                    'js/core/w-cookie.js', // Cookie Wrapper
                    // bs
                    'js/bs/w-tab_hashnav.js', // save navigation of tabs with a #hash in url
                    'js/bs/w-wide_modal.js', // adjust height to fit entire page
                    // form
                    'js/form/w-buffer_unload.js', // buffer unload message for not leave without save of form
                    'js/form/w-ajaxsave.js', // save a form with ajax (CakePHP3.x)
                    'js/form/w-ajaxsend.js', // send an email trough ajax (CakeFront2.x)
                    'js/form/w-children_age.js', // if num of children change add or remove input with age
                    'js/form/w-binder.js', // bind form inputs with others inputs or elements
                    'js/form/w-cookie.js', // save input values in cookies [by simply add .w-cookie class]
                    'js/form/w-filter.js', // filter any elements with a class css selector
                    'js/form/w-preup_image.js', // upload and preview images
                    // style
                    'js/style/w-height.js', // equal height to any elements [with the bigger element height]
                    'js/style/w-target.js', // bind an input value to another element (w-binder replace this functionality)
                    'js/style/w-showhide.js', // toggle show hide element
                    // plugins
                    'js/plugins/w-datepicker.js', // uxsolution/bootstrap-datepicker wrapper
                    'js/plugins/w-raty.js', // raty wrapper
                    // web
                    'js/web/w-analytics.js', // google analytics events tracker
                    'js/web/w-cookie_choice.js', // cookie consent banner
                    // widget
                    'js/widget/w-loader.js', // loader for hide content before all assets are loaded
                    'js/widget/w-go2top.js', // go to top arrow
                    'js/widget/w-appear_btn.js', // button that appear after page load
                ],
                dest: 'dist/withplugins-full.js',
                nonull: true,
            },
            // css: {
            //     src: [
            //         'withstyle.css',
            //         'css/... are imported',
            //     ],
            //     dest: 'dist/withstyle.css'
            // }
        },

        // this copy task take the `js/withplugins_concat_template.js` and replace all the things described there with real file
        // and create compiled withplugins.js
        copy: {
            build: {
                options: {
                    expand: true,
                    process: withInclude
                },
                src: "js/withplugins_concat_template.js",
                dest: "withplugins.js"
            },
            js_src: {
                options: {
                    expand: true
                },
                src: "withplugins.js",
                dest: "dist/js/w-plugins.js"
            },
            css_src: {
                options: {
                    expand: true
                },
                src: "withstyle.css",
                dest: "dist/css/w-style.css"
            },
            // for copy flag-icon-css
            // flags: { bugged, copy all the path and repeat it in the destination :(
            //     options: {
            //         expand: false
            //     },
            //     src: "css/flags/**",
            //     dest: "dist/flags/"
            // },
            flags11: {
                options: {
                    expand: true
                },
                src: "node_modules/flag-icon-css/flags/1x1/gb.svg",
                dest: "dist/flags/1x1/gb.svg"
            },
            flags43: {
                options: {
                    expand: true
                },
                src: "node_modules/flag-icon-css/flags/4x3/gb.svg",
                dest: "dist/flags/4x3/gb.svg"
            }
        },


        // minify CSS
        cssmin: {
            options: {
                mergeIntoShorthands: false,
                roundingPrecision: -1,
                sourceMap: true
            },
            target: {
                files: {
                    'dist/css/w-style.min.css': ['withstyle.css']
                }
            }
        },

        // minify JS
        uglify: {
            target: {
                options: {
                    sourceMap: true,
                    drop_console: true
                },
                files: {
                    'dist/js/w-plugins.min.js': ['withplugins.js']
                }
            }
        }
    });


    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // Default task(s).
    grunt.registerTask('default', ['copy', 'cssmin', 'uglify']);

    // # My PurifyCSS task (for find and keep all used css selectors in my files, and cut all others that aren't used)
    // grunt.initConfig({
    //     purifycss: {
    //         options: {minify: true},
    //         target: {
    //             src: ['index.php', 'blocks/*.php', 'webroot/js/*.js'],
    //             css: ['webroot/css/style.css'],
    //             dest: 'webroot/purified/css/style.css'
    //         }
    //     }
    // });
    // grunt.loadNpmTasks('grunt-purifycss');
}
