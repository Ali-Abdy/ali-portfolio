import { readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const files = [
  "licenses/geist/OFL.txt",
  "node_modules/next/license.md",
  "node_modules/react/LICENSE",
  "node_modules/react-dom/LICENSE",
  "node_modules/scheduler/LICENSE",
  "node_modules/next-themes/license.md",
  "node_modules/styled-jsx/license.md",
  "node_modules/@swc/helpers/LICENSE",
  "node_modules/tslib/LICENSE.txt",
];

// Preserve the notices shipped with Next.js's vendored dependencies as well.
// Inclusion is attribution, not a claim that every dependency runs in the browser.
async function collectLicenses(directory) {
  for (const entry of await readdir(path.join(root, directory), {
    withFileTypes: true,
  })) {
    const relative = `${directory}/${entry.name}`;
    if (entry.isDirectory()) await collectLicenses(relative);
    else if (/^(license|licence|copying)(\.(txt|md))?$/i.test(entry.name))
      files.push(relative);
  }
}

await collectLicenses("node_modules/next/dist/compiled");
const sections = await Promise.all(
  files.sort().map(async (file) => {
    const text = await readFile(path.join(root, file), "utf8");
    return `${file}\n${"=".repeat(72)}\n\n${text.replaceAll("\r\n", "\n").trim()}\n`;
  }),
);
const notices = [
  "Third-party notices — Ali Abdi portfolio",
  "Generated from installed core libraries, Next.js bundled notices, and the Geist font license.",
  "These licenses apply to their respective third-party works, not to personal images or the portfolio as a whole.",
  "Regenerate after dependency updates with: npm run licenses:generate",
  "",
  ...sections,
].join("\n\n");
const destination = path.join(root, "public/third-party-notices.txt");
if (process.argv.includes("--check")) {
  if ((await readFile(destination, "utf8")) !== notices) {
    throw new Error(
      "Third-party notices are stale. Run npm run licenses:generate and review the changes.",
    );
  }
  console.log(`Third-party notices verified (${files.length} license files).`);
} else {
  await writeFile(destination, notices);
  console.log(
    `Updated public/third-party-notices.txt (${files.length} license files).`,
  );
}
