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
            var TimeWidgetElement = ($time.data("uiTimespinner") || $time.data("timespinner")).widget();
            TimeWidgetElement.css('height', this.element.height()+2+'px'/*for border*/).removeClass('ui-corner-all');
            this.wrapper.css('width',$element.width() + 'px');
            var input = TimeWidgetElement.find('input');
            var span = TimeWidgetElement.find('span');
            $element.css('width', 46 + '%');
            var spanwidth = ((this.wrapper.width() * 50/*for 50% from wrapper*/) / 100)/*converting width From Percentage to Pixels*/;
            span.css('width', spanwidth + 'px');
            input.css('width',span.width());
            input.css('height',span.height());
            input.css('margin', 0 + 'px').css('font-size', $element.css('font-size'));
        }
    });
})(jQuery);
