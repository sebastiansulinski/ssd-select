/*
 * ssdSelect jQuery plugin
 * Examples and documentation at: https://github.com/sebastiansulinski/ssd-select
 * Copyright (c) 2015 Sebastian Sulinski
 * Version: 1.0.0 (18-DEC-2015)
 * Licensed under the MIT.
 * Requires: jQuery v1.9 or later
 */
(function(window, $) {

    $.fn.ssdSelect = function(options) {

        "use strict";

        var settings = $.extend({
            hideClass : 'dn'
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

        function callRedirect(obj) {

            "use strict";

            call(
                obj.val(),
                function(data, textStatus, jqXHR) {

                    if ( ! data.redirect) {
                        return false;
                    }

                    window.location.href = data.redirect;

                },
                error
            )

        }

        function callReload(obj) {

            "use strict";

            call(
                obj.val(),
                function() {
                    window.location.reload(true);
                },
                error
            )

        }

        function callReplace(obj) {

            "use strict";

            call(
                obj.val(),
                function(data, textStatus, jqXHR) {

                    if ( ! data.replace) {
                        return false;
                    }

                    $.each(data.replace, function(k, v) {

                        $(k).html(v);

                    });

                },
                error
            )

        }

        function callReplaceWith(obj) {

            "use strict";

            call(
                obj.val(),
                function(data, textStatus, jqXHR) {

                    if ( ! data.replace) {
                        return false;
                    }

                    $.each(data.replace, function(k, v) {

                        $(k).replaceWith(v);

                    });

                },
                error
            )

        }

        function goTo(obj) {

            "use strict";

            window.location.href = obj.val();

        }

        function showHide(obj) {

            "use strict";

            var selected = obj.find(':selected'),
                siblings = obj.find('option').not(':selected');

            $.each(siblings, function() {
                $($(this).data('target')).addClass(settings.hideClass);
            });

            $(selected.data('target')).removeClass(settings.hideClass);

        }

        return $('[data-ssd-select]').each(function() {

            "use strict";

            $(this).on('change', function() {

                var type = $(this).data('ssd-select');

                switch(type) {

                    case 'call-redirect':
                        callRedirect($(this));
                        break;

                    case 'call-reload':
                        callReload($(this));
                        break;

                    case 'call-replace':
                        callReplace($(this));
                        break;

                    case 'call-replace-with':
                        callReplaceWith($(this));
                        break;

                    case 'go-to':
                        goTo($(this));
                        break;

                    case 'show-hide':
                        showHide($(this));
                        break;

                    default:
                        throw new Error('Invalid method');

                }

            });

        });

    }

})(window, window.jQuery);