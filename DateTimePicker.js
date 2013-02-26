(function ($) {
    //var RQStyle = RadiantQ.Gantt.DefaultStyles;
    $.widget("radiantq.DateTimePicker", {
        currentUniqueRowSuffix: 0,
        options: {
            setdate:null
        },
        _create: function () {
            //declarations
            var self = this;
            var year = 0, month = 0, day = 0, hour = 0, minute = 0;
            var date = 0;           
            $('<input id="time" class="datetimepicker" style="float:left; height:' + $(this.element).height() + 'px"/>').insertAfter(this.element);
            $('.datetimepicker').wrapAll('<div class="datetimepicker" style="height:' + $(this.element).height() + 'px"></div>');
            var $time = $("#time");
            this.element.datepicker({
                onSelect: function () {
                    date = $(this).datepicker('getDate');
                    year = date.getFullYear();
                    month = date.getMonth();
                    day = date.getDate();
                    hour = date.getHours();
                    minute = date.getMinutes();
                    $time.val(hour + ":" + minute + " AM");
                    $time.timespinner({
                        start: new Date(date)
                    });
                }
            });
            $time.val("00" + ":" + "00" + " AM");
            $time.timespinner({
                start: new Date(+year, +month, +day, +hour, +minute, 0, 0)
            });
            var widget = $time.data().timespinner.widget()[0].tagName;
            $(widget).css('height', $(this.element).height()+2);
        },
        GetDateAndTime: function () {
            var time = $("#time").timespinner("getTime");
            var date = this.element.val();
            var dateandtime = date + " " + time;
            return dateandtime;
        },
        setDate: function (value) {
            this.element.datepicker("setDate", new Date(value));
            $("#time").timespinner("setTime", new Date(value));
        }
    });
})(jQuery);
