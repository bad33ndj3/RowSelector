;(function ($, window, document, undefined) {

    // Create the defaults once
    var pluginName = "rowSelector",
        pluginSays = pluginName + "_plugin: ",
        defaults = {
            test: "test"
        };

    // The actual plugin constructor
    function Plugin(element, dataList, options) {
        if (typeof dataList === 'undefined') {
            throw pluginSays + "Missing \"dataList\" property";
        }

        this.dataList = dataList;
        this.element = element;

        this.options = $.extend({}, defaults, options);

        this._defaults = defaults;
        this._name = pluginName;

        this.init();
    }

    Plugin.prototype = {

        getListItemHtml: function (value) {
            return "<li class='" + this._name + "-item' data-" + this._name + "-id='" + value.id + "'>" + value.name + "</li>";
        },

        getListHtml: function () {
            var $html = "<ul>";
            $.each(this.dataList, function (index, value) {
                $html += this.getListItemHtml(value);
            });
            $html += "</ul>";
            return $html;
        },

        init: function () {
            $(this.element).empty();
            $(this.element).html(this.getListHtml());
        }
    };

    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn[pluginName] = function (dataList, options) {
        return this.each(function () {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName,
                    new Plugin(this, dataList, options));
            }
        });
    };

})(jQuery, window, document);