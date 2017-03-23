;(function ($, window, document, undefined) {

    /**
     * default
     *
     * @type {string}
     */
    var pluginName = "rowSelector",
        pluginSays = pluginName + "_plugin: ",
        defaults = {
            li: {
                class: ""
            },
            selected: null,
            selectedId: "selected-item",
            globalClass: "item_choice",
            defaultInput: "<input type='hidden' class='" + pluginName.toLowerCase() + "-hidden'>",
            input: $("." + pluginName.toLowerCase() + "-hidden")
        };

    /**
     * Plugin constructor
     *
     * @param element
     * @param dataList
     * @param $hidden
     * @param options
     * @constructor
     */
    function Plugin(element, dataList, $hidden, options) {
        if (typeof dataList === 'undefined') {
            throw pluginSays + "Missing \"dataList\" property";
        }
        if (typeof $hidden === 'undefined') {
            throw pluginSays + "Missing \"hidden input\" property";
        }

        this.dataList = dataList;

        this.$hidden = $hidden;
        this.element = element;

        this.options = $.extend({}, defaults, options);

        this._defaults = defaults;
        this._name = pluginName.toLowerCase();

        this.init();
    }

    Plugin.prototype = {

        /**
         *
         * @param string
         * @returns {string}
         */
        strtoclass: function (string) {
            return "." + string;
        },

        /**
         *
         * @param value
         * @returns {string}
         */
        getListItemHtml: function (value) {
            return "<li class='" + this._name + "-item" + this.options.li.class + "' data-" + this._name + "-id='" + value.id + "'>" + value.name + "</li>";
        },

        /**
         *
         * @returns {string}
         */
        getListHtml: function () {

            var $html = "<ul>";
            $.each(this.dataList, $.proxy(function (index, value) {
                $html += this.getListItemHtml(value);
            }, this));
            $html += "</ul>";

            return $html;
        },

        /**
         *
         * @param element
         */
        setItemAsSelected: function (element) {
            this.selected = $(element).data(this._name + '-id');
            console.log(this.selected);
            console.log(this.$hidden);
            $(this.$hidden).val(this.selected);
            console.log('Selected id: ' + this.selected)
        },

        /**
         *
         * @param target
         */
        setElementStyle: function (target) {
            $(this.element).find(this.strtoclass(this.options.selectedId)).removeClass(this.options.selectedId);
            $(target).addClass(this.options.selectedId);
        },

        /**
         *
         * @param event
         */
        clickItemHandler: function (event) {
            this.setItemAsSelected(event.target);
            this.setElementStyle(event.target);
        },

        /**
         * Init Plugin
         */
        init: function () {
            $(this.element).addClass(this.options.globalClass);
            $(this.element).empty();
            $(this.element).html(this.getListHtml());

            if (this.selected == !null) {
                console.log('why you null');
                this.setItemAsSelected()
            }

            $(this.element).on('click', this.strtoclass(this._name + '-item'), $.proxy(function (event) {
                this.clickItemHandler(event)
            }, this));

            // $('#post_car').on('click', carHideModalHandler);
        }
    };

    /**
     * A wrapper around the constructor,
     * preventing against multiple instantiations
     *
     * @param dataList
     * @param $hidden
     * @param options
     * @returns {*}
     */
    $.fn[pluginName] = function (dataList, $hidden, options) {
        return this.each(function () {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName,
                    new Plugin(this, dataList, $hidden, options));
            }
        });
    };

})(jQuery, window, document);