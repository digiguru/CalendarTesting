import { cp, mkdir, rm } from "node:fs/promises";

const outputDirectory = "dist";
const assets = [
  "index.html",
  "calendar.htm",
  "calendar-no-weeks.htm",
  "calendar.css",
  "calendar-no-weeks.css",
  "calendar.js",
  "calendar-core.js",
  "calendar-head.mustache",
];

await rm(outputDirectory, { recursive: true, force: true });
await mkdir(outputDirectory, { recursive: true });
await Promise.all(assets.map((asset) => cp(asset, `${outputDirectory}/${asset}`)));
console.log(`Built ${assets.length} static assets into ${outputDirectory}/`);
