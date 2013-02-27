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
            var widget = ($time.data("uiTimespinner") || $time.data("timespinner")).widget();
            $(widget).css('height', $(this.element).height());
             $(widget).css('width', 85+'px');
            $(widget).removeClass('ui-corner-all');
            var input=$(widget).find('input');
            input.width(($(widget).width()-25) + 'px');
            input.css('margin', 0 + 'px');
            input.css('font-size', 13+'px');
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
