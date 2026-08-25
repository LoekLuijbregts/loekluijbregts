import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const thisFile = fileURLToPath(import.meta.url);

const vendorHosts = new Set([
  "manychat.com",
  "www.manychat.com",
  "manychat.partnerlinks.io",
  "vidonary.com",
  "www.vidonary.com",
  "get.vidonary.com",
  "scoreapp.com",
  "www.scoreapp.com",
  "share.scoreapp.com",
  "zcal.co",
  "www.zcal.co",
  "phantombuster.com",
  "www.phantombuster.com",
]);

const allowedVendorUrls = new Set([
  "https://manychat.partnerlinks.io/mzf2x66x80z0-ogcg6e",
  "https://manychat.partnerlinks.io/84216pc24o1h-wki14",
  "https://get.vidonary.com/q6u2niq0p6qt",
  "https://share.scoreapp.com/89af2cbb",
  "https://zcal.co/?via=improve-your-scheduling-tool",
  "https://zcal.co/i/vcLERywI?via=improve-your-scheduling-tool",
  "https://phantombuster.com/?deal=loek15",
]);

const failures = [];

function normalize(raw) {
  const url = new URL(raw.replaceAll("&amp;", "&"));
  url.hash = "";
  return url.toString().replace(/\/$/, "");
}

function inspect(file) {
  if (file === thisFile) return;
  const content = fs.readFileSync(file, "utf8");
  for (const match of content.matchAll(/https:\/\/[^\s"'<>\\]+/g)) {
    const raw = match[0].replace(/[),.;]+$/, "");
    let parsed;
    try {
      parsed = new URL(raw.replaceAll("&amp;", "&"));
    } catch {
      continue;
    }
    if (!vendorHosts.has(parsed.hostname)) continue;
    const normalized = normalize(raw);
    const allowed = parsed.hostname === "manychat.partnerlinks.io" ||
      [...allowedVendorUrls].some((item) => normalize(item) === normalized);
    if (!allowed) failures.push({ file: path.relative(root, file), url: raw });
  }
}

function walk(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (entry.name === ".git" || entry.name === "node_modules") continue;
    const full = path.join(directory, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (full.endsWith(".html") || full.endsWith(".mjs") || full.endsWith(".md")) inspect(full);
  }
}

walk(root);

if (failures.length) {
  console.error("Affiliate link audit failed. Direct vendor URLs found:");
  for (const item of failures) console.error(`- ${item.file}: ${item.url}`);
  process.exit(1);
}

console.log("Affiliate link audit passed: every vendor URL uses an approved affiliate route.");
