class DateRange {
    startDate: Date;
    endDate: Date;
    constructor(startDate, endDate) {
        this.startDate = startDate;
        this.endDate = endDate;
    }
    days():number {
        var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
        return Math.round(Math.abs((this.startDate.getTime() - this.endDate.getTime())/(oneDay)));
    }
    toString() {
        return "okay?... FROM " + this.startDate.toLocaleDateString() + " TO " + this.endDate.toLocaleDateString();
    } 
}
class DateHelper {
    static days:string[] = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    static isWeekend(date) : Boolean {
        var dayIndex = date.getDay();
        return dayIndex === 0 || dayIndex === 6;
    }
    static addDays(date, days) : Date {
        var result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    }
    static dayOfWeek(dayIndex:number): string {
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
    dayOfWeekOrder: String[] = new Array(7);
    constructor(startDay:string) {
        if(startDay === "Monday") {
           
        }
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
    toString() {
        return "Working on this date: " + this.date.toLocaleDateString() + "? " + this.isWorkDay;
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
