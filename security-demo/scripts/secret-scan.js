import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const SKIP_DIRS = new Set(["node_modules", ".git"]);
const SKIP_FILES = new Set(["package-lock.json"]);
const patterns = [
  new RegExp("s" + "k-[A-Za-z0-9_-]{20,}"),
  new RegExp("g" + "hp_[A-Za-z0-9_]{20,}"),
  new RegExp("GOC" + "SPX-"),
  new RegExp("AI" + "za[0-9A-Za-z_-]{20,}"),
  new RegExp("BEGIN (RSA |OPENSSH |EC |DSA )?PRIVATE KEY"),
];

const findings = [];

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (SKIP_DIRS.has(entry.name)) continue;
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      walk(fullPath);
      continue;
    }

    if (SKIP_FILES.has(entry.name)) continue;

    const relativePath = path.relative(ROOT, fullPath);
    const content = fs.readFileSync(fullPath, "utf8");
    const lines = content.split("\n");

    lines.forEach((line, index) => {
      if (patterns.some((pattern) => pattern.test(line))) {
        findings.push(`${relativePath}:${index + 1}`);
      }
    });
  }
}

walk(ROOT);

if (findings.length > 0) {
  console.error("Potential secret patterns found:");
  console.error(findings.join("\n"));
  process.exit(1);
}

console.log("Secret scan passed.");
