import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const siteRoot = path.resolve(scriptDir, "..");
const excludedRoots = [
  path.join(siteRoot, "casita-azul"),
  path.join(siteRoot, "pack"),
];
const brandLink = '<link rel="stylesheet" href="/assets/brand-system.css">';
const interLink = '<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">';

async function collectHtml(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const target = path.join(dir, entry.name);
    if (excludedRoots.some((root) => target === root || target.startsWith(`${root}${path.sep}`))) continue;
    if (entry.isDirectory()) files.push(...await collectHtml(target));
    if (entry.isFile() && entry.name.endsWith(".html")) files.push(target);
  }
  return files;
}

const files = await collectHtml(siteRoot);
let changed = 0;

for (const file of files) {
  let source = await readFile(file, "utf8");
  const original = source;

  source = source.replace(
    /<link href="https:\/\/fonts\.googleapis\.com\/css2\?family=[^"]+" rel="stylesheet">/g,
    interLink,
  );

  if (!source.includes(brandLink)) {
    source = source.replace("</head>", `${brandLink}\n</head>`);
  }

  if (source !== original) {
    await writeFile(file, source);
    changed += 1;
  }
}

console.log(`Applied brand system to ${changed} HTML files.`);
