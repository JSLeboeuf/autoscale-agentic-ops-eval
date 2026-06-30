import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const INCLUDE_EXTENSIONS = new Set([".js", ".md", ".json", ".sh"]);
const SKIP_DIRS = new Set(["node_modules", ".git"]);
const failures = [];

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (SKIP_DIRS.has(entry.name)) continue;
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      walk(fullPath);
      continue;
    }

    if (!INCLUDE_EXTENSIONS.has(path.extname(entry.name))) continue;

    const relativePath = path.relative(ROOT, fullPath);
    const content = fs.readFileSync(fullPath, "utf8");

    if (content.includes("\t")) {
      failures.push(`${relativePath}: contains tab characters`);
    }

    if (content.includes("\r\n")) {
      failures.push(`${relativePath}: contains CRLF line endings`);
    }
  }
}

walk(ROOT);

if (failures.length > 0) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log("Lint check passed.");
