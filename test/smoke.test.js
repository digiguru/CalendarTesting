import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const expectedAssets = [
  "dist/index.html",
  "dist/calendar.css",
  "dist/calendar.js",
  "dist/calendar-core.js",
  "dist/calendar-no-weeks.htm",
];

test("build creates a deployable root and its local assets", async () => {
  await Promise.all(expectedAssets.map((asset) => access(asset)));
  const html = await readFile("dist/index.html", "utf8");
  assert.match(html, /<title>Calendar Testing<\/title>/);
  assert.match(html, /href="calendar\.css"/);
  assert.match(html, /src="calendar\.js"/);
  assert.match(html, /class="month"/);
});
