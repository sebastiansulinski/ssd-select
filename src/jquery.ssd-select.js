/*
 * ssdSelect jQuery plugin
 * Examples: http://ssd-select.ssdtutorials.com
 * Documentation: https://github.com/sebastiansulinski/ssd-select
 * Copyright (c) 2017 Sebastian Sulinski <info@ssdtutorials.com>
 * Version: 2.1.0 (18-APR-2017)
 * Licensed under the MIT.
 * Requires: jQuery v1.9 or later
 */
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module unless amdModuleId is set
        define(['jquery'], function (a0) {
            return (factory(a0));
        });
    } else if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory(require('jquery'));
    } else {
        factory(root["jQuery"]);
    }
}(this, function ($, undefined) {

    $.fn.ssdSelect = function(options) {

        "use strict";

        var settings = $.extend({
            action : undefined,
            action_attribute : 'data-ssd-select',
            hide_class : 'dn',
            value_attribute : 'value'
        }, options);


        function call(url, success, error) {

            "use strict";

            $.ajax({
                url : url,
                success: success,
                error: error
            });

        }

        function error(jqXHR, textStatus, errorThrown) {

            "use strict";

            throw new Error(errorThrown);

        }

        function redirect(data) {

            "use strict";

            if ( ! data.redirect) {
                return false;
            }

            window.location.href = data.redirect;

        }

        function callRedirect(value) {

            "use strict";

            call(
                value,
                redirect,
                error
            )

        }

        function reload() {

            "use strict";

            window.location.reload(true);

        }

        function callReload(value) {

            "use strict";

            call(
                value,
                reload,
                error
            )

        }

        function replace(data) {

            "use strict";

            if ( ! data.replace) {
                return false;
            }

            $.each(data.replace, function(k, v) {

                $(k).html(v);

            });

        }

        function callReplace(value) {

            "use strict";

            call(
                value,
                replace,
                error
            )

        }

        function replaceWith(data) {

            "use strict";

            if ( ! data.replace) {
                return false;
            }

            $.each(data.replace, function(k, v) {

                $(k).replaceWith(v);

            });

        }

        function callReplaceWith(value) {

            "use strict";

            call(
                value,
                replaceWith,
                error
            )

        }

        function callAction(value) {

            "use strict";

            call(
                value,
                function(data) {

                    if ( ! data.action) {
                        return false;
                    }

                    switch(data.action) {

                        case 'redirect':
                            redirect(data);
                            break;

                        case 'reload':
                            reload();
                            break;

                        case 'replace':
                            replace(data);
                            break;

                        case 'replace-with':
                            replaceWith(data);
                            break;

                        default:
                            throw new Error('Invalid method');

                    }

                },
                error
            )

        }

        function goTo(value) {

            "use strict";

            window.location.href = value;

        }

        function showHide(obj) {

            "use strict";

            var selected = obj.find(':selected'),
                siblings = obj.find('option').not(':selected');

            $.each(siblings, function() {
                $($(this).data('target')).addClass(settings.hide_class);
            });

            $(selected.data('target')).removeClass(settings.hide_class);

        }

        return this.each(function() {

            "use strict";

            $(this).on('change', function() {

                var instance = $(this),
                    action = settings.action !== undefined ? settings.action : instance.attr(settings.action_attribute),
                    value = settings.value_attribute === 'value' ? instance.val() : $('option:selected', this).attr(settings.value_attribute);

                switch(action) {

                    case 'call-redirect':
                        callRedirect(value);
                        break;

                    case 'call-reload':
                        callReload(value);
                        break;

                    case 'call-replace':
                        callReplace(value);
                        break;

                    case 'call-replace-with':
                        callReplaceWith(value);
                        break;

                    case 'call-action':
                        callAction(value);
                        break;

                    case 'go-to':
                        goTo(value);
                        break;

                    case 'show-hide':
                        showHide(instance);
                        break;

                    default:
                        throw new Error('Invalid method');

                }

            });

        });

    }

}));