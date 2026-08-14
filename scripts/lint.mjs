import { spawnSync } from "node:child_process";
import { readFile } from "node:fs/promises";

const javascriptFiles = [
  "calendar-core.js",
  "calendar.js",
  "scripts/build.mjs",
  "scripts/lint.mjs",
  "test/unit.test.js",
  "test/smoke.test.js",
];

for (const file of javascriptFiles) {
  const result = spawnSync(process.execPath, ["--check", file], { encoding: "utf8" });
  if (result.status !== 0) {
    process.stderr.write(result.stderr);
    process.exit(result.status ?? 1);
  }
}

for (const file of ["package.json", "package-lock.json", "vercel.json"]) {
  JSON.parse(await readFile(file, "utf8"));
}

for (const file of ["index.html", "calendar.htm", "calendar-no-weeks.htm"]) {
  const html = await readFile(file, "utf8");
  if (!/<html lang="[^"]+">/.test(html)) {
    throw new Error(`${file}: missing document language`);
  }
  if (!/<title>[^<]+<\/title>/.test(html)) {
    throw new Error(`${file}: missing page title`);
  }
}

console.log(`Linted ${javascriptFiles.length} JavaScript files and project metadata.`);
