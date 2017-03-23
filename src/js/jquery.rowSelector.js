/**
 * rowSelector
 *
 * Created by Casper Spruit
 *
 * Usage:
 * $('#element').rowSelector(data, $('hidden_input'));
 */
;(function ($, window, document, undefined) {

    /**
     * set default
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
            $(this.$hidden).val(this.selected);
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
         *
         * @param dataList
         */
        updateListData: function (dataList) {
            this.dataList = dataList;
            $(this.element).empty();
            $(this.element).html(this.getListHtml());
        },

        /**
         * set pre selected value
         */
        setPreselected: function () {
            // console.log(this.options.selected);
            if (this.options.selected == !null) {
                var target = $(this.element).find("li[data-" + this._name + "-id='" + this.options.selected + "']");
                if (target === null) {
                    console.info(pluginSays + "could not find the preselected element");
                } else {
                    console.log(target);
                    this.setElementStyle(target);
                    this.setItemAsSelected(target)
                }
            }
        },

        /**
         * Init Plugin
         */
        init: function () {
            $(this.element).addClass(this.options.globalClass);
            $(this.element).empty();
            $(this.element).html(this.getListHtml());


            $(this.element).on('click', this.strtoclass(this._name + '-item'), $.proxy(function (event) {
                this.clickItemHandler(event)
            }, this));

            $(this.element).on('rowInput:update', $.proxy(function (event) {
                this.updateListData(event.dataList);
            }, this));

            this.setPreselected();
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