import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.resolve(__dirname, "../src/web/public");

console.log("📸 Image Optimizer & Validator Check...");

if (!fs.existsSync(publicDir)) {
  console.log("No public directory found, skipping.");
  process.exit(0);
}

const files = fs.readdirSync(publicDir);
let largeFiles = 0;

for (const file of files) {
  const filePath = path.join(publicDir, file);
  const stat = fs.statSync(filePath);
  if (stat.isFile() && /\.(png|jpg|jpeg|webp)$/i.test(file)) {
    const sizeKB = Math.round(stat.size / 1024);
    console.log(`- ${file}: ${sizeKB} KB`);
    if (sizeKB > 500) {
      largeFiles++;
      console.warn(`  ⚠️ High asset size: ${file} is ${sizeKB} KB (> 500 KB)`);
    }
  }
}

console.log(`✅ Image inspection completed. ${files.length} assets audited in public/.`);
