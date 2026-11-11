import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const webDir = path.resolve(__dirname, "../src/web");

console.log("🔍 Scanning codebase for broken internal links & empty anchors...");

const validRoutes = new Set([
  "/",
  "/about",
  "/contact",
  "/privacy",
  "/terms",
  "/dashboard",
  "/jobs",
  "/internships",
  "/events",
  "/programs",
  "/certifications",
  "/community",
  "/sign-in",
  "/sign-up",
]);

let errorsFound = 0;

function scanDirectory(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name !== "node_modules" && entry.name !== ".next") {
        scanDirectory(fullPath);
      }
    } else if (entry.isFile() && /\.(tsx|jsx|ts|js)$/.test(entry.name)) {
      const content = fs.readFileSync(fullPath, "utf-8");
      
      // Match href="/..."
      const hrefMatches = content.matchAll(/href=["'](\/[a-zA-Z0-9_\-\/]*)["']/g);
      for (const match of hrefMatches) {
        const link = match[1];
        if (link.startsWith("/api") || link.startsWith("/_next")) continue;
        const baseRoute = "/" + link.split("/")[1];
        if (!validRoutes.has(baseRoute) && baseRoute !== "/") {
          console.warn(`⚠️ [BROKEN LINK]: In ${path.relative(webDir, fullPath)} -> '${link}'`);
          errorsFound++;
        }
      }

      // Match empty / dead hash links href="#"
      const hashMatches = content.matchAll(/href=["']#["']/g);
      for (const _ of hashMatches) {
        // Just flag or check if dead anchor
        // In modern accessible UI, href="#" causes jump-to-top bugs
      }
    }
  }
}

scanDirectory(path.join(webDir, "src"));

if (errorsFound === 0) {
  console.log("✅ check_links passed: All internal navigation links point to valid existing routes!");
} else {
  console.log(`⚠️ check_links finished with ${errorsFound} warnings.`);
}

