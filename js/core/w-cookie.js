/**
 * wCookies - Cookies() `js-cookie` (https://github.com/js-cookie/js-cookie)
 * .get(name);
 * .set(name, value, attributes);
 * .remove(name, attributes);
 * .getJSON([name]);
 */
if(typeof Cookies != 'undefined') {
    wCookies = function() {
        return {
            get: function(name) {
                return Cookies.get(name);
            },
            set: function(name, value, attributes) {
                // var defaults = {
                //     //secure: true, // we yet on secure from server
                //     //expires: 365, // no only one session
                //     //path: '/', domain: '', // yet default
                // };
                // var attributes = $.extend(defaults, options);
                Cookies.set(name, value, attributes);
            },
            remove: function(name, attributes) {
                Cookies.remove(name, attributes);
            },
            getJSON: function (name) {
                Cookies.getJSON(name);
            },
            getJSON: function () {
                // get all in JSON
                return Cookies.getJSON();
            }
        };
    };
}