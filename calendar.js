var TemplateLoader = (function () {
    function TemplateLoader() {
    }
    TemplateLoader.loadTemplate = function (template) {
        return $.get(template);
    };
    TemplateLoader.renderTemplate = function (url, data) {
        var promise = $.Deferred();
        TemplateLoader.loadTemplate(url).then(function (template, textStatus, jqXhr) {
            var rendered = Mustache.render(template, data);
            promise.resolve(rendered);
        });
        return promise;
    };
    return TemplateLoader;
}());
var DateRange = (function () {
    function DateRange(startDate, endDate) {
        this.startDate = startDate;
        this.endDate = endDate;
    }
    DateRange.prototype.days = function () {
        var oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
        return Math.round(Math.abs((this.startDate.getTime() - this.endDate.getTime()) / (oneDay)));
    };
    return DateRange;
}());
var DateHelper = (function () {
    function DateHelper() {
    }
    DateHelper.isWeekend = function (date) {
        var dayIndex = date.getDay();
        return dayIndex === 0 || dayIndex === 6;
    };
    DateHelper.addDays = function (date, days) {
        var result = new Date(date.getTime());
        result.setDate(result.getDate() + days);
        return result;
    };
    DateHelper.dayOfWeek = function (dayIndex) {
        return DateHelper.days[dayIndex];
    };
    DateHelper.daysFromStart = function (startOfWeek) {
        var arr = DateHelper.days.slice();
        for (var offset = arr.indexOf(startOfWeek); offset > 0; offset--) {
            arr.push(arr.shift());
        }
        return arr;
    };
    DateHelper.days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return DateHelper;
}());
var DateLayout = (function () {
    function DateLayout(startDay) {
        this.days = DateHelper.daysFromStart(startDay);
    }
    return DateLayout;
}());
var RangeToDates = (function () {
    function RangeToDates(dateRange) {
        var totalDays = dateRange.days();
        this.dates = new Array(totalDays);
        for (var i = 0; i <= totalDays; i++) {
            var currentDate = DateHelper.addDays(dateRange.startDate, i), isWeekend = DateHelper.isWeekend(currentDate);
            this.dates[i] = new WorkableDate(currentDate, !isWeekend);
        }
    }
    return RangeToDates;
}());
var WorkableDate = (function () {
    function WorkableDate(date, isWorkDate) {
        this.date = date;
        this.isWorkDay = isWorkDate;
    }
    WorkableDate.prototype.dayOfWeek = function () {
        return DateHelper.dayOfWeek(this.date.getDay());
    };
    return WorkableDate;
}());
var RangeCreator = (function () {
    function RangeCreator() {
    }
    RangeCreator.prototype.createMonth = function (month, year) {
        var startDate = new Date(month + " 1, " + year), endDate = new Date(month + " 1, " + year);
        endDate.setMonth(endDate.getMonth() + 1);
        endDate.setDate(endDate.getDate() - 1);
        return new DateRange(startDate, endDate);
    };
    ;
    RangeCreator.prototype.createSprint = function (startDate, days) {
        var endDate = new Date(startDate);
        endDate.setDate(endDate.getDate() + days);
        return new DateRange(startDate, endDate);
    };
    ;
    RangeCreator.prototype.create2WeekSprint = function (startDate) {
        return this.createSprint(startDate, 14);
    };
    ;
    return RangeCreator;
}());
var rc = new RangeCreator();
console.log(rc.createMonth("Jan", 2016));
console.log(rc.createMonth("Dec", 2016));
var rtd = new RangeToDates(rc.createMonth("Jan", 2016));
console.log(rtd);
console.log(DateHelper.daysFromStart("Tuesday"));
console.log(DateHelper.daysFromStart("Monday"));
