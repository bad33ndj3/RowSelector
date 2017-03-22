;(function ($, window, document, undefined) {

    // Create the defaults once
    var pluginName = "rowSelector",
        pluginSays = pluginName + "_plugin: ",
        defaults = {
            li: {
                class: ""
            },
            selected: null,
            defaultInput: "<input type='hidden' class='" + pluginName.toLowerCase() + "-hidden'>",
            input: $("." + pluginName.toLowerCase() + "-hidden")
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
        this._name = pluginName.toLowerCase();

        this.init();
    }

    Plugin.prototype = {

        getListItemHtml: function (value) {
            return "<li class='" + this._name + "-item" + this.options.li.class + "' data-" + this._name + "-id='" + value.id + "'>" + value.name + "</li>";
        },

        getListHtml: function () {

            var $html = "<ul>";
            $.each(this.dataList, $.proxy(function (index, value) {
                $html += this.getListItemHtml(value);
            }, this));
            $html += "</ul>";

            return $html;
        },

        getSelectedFromDataList: function (id) {
            return $.grep(this.dataList, function (e) {
                return e.id == id;
            });
        },

        setItemAsSelected: function (element) {
            var id = $(element).data(this._name + '-id');
            this.selected = id;
            this.options.input.val(id);
        },

        clickItemHandler: function (event) {
            this.setItemAsSelected(event.target);
            // setElementStyle(event.target, '#car .');
        },

        init: function () {
            $(this.element).empty();
            $(this.element).html(this.getListHtml());

            if (this.selected == !null) {
                console.log('why you null');
                this.setItemAsSelected()
            }

            if(typeof this.options.input === 'undefined' ){
                $(this.element).parent().append(this.options.defaultInput);
            }

            $(document.body).on('click', '.' + this._name + '-item', $.proxy(function (event) {
                this.clickItemHandler(event)
            }, this));

            // $('#post_car').on('click', carHideModalHandler);
        }
    };

    // A wrapper around the constructor,
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