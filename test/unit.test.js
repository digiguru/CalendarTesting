import assert from "node:assert/strict";
import test from "node:test";

import { DateHelper, RangeCreator, RangeToDates } from "../calendar-core.js";

test("daysFromStart rotates the week to Monday", () => {
  assert.deepEqual(DateHelper.daysFromStart("Monday"), [
    "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday",
  ]);
});

test("daysFromStart rejects an unknown day", () => {
  assert.throws(() => DateHelper.daysFromStart("Funday"), RangeError);
});

test("addDays does not mutate the original date", () => {
  const original = new Date(2026, 7, 14);
  const next = DateHelper.addDays(original, 1);
  assert.equal(original.getDate(), 14);
  assert.equal(next.getDate(), 15);
});

test("weekend detection distinguishes Saturday from Friday", () => {
  assert.equal(DateHelper.isWeekend(new Date(2026, 7, 15)), true);
  assert.equal(DateHelper.isWeekend(new Date(2026, 7, 14)), false);
});

test("createMonth handles leap years and RangeToDates is inclusive", () => {
  const range = new RangeCreator().createMonth("Feb", 2024);
  const dates = new RangeToDates(range).dates;
  assert.equal(dates.length, 29);
  assert.equal(dates.at(0).date.getDate(), 1);
  assert.equal(dates.at(-1).date.getDate(), 29);
});
