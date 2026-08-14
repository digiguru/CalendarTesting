import {
  DateHelper,
  DateLayout,
  DateRange,
  RangeCreator,
  RangeToDates,
  WorkableDate,
} from "./calendar-core.js";

// Keep the prototype helpers available from the browser console without
// depending on jQuery or Mustache just to load the static calendar page.
globalThis.CalendarTesting = {
  DateHelper,
  DateLayout,
  DateRange,
  RangeCreator,
  RangeToDates,
  WorkableDate,
};
