export class DateRange {
  constructor(startDate, endDate) {
    this.startDate = startDate;
    this.endDate = endDate;
  }

  days() {
    const oneDay = 24 * 60 * 60 * 1000;
    return Math.round(Math.abs((this.startDate.getTime() - this.endDate.getTime()) / oneDay));
  }
}

export class DateHelper {
  static days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  static isWeekend(date) {
    const dayIndex = date.getDay();
    return dayIndex === 0 || dayIndex === 6;
  }

  static addDays(date, days) {
    const result = new Date(date.getTime());
    result.setDate(result.getDate() + days);
    return result;
  }

  static dayOfWeek(dayIndex) {
    return DateHelper.days[dayIndex];
  }

  static daysFromStart(startOfWeek) {
    const startIndex = DateHelper.days.indexOf(startOfWeek);
    if (startIndex === -1) {
      throw new RangeError(`Unknown day: ${startOfWeek}`);
    }
    return [...DateHelper.days.slice(startIndex), ...DateHelper.days.slice(0, startIndex)];
  }
}

export class DateLayout {
  constructor(startDay) {
    this.days = DateHelper.daysFromStart(startDay);
  }
}

export class WorkableDate {
  constructor(date, isWorkDate) {
    this.date = date;
    this.isWorkDay = isWorkDate;
  }

  dayOfWeek() {
    return DateHelper.dayOfWeek(this.date.getDay());
  }
}

export class RangeToDates {
  constructor(dateRange) {
    const totalDays = dateRange.days();
    this.dates = [];
    for (let i = 0; i <= totalDays; i += 1) {
      const currentDate = DateHelper.addDays(dateRange.startDate, i);
      this.dates.push(new WorkableDate(currentDate, !DateHelper.isWeekend(currentDate)));
    }
  }
}

export class RangeCreator {
  createMonth(month, year) {
    const startDate = new Date(`${month} 1, ${year}`);
    if (Number.isNaN(startDate.getTime())) {
      throw new RangeError(`Invalid month/year: ${month} ${year}`);
    }
    const endDate = new Date(startDate.getTime());
    endDate.setMonth(endDate.getMonth() + 1);
    endDate.setDate(endDate.getDate() - 1);
    return new DateRange(startDate, endDate);
  }

  createSprint(startDate, days) {
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + days);
    return new DateRange(startDate, endDate);
  }

  create2WeekSprint(startDate) {
    return this.createSprint(startDate, 14);
  }
}
