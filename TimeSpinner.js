$.widget("ui.timespinner", $.ui.spinner, {
    options: {
        step: 1,
        page:60,
        change: null,
        start: new Date(),
        minutes: 30,
        current:null
    },
    TimeFormat: /^([0-9])(:[0-5]\d) [APap][mM]$/,
    _parse: function (value) {
        if (typeof value === "string") {
            if (Number(value) === value) {
                var val = this.GetHourAndMinute(value);
                var start = this.options.start;
                return new Date(start.getFullYear(), start.getMonth(), start.getDate(), +val.hour, +val.minute, 0, 0);
            }
        }
        return this.options.start;
    },
    _format: function (value) {
        var timeFormat = Date.CultureInfo.formatPatterns.shortTime;
        this.options.current = value.toString(timeFormat);
        return new Date(value).toString(timeFormat);
    },
    _increment: function (val, i) {
        this.options.start = val.addMinutes(this.options.minutes*i);
        return this.options.start;
    },
    _value: function (value, allowAny) {
        var parsed;
        if (value !== "") {
            parsed = this._parse(value);
            if (parsed !== null) {
                value = this._format(parsed);
            }
        }
        this.element.val(value);
        this._refresh();
    },
    getTime: function () {
        return this.element.val().toString();
    },
    setTime: function (value) {
        this.options.start = new Date(value.getFullYear(), value.getMonth(), value.getDate(), value.getHours(), value.getMinutes(), 0, 0);
        this._refresh();
        this._value(value);
    },
    _spin: function (step, event) {
        var value = this.value() || 0;

        if (!this.counter) {
            this.counter = 1;
        }
        if (typeof value !== 'string' && !(step == -1 && value.totalMilliseconds == 0))
        value = this._increment(value, step);

        if (!this.spinning || this._trigger("spin", event, { value: value }) !== false) {
            this._value(value, true);
            this.counter++;
        }
    },
    _events: {
        keydown: function (event) {
            if (this._start(event) && this._keydown(event)) {
                event.preventDefault();
            }
            var value = this.element.val();
        },
        keyup: "_stop",
        focus: function () {
            this.uiSpinner.addClass("ui-state-active");
            this.options.current = this.element.val();
        },
        blur: function (event) {
            this._refresh();
            this.uiSpinner.removeClass("ui-state-active");
            var value = this.element.val();
            var isValid = false;

            if (this.TimeFormat.test(value) == true) {
                isValid = true;
                var val = this.GetHourAndMinute(value);
                var start = this.options.start;
                this.options.start = new Date(start.getFullYear(), start.getMonth(), start.getDate(), +val.hour, +val.minute, 0, 0);
            }

            if (isValid == false)
                this.element.val(this.options.current);

            if (this.options.current !== value) {
                this._trigger("change", event);
            }
        },        
    },
    GetHourAndMinute: function (value) {
        var hour = value.split(":");
        var minute = hour[1].split(" ");
        return { hour: hour[0], minute: minute[0] };
    },
});
