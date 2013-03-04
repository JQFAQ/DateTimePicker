(function ($) {
    $.widget("radiantq.DateTimePicker", {
        options: {
            setdate: null
        },
        wrapper: null,
        timePicker: null,
        _create: function () {
            //declarations
            var self = this;
            var year = 0, month = 0, day = 0, hour = 0, minute = 0;
            var date = 0;
            this.wrapper = $('<div class="datetimepicker wrapper" style="height:' + this.element.height() + 'px"></div>')
            this.timePicker = $('<input id="time" class="spinner"value="00:00 AM"/>');
            this.element.wrap(this.wrapper);
            this.wrapper = this.element.parent();
            this.wrapper.append(this.timePicker);
            var $time = this.timePicker;
            this.element.datepicker({
                onSelect: function () {
                    date = $(this).datepicker('getDate');
                    $time.timespinner({
                        start: new Date(+date)
                    });
                }
            });
            $time.timespinner({
                start: new Date(+year, +month, +day, +hour, +minute, 0, 0)
            });
            var self = this;

            this.element.blur(function () {
                focus_input();
            });
            $time.blur(function () {
                focus_input();
            });
            this.RefreshWidthandHeight();
            function focus_input() {
                if ($("input", self.wrapper).is(":focus")) {
                }
                else {
                    self.wrapper.change();
                }
            }
        },
        GetDate: function () {
            var time = this.timePicker.timespinner("getTime");
            var date = this.element.val();
            var dateandtime = date + " " + time;
            return new Date(dateandtime);
        },
        setDate: function (value) {
            this.element.datepicker("setDate", new Date(value));
            this.timePicker.timespinner("setTime", new Date(value));
        },
        widget: function () {
            return this.element.parent();
        },
        RefreshWidthandHeight:function(){
            var $element = this.element;
            var $time = this.timePicker;
            var timeWidgetElement = ($time.data("uiTimespinner") || $time.data("timespinner")).widget();
            $element.css({ margin: 0 + 'px'});
            timeWidgetElement.css('height', $element.height() + ($element.outerHeight() - $element.height()-2 /*for border*/)).removeClass('ui-corner-all');
            timeWidgetElement.css({ 'margin-top': 0 + 'px',  'vertical-align': 'top', });
            this.wrapper.css('width',$element.width() + 'px');
            var input = timeWidgetElement.find('input');
            var span = timeWidgetElement.find('span');
            $element.css('width', 46 + '%');
            var spanwidth = ((this.wrapper.width() * 48/*for 50% from wrapper*/) / 100)/*converting width From Percentage to Pixels*/;
            span.css({width:spanwidth + 'px'});
            input.css({ width: span.width(), margin: 0 + 'px', 'vertical-align': 'top', 'font-size': $element.css('font-size'), 'font-family': $element.css('font-family'), height: this.element.height() + 2/*for border*/ });
        }
    });
})(jQuery);
