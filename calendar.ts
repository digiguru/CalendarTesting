class TemplateLoader {
    static loadTemplate (template) {
        return $.get(template);
    }
    static renderTemplate (url, data) {
        var promise = $.Deferred();
        TemplateLoader.loadTemplate(url).then(function(template, textStatus, jqXhr) {
            var rendered = Mustache.render(template, data)
            promise.resolve(rendered);
        });
        return promise;
    }
}

class DateRange {
    startDate: Date;
    endDate: Date;
    constructor(startDate:Date, endDate:Date) {
        this.startDate = startDate;
        this.endDate = endDate;
    }
    days():number {
        var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
        return Math.round(Math.abs((this.startDate.getTime() - this.endDate.getTime())/(oneDay)));
    }
}
class DateHelper {
    static days:string[] = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    static isWeekend(date:Date) : Boolean {
        var dayIndex = date.getDay();
        return dayIndex === 0 || dayIndex === 6;
    }
    static addDays(date:Date, days:number) : Date {
        var result = new Date(date.getTime());
        result.setDate(result.getDate() + days);
        return result;
    }
    static dayOfWeek(dayIndex:number) : string {
        return DateHelper.days[dayIndex];
    }
    static daysFromStart(startOfWeek:string) : string[] {
        let arr = DateHelper.days.slice();
        for (let offset:number = arr.indexOf(startOfWeek); offset > 0; offset--) {
            arr.push(arr.shift());
        }
        return arr;
    }
}
class DateLayout {
    days:string[];
    constructor(startDay:string) {
       this.days = DateHelper.daysFromStart(startDay);
    }
}
class RangeToDates {
    dates: WorkableDate[];
    constructor(dateRange: DateRange) {
        let totalDays = dateRange.days();
        this.dates = new Array(totalDays);
        for(let i = 0; i <= totalDays; i++) {
            let currentDate:Date = DateHelper.addDays(dateRange.startDate, i),
                isWeekend = DateHelper.isWeekend(currentDate);
            this.dates[i] = new WorkableDate(currentDate, !isWeekend);
        }
    }
}

class WorkableDate {
    date: Date;
    isWorkDay: Boolean;
    constructor(date:Date, isWorkDate:Boolean) {
        this.date = date;
        this.isWorkDay = isWorkDate;
    }
    dayOfWeek(): String {
        return DateHelper.dayOfWeek(this.date.getDay());
    }
}

class RangeCreator {
    
	createMonth (month:string, year:number):DateRange {
        var startDate = new Date(month +" 1, " + year),
            endDate = new Date(month +" 1, " + year);
        endDate.setMonth(endDate.getMonth() + 1);
        endDate.setDate(endDate.getDate() - 1);
        return new DateRange(startDate, endDate);
    };
    createSprint (startDate, days):DateRange {
        var endDate = new Date(startDate);
        endDate.setDate(endDate.getDate() + days);
        return new DateRange(startDate, endDate);
    };
    create2WeekSprint (startDate):DateRange {
        return this.createSprint(startDate, 14);
    };
    
}
var rc = new RangeCreator();
console.log(rc.createMonth("Jan", 2016));
console.log(rc.createMonth("Dec", 2016));
var rtd = new RangeToDates(rc.createMonth("Jan", 2016));
console.log(rtd);
console.log(DateHelper.daysFromStart("Tuesday"));
console.log(DateHelper.daysFromStart("Monday"));


TemplateLoader.renderTemplate("calendar-head.mustache", 
    {"days":["monday", "tuesday","wed"]}
).then(function(x) { 
    console.log("hello", x) 
} );